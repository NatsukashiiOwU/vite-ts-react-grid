import { Pagination } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Grid from './Grid/Grid';
import ResizeHelper from './Grid/ResizeHelper';
import testrequest from "./Grid/testrequest.json";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentItems, setCurrentItems] = useState<GridItem<FileItem>[]>([]); // Change the type here
  const cardGroupRef = useRef<HTMLDivElement>(null);

  type FileItem = {
    type: 'doc' | 'txt' | 'mp4';
    title: string;
    link?: string;
  };

  type GridItem<T> = { key: number; filedata: T };
/*
  const items = new Array(
    { key: 1, filedata: { type: 'doc', title: 'doc1', url:'https://www.svgrepo.com/show/532761/file-check.svg' } },
    { key: 2, filedata: { title: 'file1' } },
    { key: 3, filedata: { type: 'txt', title: 'aud1', url:'https://www.svgrepo.com/show/532699/file-audio.svg' } },
    { key: 4, filedata: { type: 'mp4', title: 'vid1' } },
    { key: 5, filedata: { title: 'file2' } },
    { key: 6, filedata: { type: 'txt', title: 'aud2' } },
    { key: 7, filedata: { type: 'doc', title: 'doc2' } },
    { key: 8, filedata: { type: 'mp4', title: 'vid2' } },
    { key: 9, filedata: { type: 'doc', title: 'doc3' } },
    { key: 10, filedata: { type: 'doc', title: 'doc4' } },
    { key: 11, filedata: { type: 'doc', title: 'doc5' } },
    { key: 12, filedata: { type: 'doc', title: 'doc6' } }
  );
*/

  const items = testrequest.items.map((item, index) => ({
    key: index + 1,
    filedata: {type: item.type, title: item.title.t.en, link: item.link},
  }));

  useEffect(() => {
    updateCurrentItems();
  }, [currentPage, itemsPerPage]);

  const updateCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(items.slice(startIndex, endIndex) as unknown as GridItem<FileItem>[]);
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

export default App;
