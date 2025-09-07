import {useState, useEffect} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Form} from 'react-bootstrap'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainPage from '@/routes/main.jsx'
import DetailPage from '@/routes/detail.jsx'
import axios from 'axios'

function App() {
    let navigate = useNavigate();
    let [shoes, setShoes] = useState([]);

    useEffect(() => {
        // API 호출
        axios.get("/postgresql/shoes")
            .then((res) => {
                setShoes(res.data); // 서버에서 가져온 shoes 데이터를 state에 저장
            })
            .catch((err) => {
                console.error("API 호출 에러:", err);
            });
    }, []); // 컴포넌트 mount 시 1번 실행
    
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