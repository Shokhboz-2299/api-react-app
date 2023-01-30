import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ClassApp from './Components/ClassComp';
import { FunctionalApp } from './Components/FunctionalComp';
import { Pagination } from './Components/Pagination';

function App() {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(10);

  useEffect(() => {
    const fetComments = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
      setComments(res.data)
      setLoading(false);
    }

    fetComments();
  }, [])

  // get current comments
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

// change page 
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <ClassApp />
      <FunctionalApp comments={currentComments} loading={loading} />
      <Pagination 
      commentsPerPage={commentsPerPage} 
      totalComments={comments.length} 
      paginate={paginate} />
    </div>
  );
}

export default App;
