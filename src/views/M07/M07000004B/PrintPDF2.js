import React from 'react';
import { Table, Card, Row, Col } from 'antd';
import { _isNull } from '../../../tools/util';
import PrintHeader from "./printHeader";
import { Chart } from "react-google-charts";
import "./portrait.css";

const fisrtColumn = [
  {
    title: <b>PLAZA</b>,
    key: "plaza",
    dataIndex: "plaza",
    align: 'center',
    width: 100,
    render: (text, record) => <div style={{ textAlign: record.textAlign, fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
  },
  {
    title: "06:00-14:00",
    key: "",
    align: "center",
    children: [
      {
        title: <b>A.M.</b>,
        key: "am",
        dataIndex: "am",
        align: 'center',
        width: 20,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
    ]
  },
  {
    title: "14:01-22:00",
    key: "",
    align: "center",
    children: [
      {
        title: <b>P.M.</b>,
        key: "pm",
        dataIndex: "pm",
        align: 'center',
        width: 20,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
      },
    ]
  },
  {
    title: "22:01-05:59",
    key: "",
    align: "center",
    children: [
      {
        title: <b>NIGHT</b>,
        key: "night",
        dataIndex: "night",
        align: 'center',
        width: 20,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
      },
    ]
  },
  {
    title: <b>TOLL</b>,
    key: "",
    align: "center",
    children: [
      {
        title: <b>TOTAL</b>,
        key: "tollTotal",
        dataIndex: "tollTotal",
        align: 'center',
        width: 20,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
      },
      {
        title: <b>%</b>,
        key: "tollPercent",
        dataIndex: "tollPercent",
        align: 'center',
        width: 20,
        render: (text, record) => <div style={{ textAlign: "right" }}>{record.textAlign !== "center" ? Number(_isNull(text)).toFixed(2) : _isNull(text)}</div >
      },
    ]
  },
]

const secondColumn = [
  {
    title: <b>DUAL PLAZAS</b>,
    key: "plaza",
    dataIndex: "plaza",
    align: 'center',
    width: 100,
    render: (text, record) => <div style={{ textAlign: record.textAlign, fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
  },
  {
    title: <b>A.M.</b>,
    key: "am",
    dataIndex: "am",
    align: 'center',
    width: 20,
    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
  },
  {
    title: <b>P.M.</b>,
    key: "pm",
    dataIndex: "pm",
    align: 'center',
    width: 20,
    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
  },
  {
    title: <b>NIGHT</b>,
    key: "night",
    dataIndex: "night",
    align: 'center',
    width: 20,
    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
  },
  {
    title: <b>TOLL</b>,
    key: "",
    align: "center",
    children: [
      {
        title: <b>TOTAL</b>,
        key: "tollTotal",
        dataIndex: "tollTotal",
        align: 'center',
        width: 20,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
      },
      {
        title: <b>%</b>,
        key: "tollPercent",
        dataIndex: "tollPercent",
        align: 'center',
        width: 20,
        render: (text) => <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div >
      },
    ]
  },
]

const thirdColumn = [
  {
    title: <b>Recap</b>,
    key: "plaza",
    dataIndex: "plaza",
    align: 'center',
    width: 100,
    render: (text, record) => <div style={{ textAlign: record.textAlign, fontWeight: record.textAlign === "left" ? "" : "bold" }}>{_isNull(text)}</div>
  },
  {
    title: <b>Revenue</b>,
    key: "revenue",
    dataIndex: "revenue",
    align: 'center',
    width: 20,
    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
  },
  {
    title: <b>%</b>,
    key: "revenuePercent",
    dataIndex: "revenuePercent",
    align: 'center',
    width: 20,
    render: (text) => <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div >
  },
  {
    title: <b>Traffic Volume</b>,
    key: "trafficVolume",
    dataIndex: "trafficVolume",
    align: 'center',
    width: 20,
    render: (text) => <div style={{ textAlign: "right" }} className='text-right text-red'>{_isNull(text)}</div>
  },
  {
    title: <b>%</b>,
    key: "trafficVolumePercent",
    dataIndex: "trafficVolumePercent",
    align: 'center',
    width: 20,
    render: (text) => <div style={{ textAlign: "right" }}>{Number(_isNull(text)).toFixed(2)}</div >
  },
]


class ComponentToPrint extends React.Component {

  render() {
    return (
      <div className=" d-flex justify-content-center">
        <Card className="w-100">
          <Row>
            <Col span={24} className="text-center" style={{ marginTop: '-10px' }}>
              <PrintHeader
                {...this.props.HeaderBar}
                page={1}
                pageTotal={1}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} className="text-left" style={{ marginTop: '10px' }}>
              <p4 className="mb-0"><b>DAILY TOLL COLLECTION REPORT</b></p4>
            </Col>
            <Col span={12} className="text-right" style={{ marginTop: '10px' }}>
              {/* <p4 className="mb-0"><b>Thu May 16, 2024</b></p4> */}
              <p4 className="mb-0"><b>{this.props.operationalDateFormat1 != null ? this.props.operationalDateFormat1 : ""}</b></p4>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center mb-10">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataFisrtTable}
                bordered
                size="small"
                className={`print-size7 print-border`}
                pagination={false}
                columns={fisrtColumn}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center mb-10">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSecondTable}
                bordered
                size="small"
                className={`print-size7 print-border`}
                pagination={false}
                columns={secondColumn}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center mb-10">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataThirdTable}
                bordered
                size="small"
                className={`print-size7 print-border`}
                pagination={false}
                columns={thirdColumn}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-left mb-10">
              <div style={{ fontSize: 7 }} >
                <p className="mb-0">{"Revenue and Traffic Volume Distribution Chart " + (this.props.operationalDateFormat2 != null ? this.props.operationalDateFormat2 : "")}</p>
              </div>
            </Col>
          </Row>
          {/* <div className="page-break"></div>
          <Row>
            <Col span={24} className="text-center" style={{ marginTop: '10px' }}>
              <PrintHeader
                {...this.props.HeaderBar}
                page={2}
                pageTotal={2}
              />
            </Col>
          </Row> */}
          {/* <Row className="border-bottom-gray" style={{ marginBottom: '1px' }}></Row> */}
          <Row>
            <Col span={24}>
              <Chart
                chartType="BarChart"
                width="760px"
                // height="1000px"
                data={this.props.dataCharts}
                options={this.props.optionsCharts}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-right mb-10">
              <div style={{ fontSize: 7 }} >
                <p className="mb-0">{this.props.footerReport != null ? this.props.footerReport : ""}</p>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}


export default ComponentToPrint;