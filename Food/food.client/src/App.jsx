import './App.css';
import { useState, useEffect } from 'react'

function App() {
    
    let [title, SetTitle] = useState(['남자코드 추천', '강남 우동맛집', '파이썬독학']);
    let [content, SetContent] = useState(['2월 17일 발행', '2월 17일 발행', '2월 17일 발행']);
    
    let [like, SetLike] = useState([0, 0, 0]);
    
    return (
        <div className="App">
            <div className="black-nav">
                <h4>ReactBlog</h4>
            </div>
            <button onClick={() => {
                let copy = [...title];
                copy.sort();
                SetTitle(copy);
            }}>가나다순정렬</button>
            
            {title.map((item, index) => (
                <ContentList key={index}
                             index={index}
                             title={title}
                             content={content}
                             like={like}
                             SetLike={SetLike}/>
            ))}

            <Modal></Modal>
            
        </div>
    )
}

function ContentList({index, title, content, like, SetLike}) {
    let copy = [...like];
    
    return (
        <div className="list">
            <h4>{title[index]} <span onClick={() => { copy[index]++; SetLike(copy); }}>👍</span> {like[index]} </h4>
            <p>{content[index]}</p>
        </div>
    )
}

function Modal() {
    return (
        <div className="modal">
            <h4>제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    )
}

export default App;
