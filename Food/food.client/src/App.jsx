import './App.css';
import {useState, useEffect} from 'react'

function App() {
    
    let [id, setId] = useState([3, 2, 1]);
    let [title, setTitle] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
    let [date, setDate] = useState(['2월 17일', '2월 17일', '2월 17일']);
    let [content, setContent] = useState(['남자코드입니다.', '왕우동 맛있어요', '파이썬독학실패']);
    
    let [newTitle, setNewTitle] = useState('');
    let [newContent, setNewContent] = useState('');

    function renameTitle(index)
    {
        let copy = title.map(x => x);
        if (copy[index] === '남자코트 추천') {
            copy[index] = '여자코트 추천';
            setTitle(copy);
        }
    }
    
    function addItem() {
        let idCopy = [id.length + 1, ...id];
        let titleCopy = [newTitle, ...title];
        let contentCopy = [newContent, ...newContent];
        let newDate = new Date().getMonth() + '월' + (new Date().getDay()) + '일';
        let dateCopy = [newDate, ...date];

        setId(idCopy);
        setTitle(titleCopy);
        setContent(contentCopy);
        setDate(dateCopy);
    }
    
    function deleteItem(deleteIdx) {
        let newId = id.filter((_, idx) => idx !== deleteIdx);
        let newTitle = title.filter((_, idx) => idx !== deleteIdx);
        let newDate = date.filter((_, idx) => idx !== deleteIdx);
        let newContent = content.filter((_, idx) => idx !== deleteIdx);
        
        setId(newId);
        setTitle(newTitle);
        setDate(newDate);
        setContent(newContent);
    }
    
    return (
        <div className="App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <button onClick={() => {
                let copy = [...title];
                copy.sort();
                setTitle(copy);
            }}>가나다순정렬
            </button>

            {title.map((item, index) => (
                <ContentList key={id[index]} index={index} title={title[index]} date={date[index]} content={content[index]} renameTitle={renameTitle} deleteItem={deleteItem} />
            ))}
            <p align="center">
                글제목<input onChange={(e) => { setNewTitle(e.target.value);}}></input><br/>
                글내용<input onChange={(e) => { setNewContent(e.target.value);}}></input><br/>
                <button onClick={() => { addItem()}}>글쓰기</button>
            </p>
        </div>
    )
}

function ContentList(props) {
    let [modal, SetModal] = useState(false);
    let [like, SetLike] = useState(0);
    
    return (
        <div className="list">
            <h4>
                <span onClick={() => SetModal(!modal)}>{props.title}</span><span onClick={() => {SetLike(like + 1);}}>👍</span>{like}
                <button onClick={() => props.deleteItem(props.index)}>글삭제</button>
            </h4>
            <p>{props.date}</p>
            <p>{props.content}</p>
            {modal ? <Modal index={props.index} title={props.title} date={props.date} content={props.content} renameTitle={props.renameTitle}/> : null}
        </div>
    )
}

function Modal(props) {
    return (
        <div className="modal">
            <h4>{props.title}</h4>
            <p>{props.date}</p>
            <p>{props.content}</p>
            <button onClick={() => props.renameTitle(props.index)}>글수정</button>
        </div>
    )
}

export default App;
