import "./App.css";
import DiaryEditor from "./component/DiaryEditor";
import DiaryList from "./component/DiaryList";

// 1. 작성자 칸
// 2. 일기본문
// 3. 감정점수
const dummyList = [
  {
    id: 1,
    author: "신문수",
    content: "하이",
    emotion: 1,
    create_date: new Date().getTime(), //getTime() : date 객체를 밀리센컨트로 변환
  },
  {
    id: 2,
    author: "정유선",
    content: "하이1",
    emotion: 5,
    create_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "박하롬",
    content: "하이2",
    emotion: 3,
    create_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "김민서",
    content: "하이3",
    emotion: 2,
    create_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "하한이",
    content: "하이4",
    emotion: 4,
    create_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
