import React, { useEffect, useState } from 'react';
// React에서 useEffect와 useState를 가져옴. 상태 관리와 컴포넌트 사이드 이펙트를 처리하기 위해 사용.

import { Bar } from 'react-chartjs-2';
// Chart.js의 Bar 차트를 사용하기 위한 컴포넌트를 가져옴.

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Chart.js의 모듈을 가져옴. 차트의 스케일, 요소, 툴팁 등을 설정하기 위해 필요.

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// Chart.js의 플러그인을 등록. 차트 구성 요소를 사용할 수 있도록 설정.

function Data() {
  // Data 컴포넌트를 정의. 통계 데이터를 렌더링.
  const [borrowData, setBorrowData] = useState(null);
  // 학생별 대여 횟수를 저장할 상태.
  const [overdueData, setOverdueData] = useState(null);
  // 학생별 연체 횟수를 저장할 상태.
  const [laptopData, setLaptopData] = useState(null);
  // 노트북 모델별 대여 횟수를 저장할 상태.

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 사이드 이펙트. 데이터 준비.
    const studentData = [
      { studentNumber: 2171114, name: 'ParkJunMin', dueDateOverNumber: 2 },
      { studentNumber: 2171115, name: 'HongSungHwan', dueDateOverNumber: 5 },
      { studentNumber: 2071478, name: 'UmSaeYeon', dueDateOverNumber: 0 },
      { studentNumber: 2171117, name: 'ChaeSungJun', dueDateOverNumber: 3 },
    ];
    // 학생 데이터. 학번, 이름, 연체 횟수를 포함.

    const noteBookData = [
      { studentNumber: 2171114, borrowCount: 7 },
      { studentNumber: 2171115, borrowCount: 10 },
      { studentNumber: 2071478, borrowCount: 3 },
      { studentNumber: 2171117, borrowCount: 8 },
    ];
    // 학생별 노트북 대여 데이터. 학번과 대여 횟수를 포함.

    const laptopModels = [
      { borrowNoteBook: 'LenovaNoteBook', borrowCount: 15 },
      { borrowNoteBook: 'AppleNoteBook', borrowCount: 10 },
      { borrowNoteBook: 'SamsungNoteBook', borrowCount: 5 },
    ];
    // 노트북 모델별 대여 데이터. 모델명과 대여 횟수를 포함.

    const borrowChartData = {
      labels: noteBookData.map(
        (entry) =>
          studentData.find((s) => s.studentNumber === entry.studentNumber)?.name
      ),
      // 학생 이름을 라벨로 설정. 학번을 기준으로 studentData에서 이름을 매칭.
      datasets: [
        {
          label: '대여 횟수',
          data: noteBookData.map((entry) => entry.borrowCount),
          // 대여 횟수를 데이터로 설정.
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          // 데이터 막대의 배경색 설정.
        },
      ],
    };
    setBorrowData(borrowChartData);
    // 학생별 대여 데이터를 상태에 저장.

    const overdueChartData = {
      labels: studentData.map((entry) => entry.name),
      // 학생 이름을 라벨로 설정.
      datasets: [
        {
          label: '연체 횟수',
          data: studentData.map((entry) => entry.dueDateOverNumber),
          // 연체 횟수를 데이터로 설정.
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          // 데이터 막대의 배경색 설정.
        },
      ],
    };
    setOverdueData(overdueChartData);
    // 학생별 연체 데이터를 상태에 저장.

    const laptopChartData = {
      labels: laptopModels.map((entry) => entry.borrowNoteBook),
      // 노트북 모델명을 라벨로 설정.
      datasets: [
        {
          label: '노트북 대여 횟수',
          data: laptopModels.map((entry) => entry.borrowCount),
          // 모델별 대여 횟수를 데이터로 설정.
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          // 데이터 막대의 배경색 설정.
        },
      ],
    };
    setLaptopData(laptopChartData);
    // 노트북 모델 데이터를 상태에 저장.
  }, []);
  // 의존성 배열을 빈 배열로 설정. 컴포넌트가 처음 렌더링될 때 한 번만 실행.

  return (
    <div>
      <div className="datadata">
        {/* 통계 데이터를 감싸는 div */}
        <h1>통계 관리</h1>
        {/* 페이지 제목 */}
        {borrowData && (
          <div>
            {/* 대여 횟수 데이터를 렌더링 */}
            <h2>학생별 대여 횟수</h2>
            <Bar data={borrowData} />
            {/* Chart.js Bar 차트를 사용해 대여 횟수 시각화 */}
          </div>
        )}
        {overdueData && (
          <div>
            {/* 연체 횟수 데이터를 렌더링 */}
            <h2>학생별 연체 횟수</h2>
            <Bar data={overdueData} />
            {/* Chart.js Bar 차트를 사용해 연체 횟수 시각화 */}
          </div>
        )}
        {laptopData && (
          <div>
            {/* 노트북 모델별 대여 횟수 데이터를 렌더링 */}
            <h2>노트북 모델별 대여 횟수</h2>
            <Bar data={laptopData} />
            {/* Chart.js Bar 차트를 사용해 모델별 대여 횟수 시각화 */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Data;
// Data 컴포넌트를 내보내기. 다른 파일에서 임포트 가능.
