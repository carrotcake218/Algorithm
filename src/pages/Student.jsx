import React, { useEffect, useState } from 'react';
// React에서 useEffect와 useState를 가져옴. useEffect는 사이드 이펙트를 처리하고, useState는 상태 관리를 위해 사용.

import './Student.css';
// CSS 파일을 가져와서 스타일링을 적용.

function Student() {
  // Student 컴포넌트를 정의. 학생 데이터를 관리하고 표시하는 역할.
  const [students, setStudents] = useState([]);
  // 학생 데이터를 저장하는 상태 변수. 초기값은 빈 배열.
  const [studentNumber, setStudentNumber] = useState('');
  // 학번 입력 값을 저장하는 상태.
  const [name, setName] = useState('');
  // 이름 입력 값을 저장하는 상태.
  const [phoneNumber, setPhoneNumber] = useState('');
  // 전화번호 입력 값을 저장하는 상태.
  const [dueDateOverCheck, setDueDateOverCheck] = useState('');
  // 연체 횟수 입력 값을 저장하는 상태.

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 훅. 데이터를 가져오는 역할.
    fetch('/backend/studentData.json')
      // '/backend/studentData.json' 경로에서 JSON 데이터를 가져옴. 경로는 프로젝트 환경에 맞게 수정 가능.
      .then((response) => {
        // fetch가 성공적으로 응답을 받으면 호출되는 콜백 함수.
        if (!response.ok) {
          // 응답 상태가 성공적이지 않을 경우 에러를 던짐.
          throw new Error('Network response was not ok');
          // 네트워크 오류 메시지를 생성.
        }
        return response.json();
        // 응답 데이터를 JSON 형식으로 변환.
      })
      .then((data) => {
        // JSON 변환이 완료되면 호출되는 콜백 함수.
        setStudents(data.studentInfo);
        // studentInfo 배열을 students 상태로 설정.
      })
      .catch((error) => {
        // fetch 과정에서 에러 발생 시 처리.
        console.error('Error fetching JSON:', error);
        // 에러 메시지를 콘솔에 출력.
      });
  }, []);
  // 의존성 배열을 빈 배열로 설정. 컴포넌트가 처음 렌더링될 때 한 번만 실행.

  const handleAddStudent = async (e) => {
    // 학생 추가를 처리하는 함수.
    e.preventDefault();
    // 폼 제출 기본 동작을 방지.
    const newStudent = {
      // 새로운 학생 데이터를 객체로 생성.
      studentNumber,
      name,
      phoneNumber,
      dueDateOverCheck,
    };

    await fetch('/backend/addStudent', {
      // POST 요청으로 백엔드에 데이터를 전송.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
      // JSON 형태로 데이터 변환 후 요청 본문에 포함.
    });

    setStudentNumber('');
    // 학번 입력 필드 초기화.
    setName('');
    // 이름 입력 필드 초기화.
    setPhoneNumber('');
    // 전화번호 입력 필드 초기화.
    setDueDateOverCheck('');
    // 연체 횟수 입력 필드 초기화.

    fetch('/backend/studentData.json')
      // 학생 리스트를 다시 가져옴.
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.studentInfo);
        // studentInfo 배열을 students 상태로 설정.
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
        // 에러 발생 시 처리.
      });
  };

  return (
    <div>
      <div className="title">
        <h1>대여 학생 관리</h1>
        {/* 페이지 제목 */}
        <p>노트북을 대여한 학생 정보를 관리합니다.</p>
        {/* 설명 텍스트 */}
      </div>

      {/* 학생 데이터를 테이블 형식으로 표시 */}
      <table border="1">
        {/* 테이블 생성. border 속성으로 테두리 추가. */}
        <thead>
          {/* 테이블 헤더 */}
          <tr>
            <th>학번</th>
            {/* 학번 컬럼 */}
            <th>이름</th>
            {/* 이름 컬럼 */}
            <th>전화번호</th>
            {/* 전화번호 컬럼 */}
            <th>연체 횟수</th>
            {/* 연체 횟수 컬럼 */}
          </tr>
        </thead>
        <tbody>
          {/* 테이블 본문 */}
          {students.length > 0 ? (
            // students 배열에 데이터가 있는 경우.
            students.map((student) => (
              // students 배열의 각 항목을 순회하며 렌더링.
              <tr key={student.studentNumber}>
                {/* 각 행에 고유 키로 studentNumber 사용. */}
                <td>{student.studentNumber}</td>
                {/* 학생 번호 표시 */}
                <td>{student.name}</td>
                {/* 이름 표시 */}
                <td>{student.phoneNumber}</td>
                {/* 전화번호 표시 */}
                <td>{student.dueDateOverCheck}</td>
                {/* 연체 횟수 표시 */}
              </tr>
            ))
          ) : (
            // students 배열이 비어 있는 경우.
            <tr>
              <td colSpan="4">학생 데이터가 없습니다.</td>
              {/* 데이터가 없음을 알리는 메시지. colspan으로 네 컬럼 병합. */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
// Student 컴포넌트를 내보내기. 다른 파일에서 임포트 가능.
