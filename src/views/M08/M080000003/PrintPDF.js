import React from 'react';
import { Table } from 'antd'
import {
  _isNull,
  // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {

    const columnsMainList = [
      {
        title: <b>Date</b>,
        key: "dateString",
        dataIndex: "dateString",
        align: 'center',
        width: 120,
        render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      },
      {
        title: <b>พบบัตร ไม่พบรถ (08)</b>,
        key: "trx08",
        dataIndex: "trx08",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>พบบัตรหลายใบ (09)</b>,
        key: "trx09",
        dataIndex: "trx09",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>ไม่พบบัตร (22)</b>,
        key: "trx22",
        dataIndex: "trx22",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>Blacklist (26)</b>,
        key: "trx26",
        dataIndex: "trx26",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>Unlisted (23)</b>,
        key: "trx23",
        dataIndex: "trx23",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>รถถอยออก (90)</b>,
        key: "trx90",
        dataIndex: "trx90",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>เงินไม่พอ (20)</b>,
        key: "trx20",
        dataIndex: "trx20",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>ซ้ำ 02 (86)</b>,
        key: "trx86",
        dataIndex: "trx86",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>ซ้ำ 10 (87)</b>,
        key: "trx87",
        dataIndex: "trx87",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>ซ้ำ 19 (88)</b>,
        key: "trx88",
        dataIndex: "trx88",
        align: 'center',
        width: 70,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
      },
      {
        title: <b>รวม</b>,
        key: "trxTotal",
        dataIndex: "trxTotal",
        align: 'center',
        width: 100,
        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
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
          columns={columnsMainList}
          summary={null}
        />
      </div>
    );
  }
}


export default ComponentToPrint;