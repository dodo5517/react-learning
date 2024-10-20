import React, {useState} from 'react';
import './App.css';

function App() {

  let [title, setTitle] = useState<string[]>(['남자코트 추천', '여자코트 추천','맛집'])
  let [good, setGood] = useState([title.length].fill(0));
  let [modal,setmodal] = useState(false);

  return (
      <div className="App">
        <button onClick={() => {
          let copy = [...title];
          copy.sort();
          setTitle(copy);
        }}>가나다정렬</button>

        {
            title.map(function(a,i){
            return (
                <div className="list" key={i}>
                  <h4 onClick={()=>{
                    modal == false ? setmodal(true):setmodal(false);}
                  }>{title[i]} </h4>
                  <span onClick={()=>{
                    let copyGood = [...good]; //state 변경할거니까 copy함.
                    copyGood[i] = copyGood[i] + 1; //copyGood의 i배열의 값에 +1 함.
                    setGood(copyGood); //copyGood을 good에 덮음.
                  }}>굿</span>{good[i]}
                </div>
            )
          })
        }

        {
          modal == true ? <Modal color = "yellow" title = {title} 글제목변경 = {setTitle} good = {good}/> : null
        }

      </div>
  );
}

interface ModalProps { // props에 대한 인터페이스 정의
    title: string[]; // 문자열 배열
    setTitle: React.Dispatch<React.SetStateAction<string[]>>; //typeScript에서 상태변형 함수의 데이터 타입.
  good: number[]; // 정수형 배열
  color: string;
}

function Modal(props: ModalProps) {
  // return (
  //         <div style={{background: props.color}}>
  //               <div key={i}>
  //                 <h4>{props.title[i]}</h4>
  //                 <p>날짜</p>
  //                 <p>{props.good[i]}</p>
  //                 <p>상세내용</p>
  //               </div>
  //         </div>
  // )
}
export default App;
