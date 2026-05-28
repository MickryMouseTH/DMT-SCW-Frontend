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
          title: <b>ลำดับ</b>,
          key: "no",
          dataIndex: "no",
          align: 'center',
          width: 60,
          render: (value, row) => {
              const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>ด่าน</b>,
          key: "plazaAbbreviation",
          dataIndex: "plazaAbbreviation",
          align: 'center',
          width: 140,
          render: (value, row) => {
              const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
        title: <b>ช่องทาง</b>,
        key: "laneAbbreviation",
        dataIndex: "laneAbbreviation",
        align: 'center',
        width: 60,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
      },
      {
        title: <b>nTrx</b>,
        key: "ntrx",
        dataIndex: "ntrx",
        align: 'center',
        width: 80,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
      },
      {
        title: <b>วันเวลาผ่านทาง</b>,
        key: "date",
        dataIndex: "date",
        align: 'center',
        width: 140,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
      },
      {
        title: <b>ค่าผ่านทาง</b>,
        key: "amount",
        dataIndex: "amount",
        align: 'center',
        width: 80,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
      },
      {
        title: <b>ประเภทการชำระ</b>,
        key: "paymentType",
        dataIndex: "paymentType",
        align: 'center',
        width: 100,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
      },
      {
        title: <b>PAN</b>,
        key: "pan",
        dataIndex: "pan",
        align: 'center',
        width: 180,
        render: (value, row) => {
            const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
        }
      },
      {
        title: <b>สัญญาณการผ่านทาง</b>,
        key: "signalText",
        dataIndex: "signalText",
        align: 'center',
        width: 360,
        render: (value, row) => {
            const obj = {
            children: row.no === "Total" ? <div style={{ textAlign: "left", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                : <div style={{ textAlign: "left" }}>{_isNull(value)}</div>,
            props: {}
            };
            if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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