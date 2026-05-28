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
        title: "ปริมาณรถที่เก็บเงินไม่ได้ (คัน)",
        align: 'center',
        children: [
          {
            title: "รถยกเว้น",
            align: 'center',
            children: [
              {
                title: "ป 1",
                key: "exceptClass1Trx",
                dataIndex: "exceptClass1Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "ป 2",
                key: "exceptClass2Trx",
                dataIndex: "exceptClass2Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "รวม",
                key: "exceptClassTotalTrx",
                dataIndex: "exceptClassTotalTrx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
          },
          {
            title: "รถขบวน",
            align: 'center',
            children: [
              {
                title: "ป 1",
                key: "hpmcClass1Trx",
                dataIndex: "hpmcClass1Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "ป 2",
                key: "hpmcClass2Trx",
                dataIndex: "hpmcClass2Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "รวม",
                key: "hpmcClassTotalTrx",
                dataIndex: "hpmcClassTotalTrx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
          },
          {
            title: "รถฝ่าด่าน",
            align: 'center',
            children: [
              {
                title: "ป 1",
                key: "vioClass1Trx",
                dataIndex: "vioClass1Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "ป 2",
                key: "vioClass2Trx",
                dataIndex: "vioClass2Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "รวม",
                key: "vioClassTotalTrx",
                dataIndex: "vioClassTotalTrx",
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
        title: "ปริมาณรถที่เก็บเงินไม่ได้ (คัน)",
        align: 'center',
        children: [
          {
            title: "บัตร DMT",
            align: 'center',
            children: [
              {
                title: "ป 1",
                key: "dmtClass1Trx",
                dataIndex: "dmtClass1Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "ป 2",
                key: "dmtClass2Trx",
                dataIndex: "dmtClass2Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "รวม",
                key: "dmtClassTotalTrx",
                dataIndex: "dmtClassTotalTrx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
          },
          {
            title: "รถออกซ้าย",
            align: 'center',
            children: [
              {
                title: "ป 1",
                key: "leftClass1Trx",
                dataIndex: "leftClass1Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "ป 2",
                key: "leftClass2Trx",
                dataIndex: "leftClass2Trx",
                align: 'center',
                width: 80,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "รวม",
                key: "leftClassTotalTrx",
                dataIndex: "leftClassTotalTrx",
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