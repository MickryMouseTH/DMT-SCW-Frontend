import React from 'react';
import { Table } from 'antd';
import { _isNull } from '../../../tools/util';
import PrintHeader from "../../../tools/print/printHeader";
// import "./portrait.css";
class ComponentToPrint extends React.Component {

  render() {

    const column01 = [
      {
        title: "เดือน",
        fixed: true,
        key: "detail",
        dataIndex: "detail",
        width: 70,
        align: "center",
        render: (text, record) => (
          <div style={{ textAlign: "center", fontWeight: record.bold === false ? "" : "bold" }}>
            {_isNull(text)}
          </div>
        ),
      },
      {
        title: "จำนวนรายการ (เที่ยว)",
        align: 'center',
        children: [
          {
            title: "MTC",
            key: "trxMtc",
            dataIndex: "trxMtc",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
          {
            title: "ETC",
            key: "trxEtc",
            dataIndex: "trxEtc",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
          {
            title: "รวม",
            key: "trxTotal",
            dataIndex: "trxTotal",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
        ],
      },
      {
        title: "% การใช้",
        align: 'center',
        children: [
          {
            title: "MTC",
            key: "percentMtc",
            dataIndex: "percentMtc",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
          {
            title: "ETC",
            key: "percentEtc",
            dataIndex: "percentEtc",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
        ],
      },
      {
        title: "ETC ผ่านได้",
        align: 'center',
        children: [
          {
            title: "M-Pass",
            key: "trxOkMpass",
            dataIndex: "trxOkMpass",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
          {
            title: "EasyPass",
            key: "trxOkEasypass",
            dataIndex: "trxOkEasypass",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
          {
            title: "รวม",
            key: "trxOkTotal",
            dataIndex: "trxOkTotal",
            align: 'center',
            width: 50,
            render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
          },
        ],
      },
    ];

  const column02 = [
    {
      title: "เดือน",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 70,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "center", fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ETC ผ่านไม่ได้",
      align: 'center',
      children: [
        {
          title: "ไม่พบบัตร",
          key: "trxNotFound",
          dataIndex: "trxNotFound",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "เงินไม่พอ",
          key: "trxNotMoney",
          dataIndex: "trxNotMoney",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "รวม",
          key: "trxNotTotal",
          dataIndex: "trxNotTotal",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "% ช่องทาง ETC",
      align: 'center',
      children: [
        {
          title: "ETC ผ่านได้",
          key: "percentOk",
          dataIndex: "percentOk",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "ETC ผ่านไม่ได้",
          key: "percentNot",
          dataIndex: "percentNot",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "ฝ่าด่าน",
      key: "violation",
      dataIndex: "violation",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
  ];


    return (
      <div style={{ margin: '0px 10px' }}>
          <PrintHeader
              {...this.props.HeaderBar}
              page={1}
              pageTotal={2}
          />
          <Table
              rowKey={(record, index) => index}
              dataSource={this.props.dataSource.list}
              bordered
              size="small"
              className={`print-size print-border`}
              pagination={false}
              columns={column01}
              summary={null}
          />
          <div className="page-break"></div>
          <PrintHeader
              {...this.props.HeaderBar}
              page={2}
              pageTotal={2}
          />
          <Table
              rowKey={(record, index) => index}
              dataSource={this.props.dataSource.list}
              bordered
              size="small"
              className={`print-size print-border`}
              pagination={false}
              columns={column02}
              summary={null}
          />
      </div>
  );
  }
}


export default ComponentToPrint;