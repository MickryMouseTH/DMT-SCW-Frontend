import React from 'react';
import { Typography, Table } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
const { Text } = Typography;

class ComponentToPrint extends React.Component {

  render() {
    
  const columns01 = [
    {
      title: "วันที่",
      fixed: true,
      key: "date",
      dataIndex: "date",
      width: 120,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-left">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ETC System",
      align: 'center',
      children: [
        {
          title: "ปริมาณรถที่เก็บเงินได้ (คัน)",
          align: 'center',
          children: [
            {
              title: "Easy Pass",
              key: "easypassTrx",
              dataIndex: "easypassTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "M-PASS",
              key: "mpassTrx",
              dataIndex: "mpassTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "etcTotalTrx",
              dataIndex: "etcTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "จำนวนเงิน (บาท)",
          align: 'center',
          children: [
            {
              title: "Easy Pass",
              key: "easypassRevenue",
              dataIndex: "easypassRevenue",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "M-PASS",
              key: "mpassRevenue",
              dataIndex: "mpassRevenue",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "รวม",
              key: "etcTotalRevenue",
              dataIndex: "etcTotalRevenue",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
      ],
    },
  ];

  const columns02 = [
    {
      title: "วันที่",
      fixed: true,
      key: "date",
      dataIndex: "date",
      width: 120,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-left">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ETC System",
      align: 'center',
      children: [
        {
          title: "จำนวนเงินที่เรียกเก็บจากธนาคาร (บาท)",
          key: "bank1Revenue",
          dataIndex: "bank1Revenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "จำนวนเงินที่เรียกเก็บจากธนาคาร เพิ่มเติม (บาท)",
          key: "bank2Revenue",
          dataIndex: "bank2Revenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "รวมยอดเงินเรียกเก็บตาม",
          key: "bankTotalRevenue",
          dataIndex: "bankTotalRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "ผลต่างระหว่าง SCW 3.4 กับ SCW 8.16",
          key: "diffPassingRevenue",
          dataIndex: "diffPassingRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "จำนวนเงินตาม Statement ธนาคาร",
          key: "bankStatementRevenue",
          dataIndex: "bankStatementRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "ผลต่าง (บาท) +/(-)",
          key: "diffBankRevenue",
          dataIndex: "diffBankRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
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
          columns={columns01}
          summary={null}
        />
        <div className="page-break"></div>
        <Table
          rowKey={(record, index) => index}
          dataSource={this.props.dataSource}
          bordered
          size="small"
          className={`print-size print-border`}
          pagination={false}
          columns={columns02}
          summary={null}
        />
      </div>
    );
  }
}


export default ComponentToPrint;