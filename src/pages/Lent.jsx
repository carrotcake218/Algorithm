import React, { useEffect, useState } from 'react';
import './Lent.css';

function Lent() {
  const [borrowList, setBorrowList] = useState([]); // 대여 데이터를 저장하는 상태

  useEffect(() => {
    // JSON 데이터를 fetch로 가져옴
    fetch('/backend/borrowList.json') // JSON 파일 경로 (프로젝트에 맞게 수정)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBorrowList(data.borrowInfo); // borrowInfo 배열을 상태로 설정
      })
      .catch((error) => {
        console.error('Error fetching borrow list JSON:', error);
      });
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행되게 함

  return (
    <div>
      <h1>대여 및 반납</h1>
      <p>대여 및 반납 기록을 관리합니다.</p>

      {/* 대여 데이터를 테이블 형식으로 표시 */}
      <table border="1">
        <thead>
          <tr>
            <th>학번</th>
            <th>노트북 이름</th>
            <th>파손 수</th>
            <th>대여 시작일</th>
          </tr>
        </thead>
        <tbody>
          {borrowList.length > 0 ? (
            borrowList.map((borrow, index) => (
              <tr key={index}>
                <td>{borrow.studentNumber}</td>
                <td>{borrow.noteBookName}</td>
                <td>{borrow.brokenNum}</td>
                <td>{borrow.borrowStartDay}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">대여 기록이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Lent;
