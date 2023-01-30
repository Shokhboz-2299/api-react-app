import React from "react";
import { Container, Table } from "reactstrap";


export class ClassApp extends React.Component {

  state = {
    comments: []
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => {
        this.setState({ comments: data })
      })
  }

  render() {
    return (
      <>
      <Container>
        <h3>With Class Component and fetch</h3>
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
              this.state.comments.map((comment) => (
            <tr>
              <th scope="row">{comment.id}</th>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
              ))
            };
          </tbody>
        </Table>
      </Container>
      </>
    )
  }
}

export default ClassApp;