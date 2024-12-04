import React, { useEffect, useState } from 'react';
import './Blacklist.css';

function Blacklist() {
  const [blacklist, setBlacklist] = useState([]); // 블랙리스트 데이터를 저장하는 상태

  useEffect(() => {
    // JSON 데이터를 fetch로 가져옴
    fetch('/backend/blackList.json') // JSON 파일 경로
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBlacklist(data.blackListInfo); // blackListInfo 배열을 상태로 설정
      })
      .catch((error) => {
        console.error('Error fetching blacklist JSON:', error);
      });
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행되게 함

  return (
    <div>
      <div className="title">
        <h1>블랙리스트 학생 관리</h1>
        <p>3회 이상 체납된 학생 정보를 관리합니다.</p>
      </div>

      {/* 블랙리스트 데이터를 테이블 형식으로 표시 */}
      <table border="1">
        <thead>
          <tr>
            <th>학번</th>
            <th>제한 시작일</th>
            <th>대여 제한 기간(일)</th>
          </tr>
        </thead>
        <tbody>
          {blacklist.length > 0 ? (
            blacklist.map((student) => (
              <tr key={student.studentNumber}>
                <td>{student.studentNumber}</td>
                <td>{student.limitStartDay}</td>
                <td>{student.borrowLimitDay}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">블랙리스트 학생 데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Blacklist;
