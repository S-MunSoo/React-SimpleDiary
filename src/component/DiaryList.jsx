import React from "react";
import DiaryItem from "./DiaryItem";
import { useContext } from "react";
import { DiaryStateContext } from "../App";
const DiaryList = () => {
  // useContext provider를 통해 내보낸지 공급을 받아 올 수 있다
  const diaryList = useContext(DiaryStateContext);

  return (
    <div className="Diary-list">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* warning 에러 : index 배열 함수에 고유한 id값이 없을 경우에는 콜백함수에 index를
        사용해도 된다. */}
        {diaryList.map((it, index) => (
          <DiaryItem
            key={it.id}
            // item={item}
            {...it}
          />
        ))}
      </div>
    </div>
  );
};

// DiaryList.defaultProps 는 언디파인으로 전달 될 것 같은 프롭스를 기본값으로 초기 설정 해준다.
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
