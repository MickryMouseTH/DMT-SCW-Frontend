import React from 'react';
import { Table, Row, Col } from 'antd'
import {
  _isNull,
  // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {

    const fisrtColumn = [
      {
        title: "ลำดับ",
        dataIndex: "no",
        key: "no",
        width: 30,
        align: "center",
        fixed: true,
        render(text, record) {
          return {
            props: {
              className: "secondary bg_default",
            },
            children: (
              <div className="text-center">{(text)}</div>
            ),
          };
        },
      },
      {
        title: "ด่าน",
        fixed: "left",
        key: "plazaName",
        dataIndex: "plazaName",
        width: 40,
        align: "center",
        render(text, record) {
          return {
            props: {
              className: "bg_default",
            },
            children: (
              <div className="text-left">{(text)}</div>
            ),
          };
        },
      },
      {
        title: "MTC",
        align: "center",
        children: [
          {
            title: "เงินสด",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "mtcTrafficCash",
                key: "mtcTrafficCash",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "mtcRevenueCash",
                key: "mtcRevenueCash",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          },
          {
            title: "คูปอง",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "mtcTrafficCoupon",
                key: "mtcTrafficCoupon",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "mtcRevenueCoupon",
                key: "mtcRevenueCoupon",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          },
          {
            title: "EMV",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "mtcTrafficEmv",
                key: "mtcTrafficEmv",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "mtcRevenueEmv",
                key: "mtcRevenueEmv",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          },
          {
            title: "QRCode",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "mtcTrafficQr",
                key: "mtcTrafficQr",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "mtcRevenueQr",
                key: "mtcRevenueQr",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          }
        ],
      },
      {
        title: "ETC",
        align: "center",
        children: [
          {
            title: "Easy Pass",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "easypassTraffic",
                key: "easypassTraffic",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "easypassRevenue",
                key: "easypassRevenue",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          },
          {
            title: "M-PASS",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "mpassTraffic",
                key: "mpassTraffic",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "mpassRevenue",
                key: "mpassRevenue",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          }
        ],
      },
      {
        title: "รวม",
        align: "center",
        children: [
          {
            title: "MTC",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "mtcTrafficTotal",
                key: "mtcTrafficTotal",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "mtcRevenueTotal",
                key: "mtcRevenueTotal",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          },
          {
            title: "ETC",
            align: "center",
            children: [
              {
                title: "ปริมาณ",
                dataIndex: "etcTrafficTotal",
                key: "etcTrafficTotal",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              },
              {
                title: "รายได้",
                dataIndex: "etcRevenueTotal",
                key: "etcRevenueTotal",
                width: 50,
                align: "center",
                render: (text, record) => (
                  <div
                    style={{ textAlign: "right", cursor: "pointer" }}
                  >
                    {_isNull(text)}
                  </div>
                ),
              }
            ],
          }
        ],
      },
      {
        title: "รวมทั้งหมด",
        align: "center",
        children: [
          {
            title: "ปริมาณ",
            dataIndex: "trafficTotal",
            key: "trafficTotal",
            width: 50,
            align: "center",
            render: (text, record) => (
              <div
                style={{ textAlign: "right", cursor: "pointer" }}
              >
                {_isNull(text)}
              </div>
            ),
          },
          {
            title: "รายได้",
            dataIndex: "revenueTotal",
            key: "revenueTotal",
            width: 50,
            align: "center",
            render: (text, record) => (
              <div
                style={{ textAlign: "right", cursor: "pointer" }}
              >
                {_isNull(text)}
              </div>
            ),
          },
        ],
      }
    ];


    const secondColumn = [
      {
        title: "รถยกเว้น",
        dataIndex: "trafficExempt",
        key: "trafficExempt",
        width: 40,
        align: "center",
        fixed: false,
        render: (text, record) => (
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            {_isNull(text)}
          </div>
        ),
      },
      {
        title: "บัตร DMT",
        dataIndex: "trafficDmt",
        key: "trafficDmt",
        width: 40,
        align: "center",
        fixed: false,
        render: (text, record) => (
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            {_isNull(text)}
          </div>
        ),
      },
      {
        title: "รถขบวน",
        dataIndex: "trafficHpmc",
        key: "trafficHpmc",
        width: 40,
        align: "center",
        fixed: false,
        render: (text, record) => (
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            {_isNull(text)}
          </div>
        ),
      },
      {
        title: "รถฝ่าด่าน",
        dataIndex: "trafficVio",
        key: "trafficVio",
        width: 40,
        align: "center",
        fixed: false,
        render: (text, record) => (
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            {_isNull(text)}
          </div>
        ),
      },
      {
        title: "อื่นๆ",
        dataIndex: "trafficOther",
        key: "trafficOther",
        width: 40,
        align: "center",
        fixed: false,
        render: (text, record) => (
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            {_isNull(text)}
          </div>
        ),
      },
      {
        title: "รวม",
        dataIndex: "trafficTotal",
        key: "trafficTotal",
        width: 40,
        align: "center",
        fixed: false,
        render: (text, record) => (
          <div
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            {_isNull(text)}
          </div>
        ),
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
          dataSource={this.props.dataFisrtTable}
          bordered
          size="small"
          className={`print-size print-border`}
          pagination={false}
          columns={fisrtColumn}
          summary={null}
        />

        <Row style={{ marginTop: 10 }} align='middle' justify='space-between'>
          <Col span={16}>
            <Table
              rowKey={(record, index) => index}
              dataSource={this.props.dataSecondTable}
              bordered
              size="small"
              className={`print-size print-border`}
              pagination={false}
              columns={secondColumn}
              summary={null}
            />
          </Col>
        </Row>

      </div>
    );
  }
}


export default ComponentToPrint;