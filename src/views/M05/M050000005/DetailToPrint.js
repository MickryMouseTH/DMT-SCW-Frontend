import React from 'react';
import { Table, Card, Row, Col, Typography } from 'antd'
import { _isNull, _isEmpty, _setYearThai } from '../../../tools/util';
import "./portrait.css"
const { Text } = Typography;


const crashListColumn = [
  {
    title: 'ประเภทเงิน',
    dataIndex: 'currencyType',
    key: 'currencyType',
    width: '200px',
    className: 'font-10',
    render: (text) => <div className="text-left">{text}</div>
  },
  {
    title: 'จำนวนเงิน เหรียญ/ฉบับ',
    dataIndex: 'number',
    key: 'number',
    width: '300px',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{text}</div>
  },
  {
    title: 'จำนวนเงินรวม(บาท)',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: '200px',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{new Intl.NumberFormat().format(text)}</div>
  },

];

const couponBookListColum = [
  {
    title: 'ประเภทคูปอง',
    dataIndex: 'couponType',
    key: 'couponType',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-left">{text}</div>
  },
  {
    title: 'จำนวนเล่ม',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{text}</div>
  },
  {
    title: 'มูลค่ารวม(บาท)',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{new Intl.NumberFormat().format(text)}</div>
  },
];

const cardAllowListColumn = [
  {
    title: 'ประเภทรถ',
    dataIndex: 'cardType',
    key: 'cardType',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-left">{text}</div>
  },
  {
    title: 'จำนวนใบ',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{text}</div>
  }
];

const couponListcolumn = [
  {
    title: 'ประเภทคูปอง',
    dataIndex: 'couponType',
    key: 'couponType',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-left">{text}</div>
  },
  {
    title: 'จำนวนใบ',
    dataIndex: 'number',
    key: 'number',
    align: 'center',
    className: 'font-10',
    render: (text) => <div className="text-right">{text}</div>
  }
];

// MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const crash = [
  {
    currencyType: "1 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "2 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "5 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "10 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "20 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "50 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "100 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "500 บาท ",
    number: 0,
    totalAmount: 0,
  },
  {
    currencyType: "1,000 บาท ",
    number: 0,
    totalAmount: 0,
  },
];

const coupon = [
  {
    couponType: "คูปอง 30 บาท",
    number: 0,
  },
  {
    couponType: "คูปอง 35 บาท",
    number: 0,
  },
  {
    couponType: "คูปอง 70 บาท",
    number: 0,
  },
  {
    couponType: "คูปอง 80 บาท",
    number: 0,
  },
]

const cardList = [
  {
    cardType: "บัตร DMT (ป 1)",
    number: 0,
  },
  {
    cardType: "บัตร DMT (ป 2)",
    number: 0,
  },
]

