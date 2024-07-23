import { Pagination } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Grid from './Grid/Grid';
import ResizeHelper from './Grid/ResizeHelper';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentItems, setCurrentItems] = useState<{ key: number; filedata?: { filetype?: string; filename?: string; fileurl?: string}; }[]>([]);
  const cardGroupRef = useRef<HTMLDivElement>(null);

  //const items = Array.from({ length: 30 }).map((undefined ,key) => <Card key={key} />);
  const items = new Array(
    {key:1, filedata:{filetype:'document', filename:'doc1'}},
    {key:2, filedata:{filetype:'document', filename:'doc2'}},
    {key:3, filedata:{filetype:'audio', filename:'aud1'}},
    {key:4, filedata:{filetype:'video', filename:'vid1'}},
    {key:5, filedata:{filetype:'document', filename:'doc3'}},
    {key:6, filedata:{filetype:'audio', filename:'aud2'}},
    {key:7, filedata:{filetype:'document', filename:'doc4'}},
    {key:8, filedata:{filetype:'video', filename:'vid2'}},
    {key:9, filedata:{filetype:'document', filename:'doc5'}},
    {key:10, filedata:{filetype:'document', filename:'doc6'}},
    {key:11, filedata:{filetype:'document', filename:'doc7'}},
    {key:12, filedata:{filetype:'document', filename:'doc8'}}
  )

  useEffect(() => {
    updateCurrentItems();
  }, [currentPage, itemsPerPage]); // Update only when currentPage or itemsPerPage changes

  const updateCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(items.slice(startIndex, endIndex));
  };

  return (
    <>
      <div ref={cardGroupRef}>
        <Grid items={currentItems} offset={0} className="blue"/>
      </div>

      <ResizeHelper
        containerRef={cardGroupRef}
        cardWidth={120}
        onResize={setItemsPerPage}
        itemslength={items.length}
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
