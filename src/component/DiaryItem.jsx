import React from "react";

const DiaryItem = ({ item, onRemove }) => {
  console.log("item", item);
  return (
    <div className="Diary-item">
      <div className="info">
        <span>
          작성자 : {item.author} | 감정점수 : {item.emotion}
        </span>
        <br />
        <span className="date">
          {/* new Date().toLocaleString() 현재시각 */}
          {new Date(item.create_date).toLocaleString()}
        </span>
        <div className="content">{item.content}</div>
        <button
          onClick={() => {
            if (window.confirm(`${item.id}번째의 일기를 삭제 하시겠습니까?`)) {
              onRemove(item.id);
            }
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default DiaryItem;
