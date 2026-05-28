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
            title: <b>ชัวโมงที่</b>,
            key: "hourText",
            dataIndex: "hourText",
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
            title: <b>ปริมาณจราจร (เที่ยว)</b>,
            align: 'center',
            children: [
                {
                    title: <b>MTC</b>,
                    key: "mtc",
                    dataIndex: "mtc",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>M-Pass</b>,
                    key: "mpass",
                    dataIndex: "mpass",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>EasyPass</b>,
                    key: "easypass",
                    dataIndex: "easypass",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>รวม ETC</b>,
                    key: "sumEtc",
                    dataIndex: "sumEtc",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>รวม</b>,
                    key: "sumMtcEtc",
                    dataIndex: "sumMtcEtc",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
            ]
        },
        {
            title: <b>ปริมาณจราจร (ร้อยละ)</b>,
            align: 'center',
            children: [
                {
                    title: <b>MTC</b>,
                    key: "mtcPercent",
                    dataIndex: "mtcPercent",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                            : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>M-Pass</b>,
                    key: "mpassPercent",
                    dataIndex: "mpassPercent",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                            : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>EasyPass</b>,
                    key: "easypassPercent",
                    dataIndex: "easypassPercent",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                            : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>รวม ETC</b>,
                    key: "sumEtcPercent",
                    dataIndex: "sumEtcPercent",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{Number(_isNull(value)).toFixed(2)}</div>
                            : <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
            ]
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