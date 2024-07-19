import {
    CSSProperties,
    HTMLAttributes,
    Key,
    ReactNode,
    useMemo,
    useState,
} from "react";

import { styled } from "@linaria/react";
//import Icon from "./Icon";

const cardBorderColor = "#ddd";
const cardContainerBorderColor = "#eee";
const cardSelectedColor = "#218ad9";

const CardContianer = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px solid;
  border-radius: 4px;
  display: flex;
  gap: 1rem;
  border-color: ${cardContainerBorderColor};
`;

type CardProps = HTMLAttributes<HTMLDivElement> & {
    selected?: boolean;
    key?: Key;
    filedata?: {filetype?: string; filename?: string; fileurl?: string};
};

const Img =styled.img`
    widgth:80px;
    height:80px;
    filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
`;

const defaultCardStyles: CSSProperties = {
    width: 120,
    height: 120,
    border: `1px solid ${cardBorderColor}`,
    borderRadius: 4,
    backgroundColor: "#fff",
};
const Card = ({ style, selected, filedata, ...props }: CardProps) => {
    const cardStyles: CSSProperties = useMemo(() => {
        if (selected) {
            return {
                ...style,
                ...defaultCardStyles,
                border: `1px solid ${cardSelectedColor}`,
                boxShadow: `0 0 4px 2px ${cardSelectedColor}`,
            };
        }

        return {
            ...style,
            ...defaultCardStyles,
        };
    }, [style, selected, filedata]);

    return <div style={cardStyles} {...props} />;
};

function CheckFileType(filetype: string | undefined){
    if(filetype==='document'){
        return("../src/assets/file-svgrepo-com.svg")
    }
    
    if(filetype==='video'){
        return("../src/assets/clapperboard-play-svgrepo-com.svg")
    }
    
    if(filetype==='audio'){
        return("../src/assets/file-audio-svgrepo-com.svg")
    }
    return(undefined)
}

/** Just a card holder - no custom logic here only styles */

const CardContainer = ({ children }: { children?: ReactNode }) => {
    return <CardContianer>{children}</CardContianer>;
};

const CardGroupControllableSelect = ({
    items,
}: {
    items: { key: Key; filedata?: {filetype?: string; filename?: string; fileurl?: string}; children?: ReactNode }[];
}) => {
    const [selected, onSetSelected] = useState<Set<Key>>(new Set());
    console.log("🚀 ~ App ~ selected:", selected);

    return (
        <CardContainer>
            {items.map(({ key, filedata }) => (
                <Card
                    key={key}
                    filedata={filedata}
                    selected={selected.has(key)}
                    onClick={() => {
                        if (!selected.has(key)) {
                            onSetSelected((prev) => {
                                prev.add(key);
                                return new Set(prev);
                            });
                        } else {
                            onSetSelected((prev) => {
                                prev.delete(key);
                                return new Set(prev);
                            });
                        }
                    }}
                >
                    <span>{filedata?.filetype}</span>
                    <Img alt="filedata.filetype" src={CheckFileType(filedata?.filetype)}></Img>
                    <span>{filedata?.filename}</span>
                </Card>
            ))}
        </CardContainer>
    );
};

export { Card, CardContainer, CardGroupControllableSelect };
