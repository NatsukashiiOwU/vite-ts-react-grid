import {
    HTMLAttributes,
    Key
} from "react";

import { styled } from "@linaria/react";

type FileData = { type?: string; title?: string; link?: string };

type CardProps<T extends FileData> = HTMLAttributes<HTMLDivElement> & {
    key?: Key;
    filedata: T;
};

const Img =styled.img`
    width:80px;
    height:80px;
    //filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
    user-select: none;
`;

const FileTitle = styled.span`
    text-align:center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif ;
    user-select: none;
`

const Card = <T extends FileData>({ filedata }: CardProps<T>) => {
    return(
        <>
        <Img alt="filedata.type" src={filedata?.link || "../src/assets/file-svgrepo-com.svg"} draggable="false"></Img>
        <br></br>
        <FileTitle>{filedata?.title}</FileTitle>
        </>
    );
};

export default Card;
