import React, { useEffect, useState } from 'react';
// React에서 useEffect와 useState를 가져옴. useEffect는 사이드 이펙트를 처리하고, useState는 상태 관리를 위해 사용.

import './Lent.css';
// CSS 파일을 가져와서 스타일링을 적용.

function Lent() {
  // Lent 컴포넌트를 정의. 대여 및 반납 데이터를 관리하고 표시하는 역할.
  const [borrowList, setBorrowList] = useState([]);
  // 대여 데이터를 저장하는 상태 변수. 초기값은 빈 배열.

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 훅. 데이터를 가져오는 역할.
    fetch('/backend/borrowList.json')
      // '/backend/borrowList.json' 경로에서 JSON 데이터를 가져옴. 경로는 프로젝트 환경에 맞게 수정 가능.
      .then((response) => {
        // fetch가 성공적으로 데이터를 가져오면 호출되는 콜백 함수.
        if (!response.ok) {
          // 응답이 성공적이지 않을 경우 에러를 던짐.
          throw new Error('Network response was not ok');
          // 네트워크 오류 메시지를 생성.
        }
        return response.json();
        // 응답 데이터를 JSON 형식으로 변환.
      })
      .then((data) => {
        // JSON 변환이 완료되면 호출되는 콜백 함수.
        setBorrowList(data.borrowInfo);
        // borrowInfo 배열을 borrowList 상태에 설정.
      })
      .catch((error) => {
        // fetch 과정에서 에러가 발생했을 때 처리.
        console.error('Error fetching borrow list JSON:', error);
        // 에러 메시지를 콘솔에 출력.
      });
  }, []);
  // 의존성 배열을 빈 배열로 설정. 컴포넌트가 처음 렌더링될 때 한 번만 실행.

  return (
    <div>
      <h1>대여 및 반납</h1>
      {/* 페이지 제목 */}
      <p>대여 및 반납 기록을 관리합니다.</p>
      {/* 설명 텍스트 */}

      {/* 대여 데이터를 테이블 형식으로 표시 */}
      <table border="1">
        {/* 테이블 생성. border 속성으로 테두리 추가. */}
        <thead>
          {/* 테이블 헤더 */}
          <tr>
            <th>학번</th>
            {/* 학번 컬럼 */}
            <th>노트북 이름</th>
            {/* 노트북 이름 컬럼 */}
            <th>파손 수</th>
            {/* 파손 수 컬럼 */}
            <th>대여 시작일</th>
            {/* 대여 시작일 컬럼 */}
          </tr>
        </thead>
        <tbody>
          {/* 테이블 본문 */}
          {borrowList.length > 0 ? (
            // borrowList 배열에 데이터가 있는 경우.
            borrowList.map((borrow, index) => (
              // borrowList 배열의 각 항목을 순회하며 렌더링.
              <tr key={index}>
                {/* 각 행에 고유 키로 index 사용. */}
                <td>{borrow.studentNumber}</td>
                {/* 학생 번호 표시 */}
                <td>{borrow.noteBookName}</td>
                {/* 노트북 이름 표시 */}
                <td>{borrow.brokenNum}</td>
                {/* 파손 수 표시 */}
                <td>{borrow.borrowStartDay}</td>
                {/* 대여 시작일 표시 */}
              </tr>
            ))
          ) : (
            // borrowList 배열이 비어 있는 경우.
            <tr>
              <td colSpan="4">대여 기록이 없습니다.</td>
              {/* 데이터가 없음을 알리는 메시지. colspan으로 네 컬럼 병합. */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Lent;
// Lent 컴포넌트를 내보내기. 다른 파일에서 임포트 가능.
