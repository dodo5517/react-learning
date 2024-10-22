import React, {useState} from 'react';
import './App.css';

function App() {

  let [title, setTitle] = useState<string[]>(['남자코트 추천', '여자코트 추천','맛집'])
  let [good, setGood] = useState(new Array(title.length).fill(0)); //[title.length].fill(0) 이렇게 하면 그냥 [3].(0)과 같음.
  let [modal,setmodal] = useState(false);
  let [select, setselect] = useState<number>(0);
  let [inputValue, setinputValue] = useState<string>('');

  return (
      <div className="App">
        <button onClick={() => {
          let copy = [...title];
          copy.sort();
          setTitle(copy);
        }}>가나다정렬</button>

        {
            title.map(function(_,i){ //사용하지 않는 파라미터는 _으로 표시함.
            return (
                //작업관리자 화면에서는 왜 key가 안 보이지..?
                <div className="list" key={i}>
                  <h4 onClick={()=>{
                      setmodal(!modal); //modal === false ? setmodal(true):setmodal(false);을 간결하게 적을 수 있음.
                      setselect(i);}
                  }>{title[i]}
                      <span onClick={(e)=>{
                          e.stopPropagation(); //이벤트 버블링 막아줌.
                          let copyGood = [...good]; //state 변경할거니까 copy함.
                          copyGood[i] = copyGood[i] + 1; //copyGood의 i배열의 값에 +1 함.
                          setGood(copyGood); //copyGood을 good에 덮음.
                  }}>굿</span> {good[i]}
                  </h4>
                      <button onClick={()=>{
                          let copy = [...title];
                          copy.splice(i,1);
                          setTitle(copy);
                      }}>삭제</button>

                </div>
            )
          })
        }
        <div>
          <input onChange={(e)=>{
              setinputValue(e.target.value);
              console.log(inputValue);
          }}/>
            <button onClick={()=>{
                 let newTitle:string[] = [...title];
                 newTitle.unshift(inputValue);
                 setTitle(newTitle);
                console.log(title);
            }}>글 추가</button>
        </div>

        {
            modal && <Modal select={select} color="yellow" title={title} setTitle={setTitle} good={good}></Modal>
            //어차피 true일 때만 실행하고 modal은 자체가 true/false이기 때문에 밑의 코드를 &&연산자를 사용하도록 수정함.
            //modal === true ? <Modal  select = {select} color = "yellow" title = {title} setTitle = {setTitle} good = {good}/> : null
        }

      </div>
  );
}

interface ModalProps { // props에 대한 인터페이스 정의
    select: number;
    title: string[]; // 문자열 배열
    setTitle: React.Dispatch<React.SetStateAction<string[]>>; //typeScript에서 상태변형 함수의 데이터 타입.
    good: number[]; // 정수형 배열
    color: string;
}

function Modal(props: ModalProps) {
  return (
          <div style={{background: props.color}} key={props.select}>
                  <h4>{props.title[props.select]}</h4>
                  <p>날짜</p>
                  <p>{props.good[props.select]}</p>
                  <p>상세내용</p>
          </div>
  )
}


export default App;
