import {
    HTMLAttributes,
    Key
} from "react";

import { styled } from "@linaria/react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    key?: Key;
    filedata?: {filetype?: string; filename?: string; fileurl?: string};
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
function CheckFileType(filetype: string | undefined){
    switch(filetype){
        case 'document':
            return("../src/assets/file-svgrepo-com.svg")
        case 'video':
            return("../src/assets/clapperboard-play-svgrepo-com.svg")
        case 'audio':
            return("../src/assets/file-audio-svgrepo-com.svg")
        default:
            return(undefined)
    }
}

const Card = ({ filedata }: CardProps) => {
    return(
        <><Img alt="filedata.filetype" src={CheckFileType(filedata?.filetype)} draggable="false"></Img>
        <br></br>
        <FileTitle>{filedata?.filename}</FileTitle></>
    );
};

export default Card;