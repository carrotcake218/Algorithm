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

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Data() {
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
    <div>
      <h1>통계 관리</h1>
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
  );
}

export default Data;
