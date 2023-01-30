import { Container, Table } from "reactstrap"

export function FunctionalApp({comments, loading}) {
  if(loading){
    return <h2>...Loading</h2>
  }
  return (
    <>
     <Container>
      <h3>With Functional Component</h3>
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
      </Container>
    </>
  )
}