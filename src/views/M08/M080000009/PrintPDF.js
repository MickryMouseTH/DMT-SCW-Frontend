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
            title: <b>CS</b>,
            align: 'center',
            children: [
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
                        if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>Lane</b>,
                    key: "laneAbbreviation",
                    dataIndex: "laneAbbreviation",
                    align: 'center',
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
                    title: <b>PAN</b>,
                    key: "panString",
                    dataIndex: "panString",
                    align: 'center',
                    width: 60,
                    render: (value, row, index) => {
                        const obj = {
                        children: row.panString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.panString === '#0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>วันเวลาที่ตัดเงิน</b>,
                    key: "csDate",
                    dataIndex: "csDate",
                    align: 'center',
                    width: 60,
                    render: (value, row, index) => {
                        const obj = {
                        children: row.csDate === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.csDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
            ],
        },
        {
            title: <b>DMT</b>,
            align: 'center',
            children: [
                {
                    title: <b>วันเวลาผ่านทาง</b>,
                    key: "dmtDate",
                    dataIndex: "dmtDate",
                    align: 'center',
                    width: 60,
                    render: (value, row, index) => {
                        const obj = {
                        children: row.dmtDate === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.dmtDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>Fare</b>,
                    key: "fareAmount",
                    dataIndex: "fareAmount",
                    align: 'center',
                    width: 60,
                    render: (value, row, index) => {
                        const obj = {
                        children: row.fareAmount === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.fareAmount === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
            ],
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