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
        title: <b>No.</b>,
        key: "no",
        dataIndex: "no",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>Plaza</b>,
        key: "plazaName",
        dataIndex: "plazaName",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>Lane</b>,
        key: "laneName",
        dataIndex: "laneName",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>Type</b>,
        key: "type",
        dataIndex: "type",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>Pan</b>,
        key: "pan",
        dataIndex: "pan",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>วันเวลารถผ่านทาง</b>,
        key: "trxDate",
        dataIndex: "trxDate",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>วันเวลาที่ตัดเงินได้</b>,
        key: "csDate",
        dataIndex: "csDate",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>Fare</b>,
        key: "fare",
        dataIndex: "fare",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>เลขที่ใบกำกับภาษี</b>,
        key: "receiptNo",
        dataIndex: "receiptNo",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>วันที่ใบกำกับภาษี</b>,
        key: "receiptDate",
        dataIndex: "receiptDate",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>วันที่ออกใบกำกับภาษี</b>,
        key: "receiptPrint",
        dataIndex: "receiptPrint",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>ออกใบกำกับภาษีโดย</b>,
        key: "printBy",
        dataIndex: "printBy",
        align: 'center',
        width: 60,
        render: (value, row, index) => {
          const obj = {
            children: <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      }
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