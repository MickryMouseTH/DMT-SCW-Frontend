import React from 'react';
import { Table, Card, Row, Col } from 'antd'
import { _isNull, _isEmpty } from '../../../tools/util'
import "./portrait.css"

const crashListColumn = [
  {
    title: 'วันที่',
    dataIndex: 'date',
    key: 'date',
    width: '100px',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-center">{text}</div>
  },
  {
    title: 'ผลัด',
    dataIndex: 'shift',
    key: 'shift',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-center">{text}</div>
  },
  {
    title: 'ด่าน',
    dataIndex: 'plaza',
    key: 'plaza',
    width: '200px',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-left">{text}</div>
  },
  {
    title: 'นำส่งขาด',
    dataIndex: 'diff',
    key: 'diff',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{_isNull(Number(text))}</div>
  },
  {
    title: 'นำส่งขาดสะสม',
    dataIndex: 'collect',
    key: 'collect',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{_isNull(Number(text))}</div>
  },
  {
    title: 'เรียกเก็บเพิ่ม',
    dataIndex: 'chargeMore',
    key: 'chargeMore',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{_isNull(Number(text))}</div>
  },

];

class ComponentToPrint extends React.Component {

  render() {
    return (
      <div className=" d-flex justify-content-center">
        <Card className="w-100 font-10">
          <Row>
            <Col span={4}><img src="/assets/img/brand/logo.jpg" alt="logo" style={{ width: '10%', marginTop: '-15px' }} /></Col>
            <Col span={16} className="text-center mb-10" style={{ marginTop: '-10px' }}>
              <span style={{ fontSize: '20px', fontWeight: '900', textAlign: 'center' }}>
                บริษัท ทางยกระดับดอนเมือง จำกัด<br />
                จดหมายแจ้ง</span>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between mb-20 mt-5">
            <Col span={24}>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={24}><span className="font-headTable">เรื่อง นำส่งเงินขาดเกินจำนวนที่ยกเว้น</span></Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={24}><span className="font-headTable">{this.props.data.header01}</span></Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-10">
            <Col span={24}>
              <Row >
                <span>{this.props.data.header02}</span>
              </Row>
              <Row >
                <span>{this.props.data.header03}</span>
              </Row>
              <Row >
                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mt-5 detail-tod-border bdr-footer-custom w-100"
                  dataSource={_isEmpty(this.props.data.list) ? [] : this.props.data.list}
                  columns={crashListColumn}
                  pagination={false}
                  bordered={true}
                  hover={false}
                />
              </Row>
              <Row >
                <span>ข้าพเจ้ายินยอมชำระเงินที่เกินยอดยกเว้น</span>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={24}><span className="font-headTable">{this.props.data.footer01}</span></Col>
              </Row>
            </Col>

          </Row>
        </Card>
      </div>
    );
  }
}


export default ComponentToPrint;