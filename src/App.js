import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ClassApp from './Components/ClassComp';
import { FunctionalApp } from './Components/FunctionalComp';
import { Pagination } from './Components/Pagination';
import { Container, Form, FormGroup, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(10);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetComments = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
      setComments(res.data)
      setFilterData(res.data)
      setLoading(false)
        ;
    }

    fetComments();
  }, [])

  // filtering
  const handleSearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      const commentsData = comments.filter(item => item.name.toLowerCase().includes(getSearch));
      setComments(commentsData);
    } else {
      setCurrentPage(filterData)
    }
    setQuery(getSearch);
  }

  // get current comments
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // change page 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Nav className='dark' pills>
            <NavItem>
              <NavLink href="/">
                Functional Component
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">
                Class Componant
              </NavLink>
            </NavItem>
          </Nav>
          <Container>
            <Form>
              <FormGroup>
                <Input
                  onChange={(e) => handleSearch(e)}
                  className='filter'
                  id="filter"
                  name="search"
                  value={query}
                  placeholder="Search"
                  type="search"
                />
              </FormGroup>
            </Form>
          </Container>
          {/* <ClassApp /> */}
        </div>
        <Routes>
          <Route path="/" element={<FunctionalApp comments={currentComments} loading={loading} />} />
          <Route path="about" element={<ClassApp comments={currentComments} /> } />
        </Routes>
        <Pagination
          commentsPerPage={commentsPerPage}
          totalComments={comments.length}
          paginate={paginate} />
      </BrowserRouter>
    </>
  );
}

export default App;
