import React from 'react';
import { Table } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const columnsOne = [
      {
          title: <b>Date</b>,
          key: "dateString",
          dataIndex: "dateString",
          align: 'center',
          width: 120,
          render: (value, row, index) => {
              const obj = {
                children: row.dateString === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "center" }} >{_isNull(value)}</div>,
                props: {}
              };
              if (row.dateString === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>M-Pass</b>,
          key: "mpassTraffic",
          dataIndex: "mpassTraffic",
          align: 'center',
          width: 120,
          render: (value, row, index) => {
              const obj = {
                children: row.dateString === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "right" }} >{_isNull(value)}</div>,
                props: {}
              };
              if (row.mpassTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>EasyPass</b>,
          key: "easyPassTraffic",
          dataIndex: "easyPassTraffic",
          align: 'center',
          width: 120,
          render: (value, row, index) => {
              const obj = {
                children: row.dateString === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "right" }} >{_isNull(value)}</div>,
                props: {}
              };
              if (row.easyPassTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
      },
      {
          title: <b>Total Traffic</b>,
          key: "totalTraffic",
          dataIndex: "totalTraffic",
          align: 'center',
          width: 120,
          render: (value, row, index) => {
              const obj = {
                children: row.dateString === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "right" }} >{_isNull(value)}</div>,
                props: {}
              };
              if (row.totalTraffic === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
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