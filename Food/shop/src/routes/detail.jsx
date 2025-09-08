import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { Nav } from "react-bootstrap";
import '../App.css'

function Detail(props) {

    let {id} = useParams();
    let [tabCon, setTabCon] = useState(0);
    const [fade, setFade] = useState("end");   // 시작은 보이는 상태
    const [pending, setPending] = useState(null);

    const requestTab = (next) => {
        if (next === tabCon) return;  // 같은 탭이면 무시
        setPending(next);             // 바꿀 탭 저장
        setFade("");                  // 페이드아웃 시작 (opacity: 0)
    };

    const handleTransitionEnd = () => {
        // 페이드아웃이 끝났다면 내용 교체 후 페이드인
        if (fade === "" && pending !== null) {
            setTabCon(pending);
            setPending(null);
            setFade("end")
            // 다음 페인트에서 end 추가 → 페이드인
            // requestAnimationFrame(() => setFade("end"));
        }
    };
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={props.shoes[id].imgPath} width="100%"></img>
                </div>
                <div className="col-md-6 mt-4 text-center">
                    <h4 className="p-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price} 원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
            
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => requestTab(0)}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => requestTab(1)}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => requestTab(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <div className={`start ${fade}`} onTransitionEnd={handleTransitionEnd}>
                <TabContent tabCon={tabCon}/>
            </div>
            
        </div>
    )
}

function TabContent(props) {
    if (props.tabCon === 0) {
        return (<div>내용0</div>)
    }
    else if (props.tabCon === 1) {
        return (<div>내용1</div>)
    }
    else if (props.tabCon === 2) {
        return (<div>내용2</div>)
    }
}

export default Detail;