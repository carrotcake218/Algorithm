import React, { useEffect, useState } from 'react'; 
// React의 useEffect와 useState 훅을 가져옴. useEffect는 사이드 이펙트를 처리하고, useState는 컴포넌트 상태를 관리함.
import './Blacklist.css'; 
// CSS 파일을 가져와서 컴포넌트의 스타일링을 적용.

function Blacklist() { 
  // Blacklist 컴포넌트를 정의. 이 컴포넌트는 블랙리스트 데이터를 렌더링.
  const [blacklist, setBlacklist] = useState([]); 
  // 블랙리스트 데이터를 저장하는 상태 변수. 초기값은 빈 배열.

  useEffect(() => { 
    // 컴포넌트가 렌더링될 때 한 번 실행되는 훅. 데이터를 가져오는 역할.
    fetch('/backend/blackList.json') 
    // '/backend/blackList.json' 경로에서 JSON 데이터를 가져옴.
      .then((response) => { 
        // fetch가 성공적으로 데이터를 가져오면 호출되는 콜백 함수.
        if (!response.ok) { 
          // 응답이 성공적인지 확인. 실패 시 에러를 발생시킴.
          throw new Error('Network response was not ok'); 
          // 네트워크 응답이 정상이 아닐 경우 에러 메시지를 던짐.
        }
        return response.json(); 
        // 응답 데이터를 JSON 형태로 변환.
      })
      .then((data) => { 
        // JSON 변환이 완료되면 호출되는 콜백 함수.
        setBlacklist(data.blackListInfo); 
        // JSON 데이터 중 blackListInfo 배열을 상태 변수에 저장.
      })
      .catch((error) => { 
        // fetch 과정에서 에러가 발생했을 때 처리.
        console.error('Error fetching blacklist JSON:', error); 
        // 에러 메시지를 콘솔에 출력.
      });
  }, []); 
  // 빈 배열을 의존성 배열로 설정. 컴포넌트가 처음 렌더링될 때만 실행되도록 함.

  return (
    <div> 
      {/* 전체 컴포넌트를 감싸는 div */}
      <div className="title"> 
        {/* 제목과 설명을 포함하는 영역 */}
        <h1>블랙리스트 학생 관리</h1> 
        {/* 제목 */}
        <p>3회 이상 체납된 학생 정보를 관리합니다.</p> 
        {/* 설명 */}
      </div>

      {/* 블랙리스트 데이터를 테이블 형식으로 표시 */}
      <table border="1"> 
        {/* 테이블 생성. border 속성으로 테두리 추가 */}
        <thead> 
          {/* 테이블 헤더 영역 */}
          <tr> 
            {/* 헤더 행 */}
            <th>학번</th> 
            {/* 학번 컬럼 */}
            <th>제한 시작일</th> 
            {/* 제한 시작일 컬럼 */}
            <th>대여 제한 기간(일)</th> 
            {/* 대여 제한 기간 컬럼 */}
          </tr>
        </thead>
        <tbody> 
          {/* 테이블 본문 */}
          {blacklist.length > 0 ? ( 
            // 블랙리스트 데이터가 있을 경우.
            blacklist.map((student) => ( 
              // blacklist 배열의 각 요소를 순회하며 렌더링.
              <tr key={student.studentNumber}> 
                {/* 각 학생 데이터를 표시하는 행. 고유 키로 studentNumber 사용 */}
                <td>{student.studentNumber}</td> 
                {/* 학생 번호 표시 */}
                <td>{student.limitStartDay}</td> 
                {/* 제한 시작일 표시 */}
                <td>{student.borrowLimitDay}</td> 
                {/* 대여 제한 기간 표시 */}
              </tr>
            ))
          ) : (
            // 블랙리스트 데이터가 없을 경우.
            <tr>
              <td colSpan="3">블랙리스트 학생 데이터가 없습니다.</td> 
              {/* 데이터가 없음을 알리는 메시지. colspan으로 셀 병합 */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Blacklist; 
// Blacklist 컴포넌트를 내보내기. 다른 파일에서 임포트 가능.
