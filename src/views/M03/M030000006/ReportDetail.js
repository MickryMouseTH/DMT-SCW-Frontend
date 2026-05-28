/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useReactToPrint } from "react-to-print";
import { Typography, Table, Button, Card, Row, Col } from 'antd'
import Skeleton from "../../../components/loading/Loading"

import { _isEmpty, _isNull, _setYearThai } from '../../../tools/util'
import { GET_DATA_DETAIL_M030000006 } from '../../../service/api/report'
import FormDefault from "../../../components/form/FormDefault";
import DetailToPrint from "./DetailToPrint";
const { Text } = Typography;

const ReportDetail = (props) => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false);
  const [cashList, setcashList] = useState([])
  const [couponBookList, setCouponBookList] = useState([])
  const [couponList, setCouponList] = useState([])
  const [cardAllowList, setCardAllowList] = useState([])

  useEffect(() => {
    CheckSeckey()
    // (_isEmpty(props.location.state) ? _isEmpty(props.location.state.item) ? goBack() : getDataInfo(props.location.state.item): getDataInfo(props.location.state.item))
  }, [])

  const CheckSeckey = () => {
    if (props.location.state) {
      if (props.location.state.item) {
        getDataInfo(props.location.state.item)
      } else {
        goBack()
      }
    } else {
      goBack()
    }
  }
  const goBack = () => {
    props.history.push({
      pathname: `/reports/tod-reports`,
      value: props.location.value,
      currentPage: props.location.currentPage,
      dataToPrint: props.location.dataToPrint
    });
  }

  const getDataInfo = async (data = null) => {
    const dataDetail = {
      seckey: data
    }
    try {
      setLoading(true)
      const res = await GET_DATA_DETAIL_M030000006(dataDetail, props.auth.token)
      if (res.status.code === "S200") {
        setLoading(false)
        setDataSource(res)
        setcashList(_isEmpty(res.cashList) ? [] : res.cashList)
        setCouponBookList(_isEmpty(res.couponBookList) ? [] : res.couponBookList)
        setCouponList(_isEmpty(res.couponList) ? [] : res.couponList)
        setCardAllowList(_isEmpty(res.cardAllowList) ? [] : res.cardAllowList)
      } else {
        goBack()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const crashListColumn = [
    {
      title: 'ประเภทเงิน',
      dataIndex: 'currencyType',
      key: 'currencyType',
      width: '100px',
      render: (text) => <div className="text-left">{text}</div>
    },
    {
      title: 'จำนวนเงิน เหรียญ/ฉบับ',
      dataIndex: 'number',
      key: 'number',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-right">{text}</div>
    },
    {
      title: 'จำนวนเงินรวม(บาท)',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-right">{new Intl.NumberFormat().format(text)}</div>
    },

  ];

  const couponBookListColum = [
    {
      title: 'ประเภทคูปอง',
      dataIndex: 'couponType',
      key: 'couponType',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-left">{text}</div>
    },
    {
      title: 'จำนวนเล่ม',
      dataIndex: 'number',
      key: 'number',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-right">{text}</div>
    },
    {
      title: 'มูลค่ารวม(บาท)',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-right">{new Intl.NumberFormat().format(text)}</div>
    },
  ];

  const cardAllowListColumn = [
    {
      title: 'ประเภทรถ',
      dataIndex: 'cardType',
      key: 'cardType',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-left">{text}</div>
    },
    {
      title: 'จำนวนใบ',
      dataIndex: 'number',
      key: 'number',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-right">{text}</div>
    }
  ];

  const couponListcolumn = [
    {
      title: 'ประเภทคูปอง',
      dataIndex: 'couponType',
      key: 'couponType',
      width: '100px',
      align: 'center',
      render: (text) => <div className="text-left">{text}</div>
    },
    {
      title: 'จำนวนใบ',
      dataIndex: 'number',
      key: 'number',
      width: '100px',
      align: 'center',
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
      couponType: "30 บาท",
      number: 0,
    },
    {
      couponType: "35 บาท",
      number: 0,
    },
    {
      couponType: "70 บาท",
      number: 0,
    },
    {
      couponType: "80 บาท",
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
      couponType: "35 บาท",
      number: 0,
      totalAmount: 0,
    },
    {
      couponType: "80 บาท",
      number: 0,
      totalAmount: 0,
    },
  ]
  // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handlePrintFile = () => {
    handlePrint();
  };

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        // disabled: dataDetail.list.length < 1,
      },
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: ["3.6 Tod Report Detail"],
  });

  return (
    <Skeleton loading={loading} active>
      <Row className="d-flex  justify-content-between">
        <Button onClick={goBack} className="m-15 ml-0 back-button-custom">
          Back
        </Button>
        <FormDefault
          className="text-right button-detail-mt-0"
          submitButton={false}
          actionBoutton={action}
        />
      </Row>
      <div className="d-none">
        <DetailToPrint className="BillPDF"
          ref={componentRef} data={dataSource}
          cash={cashList} couponBook={couponBookList}
          coupon={couponList} card={cardAllowList} />
      </div>

      <div className="mt-30 d-flex justify-content-center">
        <Card className="w-60">
          <Row>
            <Col span={4}><img src="/assets/img/brand/logo.jpg" alt="logo" style={{ width: '100%', marginTop: '-15px' }} /></Col>
            <Col span={16} className="text-center">
              <span style={{ fontSize: '25px', fontWeight: '900', textAlign: 'center' }}>
                บริษัท ทางยกระดับดอนเมือง จำกัด<br />
                ใบนำส่งรายได้จัดเก็บค่าผ่านทาง</span>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between mb-20 mt-5">
            <Col span={11}>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>ด่าน</Col>
                <Col span={13}>{dataSource.plazaName}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>รหัสพนักงาน</Col>
                <Col span={13}>{dataSource.staffId}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>รายได้วันที่</Col>
                <Col span={13}>{_setYearThai(dataSource.operationDate,"DD/MM/YYYY")}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>วันที่เริ่มต้นกะ</Col>
                <Col span={13}>{_setYearThai(dataSource.bojDateTime,"DD/MM/YYYY HH:mm:ss")}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={11}>หมายเลขถุงเงิน</Col>
                <Col span={13}>{dataSource.bagNumber}</Col>
              </Row>
            </Col>
            <Col span={12} className="pl-20">
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>ช่องทางที่</Col>
                <Col span={12}>{dataSource.lane}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>ชื่อพนักงาน</Col>
                <Col span={12}>{dataSource.staffName}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>กะ</Col>
                <Col span={12}>{dataSource.shiftType}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>วันที่สิ้นสุดกะ</Col>
                <Col span={12}>{_setYearThai(dataSource.eojDateTime,"DD/MM/YYYY HH:mm:ss")}</Col>
              </Row>
              <Row className="d-flex justify-content-between mb-5">
                <Col span={12}>หมายเลขเข็มขัดนิรภัย</Col>
                <Col span={12}>{dataSource.safetyBeltNumber}</Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-10">
            <Col span={12}>
              {/* {_isEmpty(cashList) ? "":<> */}
              <Row>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>รายได้รวมทั้งหมด</span>
              </Row>
              <Row >
                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mb-10 mt-5"
                  dataSource={_isEmpty(cashList) ? crash : cashList}
                  columns={crashListColumn}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let totalTotalAmount = 0;

                    cashList.forEach(({ totalAmount }) => {
                      totalTotalAmount += totalAmount;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={2} className="text-right">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right">
                            <Text>{_isEmpty(cashList) ? '0' : _isNull(Number(totalTotalAmount))}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </Row>
              {/* </>} */}
              <div className="mt-10 mb-5">
                <span style={{ fontSize: '15px', fontWeight: '600' }} className="mr-40">รายได้อื่นๆ</span>
                {_isNull(Number(dataSource.otherTotalAmount))} บาท
                </div>
              <div className="ml-10">
                หมายเหตุ: {dataSource.otherRemark}
              </div>
              <div className="mt-10 mb-5">
                <span style={{ fontSize: '15px', fontWeight: '600' }} className="mr-40">เงินรับฝาก</span>
                {_isNull(Number(dataSource.nonRevenue))} บาท
                </div>
              <div className="ml-10">
                หมายเหตุ: {dataSource.nonRevenueRemark}
              </div>
            </Col>
            <Col span={12}>
              {/* {_isEmpty(couponBookList) ? "" :<> */}
              <span className="pl-50" style={{ fontSize: '14px', fontWeight: '600' }}>การขายคูปอง</span>
              <Row className="pl-50  mb-20">

                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mt-5"
                  dataSource={_isEmpty(couponBookList) ? couponSell : couponBookList}
                  columns={couponBookListColum}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let sumTotalAmount = 0;

                    couponBookList.forEach(({ totalAmount }) => {
                      sumTotalAmount += totalAmount;
                    });
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={2} className="text-right">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right">
                            <Text>{_isEmpty(couponBookList) ? '0' : _isNull(Number(sumTotalAmount))}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </Row>
              {/* </>}  */}
              {/* {_isEmpty(couponList) ? "" : <> */}
              <div className="pl-50" style={{ marginRight: '16px', fontSize: '14px', fontWeight: '600' }}>การใช้คูปอง</div>
              <Row className="d-flex justify-content-start pl-50  mb-20">
                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mt-5"
                  dataSource={_isEmpty(couponList) ? coupon : couponList}
                  columns={couponListcolumn}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let totalTotalnumber = 0;

                    couponList.forEach(({ number }) => {
                      totalTotalnumber += number;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={1} className="text-right">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right">
                            <Text>{_isEmpty(couponList) ? '0' : _isNull(Number(totalTotalnumber))}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </Row>
              {/* </>} */}
              {/* {_isEmpty(cardAllowList) ? "" : <> */}
              <span className="pl-50" style={{ fontSize: '14px', fontWeight: '600' }}>บัตรอนุญาตผ่านทาง</span>
              <Row className="d-flex justify-content-start pl-50  mb-20">

                <Table
                  size="small"
                  rowKey={(row, ind) => ind}
                  className="text-center mt-5"
                  dataSource={_isEmpty(cardAllowList) ? cardList : cardAllowList}
                  columns={cardAllowListColumn}
                  pagination={false}
                  bordered={true}
                  hover={false}
                  summary={() => {
                    let totalTotalnumber = 0;
                    cardAllowList.forEach(({ number }) => {
                      totalTotalnumber += number;
                    })
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={1} className="text-right">
                            ยอดรวม
                        </Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={1} className="text-right">
                            <Text>{_isEmpty(cardAllowList) ? '0' : _isNull(Number(totalTotalnumber))}</Text>
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
          <div className="mb-80">
            หมายเหตุ: {dataSource.remark}
          </div>
          <Row className="d-flex justify-content-between mb-5">
            <Col>
              <div className="mb-10">ลายมือชื่อ</div>
              <Row>
                <Col className="mb-10 mr-50">ชื่อ</Col>
                <Col className="mb-10">{dataSource.staffName}</Col>
              </Row>
              <Row>
                <Col className="mb-10 mr-50">ตำเเหน่ง</Col>
                <Col className="mb-10">{dataSource.staffPosition}</Col>
              </Row>
            </Col>
            <Col>
              <div className="mb-10">ลายมือชื่อ</div>
              <Row>
                <Col className="mb-10 mr-50">ชื่อ</Col>
                <Col className="mb-10">{dataSource.chiefName}</Col>
              </Row>
              <Row>
                <Col className="mb-10 mr-50">ตำเเหน่ง</Col>
                <Col className="mb-5">{dataSource.chiefPosition}</Col>
              </Row>
            </Col>
          </Row>
          <div>
          DMT-FM-OC-005 /REV 0.0
          </div>
        </Card>
      </div>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)
