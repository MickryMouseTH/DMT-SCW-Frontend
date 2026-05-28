import React from 'react';
import { Table } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const columnsOne = [
        {
            title: <b>Plaza</b>,
            key: "tsbName",
            dataIndex: "tsbName",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center"}}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.tsbName === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>พบบัตร ไม่พบรถ (08)</b>,
            key: "trx08Plaza",
            dataIndex: "trx08Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx08Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
        },
        {
            title: <b>พบบัตรหลายใบ (09)</b>,
            key: "trx09Plaza",
            dataIndex: "trx09Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx09Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ไม่พบบัตร (22)</b>,
            key: "trx22Plaza",
            dataIndex: "trx22Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx22Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Blacklist (26)</b>,
            key: "trx26Plaza",
            dataIndex: "trx26Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx26Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Unlisted (23)</b>,
            key: "trx23Plaza",
            dataIndex: "trx23Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx23Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รถถอยออก (90)</b>,
            key: "trx90Plaza",
            dataIndex: "trx90Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx90Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>เงินไม่พอ (20)</b>,
            key: "trx20Plaza",
            dataIndex: "trx20Plaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx20Plaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รวม</b>,
            key: "trxTotalPlaza",
            dataIndex: "trxTotalPlaza",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trxTotalPlaza === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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