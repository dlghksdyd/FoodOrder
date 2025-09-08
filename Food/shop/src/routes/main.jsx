import {useState} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap'
import {useNavigate} from "react-router-dom";

function Main(props) {
    return (
        <div>
            <div className="main-bg"></div>

            <Container>
                <Row>
                    {props.shoes.map((shoe, index) => (
                        <Card key={index} shoe={shoe}/>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

function Card(props) {
    let navigate = useNavigate();
    
    return (
        <Col md={4} className="text-center">
            <img src={props.shoe.imgPath} width="80%" alt="" onClick={ () => navigate('detail/' + props.shoe.id)}/>
            <h5>{props.shoe.title}</h5>
            <p>{props.shoe.content}</p>
            <p>{props.shoe.price} 원</p>
        </Col>
    )
}

export default Main;