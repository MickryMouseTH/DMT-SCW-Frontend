import React from 'react';
import { Table, Card, Row, Col } from 'antd'
import { _isEmpty } from '../../../tools/util'
import "./portrait.css"

//ColumnDaTa ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const HeaderColumnOne = [{
  title: "สัญญาณดัง อันเกิดจากรถยกเว้น",
  align: "center",
  className: 'fontHeader',
  children: [
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'ประเภทรถ',
      dataIndex: 'typeCar',
      key: 'typeCar',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'ประเภทยกเว้น',
      dataIndex: 'typeCar',
      key: 'typeCar',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'จำนวนคัน',
      dataIndex: 'typeCar',
      key: 'typeCar',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'องค์กร เเละ เลขทะเบียน',
      dataIndex: 'mixedOrganVehicle',
      key: 'mixedOrganVehicle',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
  ]
}];

const HeaderColumnTwo = [{
  title: "สัญญาณดัง เก็บเงินได้",
  align: "center",
  className: 'fontHeader',
  children: [
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'ประเภทรถ',
      dataIndex: 'typeCar',
      key: 'typeCar',
      align: 'center',
      width: 20,
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'event',
      key: 'event',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'ประเภทรถ',
      dataIndex: 'typeCar',
      key: 'typeCar',
      align: 'center',
      width: 20,
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'event',
      key: 'event',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
  ]
}];

const HeaderColumnThree = [{
  title: "สัญญาณดัง เก็บเงินไม่ได้-รถส่วนราชการ",
  align: "center",
  className: 'fontHeader',
  children: [
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'ประเภทรถ',
      dataIndex: 'typeCar',
      key: 'typeCar',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'จำนวนคัน',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'องค์กร เเละ เลขทะเบียน',
      dataIndex: 'mixedOrganVehicle',
      key: 'mixedOrganVehicle',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
  ]
}];

const HeaderColumnFour = [
  {
    title: 'เวลา',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    render: (text) => <div className="text-center">{text}</div>
  },
  {
    title: 'รายการอื่น',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    align: 'center',
    className: 'fontHeader',
    render: (text) => <div className="text-center">{text}</div>
  },
];

const HeaderColumnFive = [{
  title: "รถฝ่าด่าน ปฏิเสทการชำระเงิน",
  align: "center",
  className: 'fontHeader',
  children: [
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <div className="text-left">{text}</div>
    },
    {
      title: 'ประเภทรถ',
      dataIndex: 'typeCar',
      key: 'typeCar',
      align: 'center',
      render: (text) => <div className="text-right">{text}</div>
    },
    {
      title: 'เลขทะเบียน',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
      align: 'center',
      render: (text) => <div className="text-right">{text}</div>
    },
    {
      title: 'สี เเละ ยี่ห้อ',
      dataIndex: 'mixedColorModel',
      key: 'mixedColorModel',
      align: 'center',
      render: (text) => <div className="text-right">{text}</div>
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'remark',
      key: 'remark',
      align: 'center',
      render: (text) => <div className="text-right">{text}</div>
    },
  ]
}];

//ColumnDaTa ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const boxOne = [
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: 0,
    number: 0,
    totalAmount: 0,
  },
];

const boxTwo = [
  {
    couponType: 0,
    number: 0,
  },
  {
    couponType: 0,
    number: 0,
  },
  {
    couponType: 0,
    number: 0,
  },
  {
    couponType: 0,
    number: 0,
  },
]

const boxThree = [
  {
    cardType: 0,
    number: 0,
  },
  {
    cardType: 0,
    number: 0,
  },
  {
    cardType: 0,
    number: 0,
  },
  {
    cardType: 0,
    number: 0,
  },
  {
    cardType: 0,
    number: 0,
  },
  {
    cardType: 0,
    number: 0,
  },
]

const boxFour = [
  {
    couponType: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    totalAmount: 0,
  },
]

const boxFive = [
  {
    couponType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    number: 0,
    totalAmount: 0,
  },
  {
    couponType: 0,
    number: 0,
    totalAmount: 0,
  },
]
// MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class ComponentToPrint extends React.Component {
class ComponentToPrint extends React.Component {

  render() {
    return (
      <div className="mt-10 d-flex justify-content-center">
        <Card className="w-pdf-100">
          <Row className="d-flex justify-content-center align-items-center border-header-pdf">
            <Col span={4}><img src="/assets/img/brand/logo.jpg" alt="logo" style={{ width: '50%' }} /></Col>
            <Col span={14} className="text-left">
              <span style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center' }}>
                บมจ. ทางยกระดับดอนเมือง</span>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pt-5 pb-5">
            <span style={{ fontSize: '25px', fontWeight: '900' }}>
              ใบบันทึกเหตุการณ์</span>
          </Row>
          <Row className="pb-10 pt-10">
            วัน<span className="border-line-dot" style={{ width: '100px' }}>{this.props.data.day}</span>
            ที่<span className="border-line-dot" style={{ width: '90px' }}>{this.props.data.date}</span>
            เดือน<span className="border-line-dot" style={{ width: '120px' }}>{this.props.data.month}</span>
            พ.ศ.<span className="border-line-dot" style={{ width: '100px' }}>{this.props.data.year}</span>
           ด่าน<span className="border-line-dot" style={{ width: '220px' }}>{this.props.data.plazaName}</span>
          </Row>
          <Row className="pb-20">
            ชื่อ-สกุล<span className="border-line-dot" style={{ width: '190px' }}>{this.props.data.staffName}</span>
           รหัสบัตร<span className="border-line-dot" style={{ width: '150px' }}>{this.props.data.staffId}</span>
           กะ<span className="border-line-dot" style={{ width: '80px' }}>{this.props.data.shiftName}</span>
           ช่องทาง<span className="border-line-dot" style={{ width: '153px' }}>{this.props.data.laneName}</span>
          </Row>
          <Row>
            <Col span={11} className="h-100">
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center print-border"
                dataSource={_isEmpty(this.props.data.list) ? boxOne : this.props.data.list}
                columns={HeaderColumnOne}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
            <Col span={13} className="h-100">
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center print-border"
                dataSource={_isEmpty(this.props.data.list) ? boxTwo : this.props.data.list}
                columns={HeaderColumnTwo}
                pagination={false}
                bordered={true}
                hover={false}
              />
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center print-border"
                dataSource={_isEmpty(this.props.data.list) ? boxThree : this.props.data.list}
                columns={HeaderColumnThree}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center print-border"
                dataSource={_isEmpty(this.props.data.list) ? boxFour : this.props.data.list}
                columns={HeaderColumnFour}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
            <Col span={13}>
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center print-border"
                dataSource={_isEmpty(this.props.data.list) ? boxFive : this.props.data.list}
                columns={HeaderColumnFive}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}


export default ComponentToPrint;