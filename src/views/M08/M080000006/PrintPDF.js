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
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                  props: {}
                };
                if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รายการทั้งหมด</b>,
            key: "allList",
            dataIndex: "allList",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.allList === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                  props: {}
                };
                if (row.allList === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ส่งตัดเงิน</b>,
            key: "debitList",
            dataIndex: "debitList",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.debitList === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                  props: {}
                };
                if (row.debitList === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รับชำระจาก DOH</b>,
            key: "paymentDOH",
            dataIndex: "paymentDOH",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.paymentDOH === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                  props: {}
                };
                if (row.paymentDOH === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รับชำระจาก EXAT</b>,
            key: "paymentEXAT",
            dataIndex: "paymentEXAT",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                  children: row.paymentEXAT === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                  props: {}
                };
                if (row.paymentEXAT === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
          title: <b>ค้างชำระจาก DOH</b>,
          key: "arrearsDOH",
          dataIndex: "arrearsDOH",
          align: 'center',
          width: 60,
          render: (value, row, index) => {
              const obj = {
                children: row.totalTrafficCount === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.totalTrafficCount === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
        },
        {
          title: <b>ค้างชำระจาก EXAT</b>,
          key: "arrearsEXAT",
          dataIndex: "arrearsEXAT",
          align: 'center',
          width: 60,
          render: (value, row, index) => {
              const obj = {
                children: row.arrearsEXAT === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.arrearsEXAT === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
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