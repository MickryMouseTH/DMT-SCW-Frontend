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
        title: <b>Total traffic</b>,
        key: "trxTotal",
        dataIndex: "trxTotal",
        align: 'center',
        width: 60,
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