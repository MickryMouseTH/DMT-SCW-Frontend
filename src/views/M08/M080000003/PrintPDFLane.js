import React from 'react';
import { Table } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const columnsOne = [
        {
            title: <b>Lane</b>,
            key: "laneName",
            dataIndex: "laneName",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.laneName === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center"}}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.laneName === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>พบบัตร ไม่พบรถ (08)</b>,
            key: "trx08Lane",
            dataIndex: "trx08Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx08Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
        },
        {
            title: <b>พบบัตรหลายใบ (09)</b>,
            key: "trx09Lane",
            dataIndex: "trx09Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx09Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ไม่พบบัตร (22)</b>,
            key: "trx22Lane",
            dataIndex: "trx22Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx22Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Blacklist (26)</b>,
            key: "trx26Lane",
            dataIndex: "trx26Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx26Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Unlisted (23)</b>,
            key: "trx23Lane",
            dataIndex: "trx23Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx23Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รถถอยออก (90)</b>,
            key: "trx90Lane",
            dataIndex: "trx90Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx90Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>เงินไม่พอ (20)</b>,
            key: "trx20Lane",
            dataIndex: "trx20Lane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx20Lane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รวม</b>,
            key: "trxTotalLane",
            dataIndex: "trxTotalLane",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.laneName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trxTotalLane === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
    ];
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