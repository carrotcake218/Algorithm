import React, { useEffect, useState } from 'react';
import './Laptop.css';

function Laptop() {
  const [laptops, setLaptops] = useState([]); // 노트북 데이터를 저장하는 상태

  useEffect(() => {
    // JSON 데이터를 fetch로 가져옴
    fetch('/backend/noteBook.json') // JSON 파일 경로 (필요에 따라 수정)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLaptops(data.noteBookInfo); // noteBookInfo 배열을 상태로 설정
      })
      .catch((error) => {
        console.error('Error fetching notebook JSON:', error);
      });
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행되게 함

  return (
    <div>
      <h1>노트북 관리</h1>
      <p>대여용 노트북을 관리합니다.</p>

      {/* 노트북 데이터를 테이블 형식으로 표시 */}
      <table border="1">
        <thead>
          <tr>
            <th>노트북 모델</th>
            <th>파손 수</th>
          </tr>
        </thead>
        <tbody>
          {laptops.length > 0 ? (
            laptops.map((laptop, index) => (
              <tr key={index}>
                <td>{laptop.borrowNoteBook}</td>
                <td>{laptop.brokenNum}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">노트북 데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Laptop;
