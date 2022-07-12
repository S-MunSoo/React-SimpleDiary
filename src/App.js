import "./App.css";
import DiaryEditor from "./component/DiaryEditor";
import DiaryList from "./component/DiaryList";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
// 1. 작성자 칸
// 2. 일기본문
// 3. 감정점수
// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const url = "https://jsonplaceholder.typicode.com/comments";
    const res = await axios.get(url);
    console.log("res?", res.data);

    const initData = res.data.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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
