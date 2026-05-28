import React from 'react';
import { Table, Row, Col } from 'antd'
import {
  _isNull,
  // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {
    const SumValueColumn = (obj) => {
      let sum = 0;
      sum = obj.totalCach + obj.totalCoupon + obj.totalEmv + obj.totalEpass + obj.totalMpass + obj.totalQr

      return sum
    }
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const fisrtColumn = [
      {
        title: <b>Plaza</b>,
        key: "plazaName",
        dataIndex: "plazaName",
        align: "center",
        width: 70,
        render(text, record) {
          return {
            children: text === "Total" || text === "Percent" ? (
              <div style={{ textAlign: 'right' }}>
                <b>{_isNull(text)}</b>
              </div>
            ) : (
              <div style={{ textAlign: 'left' }}>
                {_isNull(text)}
              </div>
            ),
          };
        }
      },
      {
        title: <b>AM</b>,
        key: "",
        align: "center",
        children: [
          {
            title: <b>CASH</b>,
            key: "amCach",
            dataIndex: "amCach",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
            // render: (text) => (
            //   <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            // ),
          },
          {
            title: <b>Coupon</b>,
            key: "amCoupon",
            dataIndex: "amCoupon",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>EMV</b>,
            key: "amEmv",
            dataIndex: "amEmv",
            align: "center",
            width: 30,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>QRCode</b>,
            key: "amQr",
            dataIndex: "amQr",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>Mpass</b>,
            key: "amMpass",
            dataIndex: "amMpass",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>EasyPass</b>,
            key: "amEpass",
            dataIndex: "amEpass",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
        ],
      },
      {
        title: <b>รวมกะเช้า</b>,
        key: "amTotal",
        dataIndex: "amTotal",
        align: "center",
        width: 40,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
              : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>PM</b>,
        key: "",
        align: "center",
        children: [
          {
            title: <b>CASH</b>,
            key: "pmCach",
            dataIndex: "pmCach",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>Coupon</b>,
            key: "pmCoupon",
            dataIndex: "pmCoupon",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>EMV</b>,
            key: "pmEmv",
            dataIndex: "pmEmv",
            align: "center",
            width: 30,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>QRCode</b>,
            key: "pmQr",
            dataIndex: "pmQr",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>Mpass</b>,
            key: "pmMpass",
            dataIndex: "pmMpass",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>EasyPass</b>,
            key: "pmEpass",
            dataIndex: "pmEpass",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
        ],
      },
      {
        title: <b>รวมกะบ่าย</b>,
        key: "pmTotal",
        dataIndex: "pmTotal",
        align: "center",
        width: 40,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
              : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
      {
        title: <b>Night</b>,
        key: "",
        align: "center",
        children: [
          {
            title: <b>CASH</b>,
            key: "nightCach",
            dataIndex: "nightCach",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>Coupon</b>,
            key: "nightCoupon",
            dataIndex: "nightCoupon",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>EMV</b>,
            key: "nightEmv",
            dataIndex: "nightEmv",
            align: "center",
            width: 30,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>QRCode</b>,
            key: "nightQr",
            dataIndex: "nightQr",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>Mpass</b>,
            key: "nightMpass",
            dataIndex: "nightMpass",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
          {
            title: <b>EasyPass</b>,
            key: "nightEpass",
            dataIndex: "nightEpass",
            align: "center",
            width: 40,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              return obj;
            }
          },
        ],
      },
      {
        title: <b>รวมกะดึก</b>,
        key: "nightTotal",
        dataIndex: "nightTotal",
        align: "center",
        width: 40,
        render: (value, row, index) => {
          const obj = {
            children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
              : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
            props: {}
          };
          return obj;
        }
      },
    ]

    const secondColumn = [
      {
        title: <b>Plaza</b>,
        key: "plazaName",
        dataIndex: "plazaName",
        align: "center",
        width: 80,
        ellipsis: true,
        render(text, record) {
          return {
            // props: {
            //     className: "secondary bg_default",
            //   },
            children: text === "Total" || text === "Grand Total" || text === "Percent" ? (
              <div style={{ textAlign: 'right' }}>
                <b>{_isNull(text)}</b>
              </div>
            ) : (
              <div style={{ textAlign: 'left' }}>
                {_isNull(text)}
              </div>
            ),
          };
        }
      },
      {
        title: <b>Total</b>,
        key: "",
        align: "center",
        children: [
          {
            title: <b>CASH</b>,
            key: "totalCach",
            dataIndex: "totalCach",
            align: "center",
            width: 60,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.plazaName === "Grand Total"
                    ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}><i>{_isNull(row.totalSum)}</i></div>
                    : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                      : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.plazaName === "Grand Total") { obj.props.colSpan = 7; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
            }
          },
          {
            title: <b>Coupon</b>,
            key: "totalCoupon",
            dataIndex: "totalCoupon",
            align: "center",
            width: 60,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
            }
          },
          {
            title: <b>EMV</b>,
            key: "totalEmv",
            dataIndex: "totalEmv",
            align: "center",
            width: 60,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
            }
          },
          {
            title: <b>QRCode</b>,
            key: "totalQr",
            dataIndex: "totalQr",
            align: "center",
            width: 60,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
            }
          },
          {
            title: <b>Mpass</b>,
            key: "totalMpass",
            dataIndex: "totalMpass",
            align: "center",
            width: 60,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
            }
          },
          {
            title: <b>EasyPass</b>,
            key: "totalEpass",
            dataIndex: "totalEpass",
            align: "center",
            width: 60,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                props: {}
              };
              if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
            }
          },
          {
            title: <b>Total</b>,
            key: "",
            dataIndex: "",
            align: "center",
            width: 60,
            render: (value, row, index) => {
              const obj = {
                children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(SumValueColumn(row))}</i></b></div>
                  : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(SumValueColumn(row))).toFixed(2)}</div>
                    : <div style={{ textAlign: "right" }}>{_isNull(SumValueColumn(row))}</div>,
                props: {}
              };
              if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
            }
          },
        ],
      },
    ]
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        {this.props.rowPerPage < 13 ?
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
            <Col span={8}>
              <Row justify='center'>
                <div style={{ textAlign: 'left' }}>
                  <div>Cash = รายได้นำส่ง (TOD)</div>
                  <div>Coupon = รายได้นำส่ง (TOD)</div>
                  <div>EMV = รายได้ที่นับได้จากระบบ (SOD)</div>
                  <div>QRCode = รายได้ที่นับได้จากระบบ (SOD)</div>
                  <div>EasyPass = รายได้ที่นับได้จากระบบ (SOD)</div>
                  <div>M-Pass = รายได้ที่นับได้จากระบบ (SOD)</div>
                </div>
              </Row>
            </Col>
          </Row>
          :
          <>
            <div className="page-break"></div>
            <PrintHeader
              {...this.props.HeaderBar}
              page={2}
              pageTotal={2}
            />
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
          </>
        }
      </div>
    );
  }
}


export default ComponentToPrint;