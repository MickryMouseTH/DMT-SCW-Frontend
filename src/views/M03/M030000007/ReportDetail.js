/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useReactToPrint } from "react-to-print";
import { Table, Button, Card, Row, Col } from 'antd'
import Skeleton from "../../../components/loading/Loading"

import { _isEmpty } from '../../../tools/util'
import { GET_DATA_DETAIL_M030000007 } from '../../../service/api/report'
import FormDefault from "../../../components/form/FormDefault";
import DetailToPrint from "./RportDetailToPrint"
// import moment from "moment";
// const { Text } = Typography;

const ReportDetail = (props) => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false);
  // const [List, setList] = useState([])

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
      pathname: `/reports/event-by-staff-lane-shift`,
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
      const res = await GET_DATA_DETAIL_M030000007(dataDetail, props.auth.token)
      if (res.status.code === "S200") {
        setLoading(false)
        setDataSource(addIndex(res))
      } else {
        goBack()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return {
        ...item, index: index + 1, mixedOrganVehicle: item.organization + ',' + item.vehicleNumber
        , mixedColorModel: item.color + ',' + item.model
      }
    })
    return { ...res, list: list, shiftName: res.shift }
  }

  //ColumnDaTa ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const HeaderColumnOne = [{
    title: "สัญญาณดัง อันเกิดจากรถยกเว้น",
    align: "center",
    className: 'fontHeader',
    children: [
      {
        title: 'เวลา',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'ประเภทรถ',
        dataIndex: 'typeCar',
        key: 'typeCar',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'ประเภทยกเว้น',
        dataIndex: 'typeCar',
        key: 'typeCar',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'จำนวนคัน',
        dataIndex: 'typeCar',
        key: 'typeCar',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'องค์กร เเละ เลขทะเบียน',
        dataIndex: 'mixedOrganVehicle',
        key: 'mixedOrganVehicle',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
    ]
  }];

  const HeaderColumnTwo = [{
    title: "สัญญาณดัง เก็บเงินได้",
    align: "center",
    className: 'fontHeader',
    children: [
      {
        title: 'เวลา',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'ประเภทรถ',
        dataIndex: 'typeCar',
        key: 'typeCar',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'หมายเหตุ',
        dataIndex: 'event',
        key: 'event',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'เวลา',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'ประเภทรถ',
        dataIndex: 'typeCar',
        key: 'typeCar',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'หมายเหตุ',
        dataIndex: 'event',
        key: 'event',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
    ]
  }];

  const HeaderColumnThree = [{
    title: "สัญญาณดัง เก็บเงินไม่ได้-รถส่วนราชการ",
    align: "center",
    className: 'fontHeader',
    children: [
      {
        title: 'เวลา',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'ประเภทรถ',
        dataIndex: 'typeCar',
        key: 'typeCar',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'จำนวนคัน',
        dataIndex: 'number',
        key: 'number',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
      {
        title: 'องค์กร เเละ เลขทะเบียน',
        dataIndex: 'mixedOrganVehicle',
        key: 'mixedOrganVehicle',
        align: 'center',
        render: (text) => <div className="text-center">{text}</div>
      },
    ]
  }];

  const HeaderColumnFour = [
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (text) => <div className="text-center">{text}</div>
    },
    {
      title: 'รายการอื่น',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      className: 'fontHeader',
      render: (text) => <div className="text-center">{text}</div>
    },
  ];

  const HeaderColumnFive = [{
    title: "รถฝ่าด่าน ปฏิเสทการชำระเงิน",
    align: "center",
    className: 'fontHeader',
    children: [
      {
        title: 'เวลา',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        render: (text) => <div className="text-left">{text}</div>
      },
      {
        title: 'ประเภทรถ',
        dataIndex: 'typeCar',
        key: 'typeCar',
        align: 'center',
        render: (text) => <div className="text-right">{text}</div>
      },
      {
        title: 'เลขทะเบียน',
        dataIndex: 'vehicleNumber',
        key: 'vehicleNumber',
        align: 'center',
        render: (text) => <div className="text-right">{text}</div>
      },
      {
        title: 'สี เเละ ยี่ห้อ',
        dataIndex: 'mixedColorModel',
        key: 'mixedColorModel',
        align: 'center',
        render: (text) => <div className="text-right">{text}</div>
      },
      {
        title: 'หมายเหตุ',
        dataIndex: 'remark',
        key: 'remark',
        align: 'center',
        width: 30,
        render: (text) => <div className="text-right">{text}</div>
      },
    ]
  }];

  //ColumnDaTa ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const boxOne = [
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      currencyType: 0,
      number: 0,
      totalAmount: 0,
    },
  ];

  const boxTwo = [
    {
      couponType: 0,
      number: 0,
    },
    {
      couponType: 0,
      number: 0,
    },
    {
      couponType: 0,
      number: 0,
    },
    {
      couponType: 0,
      number: 0,
    },
  ]

  const boxThree = [
    {
      cardType: 0,
      number: 0,
    },
    {
      cardType: 0,
      number: 0,
    },
    {
      cardType: 0,
      number: 0,
    },
    {
      cardType: 0,
      number: 0,
    },
    {
      cardType: 0,
      number: 0,
    },
    {
      cardType: 0,
      number: 0,
    },
  ]

  const boxFour = [
    {
      couponType: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
      totalAmount: 0,
    },
  ]

  const boxFive = [
    {
      couponType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
      number: 0,
      totalAmount: 0,
    },
    {
      couponType: 0,
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
    documentTitle: ["3.7 Event By Staff Lane Shift Detail"],
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
          ref={componentRef} data={dataSource} />
      </div>

      <div className="mt-20 d-flex justify-content-center mb-80">
        <Card className="paperPdf_width">
          <Row className="d-flex justify-content-center align-items-center border-header-pdf">
            <Col span={4}><img src="/assets/img/brand/logo.jpg" alt="logo" style={{ width: '50%' }} /></Col>
            <Col span={14} className="text-left">
              <span style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center' }}>
                บมจ. ทางยกระดับดอนเมือง</span>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pt-5 pb-5">
            <span style={{ fontSize: '25px', fontWeight: '900' }}>
              ใบบันทึกเหตุการณ์</span>
          </Row>
          <Row className="pb-10 pt-10">
            วัน<span className="border-line-dot" style={{ width: '100px' }}>{dataSource.day}</span>
            ที่<span className="border-line-dot" style={{ width: '90px' }}>{dataSource.date}</span>
            เดือน<span className="border-line-dot" style={{ width: '120px' }}>{dataSource.month}</span>
            พ.ศ.<span className="border-line-dot" style={{ width: '100px' }}>{dataSource.year}</span>
           ด่าน<span className="border-line-dot" style={{ width: '155px' }}>{dataSource.plazaName}</span>
          </Row>
          <Row className="pb-10">
            ชื่อ-สกุล<span className="border-line-dot" style={{ width: '190px' }}>{dataSource.staffName}</span>
           รหัสบัตร<span className="border-line-dot" style={{ width: '150px' }}>{dataSource.staffId}</span>
            กะ<span className="border-line-dot" style={{ width: '80px' }}>{dataSource.shiftName}</span>
           ช่องทาง<span className="border-line-dot" style={{ width: '90px' }}>{dataSource.laneName}</span>
          </Row>
          <Row>
            <Col span={11} className="h-100">
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center"
                dataSource={_isEmpty(dataSource.list) ? boxOne : dataSource.list}
                columns={HeaderColumnOne}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
            <Col span={13} className="h-100">
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center"
                dataSource={_isEmpty(dataSource.list) ? boxTwo : dataSource.list}
                columns={HeaderColumnTwo}
                pagination={false}
                bordered={true}
                hover={false}
              />
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center "
                dataSource={_isEmpty(dataSource.list) ? boxThree : dataSource.list}
                columns={HeaderColumnThree}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center"
                dataSource={_isEmpty(dataSource.list) ? boxFour : dataSource.list}
                columns={HeaderColumnFour}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
            <Col span={13}>
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                className="text-center"
                dataSource={_isEmpty(dataSource.list) ? boxFive : dataSource.list}
                columns={HeaderColumnFive}
                pagination={false}
                bordered={true}
                hover={false}
              />
            </Col>
          </Row>
          {/* <Row>
            <div className="wrapper">
              <h3 className="text-90dgree">Header One</h3>
              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat aliquam deserunt harum rem earum assumenda perspiciatis expedita. Aliquid distinctio tenetur fugiat qui recusandae obcaecati voluptates.</p>
              </div>
            </div>
          </Row> */}
        </Card>
      </div>
    </Skeleton >
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)
