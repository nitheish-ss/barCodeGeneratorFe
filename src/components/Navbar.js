import Container from "react-bootstrap/Container";
import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { logout } from "../services/auth";
import { UserContext } from "../contexts/userContext";

function CustomNavbar() {
  const user = useContext(UserContext);
  console.log(user)
  return (
    <>
      {user && (
        <Navbar key={"sm"} bg="light" expand={"sm"} className="mb-3 navbar  mh-10vh sticky-top">
          <Container fluid>
            <Navbar.Brand href="#">Barcode-Generator</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${"sm"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                  Barcode-Generator
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/bulkUpload">BulkUpload</Nav.Link>
                  <Nav.Link href="/device">Add Device</Nav.Link>
                  <Nav.Link href="">Link</Nav.Link>
                  <button className="btn btn-secondary" onClick={logout}>
                    Logout
                  </button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default CustomNavbar;
