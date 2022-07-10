import React from "react";
import { useState } from "react";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("저장 성공");
  };
  return (
    <div className="Diary-Editor">
      <h2>To day 일기장</h2>
      <div>
        <input
          name="author"
          type="text"
          value={state.author}
          onChange={handleChangeState}
        />
        {/* onChange: 값이 바뀔때 수행하는 이벤트  */}
        <div>
          <textarea
            name="content"
            value={state.content}
            onChange={handleChangeState}
          />
          {/*  textarea : 여러줄 입력 가능  = input*/}
        </div>
        <div>
          오늘의 감정 점수 :
          <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeState}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장</button>
      </div>
    </div>
  );
};

export default DiaryEditor;