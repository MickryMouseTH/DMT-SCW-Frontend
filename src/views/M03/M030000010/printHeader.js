import React from "react";
// import logo from "../../assets/img/logo.jpg";
import { Row, Col } from "antd";
import moment from "moment";
import { _isEmpty } from "../../../tools/util";
const Header = ({
  page = "",
  pageTotal = "",
  // tablePage = "",
  // tablePageTotal = "",
  TopicText = "",
  headerText = "",
  colSpan = 8,
  // position = "",
}) => {
  const HeaderPDF = ({ header }) => {
    if (header) {
      return header.map((item, index) => {
        return (
          <Col span={colSpan} key={index}>
            <Row>
              <Col span={11} className="d-flex justify-content-end">
                {item.name}
              </Col>
              <Col span={1} className="d-flex justify-content-center">
                :
              </Col>
              <Col span={12} className="d-flex justify-content-start">
                {_isEmpty(item.value) ? "-" : item.value}
              </Col>
            </Row>
          </Col>
        );
      });
    }
  };
  return (
    <div style={{ fontSize: 12,marginLeft:'0.5px' }} className="border-top-gray border-left-gray border-right-gray" >
      <Row className="pt-5 pb-5">
        <Col
          span={4}
          className="d-flex flex-column align-items-end justify-content-end"
        >
          <img src="/assets/img/brand/logo.jpg" width={35} alt="logo"></img>
        </Col>
        <Col
          span={16}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <p className="mb-0">บริษัท ทางยกระดับดอนเมืองจำกัด (มหาชน)</p>
          <p className="mb-0">
            เลขที่ 40/40 ถ. วิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพฯ 10210
            โทร. 0-2792-6500
          </p>
        </Col>
      </Row>
      <Row className="border-top-gray border-bottom-gray">
        <Col
          span={5}
          className="d-flex flex-column align-items-center border-right-gray"
        >
          วันที่พิมพ์ : {moment(new Date()).add(543, "year").format("L")}{" "}
          {moment(new Date()).add(543, "year").format("LT")}
        </Col>
        <Col
          span={14}
          className="d-flex flex-column align-items-center border-right-gray"
        >
          {TopicText}
        </Col>
        <Col
          span={5}
          className="d-flex flex-column align-items-center "
        >
          Page: {page} of {pageTotal}
        </Col>
      </Row>
      <Row className="" style={{marginBottom:'-2px'}}>{HeaderPDF({ header: headerText })}</Row>
    </div>
  );
};

export default Header;
