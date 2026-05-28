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
            title: <b>M-Pass</b>,
            key: "mpassHourTraffic",
            dataIndex: "mpassHourTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }}  >{_isNull(value)}</div>,
                props: {}
                };
                if (row.mpassHourTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>EasyPass</b>,
            key: "easyPassHourTraffic",
            dataIndex: "easyPassHourTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }}  >{_isNull(value)}</div>,
                props: {}
                };
                if (row.easyPassHourTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Total Traffic</b>,
            key: "totalHourTraffic",
            dataIndex: "totalHourTraffic",
            align: 'center',
            width: 60,
            render: (value, row, index) => {
                const obj = {
                children: row.hourId === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "right" }}  >{_isNull(value)}</div>,
                props: {}
                };
                if (row.totalHourTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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