import React from 'react';
import './Help.css';

function Help() {
  return (
    <div className="help-table">
      <div className="help-container">
        <h1>프로그램 소개</h1>
        <div className="help-content">
          <p>
            이 프로그램은 대학의 노트북 대여 및 관리 시스템에 사용되는 학생 정보
            관리 프로그램입니다.
            <br />
            주요 기능은 학생의 대여 정보를 등록, 조회, 수정 및 삭제하는
            것입니다.
            <br />
            학생들의 학번, 이름, 전화번호, 연체 횟수 등 정보를 관리할 수 있으며,
            이 정보는 JSON 파일 형식으로 저장되고, 이를 통해 지속적인 데이터
            관리가 가능합니다.
            <br />
            <br />
            <br />
            🔍<strong>주요 기능:</strong>
            <br />
            <br />
            <b>학생 조회 :</b> 등록된 학생의 정보를 조회할 수 있습니다. 사용자는
            학번을 입력하여 해당 학생의 정보(이름, 전화번호, 연체 횟수 등)를
            확인할 수 있습니다.
            <br />
            <br />
            <b>학생 정보 업데이트 :</b>
            학생의 연체 횟수를 수정할 수 있습니다. 학번과 연체 횟수를 입력하면
            해당 학생의 정보가 업데이트됩니다.
            <br />
            <br />
            <b>학생 데이터 관리 :</b>
            모든 학생 정보는 JSON 파일(studentData.json)에 저장됩니다.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이
            파일을 통해 프로그램은 학생 데이터를 관리하며, 파일을 수정하여
            데이터를 추가하거나 변경할 수 있습니다.
            <br />
            <br />
            <b>파일 연동 :</b>
            학생 데이터는 JSON 형식으로 저장되며, JSON 파일의 내용은 프로그램
            실행 시 자동으로 로드됩니다. <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이로
            인해 데이터의 유연한 관리가 가능하며, 프로그램이 종료되더라도
            데이터를 안전하게 보존할 수 있습니다.
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
