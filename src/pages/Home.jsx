import React from 'react';
import './Home.css'; // 스타일 파일 포함
import airplaneImage from '../image/헤더 이미지.jpg';

function LaptopLoanInfo() {
  return (
    <div className="laptop-loan-info-container">
      <div className="laptop-loan-info">
        <h1>노트북 대여안내</h1>
        <h4>
          통합기자재실에서 장소: 상상관 309호에서는 본교 재학생을 대상으로
          노트북을 대여가 가능합니다.
        </h4>

        <h1>대여신청 및 반납</h1>

        <h4>
          본교 재학생만 대여가 가능합니다. (대여시 학생증, 신분증 지참 필수)
        </h4>

        <h1>대여 및 반납 시간</h1>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>학기 중</th>
              <th>방학 중</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>평일</td>
              <td>09:00 ~ 20:30</td>
              <td>10:00 ~ 15:30</td>
            </tr>
            <tr>
              <td>토요일</td>
              <td>운영 안함</td>
              <td>운영 안함</td>
            </tr>
          </tbody>
        </table>

        <h1>대여장소</h1>
        <p>상상관 3층 309호 (Tel) 760-4001</p>
        <ul>
          <li>대여 시 노트북 정상작동 여부를 확인해야 합니다.</li>
          <li>
            노트북 반납 시 관리자의 확인을 받아야 정상적으로 반납된 것으로
            간주됩니다.
          </li>
          <li>대여 시 예상보다 10분 정도 여유 시간을 가지는 것이 좋습니다.</li>
          <li>분실, 파손 시 사용자 책임.</li>
        </ul>

        <h1>블랙리스트 제도 운영</h1>
        <ul>
          <h4>3회 이상 연체 시 블랙리스트에 등록됩니다.</h4>
        </ul>

        <h1>블랙리스트 제도 안내</h1>
        <ul>
          <li>3회 이상 연체 시 블랙리스트에 등록됩니다.</li>
          <li>3개월간 노트북 대여 불가</li>
        </ul>
        <p className="important">
          사용자가 고의로 노트북을 무단 분해, 개조, 변경시킨 경우 또는 사용자의
          중대한 과실로 인한 중요부품의 분실 및 파손 등은 사용자가 동일품목이나
          비용으로 변상해야 합니다.
        </p>
      </div>
    </div>
  );
}

const DecemberCalendar = ({ schedules }) => {
  const scheduleMap = schedules.reduce((acc, schedule) => {
    acc[schedule.date] = schedule.event;
    return acc;
  }, {});

  return (
    <table className="calendar-table">
      <thead>
        <tr>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
          <th>일</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            1
            <br />
            <small>{scheduleMap['1']}</small>
          </td>
          <td>
            2
            <br />
            <small>{scheduleMap['2']}</small>
          </td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>
            6
            <br />
            <small>{scheduleMap['6']}</small>
          </td>
          <td>7</td>
          <td>8</td>
          <td>
            9
            <br />
            <small>{scheduleMap['9']}</small>
          </td>
          <td>10</td>
        </tr>
        <tr>
          <td>11</td>
          <td>12</td>
          <td>13</td>
          <td>14</td>
          <td>15</td>
          <td>16</td>
          <td>17</td>
        </tr>
        <tr>
          <td>18</td>
          <td>19</td>
          <td>
            20
            <br />
            <small>{scheduleMap['20']}</small>
          </td>
          <td>21</td>
          <td>22</td>
          <td>
            23
            <br />
            <small>{scheduleMap['23']}</small>
          </td>
          <td>24</td>
        </tr>
        <tr>
          <td>25</td>
          <td>26</td>
          <td>27</td>
          <td>28</td>
          <td>29</td>
          <td>30</td>
          <td>
            31
            <br />
            <small>{scheduleMap['31']}</small>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Home = () => {
  const schedules = [
    { date: '2', event: '재입학 신청 시작' },
    { date: '6', event: '재입학 신청 종료' },
    { date: '9', event: '기말고사 시작, 보강 주' },
    { date: '20', event: '기말고사 종료, 종강' },
    { date: '23', event: '겨울방학 시작, 겨울계절학기 개강' },
    { date: '31', event: '종무식' },
  ];

  return (
    <div className="airplanecontainer">
      <div className="admin">
        <h1>관리자 페이지 입니다.</h1>
      </div>
      <div className="airplane">
        <img src={airplaneImage} alt="비행기"></img>
      </div>
      <div className="website">
        <LaptopLoanInfo />
      </div>
      <div className="airplanebody">
        <h1>2024년 12월 학사일정</h1>
        <DecemberCalendar schedules={schedules} />
      </div>
    </div>
  );
};

export default Home;
