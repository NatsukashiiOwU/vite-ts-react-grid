import SelectionArea, { SelectionEvent } from '@viselect/react';
import { useState } from 'react';
import Card from './Card';
import './index.css';

function Grid({ items, offset, className }: {
    offset: number;
    className: string;
    items?: {key: number; filedata?: {filetype?: string; filename?: string; fileurl?: string};}[];
}) {
    const [selected, setSelected] = useState<Set<number>>(() => new Set());

    const extractIds = (els: Element[]): number[] =>
        els.map(v => v.getAttribute('data-key'))
            .filter(Boolean)
            .map(Number);

    const onStart = ({ event, selection }: SelectionEvent) => {
        if (!event?.ctrlKey && !event?.metaKey) {
            selection.clearSelection();
            setSelected(() => new Set());
        }
    };

    const onMove = ({ store: { changed: { added, removed } } }: SelectionEvent) => {
        setSelected(prev => {
            const next = new Set(prev);
            extractIds(added).forEach(id => next.add(id));
            extractIds(removed).forEach(id => next.delete(id));
            return next;
        });
    };

    return (
        <SelectionArea className={`container ${className}`}
            onStart={onStart}
            onMove={onMove}
            selectables=".selectable">
            {items?.map((item, index) => (
                <div className={selected.has(item.key) ? 'selected selectable' : 'selectable'}
                    data-key={item.key}
                    key={item.key}>
                <Card filedata={item.filedata}></Card>
                </div>
            ))}
        </SelectionArea>
    );
}
export default Grid;
