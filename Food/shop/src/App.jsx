import {useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import data from './data.jsx'

function App() {
    
    let [shoes] = useState(data);

    return (
        <div className="App">
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#cart">Cart</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="main-bg"></div>

            <Container>
                <Row>
                    {shoes.map((shoe, index) => (
                        <Col md={4} className="text-center">
                            <img src={shoe.imgPath} width="80%" alt=""/>
                            <h5>{shoe.title}</h5>
                            <p>{shoe.content}</p>
                            <p>{shoe.price} 원</p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default App