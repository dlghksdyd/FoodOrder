import {useParams} from "react-router-dom";

function Detail(props) {

    let {id} = useParams();
    
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
        </div>
    )
}

export default Detail;