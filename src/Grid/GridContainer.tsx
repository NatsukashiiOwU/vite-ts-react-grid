
import { Pagination } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Grid from './Grid';
import ResizeHelper from './ResizeHelper';

type FileItem = {
  type: string;
  title: string;
  link?: string;
};

type GridItem<T> = { key: number; filedata: T };

interface GridContainerProps {
  items: GridItem<FileItem>[];
}

function GridContainer({ items }: GridContainerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentItems, setCurrentItems] = useState<GridItem<FileItem>[]>([]);
  const cardGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateCurrentItems();
  }, [items.length, currentPage, itemsPerPage]);

  const updateCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(items.slice(startIndex, endIndex) as GridItem<FileItem>[]);
  };

  return (
    <>
      <div ref={cardGroupRef}>
        <Grid<FileItem> items={currentItems} className="blue" />
      </div>

      <ResizeHelper
        containerRef={cardGroupRef}
        cardWidth={120}
        onResize={(itemsPerPage, newCurrentPage) => {
            setItemsPerPage(itemsPerPage);
            setCurrentPage(newCurrentPage);
        }}
        itemslength={items.length}
        currentPage={currentPage}
      />

      <Pagination
        pageSize={itemsPerPage}
        onChange={(currentPage, itemsPerPage) => {
          setCurrentPage(currentPage);
          setItemsPerPage(itemsPerPage);
        }}
        total={items.length}
        current={currentPage}
      />
    </>
  );
}

export default GridContainer;
