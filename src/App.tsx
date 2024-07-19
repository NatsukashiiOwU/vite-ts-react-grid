import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import { CardGroupControllableSelect } from './workingcard';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {}, [currentPage, itemsPerPage]);

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
  //const items = new Set([1,2,3,4,5,6,7,8,9,10]);


  //const totalPages = Math.ceil(items.length / itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  // console.log("🚀 ~ App ~ length:", items.length)
  // console.log("🚀 ~ App ~ totalPages:", totalPages)
  const startIndex = (currentPage - 1) * itemsPerPage;
  // console.log("🚀 ~ App ~ currentPage:", currentPage)
  // console.log("🚀 ~ App ~ startIndex:", startIndex)
  const endIndex = startIndex + itemsPerPage;
  // console.log("🚀 ~ App ~ endIndex:", endIndex)
  const currentItems = items.slice(startIndex, endIndex);
  //const currentItems = new Set(items);
  // console.log("🚀 ~ App ~ currentItems:", currentItems)

  return (
    <>
      <CardGroupControllableSelect items={currentItems}/>

    <Pagination pageSize={itemsPerPage} onChange={(currentPage, itemsPerPage) => {
      setCurrentPage(currentPage);
      setItemsPerPage(itemsPerPage);
    }}
    total={items.length}
    current={currentPage}>
    </Pagination>
    </>
  )
}

export default App