const couponSell = [
  {
    couponType: "คูปอง 35 บาท",
    number: 0,
    totalAmount: 0,
  },
  {
    couponType: "คูปอง 80 บาท",
    number: 0,
    totalAmount: 0,
  },
]
// MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class ComponentToPrint extends React.Component {

  render() {
    return (
      <div className=" d-flex justify-content-center">
        <Card className="w-100 font-10">
          <Row>
            <Col span={4}><img src="/assets/img/brand/logo.jpg" alt="logo" style={{ width: '60%', marginTop: '-15px' }} /></Col>
            <Col span={16} className="text-center mb-10" style={{ marginTop: '-10px' }}>
              <span style={{ fontSize: '20px', fontWeight: '900', textAlign: 'center' }}>
                บริษัท ทางยกระดับดอนเมือง จำกัด<br />
                ใบนำส่งรายได้จัดเก็บค่าผ่านทาง</span>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between mb-20 mt-5">
            <Col span={11}>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>ด่าน</Col>
                <Col span={13}>{this.props.data.plazaName}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>รหัสพนักงาน</Col>
                <Col span={13}>{this.props.data.staffId}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>รายได้วันที่</Col>
                <Col span={13}>{_setYearThai(this.props.data.operationDate,"DD/MM/YYYY")}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>วันที่เริ่มต้นกะ</Col>
                <Col span={13}>{_setYearThai(this.props.data.bojDateTime,"DD/MM/YYYY HH:mm:ss")}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>หมายเลขถุงเงิน</Col>
                <Col span={13}>{this.props.data.bagNumber}</Col>
              </Row>
            </Col>
            <Col span={12} className="pl-20">
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>ช่องทางที่</Col>
                <Col span={12}>{this.props.data.lane}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>ชื่อพนักงาน</Col>
                <Col span={12}>{this.props.data.staffName}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>กะ</Col>
                <Col span={12}>{this.props.data.shiftType === 'SHIFT 1' ? 'เช้า' : this.props.data.shiftType === 'SHIFT 2' ? 'บ่าย' : 'เย็น'}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>วันที่สิ้นสุดกะ</Col>
                <Col span={12}>{_setYearThai(this.props.data.eojDateTime,"DD/MM/YYYY HH:mm:ss")}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>หมายเลขเข็มขัดนิรภัย</Col>
                <Col span={12}>{this.props.data.safetyBeltNumber}</Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-10">
            <Col span={12}>
              {/* {_isEmpty(this.props.cash) ? "" : */}
              <Row >
                <span className="font-headTable">รายได้รวมทั้งหมด</span>
                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mb-10 mt-5 detail-tod-border"
                  dataSource={_isEmpty(this.props.cash) ? crash : this.props.cash}
                  columns={crashListColumn}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let totalTotalAmount = 0;

                    this.props.cash.forEach(({ totalAmount }) => {
                      totalTotalAmount += totalAmount;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={2} className="text-right font-10">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right font-10">
                            <Text>{new Intl.NumberFormat().format(totalTotalAmount)}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </Row>
              {/* } */}
              <div className="mt-10 mb-5">
                <span className="mr-40 font-headTable">รายได้อื่นๆ</span> {_isNull(Number(this.props.data.otherTotalAmount))} บาท
                  {/* {new Intl.NumberFormat().format(this.props.data.otherTotalAmount)} */}
              </div>
              <div className="ml-10 font-10">
                หมายเหตุ: {this.props.data.remark}
              </div>
            </Col>
            <Col span={12}>
              {/* {_isEmpty(this.props.couponBook) ? "" : <> */}

              <span className="pl-50 font-headTable" >การขายคูปอง</span>
              <Row className="pl-50 ">

                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mt-5 detail-tod-border"
                  dataSource={_isEmpty(this.props.couponBook) ? couponSell : this.props.couponBook}
                  columns={couponBookListColum}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let sumTotalAmount = 0;

                    this.props.couponBook.forEach(({ totalAmount }) => {
                      sumTotalAmount += totalAmount;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={2} className="text-right font-10">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right font-10">
                            <Text>{_isEmpty(this.props.couponBook) ? '0' : _isNull(Number(sumTotalAmount))}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </Row>

              {/* </>}  */}
              {/* {_isEmpty(this.props.coupon) ? "" : <> */}

              <div className="pl-50 font-headTable" style={{ marginTop: '5px' }}>การใช้คูปอง</div>
              <Row className="d-flex justify-content-start pl-50" style={{ marginBottom: '5px' }}>
                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mt-5 detail-tod-border"
                  dataSource={_isEmpty(this.props.coupon) ? coupon : this.props.coupon}
                  columns={couponListcolumn}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let totalTotalnumber = 0;

                    this.props.coupon.forEach(({ number }) => {
                      totalTotalnumber += number;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={1} className="text-right font-10">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right font-10">
                            <Text>{_isEmpty(this.props.coupon) ? '0' : _isNull(Number(totalTotalnumber))}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </Row>
              {/* </>}  */}

              {/* {_isEmpty(this.props.card) ? "" : <> */}
              <span className="pl-50 font-headTable">บัตรอนุญาตผ่านทาง</span>
              <Row className="d-flex justify-content-start pl-50  mb-10">
                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mt-5 detail-tod-border"
                  dataSource={_isEmpty(this.props.card) ? cardList : this.props.card}
                  columns={cardAllowListColumn}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let totalTotalnumber = 0;
                    this.props.card.forEach(({ number }) => {
                      totalTotalnumber += number;
                    });
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={1} className="text-right font-10">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right font-10">
                            <Text>{_isEmpty(this.props.card) ? '0' : _isNull(Number(totalTotalnumber))}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </Row>
              {/* </>} */}
            </Col>
          </Row>
          <div style={{ marginTop: '15px', marginBottom: '10px' }}>
            หมายเหตุ:
          </div>
          <Row className="d-flex justify-content-between mb-5">
            <Col>
              <div className="mb-5">ลายมือชื่อ</div>
              <Row>
                <Col className="mb-5 mr-50">ชื่อ</Col>
                <Col className="mb-5">{this.props.data.staffName}</Col>
              </Row>
              <Row>
                <Col className="mb-5 mr-50">ตำเเหน่ง</Col>
                <Col className="mb-5">{this.props.data.staffPosition}</Col>
              </Row>
            </Col>
            <Col>
              <div className="mb-5">ลายมือชื่อ</div>
              <Row>
                <Col className="mb-5 mr-50">ชื่อ</Col>
                <Col className="mb-5">{this.props.data.chiefName}</Col>
              </Row>
              <Row>
                <Col className="mb-5 mr-50">ตำเเหน่ง</Col>
                <Col className="mb-5">{this.props.data.chiefPosition}</Col>
              </Row>
            </Col>
          </Row>
          <div>
          DMT-FM-OC-005 /REV 0.0
          </div>
        </Card>
      </div>
    );
  }
}


export default ComponentToPrint;