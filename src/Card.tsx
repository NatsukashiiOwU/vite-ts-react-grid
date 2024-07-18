/*
import { Key, useState } from "react";

type SelectionParamsSingle<Data> = {
    type: 'single';
    selected: Key;
    onClick: (key: Key, record: Data) => void;
};

type SelectionParamsMultiple<Data> = {
    type: 'multiple';
    selected: Key[];
    onClick: (key: Key[], record: Data[]) => void;
};

type SelectionParams<Data> = SelectionParamsSingle<Data> | SelectionParamsMultiple<Data>;

function Card(props : {id: number, selection: SelectionParams<any>, onClick: () => void}){

    const [selectedItem, setSelectedItem] = useState<Key | undefined>();
    console.log("🚀 ~ App ~ selectedItem:", selectedItem)
    const [selectedItems, setSelectedItems] = useState<Key[]>([]);
    console.log("🚀 ~ App ~ selectedItems:", selectedItems)

        return (
            <div style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            backgroundColor: '#fff',
            }}
            onClick={props.onClick}
            >
            <span>id:{props.id}</span>
            </div>
        );
}

export default Card;
*/