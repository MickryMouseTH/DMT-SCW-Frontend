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
        width: 100,
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
        title: "MTC System",
        align: 'center',
        children: [
          {
            title: "ปริมาณรถที่เก็บเงินได้ (คัน)",
            align: 'center',
            children: [
              {
                title: "เงินสด",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "cashClass1Trx",
                    dataIndex: "cashClass1Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "cashClass2Trx",
                    dataIndex: "cashClass2Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "cashClassTotalTrx",
                    dataIndex: "cashClassTotalTrx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "คูปอง",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "couponClass1Trx",
                    dataIndex: "couponClass1Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "couponClass2Trx",
                    dataIndex: "couponClass2Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "couponClassTotalTrx",
                    dataIndex: "couponClassTotalTrx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "EMV",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "emvClass1Trx",
                    dataIndex: "emvClass1Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "emvClass2Trx",
                    dataIndex: "emvClass2Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "emvClassTotalTrx",
                    dataIndex: "emvClassTotalTrx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "QRCode",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "qrClass1Trx",
                    dataIndex: "qrClass1Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "qrClass2Trx",
                    dataIndex: "qrClass2Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "qrClassTotalTrx",
                    dataIndex: "qrClassTotalTrx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "จำนวนรวม",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "totalClass1Trx",
                    dataIndex: "totalClass1Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "totalClass2Trx",
                    dataIndex: "totalClass2Trx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "totalClassTotalTrx",
                    dataIndex: "totalClassTotalTrx",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
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
        width: 100,
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
        title: "MTC System",
        align: 'center',
        children: [
          {
            title: "จำนวนเงิน (บาท)",
            align: 'center',
            children: [
              {
                title: "เงินสด",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "cashClass1Revenue",
                    dataIndex: "cashClass1Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "cashClass2Revenue",
                    dataIndex: "cashClass2Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "cashClassTotalRevenue",
                    dataIndex: "cashClassTotalRevenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "คูปอง",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "couponClass1Revenue",
                    dataIndex: "couponClass1Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "couponClass2Revenue",
                    dataIndex: "couponClass2Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "couponClassTotalRevenue",
                    dataIndex: "couponClassTotalRevenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "EMV",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "emvClass1Revenue",
                    dataIndex: "emvClass1Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "emvClass2Revenue",
                    dataIndex: "emvClass2Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "emvClassTotalRevenue",
                    dataIndex: "emvClassTotalRevenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "QRCode",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "qrClass1Revenue",
                    dataIndex: "qrClass1Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "qrClass2Revenue",
                    dataIndex: "qrClass2Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "qrClassTotalRevenue",
                    dataIndex: "qrClassTotalRevenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
              {
                title: "จำนวนรวม",
                align: 'center',
                children: [
                  {
                    title: "ป 1",
                    key: "totalClass1Revenue",
                    dataIndex: "totalClass1Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "ป 2",
                    key: "totalClass2Revenue",
                    dataIndex: "totalClass2Revenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                  {
                    title: "รวม",
                    key: "totalClassTotalRevenue",
                    dataIndex: "totalClassTotalRevenue",
                    align: 'center',
                    width: 60,
                    render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const columns03 = [
      {
        title: "วันที่",
        fixed: true,
        key: "date",
        dataIndex: "date",
        width: 100,
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
        title: "MTC System",
        align: 'center',
        children: [
          {
            title: "รวมทั้งสิ้น",
            align: 'center',
            children: [
              {
                title: "จำนวนรถ (คัน)",
                key: "totalClassTotalTrx",
                dataIndex: "totalClassTotalTrx",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "จำนวนเงิน (บาท)",
                key: "totalClassTotalRevenue",
                dataIndex: "totalClassTotalRevenue",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
            ],
          },
          {
            title: "จำนวนเงินที่นับจากบริษัทเก็บเงิน / ธนาคาร (บาท)",
            key: "guardforceRevenue",
            dataIndex: "guardforceRevenue",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          },
          {
            title: "ผลต่าง (บาท) +/(-)",
            key: "diffRevenue",
            dataIndex: "diffRevenue",
            align: 'center',
            width: 60,
            render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
          },
          {
            title: "Adjust หลังการตรวจสอบ Manaul",
            align: 'center',
            children: [
              {
                title: "เงินเรียกเก็บ พกง.",
                key: "auditAdjustSod",
                dataIndex: "auditAdjustSod",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "เงินยกเว้นตามเกณฑ์",
                key: "auditAdjustExcept",
                dataIndex: "auditAdjustExcept",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "เงินเกิน (รายได้)",
                key: "auditAdjustMcc",
                dataIndex: "auditAdjustMcc",
                align: 'center',
                width: 60,
                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
              },
              {
                title: "คงเหลือ",
                key: "auditAdjustBalance",
                dataIndex: "auditAdjustBalance",
                align: 'center',
                width: 60,
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
        <div className="page-break"></div>
        <Table
          rowKey={(record, index) => index}
          dataSource={this.props.dataSource}
          bordered
          size="small"
          className={`print-size print-border`}
          pagination={false}
          columns={columns03}
          summary={null}
        />
      </div>
    );
  }
}


export default ComponentToPrint;