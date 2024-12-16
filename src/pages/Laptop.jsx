import React, { useEffect, useState } from 'react';
// React에서 useEffect와 useState를 가져옴. useEffect는 사이드 이펙트 처리, useState는 상태 관리를 위해 사용.

import './Laptop.css';
// CSS 파일을 가져와서 컴포넌트 스타일링을 적용.

function Laptop() {
  // Laptop 컴포넌트를 정의. 노트북 데이터를 관리하고 표시하는 역할.
  const [laptops, setLaptops] = useState([]);
  // 노트북 데이터를 저장하는 상태 변수. 초기값은 빈 배열.

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 실행되는 훅. 데이터를 가져오는 역할.
    fetch('/backend/noteBook.json')
      // '/backend/noteBook.json' 경로에서 JSON 데이터를 가져옴. 경로는 필요에 따라 수정 가능.
      .then((response) => {
        // fetch가 성공적으로 응답을 받으면 호출되는 콜백 함수.
        if (!response.ok) {
          // 응답 상태가 성공적이지 않을 경우 에러를 던짐.
          throw new Error('Network response was not ok');
          // 네트워크 오류 메시지 생성.
        }
        return response.json();
        // 응답 데이터를 JSON 형식으로 변환.
      })
      .then((data) => {
        // JSON 변환이 완료되면 호출되는 콜백 함수.
        setLaptops(data.noteBookInfo);
        // noteBookInfo 배열을 laptops 상태로 설정.
      })
      .catch((error) => {
        // fetch 과정에서 에러 발생 시 처리.
        console.error('Error fetching notebook JSON:', error);
        // 에러 메시지를 콘솔에 출력.
      });
  }, []);
  // 의존성 배열을 빈 배열로 설정. 컴포넌트가 처음 렌더링될 때 한 번만 실행됨.

  return (
    <div>
      <h1>노트북 관리</h1>
      {/* 페이지 제목 */}
      <p>대여용 노트북을 관리합니다.</p>
      {/* 설명 텍스트 */}

      {/* 노트북 데이터를 테이블 형식으로 표시 */}
      <table border="1">
        {/* 테이블 생성. border 속성으로 테두리를 추가. */}
        <thead>
          {/* 테이블 헤더 */}
          <tr>
            <th>노트북 모델</th>
            {/* 노트북 모델 컬럼 */}
            <th>파손 수</th>
            {/* 파손 수 컬럼 */}
          </tr>
        </thead>
        <tbody>
          {/* 테이블 본문 */}
          {laptops.length > 0 ? (
            // laptops 배열에 데이터가 있는 경우.
            laptops.map((laptop, index) => (
              // laptops 배열의 각 요소를 순회하며 렌더링.
              <tr key={index}>
                {/* 각 행에 고유 키로 index 사용. */}
                <td>{laptop.borrowNoteBook}</td>
                {/* 노트북 모델명을 표시. */}
                <td>{laptop.brokenNum}</td>
                {/* 파손 수를 표시. */}
              </tr>
            ))
          ) : (
            // laptops 배열이 비어 있는 경우.
            <tr>
              <td colSpan="2">노트북 데이터가 없습니다.</td>
              {/* 데이터가 없음을 알리는 메시지. colspan으로 두 컬럼 병합. */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Laptop;
// Laptop 컴포넌트를 내보내기. 다른 파일에서 임포트 가능.
