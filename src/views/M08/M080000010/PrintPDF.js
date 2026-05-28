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
          title: <b>Plaza</b>,
          key: "plazaAbbreviation",
          dataIndex: "plazaAbbreviation",
          align: 'center',
          fixed: true,
          width: 60,
          render: (value, row, index) => {
              const obj = {
                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 5; obj.props.rowSpan = 1; }
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
          width: 60,
          render: (value, row, index) => {
              const obj = {
                children: row.laneAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.laneAbbreviation === "#0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>NTrx</b>,
          key: "ntrxNo",
          dataIndex: "ntrxNo",
          align: 'center',
          width: 60,
          render: (value, row, index) => {
              const obj = {
                children: row.ntrxNo === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.ntrxNo === "#0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>Datetime</b>,
          key: "trxDate",
          dataIndex: "trxDate",
          align: 'center',
          width: 130,
          render: (value, row, index) => {
              const obj = {
                children: row.trxDate === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.trxDate === "#0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>PAN</b>,
          key: "pan",
          dataIndex: "pan",
          align: 'center',
          width: 60,
          render: (value, row, index) => {
              const obj = {
                children: row.pan === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.pan === "#0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>Fare</b>,
          key: "fare",
          dataIndex: "fare",
          align: 'center',
          width: 60,
          render: (value, row, index) => {
              const obj = {
                children: row.fare === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.fare === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>XML Create Time</b>,
          key: "xmlCreatetime",
          dataIndex: "xmlCreatetime",
          align: 'center',
          width: 130,
          render: (value, row, index) => {
              const obj = {
                children: row.xmlCreatetime === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.xmlCreatetime === "") { obj.props.colSpan = 3; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>DMT GW Sent</b>,
          key: "dmtGwSent",
          dataIndex: "dmtGwSent",
          align: 'center',
          width: 130,
          render: (value, row, index) => {
              const obj = {
                children: row.dmtGwSent === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.dmtGwSent === "#0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>DOH GW Response</b>,
          key: "dohGwResponse",
          dataIndex: "dohGwResponse",
          align: 'center',
          width: 130,
          render: (value, row, index) => {
              const obj = {
                children: row.dohGwResponse === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.dohGwResponse === "#0xNull") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>DOH GW Response</b>,
          key: "dohGwResponseMessage",
          dataIndex: "dohGwResponseMessage",
          align: 'center',
          width: 80,
          render: (value, row, index) => {
              const obj = {
                children: row.dohGwResponseMessage === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.dohGwResponseMessage === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
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