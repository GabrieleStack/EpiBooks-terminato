
//COMPONENTE NAVBAR

import {Navbar, Nav, Container, InputGroup, Form} from 'react-bootstrap'



const MyNav = ({searchTerms, HandleSearch, showSearch}) => (
    <Navbar bg="dark" data-bs-theme="dark" style={{height:'70px'}}>
    <Container>
      <Navbar.Brand href="#">EpiBooks</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#">Home</Nav.Link>
        <Nav.Link href="#">About</Nav.Link>
        <Nav.Link href="#">Browse</Nav.Link>
      </Nav>
      {showSearch && ( 
      <InputGroup className="input mb-3">
        <InputGroup.Text className ="go" id="basic-addon1"><i className="bi bi-search"></i></InputGroup.Text>
        <Form.Control
          value={searchTerms}
          onChange={HandleSearch}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      )}
    </Container>
  </Navbar>
  
)

export default MyNav

