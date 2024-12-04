import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Report.css';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [borrowData, setBorrowData] = useState(null);
  const [overdueData, setOverdueData] = useState(null);
  const [laptopData, setLaptopData] = useState(null);

  useEffect(() => {
    // JSON 데이터 가져오기
    const studentData = [
      { studentNumber: 2171114, name: 'ParkJunMin', dueDateOverNumber: 2 },
      { studentNumber: 2171115, name: 'HongSungHwan', dueDateOverNumber: 5 },
      { studentNumber: 2071478, name: 'UmSaeYeon', dueDateOverNumber: 0 },
      { studentNumber: 2171117, name: 'ChaeSungJun', dueDateOverNumber: 3 },
    ];

    const noteBookData = [
      { studentNumber: 2171114, borrowCount: 7 },
      { studentNumber: 2171115, borrowCount: 10 },
      { studentNumber: 2071478, borrowCount: 3 },
      { studentNumber: 2171117, borrowCount: 8 },
    ];

    const laptopModels = [
      { borrowNoteBook: 'LenovaNoteBook', borrowCount: 15 },
      { borrowNoteBook: 'AppleNoteBook', borrowCount: 10 },
      { borrowNoteBook: 'SamsungNoteBook', borrowCount: 5 },
    ];

    // 대여 데이터 준비
    const borrowChartData = {
      labels: noteBookData.map(
        (entry) =>
          studentData.find((s) => s.studentNumber === entry.studentNumber)?.name
      ),
      datasets: [
        {
          label: '대여 횟수',
          data: noteBookData.map((entry) => entry.borrowCount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
    setBorrowData(borrowChartData);

    // 연체 데이터 준비
    const overdueChartData = {
      labels: studentData.map((entry) => entry.name),
      datasets: [
        {
          label: '연체 횟수',
          data: studentData.map((entry) => entry.dueDateOverNumber),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
    setOverdueData(overdueChartData);

    // 노트북 모델 대여 데이터 준비
    const laptopChartData = {
      labels: laptopModels.map((entry) => entry.borrowNoteBook),
      datasets: [
        {
          label: '노트북 대여 횟수',
          data: laptopModels.map((entry) => entry.borrowCount),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    };
    setLaptopData(laptopChartData);
  }, []);

  return (
    <div className="report-container">
      <h1>통계 및 보고서 관리</h1>
      <div className="charts-container">
        {borrowData && (
          <div>
            <h2>학생별 대여 횟수</h2>
            <Bar data={borrowData} />
          </div>
        )}
        {overdueData && (
          <div>
            <h2>학생별 연체 횟수</h2>
            <Bar data={overdueData} />
          </div>
        )}
        {laptopData && (
          <div>
            <h2>노트북 모델별 대여 횟수</h2>
            <Bar data={laptopData} />
          </div>
        )}
      </div>
      <div className="analysis-section">
        <h2>분석 결과</h2>
        <p>
          <strong>가장 많이 대여된 노트북 모델:</strong> LenovaNoteBook (15회)
        </p>
        <p>
          <strong>가장 많이 대여한 학생:</strong> HongSungHwan (10회)
        </p>
        <p>
          <strong>가장 연체를 많이 한 학생:</strong> HongSungHwan (5회)
        </p>
      </div>
      <div className="recommendation-section">
        <h2>개선 방향</h2>
        <ul>
          <li>연체율을 줄이기 위해 알림 시스템(문자, 이메일 등)을 도입.</li>
          <li>대여 빈도가 낮은 노트북 모델에 대한 할인 또는 프로모션 제공.</li>
          <li>
            학생들에게 대여 기록을 조회할 수 있는 기능을 추가하여 자발적인 관리
            유도.
          </li>
          <li>연체 횟수가 많은 학생에게 추가적인 사용 제한을 설정.</li>
        </ul>
      </div>
    </div>
  );
}

export default Report;
