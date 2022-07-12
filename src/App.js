import "./App.css";
import DiaryEditor from "./component/DiaryEditor";
import DiaryList from "./component/DiaryList";
import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import axios from "axios";

// 1. 작성자 칸
// 2. 일기본문
// 3. 감정점수
// reducer(state , action)
const reducer = (state, action) => {
  switch (action.type) {
    case "ACTION_INIT": {
      return action.data;
    }
    case "ACTION_CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "ACTION_REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "ACTION_EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

// context API
// context 를 다른 공급처로 보내기 위해 export 해준다
// DiaryStateContext 공급자를 만들어준다(provider)
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
function App() {
  // const [data, setData] = useState([]);
  // useReducer(reducer , 빈배열 초기값)
  const [data, dispatch] = useReducer(reducer, []);

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
    dispatch({ type: "ACTION_INIT", data: initData });
  };

  // useEffect API 호출시 사용(데이터 가져오기 ,구독하기 등)
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  // onCreate 새로운 일기 추가 함수
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "ACTION_CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    // targetId 어떤 id를 갖고 있는 요소를 지우기 원하는지 매개변수로
    // filter() 함수를 이용해서 삭제 기능 구현 요소 아이템이 트루이면 유지하고 펄스이면 버린다
    dispatch({ type: "ACTION_REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "ACTION_EDIT", targetId, newContent });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);
  // useMemo 활용 return을 가지고 있는 함수를 연산들을 최적화 해준다
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const hadCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, hadCount, goodRatio };
  }, [data.length]);
  // data.length 가 변화하지 않는 이상 똑같은 리턴을 계산하지 않고 반환해준다.
  // useMemo는 함수가 아니라 값을 리턴해주므로 getDiaryAnalysis() 가 아니라 getDiaryAnalysis로 변경해줘야 한다.
  const { goodCount, hadCount, goodRatio } = getDiaryAnalysis;

  return (
    //공급자 컴포넌트
    // provider 에 value를 통해 공급 해준다
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatch}>
        <div>
          <DiaryEditor />
          <div>전체일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {hadCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
