import React from "react";
// import logo from "../../assets/img/logo.jpg";
import { Row, Col } from "antd";
// import moment from "moment";
// import { _isEmpty } from "../../../tools/util";
const Header = ({
  dateText = "",
  headerText = "",
}) => {
  return (
    <div style={{ fontSize: 7, marginLeft: '0.5px' }} >
      <Row className="pt-1 pb-1">
        <Col span={24} className="d-flex flex-column align-items-center justify-content-center">
        <b className="mb-0">Toll Revenue {headerText}</b>
        </Col>
      </Row>
      <Row className="pt-1 pb-1">
        <Col
          span={4}
          className="d-flex flex-column align-items-center justify-content-center">
          <b className="mb-0">Date : {dateText}</b>
        </Col>
        <Col span={20}></Col>
      </Row>
      <Row className="pt-1 pb-1">
        <Col span={24} className="d-flex flex-column align-items-center justify-content-center">
        <b className="mb-0">Historical Daily Revenue and Daily Traffic</b>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
