import {
    CSSProperties,
    HTMLAttributes,
    Key,
    ReactNode,
    useMemo,
    useState,
} from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    selected?: boolean;
    key?: Key;
};

const stylesConstants = {
    cardBorderColor: "#ddd",
    cardContainerBorderColor: "#eee",
    cardSelectedColor: "#218ad9",
};

const defaultCardStyles: CSSProperties = {
    width: 120,
    height: 120,
    border: `1px solid ${stylesConstants.cardBorderColor}`,
    borderRadius: 4,
    backgroundColor: "#fff",
};

const Card = ({ style, selected, ...props }: CardProps) => {
    const cardStyles: CSSProperties = useMemo(() => {
        if (selected) {
            return {
                ...style,
                ...defaultCardStyles,
                border: `1px solid ${stylesConstants.cardSelectedColor}`,
                boxShadow: `0 0 4px 2px ${stylesConstants.cardSelectedColor}`,
            };
        }

        return {
            ...style,
            ...defaultCardStyles,
        };
    }, [style, selected]);

    return <div style={cardStyles} {...props} />;
};

/** Just a card holder - no custom logic here only styles */
const CardContainer = ({ children }: { children?: ReactNode }) => {
    return (
        <div
            style={{
                padding: "1rem",
                margin: "1rem",
                border: `1px solid ${stylesConstants.cardContainerBorderColor}`,
                borderRadius: 4,
                display: "flex",
                gap: "1rem",
            }}
        >
            {children}
        </div>
    );
};

const CardGroupControllableSelect = ({
    items,
}: {
    items: { key: Key; children?: ReactNode }[];
}) => {
    const [selected, onSetSelected] = useState<Set<Key>>(new Set());
    console.log("🚀 ~ App ~ selected:", selected);

    return (
        <CardContainer>
            {items.map(({ key }) => (
                <Card
                    key={key}
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
                    <>{key}</>
                </Card>
            ))}
        </CardContainer>
    );
};

export {
    Card,
    CardContainer,
    CardGroupControllableSelect
};

