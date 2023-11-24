import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const today = new Date();
  const currentFullYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const currentDayOfWeek = daysOfWeek[today.getDay()];

  const [tableData, setTableData] = useState([
    ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"],
    ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"],
    ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"],
  ]);

  const [editableCell, setEditableCell] = useState(null);

  const handleCellClick = (rowIndex, colIndex) => {
    setEditableCell({ rowIndex, colIndex });
  };

  const handleCellBlur = () => {
    setEditableCell(null);
  };

  const handleCellChange = (event) => {
    const { rowIndex, colIndex } = editableCell;
    const newData = [...tableData];
    newData[rowIndex][colIndex] = event.target.value;
    setTableData(newData);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 엔터 키의 기본 동작(새 줄 추가)을 막음
      handleCellBlur(); // blur 처리
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (editableCell) {
      inputRef.current.focus();
    }
  }, [editableCell]);

  return (
    <div className="App">
      <div className="Date">
        <h2>
          {currentFullYear}년 {currentMonth}월 {currentDate}일(
          {currentDayOfWeek})
        </h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>고객명</th>
            <th>상품명</th>
            <th>단가</th>
            <th>수량</th>
            <th>상품명</th>
            <th>단가</th>
            <th>수량</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {editableCell?.rowIndex === rowIndex &&
                  editableCell?.colIndex === colIndex ? (
                    <input
                      ref={inputRef}
                      type="text"
                      value={cell}
                      onChange={handleCellChange}
                      onKeyDown={handleKeyDown}
                      onBlur={handleCellBlur}
                      className="ChangingText"
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
