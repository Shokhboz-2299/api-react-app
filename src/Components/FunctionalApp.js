import { Container, Form, FormGroup, Input, Table } from "reactstrap"
import axios from 'axios';
import React, { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/comments";

function FunctionalApp() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const res = await axios.get(API_URL);
      setComments(res.data)
      setLoading(false)
        ;
    }

    fetchComments();
  }, [])

  const handleSearch = e => setSearchTerm(e.target.value);

  const filteredData = comments.filter(
    comments => ((comments.name.toLowerCase().indexOf(searchTerm.toLowerCase()))!== -1) ||((comments.body.toLowerCase().indexOf(searchTerm.toLowerCase())) !== -1)
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const handlePageChange = pageNumber => setCurrentPage(pageNumber);

  if(loading){
    return <h2 className="text-center">...Loading</h2>
  }
  return (
    <>
     <Container>
      <h3> Functional Component</h3>
      <Form>
              <FormGroup>
                <Input
                 onChange={handleSearch}
                  className='filter'
                  id="filter"
                  name="search"
                  value={searchTerm}
                  placeholder="Search"
                  type="search"
                />
              </FormGroup>
            </Form>
        <Table className="mt-5" bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>body</th>
            </tr>
          </thead>
          <tbody>
            {
                currentData.map((comment) => (
            <tr key={comment.id}>
              <th scope="row">{comment.id}</th>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
              ))
            }
          </tbody>
        </Table>
        <Pagination
        dataPerPage={dataPerPage}
        totalData={comments.length}
        paginate={handlePageChange}
      />
      </Container>
    </>
  )
}

function Pagination({ dataPerPage, totalData, paginate }) {

  const [page, setPage] = useState(0)
  const [num, setNum] = useState(1)

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  function prev(){
    if(page!==0){
      setNum(num-10)
      paginate(num-10)
      return setPage(page-10)
    }
    return page
   }
  
   function next(){
    if(page!==Math.ceil(totalData/dataPerPage)-10){
      setNum(num+10)
      paginate(num+10)
      return setPage(page+10)
    }
    else return page;
   };
  return (
    <nav className="navbar-pagination">
      <ul className="pagination">
      <li className="page-item"><a onClick={prev} href="#" className="page-link">Prev</a></li>
        {
          pageNumbers.slice(page,page+10).map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href="#" className="page-link">
                {number}
              </a>
            </li>
          ))
        }
      <li className="page-item"><a onClick={next} href="#" className="page-link">Next</a></li>
      </ul>
    </nav>
  );
}

export default FunctionalApp;