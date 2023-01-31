import React, { Component } from "react";
import { Container, Form, FormGroup, Input, Table } from "reactstrap";


export class ClassApp extends Component {

  state = {
    comments: [],
    currentPage: 1,
    dataPerPage: 10,
    searchTerm: ''
  };
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => {
        this.setState({ comments: data })
      })

  }
  handlePageChange = pageNumber => this.setState({ currentPage: pageNumber });

  // search 
  handleSearch = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    const { comments, currentPage, dataPerPage, searchTerm  } = this.state;
    const filteredData = comments.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
    return (
      <>
        <Container>
          <h3> Class Component</h3>
          <Form>
              <FormGroup>
                <Input
                 onChange={this.handleSearch}
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
            paginate={this.handlePageChange}
          />
        </Container>
      </>
    )
  }
}

class Pagination extends Component {

  state = {
    page: 0,
    num:1
  };

  next = () => {
    if(this.state.page!==Math.ceil(this.props.totalData/this.props.dataPerPage)-10){
      this.setState((this.state.num)+10)
      this.setState((this.state.num)+10)
      return this.setState({ page: (this.state.page) + 10 });
    }
    else return this.state.page;
   }

    prev(){
    if(this.state.page!==0){
      this.setState((this.state.num)-10)
      this.setState((this.state.num)-10)
      console.log(this.state.num);
      return this.setState({ page: (this.state.page) - 10 });
    }
    return this.state.page
   }


  render() {
    const { dataPerPage, totalData, paginate } = this.props;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Container>
      <nav className="navbar-pagination">
        <ul className="pagination">
        <li className="page-item"><a onClick={this.prev} href="#" className="page-link">Prev</a></li>
          {
            pageNumbers.slice(this.state.page,this.state.page+10).map(number => (
              <li key={number} className='page-item'>
                <a onClick={() => paginate(number)} href="#" className="page-link">
                  {number}
                </a>
              </li>
            ))
          }
        <li className="page-item"><a onClick={this.next} href="#" className="page-link">Next</a></li>
        </ul>
      </nav>
      </Container>
    )
  }
}

export default ClassApp;