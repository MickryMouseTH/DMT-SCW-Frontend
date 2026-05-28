import React from 'react';
import { Table } from 'antd';
import {
  _isNull,
  _isEmpty,
  _setYearThai,
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
const dateFormat = "DD/MM/YYYY HH:mm:ss";

class ComponentToPrint extends React.Component {

  render() {

    const columnsMainList = [
      {
        title: <b>No.</b>,
        key: "no",
        dataIndex: "no",
        align: 'center',
        width: 50,
        render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      },
      {
        title: <b>Plaza</b>,
        key: "plazaAbbreviation",
        dataIndex: "plazaAbbreviation",
        align: 'center',
        width: 60,
        render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      },
      {
        title: <b>Lane</b>,
        key: "laneAbbreviation",
        dataIndex: "laneAbbreviation",
        align: 'center',
        width: 60,
        render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      },
      {
        title: <b>Trx Date</b>,
        dataIndex: "trxDate",
        key: "trxDate",
        width: 150,
        align: "center",
        render: (text) =>
          <div className='text-left'>
            {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
          </div>
      },
      {
        title: <b>PAN</b>,
        key: "pan",
        dataIndex: "pan",
        align: 'center',
        width: 60,
        render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
      },
      {
        title: <b>Type</b>,
        key: "type",
        dataIndex: "type",
        align: 'center',
        width: 60,
        render: (text) => <div style={{ textAlign: "left" }}>{_isNull(text)}</div>
      },
      {
        title: <b>เวลาสร้าง XML</b>,
        dataIndex: "xmlCreateDatetime",
        key: "xmlCreateDatetime",
        width: 150,
        align: "center",
        render: (text) =>
          <div className='text-left'>
            {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
          </div>
      },
      {
        title: <b>CS Request time</b>,
        dataIndex: "csRequestDatetime",
        key: "csRequestDatetime",
        width: 150,
        align: "center",
        render: (text) =>
          <div className='text-left'>
            {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
          </div>
      },
      {
        title: <b>CS Response time</b>,
        dataIndex: "csResponseDatetime",
        key: "csResponseDatetime",
        width: 150,
        align: "center",
        render: (text) =>
          <div className='text-left'>
            {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
          </div>
      },
      {
        title: <b>CS Response MSG</b>,
        key: "csResponseMessage",
        dataIndex: "csResponseMessage",
        align: 'center',
        width: 60,
        render: (text) => <div style={{ textAlign: "left" }}>{_isNull(text)}</div>
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