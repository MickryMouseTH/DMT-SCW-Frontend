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
            title: <b>ลำดับที่</b>,
            key: "no",
            dataIndex: "no",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
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
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.plazaAbbreviation === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
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
            render: (value, row, index) => {
                const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.laneAbbreviation === 'rows') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Ntrx</b>,
            key: "ntrxNo",
            dataIndex: "ntrxNo",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.ntrxNo === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>วันที่ผ่านทาง</b>,
            key: "trxDate",
            dataIndex: "trxDate",
            align: 'center',
            width: 100,
            render: (value, row, index) => {
                const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.trxDate === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>วันที่ตัดเงิน</b>,
            key: "resDate",
            dataIndex: "resDate",
            align: 'center',
            width: 100,
            render: (value, row, index) => {
                const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.resDate === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ค่าผ่านทาง</b>,
            key: "amount",
            dataIndex: "amount",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.amount === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
    ]    
    

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