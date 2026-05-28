import React from 'react';
import { Table } from 'antd'
import {
  _isNull,
  // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
// import { Chart } from "react-google-charts";

class ComponentToPrint extends React.Component {

  render() {
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            render: (text,record) => <div style={{ textAlign: "right" }}>{record.textAlign !== "center"?Number(_isNull(text)).toFixed(2):_isNull(text)}</div >
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
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div >
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
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div style={{ margin: '0px 10px' }}>
        <PrintHeader
          {...this.props.HeaderBar}
          page={1}
          pageTotal={1}
        />
        <Table
          rowKey={(record, index) => index}
          dataSource={this.props.dataFisrtTable}
          bordered
          size="small"
          className={`print-size print-border`}
          pagination={false}
          columns={fisrtColumn}
          summary={null}
        />
        <div className="page-break"></div>
        <Table
          rowKey={(record, index) => index}
          dataSource={this.props.dataSecondTable}
          bordered
          size="small"
          className={`print-size print-border`}
          pagination={false}
          columns={secondColumn}
          summary={null}
        />
        <br />
        <Table
          rowKey={(record, index) => index}
          dataSource={this.props.dataThirdTable}
          bordered
          size="small"
          className={`print-size print-border`}
          pagination={false}
          columns={thirdColumn}
          summary={null}
        />
        
      {/* <Chart
        chartType="BarChart"
        width="100%"
        height="600px"
        data={this.props.dataCharts}
        options={this.props.optionsCharts}
      /> */}
      </div>
    );
  }
}


export default ComponentToPrint;