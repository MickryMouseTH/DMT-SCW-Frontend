/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table, Button, Modal, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M060000016E, GET_DATA_INFO_M060000016E_getPaymentmethodListAPI } from "../../../service/api/report";
import {
  getTSBList_API
} from "../../../service/api/util";
import {
  _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai
} from "../../../tools/util";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;
const ReportTrafficDiffBank = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [tsbList, setTsbList] = useState([]);
  const [paymentmethodList, setsPaymentmethodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([])
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "operationDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.operationDate,
      },
    },
    {
      type: "select",
      option: {
        name: "paymentmethodId",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "ประเภทการชำระ...",
          optionValue: {
            values: [...paymentmethodList],
            keyName: "paymentmethodDescriptionTh",
            keyValue: "paymentmethodId",
          },
        },
        rules: [{ required: true, message: "กรุณาเลือกประเภทการชำระ!" }],
        initialValue: initialValue.paymentmethodId
      },
    },
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...tsbList],
            keyName: "tsbNameTh",
            keyValue: "tsbId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.tsbId ? initialValue.tsbId : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "laneId",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.laneId,
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "รหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนรหัสพนักงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.staffId,
      },
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      fixed: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ด่าน",
      fixed: true,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      width: 60,
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
      title: "ช่องทาง",
      fixed: true,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      width: 70,
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
      title: "Job No.",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 60,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "Ntrx",
      dataIndex: "nTrx",
      key: "nTrx",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "วันที่ผ่านด่าน",
      dataIndex: "trxDateTime",
      key: "trxDateTime",
      width: 200,
      align: "center",
      // render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
      render: (text) =>
        <div className='text-center'>
          {!_isEmpty(text) && (_setYearThai(text,"DD/MM/YYYY HH:mm:ss"))}
        </div>
    },
    {
      title: "พนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 60,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "TC/OBU",
      dataIndex: "tcObuClass",
      key: "tcObuClass",
      width: 60,
      align: "center",
      render(text) {
        return {
          children: (
            <div className='text-right'>
              {_isZero(text)}
            </div>
          ),
        };
      },
    },
    {
      title: "AVC",
      dataIndex: "avcClass",
      key: "avcClass",
      width: 40,
      align: "center",
      render(text) {
        return {
          children: (
            <div className='text-right'>
              {_isZero(text)}
            </div>
          ),
        };
      },
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "toll",
      key: "toll",
      width: 70,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "ประเภทการชำระ",
      dataIndex: "paymentTypeName",
      key: "paymentTypeName",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ภาพนิ่ง",
      dataIndex: "percentClose",
      key: "percentClose",
      width: 150,
      align: "center",
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={() => previewImage(record)}>
            View
          </Button>
        </span>
      ),
    },
    {
      title: "วีดีโอ",
      dataIndex: "percentClose",
      key: "percentClose",
      width: 150,
      align: "center",
      render: (text, record) => (
        <span>
          <Button size="small" type="primary" onClick={() => previewVideo(record)}>
            View
          </Button>
        </span>
      ),
    },
  ];

  const headerText = [
    {
      name: "วันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.operationDate,dateFormat)
        : "",
    },
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.DataList ? dataToPrint.paymentmethodName : "",
    },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.tsbName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
  ];

  useEffect(() => {
    getTsbList();
    getPaymentmethodList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTsbList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setTsbList(res.list);
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentmethodList = async () => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000016E_getPaymentmethodListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsPaymentmethodList(res.list);
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1}
    })
    return {
      ...res, list: list,
      totalRow: list.length,
      prefixText: 'Total',
      secondText: 'row',
      totalAmountBth: `${res.totalAmount} บาท`,
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000016E(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const previewImage = (data) => {
    setPreviewImg(data.images)
    setVisible(true)
  }

  const previewVideo = (data) => {
    window.open(data.videoUrl, '_blank', 'width=800,height=600', 'resizable=true');
    // setPreviewVdo(data.videoUrl);
    // setVisibleVdo(true);
  }

  const previewImageNewPage = (url) => {
    window.open(url, '_blank', 'width=800,height=600', 'resizable=true');
  }

  const handleChangeIdToName = (DataList) => {
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    const paymentmethod = paymentmethodList.find(
      (e) => e.paymentmethodId === DataList.paymentmethodId
    );
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
      paymentmethodName: paymentmethod
        ? paymentmethod.paymentmethodDescriptionTh
        : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      operationDate: _timeZoneThai(value.operationDate),
      paymentmethodId: value.paymentmethodId,
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      laneId: _isEmpty(value.laneId) ? null : value.laneId,
      staffId: _isEmpty(value.staffId) ? null : value.staffId
    };
    getDataInfo(dataOutput);
  };


  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.16.5 รายงานปริมาณจราจรตัดรอบกับธนาคาร"],
  });

  const headerExcel = [
    { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-left' },
    { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
    { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
    { name: "Job no.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "NTrx", key: "nTrx", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "วันที่ผ่านด่าน", key: "trxDateTime", type: "date", align: "center", width: 160 },
    { name: "พนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "TC/OBU", key: "tcObuClass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "AVC", key: "avcClass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ค่าผ่านทาง", key: "toll", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ประเภทการชำระ", key: "paymentTypeName", type: "nullColumn", align: 'center', className: 'text-left' },
  ]

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        // disabled: dataSource.list.length < 1,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () => {
          _exportFileExcel({
            dataSource: { list: dataSource.list },
            fileName: "6.16.5 รายงานปริมาณจราจรตัดรอบกับธนาคาร",
            header: headerExcel,
          });
        },
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          fields={fields}
          onFinish={handleOnFinish}
          action={action}
        />
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{dataSource.list.length}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={2}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={3} className="text-center" index={3}>
                      <Text>{_isNull(Number(dataSource.totalAmount))}</Text>
                      <Text>&nbsp;บาท</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
        <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              TopicText: "6.16.5 รายงานปริมาณจราจรตัดรอบกับธนาคาร"
            }}
          />
        </div>
        <Modal
          title="Image Preview"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1300}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Row className="d-flex justify-content-around">
            {previewImg.map((item, idx) =>
              <Col span={8} key={idx} >
                <Col className="d-flex justify-content-center" span={24}>
                  <img style={{ cursor: 'pointer' }} src={item} alt={idx} width="100%" height="100%" onClick={() => previewImageNewPage(item)} />
                </Col>
                <Col className="text-center" style={{ padding: '0 30px' }} span={24}>{item}</Col>
              </Col>
            )}
          </Row>
        </Modal>
        <Modal
          title="Video Preview"
          centered
          visible={visibleVdo}
          onOk={() => setVisibleVdo(false)}
          onCancel={() => setVisibleVdo(false)}
          width={500}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Row className="d-flex justify-content-around">
            {
              <Col span={24}  >
                <Col className="d-flex justify-content-center" span={24}><img src={previewVdo} alt={previewVdo} width="100%" height="100%" /></Col>
              </Col>
            }
          </Row>
        </Modal>
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTrafficDiffBank);
