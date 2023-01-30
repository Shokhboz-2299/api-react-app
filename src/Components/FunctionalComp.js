import { useState, useEffect } from "react"
import { Container, Table } from "reactstrap"
import axios from "axios"

export function FunctionalApp() {

  const [comments, setComments] = useState([])
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
    .then(res => {
      setComments(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])
  return (
    <>
     <Container>
      <h3>With Functional Component and axios</h3>
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
                comments.map((comment) => (
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