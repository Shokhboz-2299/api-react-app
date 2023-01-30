import { useState } from "react";
import React from "react"
import { Container } from "reactstrap";

export const Pagination = ({commentsPerPage, totalComments, paginate}) => {
 const pageNumbers = [];

 const [page, setPage] = useState(0)
 const [num, setNum] = useState(1)

 for(let i=1; i<= Math.ceil(totalComments/commentsPerPage); i++){
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
  if(page!==Math.ceil(totalComments/commentsPerPage)-10){
    setNum(num+10)
    paginate(num+10)
    return setPage(page+10)
  }
  else return page;
 };

  return (
    <Container>
    <nav className="navbar-pagination">
      <ul className="pagination">
      <li className="page-item"><a onClick={prev} href="!#" className="page-link">Prev</a></li>
        {
          pageNumbers.slice(page,page+10).map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href="!#" className="page-link">
                {number}
              </a>
            </li>
          ))
        }
      <li className="page-item"><a onClick={next} href="!#" className="page-link">Next</a></li>
      </ul>
    </nav>
    </Container>
  )
}
