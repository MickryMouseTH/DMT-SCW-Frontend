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
                    : <div style={{ textAlign: "center" }} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.tsbName === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>M-Pass</b>,
            key: "mpassPlazaTraffic",
            dataIndex: "mpassPlazaTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.mpassPlazaTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>EasyPass</b>,
            key: "easyPassPlazaTraffic",
            dataIndex: "easyPassPlazaTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.easyPassPlazaTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Total Traffic</b>,
            key: "totalPlazaTraffic",
            dataIndex: "totalPlazaTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.tsbName === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }} >{_isNull(value)}</div>,
                props: {}
                };
                if (row.totalPlazaTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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