import "./App.css";
import DiaryEditor from "./component/DiaryEditor";
import DiaryList from "./component/DiaryList";
import { useState, useRef } from "react";
// 1. 작성자 칸
// 2. 일기본문
// 3. 감정점수

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  // onCreate 새로운 일기 추가 함수
  const onCreate = (author, content, emotion) => {
    const created_data = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_data,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  const onRemove = (targetId) => {
    // targetId 어떤 id를 갖고 있는 요소를 지우기 원하는지 매개변수로
    // filter() 함수를 이용해서 삭제 기능 구현 요소 아이템이 트루이면 유지하고 펄스이면 버린다
    const newDiaryList = data.filter((item) => item.id !== targetId);
    console.log(newDiaryList);
    setData(newDiaryList);
  };
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };
  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
