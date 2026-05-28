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
        title: "สรุปรายได้",
        align: 'center',
        children: [
          {
            title: "ปริมาณรถที่เก็บเงินได้ (คัน)",
            align: 'center',
            children: [
              {
                title: "MTC",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "mtcClass1Trx",
                    dataIndex: "mtcClass1Trx",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "mtcClass2Trx",
                    dataIndex: "mtcClass2Trx",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "mtcClassTotalTrx",
                    dataIndex: "mtcClassTotalTrx",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "ETC",
                align: 'center',
                children: [
                  {
                    title: "รวม",
                    key: "etcTrx",
                    dataIndex: "etcTrx",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "รวมทั้งสิ้น",
                key: "totalTrx",
                dataIndex: "totalTrx",
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
        title: "สรุปรายได้",
        align: 'center',
        children: [
          {
            title: "จำนวนเงิน (บาท)",
            align: 'center',
            children: [
              {
                title: "MTC",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "mtcClass1Revenue",
                    dataIndex: "mtcClass1Revenue",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "mtcClass2Revenue",
                    dataIndex: "mtcClass2Revenue",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "mtcClassTotalRevenue",
                    dataIndex: "mtcClassTotalRevenue",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "ETC",
                align: 'center',
                children: [
                  {
                    title: "รวม",
                    key: "etcRevenue",
                    dataIndex: "etcRevenue",
                    align: 'center',
                    width: 80,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "รวมทั้งสิ้น",
                key: "totalRevenue",
                dataIndex: "totalRevenue",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
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