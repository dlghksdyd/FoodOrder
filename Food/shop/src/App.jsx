import {useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import MainPage from '@/routes/main.jsx'
import DetailPage from '@/routes/detail.jsx'
import data from "@/db/data.jsx";

function App() {
    let navigate = useNavigate();

    let [shoes] = useState(data);
    
    return (
        <div className="App">
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('')}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate('detail/0')}>Detail</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="" element={<MainPage shoes={shoes}/>}></Route>
                <Route path="detail/:id" element={<DetailPage shoes={shoes}/>}></Route>
            </Routes>
        </div>
    )
}

export default App