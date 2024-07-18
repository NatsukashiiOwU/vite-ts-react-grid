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
  const items = new Array({key:1},{key:2},{key:3},{key:4},{key:5},{key:6},{key:7},{key:8},{key:9},{key:10})
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
    total={totalPages}
    current={currentPage}>
    </Pagination>
    </>
  )
}

export default App



