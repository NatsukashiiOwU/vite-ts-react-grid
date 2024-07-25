import { styled } from '@linaria/react';
import SelectionArea, { SelectionEvent } from '@viselect/react';
import { useState } from 'react';
import Card from './Card';
import "./selectionarea.css";

type GridItem<T> = { key: number; filedata: T };
type FileData = { type?: string; name?: string; url?: string };

const Container = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    border: 2px solid rgba(66, 68, 90, 0.075);
    border-radius: 0.5em;
    padding: 0.5em 0.5em;
    user-select: none;
    margin-bottom: 3em;
    gap: 0.2em;
`;

const Selectable = styled.div`
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  &.selected {
        background: hsla(197, 100%, 76%, 0.05);
    border: 2px solid rgba(98, 155, 255, 0.85);
  }
`;

function Grid<T extends FileData>({ items, className }: {
    items: GridItem<T>[];
    className: string;
}) {
    const [selected, setSelected] = useState<Set<number>>(() => new Set());

    const extractIds = (els: Element[]): number[] =>
        els
            .map((v) => v.getAttribute('data-key'))
            .filter(Boolean)
            .map(Number);

    const onStart = ({ event, selection }: SelectionEvent) => {
        if (!event?.ctrlKey && !event?.metaKey) {
            selection.clearSelection();
            setSelected(() => new Set());
        }
    };

    const onMove = ({ store: { changed: { added, removed } } }: SelectionEvent) => {
        setSelected((prev) => {
            const next = new Set(prev);
            extractIds(added).forEach((id) => next.add(id));
            extractIds(removed).forEach((id) => next.delete(id));
            return next;
        });
    };

    return (
        <SelectionArea
            className={`container ${className}`}
            onStart={onStart}
            onMove={onMove}
            selectables=".selectable"
        >
            <Container>
                {items?.map((item) => (
                    <Selectable
                        className={selected.has(item.key) ? 'selected selectable' : 'selectable'}
                        data-key={item.key}
                        key={item.key}
                    >
                        <Card filedata={item.filedata} />
                    </Selectable>
                ))}
            </Container>
        </SelectionArea>
    );
}

export default Grid;

