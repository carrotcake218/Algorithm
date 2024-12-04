import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://cphoto.asiae.co.kr/listimglink/1/2020091414451279641_1600062312.jpg"
              alt="한성대학교 로고"
            />
          </Link>
        </div>
        <div className="header-container">
          <nav className="navigation">
            <ul className="nav-links">
              <li>
                <Link to="/Student">대여 학생 관리</Link>
              </li>
              <li>
                <Link to="/Blacklist">체납 학생 관리</Link>
              </li>
              <li>
                <Link to="/Laptop">노트북 관리</Link>
              </li>
              <li>
                <Link to="/Lent">대여 및 반납</Link>
              </li>
              <li>
                <Link to="/Data">데이터 관리</Link>
              </li>
              <li>
                <Link to="/Report">통계 및 보고서</Link>
              </li>
              <li>
                <Link to="/Help">도움말</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
