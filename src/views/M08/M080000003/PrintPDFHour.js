import React from 'react';
import { Table } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const columnsOne = [
        {
            title: <b>Hour</b>,
            key: "hourId",
            dataIndex: "hourId",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.hourId === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>พบบัตร ไม่พบรถ (08)</b>,
            key: "trx08Hour",
            dataIndex: "trx08Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx08Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            } 
        },
        {
            title: <b>พบบัตรหลายใบ (09)</b>,
            key: "trx09Hour",
            dataIndex: "trx09Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx09Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ไม่พบบัตร (22)</b>,
            key: "trx22Hour",
            dataIndex: "trx22Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx22Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Blacklist (26)</b>,
            key: "trx26Hour",
            dataIndex: "trx26Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx26Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Unlisted (23)</b>,
            key: "trx23Hour",
            dataIndex: "trx23Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx23Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รถถอยออก (90)</b>,
            key: "trx90Hour",
            dataIndex: "trx90Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx90Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>เงินไม่พอ (20)</b>,
            key: "trx20Hour",
            dataIndex: "trx20Hour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trx20Hour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>รวม</b>,
            key: "trxTotalHour",
            dataIndex: "trxTotalHour",
            align: 'center',
            width: 50,
            render: (value, row, index) => {
                const obj = {
                    children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right"}}>{_isNull(value)}</div>,
                    props: {}
                };
                if (row.trxTotalHour === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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