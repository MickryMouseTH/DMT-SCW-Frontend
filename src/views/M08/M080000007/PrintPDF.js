import React from 'react';
import { Table } from 'antd'
import {
  _isNull,
  // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {

    const columnsOne = [
      {
        title: <b>No.</b>,
        key: "no",
        dataIndex: "no",
        align: 'center',
        fixed: true,
        width: 80,
        render: (value, row, index) => {
          const obj = {
            children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.no === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>Plaza</b>,
        key: "plazaAbbreviation",
        dataIndex: "plazaAbbreviation",
        align: 'center',
        fixed: true,
        width: 80,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>Lane</b>,
        key: "laneAbbreviation",
        dataIndex: "laneAbbreviation",
        align: 'center',
        fixed: true,
        width: 80,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.laneAbbreviation === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>Type</b>,
        key: "type",
        dataIndex: "type",
        align: 'center',
        width: 80,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.type === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>PAN</b>,
        key: "pan",
        dataIndex: "pan",
        align: 'center',
        width: 100,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.pan === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>Fare</b>,
        key: "fare",
        dataIndex: "fare",
        align: 'center',
        width: 80,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.fare === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>ส่งเรียกเก็บเงินวันที่</b>,
        key: "paymentDate",
        dataIndex: "paymentDate",
        align: 'center',
        width: 160,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.paymentDate === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>วันเวลาผ่านทาง</b>,
        key: "trxDate",
        dataIndex: "trxDate",
        align: 'center',
        width: 160,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.trxDate === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
      {
        title: <b>วันเวลาที่ตัดเงิน</b>,
        key: "csDate",
        dataIndex: "csDate",
        align: 'center',
        width: 160,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
              : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          if (row.csDate === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
          return obj;
        }
      },
    ];

    return (
      <div style={{ margin: '0px 10px' }}>
        <PrintHeader
          {...this.props.HeaderBar}
          page={1}
          pageTotal={1}
        />
        <Table
          rowKey={(record, index) => index}
          dataSource={this.props.dataSource}
          bordered
          size="small"
          className={`print-size print-border`}
          pagination={false}
          columns={columnsOne}
          summary={null}
        />
      </div>
    );
  }
}


export default ComponentToPrint;