import React from "react";
import { useState, useRef } from "react";

const DiaryItem = ({ item, onRemove, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false); // 수정하기 isEdit가 트루이면 수정항목이 나타난다
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const [localContent, setLocalContent] = useState(item.content); // 수정 컨텐츠 수정하기 이전 자동 기본값 설정 item.content

  const localContentInput = useRef();

  // confirm = alert 기능
  const handleOnRemove = () => {
    if (window.confirm(`${item.id}번째의 일기를 삭제 하시겠습니까?`)) {
      onRemove(item.id);
    }
  };
  const handleQuoitEdit = () => {
    setIsEdit(false);
    setLocalContent(item.content);
  };
  const handleOnEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${item.id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(item.id, localContent);
      toggleIsEdit();
    }
  };
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

        <div className="content">
          {isEdit === true ? (
            <div>
              {/* toggleIsEdit 호출시 삼항연산자로 수정 textarea 컨텐츠를 화면에 띄운다 */}
              <textarea
                ret={localContentInput}
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
              />
            </div>
          ) : (
            <div>{item.content}</div>
          )}
        </div>
        {isEdit ? (
          <div>
            <button onClick={handleQuoitEdit}>수정 취소</button>
            <button onClick={handleOnEdit}>수정 완료</button>
          </div>
        ) : (
          <div>
            <button onClick={handleOnRemove}>삭제</button>
            <button onClick={toggleIsEdit}>수정</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiaryItem;
