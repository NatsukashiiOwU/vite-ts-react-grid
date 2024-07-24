import {
    HTMLAttributes,
    Key
} from "react";

import { styled } from "@linaria/react";

type FileData = { type?: string; name?: string; url?: string };

type CardProps<T extends FileData> = HTMLAttributes<HTMLDivElement> & {
    key?: Key;
    filedata: T;
};

const Img =styled.img`
    width:80px;
    height:80px;
    filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
    user-select: none;
`;

const FileTitle = styled.span`
    text-align:center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
    user-select: none;
`
function CheckType(type: string | undefined){
    switch(type){
        case 'document':
            return("../src/assets/file-alt-svgrepo-com.svg")
        case 'video':
            return("../src/assets/clapperboard-play-svgrepo-com.svg")
        case 'audio':
            return("../src/assets/file-audio-svgrepo-com.svg")
        default:
            return("../src/assets/file-svgrepo-com.svg")
    }
}

const Card = <T extends FileData>({ filedata }: CardProps<T>) => {
    return(
        <>
        <Img alt="filedata.type" src={CheckType(filedata?.type)} draggable="false"></Img>
        <br></br>
        <FileTitle>{filedata?.name}</FileTitle>
        </>
    );
};

export default Card;
