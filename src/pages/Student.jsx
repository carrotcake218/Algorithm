import React, { useEffect, useState } from 'react';
import './Student.css';

function Student() {
  const [students, setStudents] = useState([]); // 학생 데이터를 저장하는 상태
  const [studentNumber, setStudentNumber] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dueDateOverCheck, setDueDateOverCheck] = useState('');

  useEffect(() => {
    // JSON 데이터를 fetch로 가져옴
    fetch('/backend/studentData.json') // 수정된 경로
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data.studentInfo); // studentInfo 배열을 상태로 설정
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행되게 함

  // 학생 추가 처리 함수
  const handleAddStudent = async (e) => {
    e.preventDefault();
    const newStudent = {
      studentNumber,
      name,
      phoneNumber,
      dueDateOverCheck,
    };

    // POST 요청으로 백엔드에 데이터를 전송
    await fetch('/backend/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });

    // 폼 초기화
    setStudentNumber('');
    setName('');
    setPhoneNumber('');
    setDueDateOverCheck('');

    // 학생 리스트 다시 가져오기
    fetch('/backend/studentData.json')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.studentInfo); // studentInfo 배열을 상태로 설정
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });
  };

  return (
    <div>
      <div className="title">
        <h1>대여 학생 관리</h1>
        <p>노트북을 대여한 학생 정보를 관리합니다.</p>
      </div>

      {/* 학생 데이터를 테이블 형식으로 표시 */}
      <table border="1">
        <thead>
          <tr>
            <th>학번</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>연체 횟수</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.studentNumber}>
                <td>{student.studentNumber}</td>
                <td>{student.name}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.dueDateOverCheck}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">학생 데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
