/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Table, Button, Modal, Row, Col, Form, Select, Input } from "antd";
import Skeleton from "../../../components/loading/Loading"
import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";
import { getTSBList_API, getShiftList_API, getVehicleTypeList_API, getSecurityMenuActionAPI } from "../../../service/api/util";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import {
  GET_DATA_PAYMENTMETHOD_M060000013
  , GET_DATA_INFO_M060000013
  , POST_SAVE_M060000013
} from "../../../service/api/report";
import {
  // _exportFileExcel, 
  _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai
} from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header613 } from "../../../tools/excel/header";

const dateFormat = "DD/MM/YYYY";
const dateFormatTrx = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const { Option } = Select;

const ReportAuditMtc = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [tsbList, setTsbList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [previewImg, setPreviewImg] = useState([]);
  const [visible, setVisible] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([]);
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectRecord, setSelectRecord] = useState(null);
  const [form] = Form.useForm();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSave, setActiveSave] = useState(false);
  // ----- Fields search ------ //

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "operatorDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.operatorDate,
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
    {
      type: "select",
      option: {
        name: "shiftNo",
        label: "ผลัด",
        childrenProps: {
          placeholder: "เลือกผลัด...",
          optionValue: {
            values: ["ทั้งหมด", ...shiftList],
            keyName: "abbreviation",
            keyValue: "shiftNo",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกผลัด!",
          },
        ],
        initialValue: initialValue.shiftNo ? initialValue.shiftNo : "ทั้งหมด",
      },
    },
    {
      type: "select",
      option: {
        name: "statusName",
        label: "สถานะการตรวจสอบ",
        childrenProps: {
          placeholder: "สถานะการตรวจสอบ",
          optionValue: {
            values: [...typeList],
            keyValue: "statusName",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือก สถานะการตรวจสอบ!",
          },
        ],
        initialValue: initialValue.statusName ? initialValue.statusName : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "ntrx",
        label: "Ntrx",
        childrenProps: { placeholder: "Ntrx...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อน Ntrx!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.ntrx,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 70,
      align: "center",
      fixed: true,
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ด่าน",
      fixed: true,
      key: "tsbName",
      dataIndex: "tsbName",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ช่องทาง",
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รหัสพนักงาน",
      dataIndex: "staffNo",
      key: "staffNo",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ชื่อพนักงาน",
      dataIndex: "staffName",
      key: "staffName",
      width: 160,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ถุงเงิน",
      dataIndex: "bagNo",
      key: "bagNo",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ผลัด",
      dataIndex: "shiftName",
      key: "shiftName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "JOB",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "NTRX",
      dataIndex: "ntrx",
      key: "ntrx",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันเวลาผ่านทาง",
      dataIndex: "trxDate",
      key: "trxDate",
      width: 140,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {!_isEmpty(text) && (_setYearThai(text, dateFormatTrx))}
        </div>
      ),
    },
    {
      title: "TC Class",
      dataIndex: "tcClass",
      key: "tcClass",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "AVC",
      dataIndex: "avcClass",
      key: "avcClass",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Transation Remark",
      dataIndex: "transationRemark",
      key: "transationRemark",
      width: 160,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Sup Remark",
      dataIndex: "supRemark",
      key: "supRemark",
      width: 160,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Sup By",
      dataIndex: "supBy",
      key: "supBy",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Audit Remark",
      dataIndex: "auditRemark",
      key: "auditRemark",
      width: 160,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Audit Class",
      dataIndex: "auditClass",
      key: "auditClass",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Audit Payment",
      dataIndex: "auditPayment",
      key: "auditPayment",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Audit By",
      dataIndex: "auditBy",
      key: "auditBy",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "TC Fare",
      dataIndex: "tcFare",
      key: "tcFare",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Sup Fare",
      dataIndex: "supFare",
      key: "supFare",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Audit Fare",
      dataIndex: "auditFare",
      key: "auditFare",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Total Fare",
      dataIndex: "totalFare",
      key: "totalFare",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ภาพนิ่ง",
      dataIndex: "images",
      key: "images",
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
      dataIndex: "videoUrl",
      key: "videoUrl",
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
    {
      title: "Audit Status",
      dataIndex: "auditStatus",
      key: "auditStatus",
      width: 160,
      align: "center",
      render: (text, record) => (
        <div className='text-left'
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSelectRecord(record);
            setVisiblePopup(true);
          }}
        >
          {_isNull(text)}
        </div>
      ),
    },



  ];

  const headerText = [
    {
      name: "วันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.operatorDate, dateFormat) : "",
    },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.tsbName : "" },
    { name: "รหัสพนักงาน", value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "" },
    { name: "ผลัด", value: dataToPrint.DataList ? dataToPrint.DataList.shiftNo : "" },
    { name: "สถานะการตรวจสอบ", value: dataToPrint.DataList ? dataToPrint.DataList.statusName : "" },
  ];

  useEffect(() => {
    getTSBList();
    getShiftList();
    getVehicleTypeList();
    getPaymentMethodList();
    setTypeList(["ทั้งหมด", "ตรวจสอบแล้ว", "ยังไม่ได้ตรวจสอบ", "ไม่มีรายการตรวจสอบ"]);
    getSecurityMenuActionSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSecurityMenuActionSave = async () => {
    try {
      const dataOutput = {
        networkId: 10,
        menuId: 'M060000013',
        actionId: 'M060000013-SAVE',
      };
      setLoading(true);
      const res = await getSecurityMenuActionAPI(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setActiveSave(res.active);
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

  const getTSBList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
        setLoading(false);
        setTsbList(res.list);
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

  const getShiftList = async () => {
    setScroll({ x: 1500 });
    try {
      setLoading(true);
      const res = await getShiftList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setShiftList(res.list);
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
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list, prefixText: 'Total', secondText: 'rows', count: list.length }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000013(data, props.auth.token);
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

  const getVehicleTypeList = async () => {
    try {
      setLoading(true);
      const res = await getVehicleTypeList_API(
        { networkId: 10 },
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        setVehicleTypeList(res.list);
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

  const getPaymentMethodList = async () => {
    try {
      setLoading(true);
      const res = await GET_DATA_PAYMENTMETHOD_M060000013(
        { networkId: 10 },
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        setPaymentMethodList(res.list);
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
    setFullscreenImg(url);
  }

  const handleChangeIdToName = (DataList) => {
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);

    const dataOutput = {
      operatorDate: _timeZoneThai(value.operatorDate),
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
      shiftNo: value.shiftNo === "ทั้งหมด" ? null : value.shiftNo,
      ntrx: _isEmpty(value.ntrx) ? null : value.ntrx,
      // ทั้งหมด = 0
      // ตรวจสอบแล้ว = 1
      // ยังไม่ได้ตรวจสอบ = 2
      // ไม่มีรายการตรวจสอบ = 3
      statusId: value.statusName === "ทั้งหมด" ? null : (value.statusName === "ตรวจสอบแล้ว" ? 1 : (value.statusName === "ยังไม่ได้ตรวจสอบ" ? 2 : 3)),
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.13 ตรวจสอบรถผิดปกติ MTC (Audit)"],
  });

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
        onClick: () =>
          exportExcelJs({
            reportType: "613",
            fileName: "6.13 ตรวจสอบรถผิดปกติ MTC (Audit)",
            data: dataSource,
          })
      },
    },
  ];


  const save = async (data) => {
    try {
      setLoading(true);
      const body = {
        seckey: selectRecord.seckey,
        auditAdjust: data.auditAdjust ? data.auditAdjust : null,
        auditPaymentMethod: data.auditPaymentMethod ? data.auditPaymentMethod : null,
        auditDetail: data.auditDetail ? data.auditDetail : null,
        auditRemark: data.auditRemark ? data.auditRemark : null,
        amount: data.amount ? data.amount : null,
        auditClass: data.auditClass ? data.auditClass : null,
      };
      const res = await POST_SAVE_M060000013(
        body,
        props.auth.token
      );
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ! ",
        });
        setLoading(false);
        handleOnFinish(initialValue);
        form.resetFields();
        setVisiblePopup(false);
        setSelectRecord(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "บันทึกไม่สำเร็จ!",
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

  const handleSubmit = () => {
    form
      .validateFields()
      .then((data) => {
        save(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
  };

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
            // scroll={scroll}
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            // pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={2} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={2}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={3}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={20} className="text-left" index={4}>
                      <Text></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            }}
            header={header613}
            footer={[]}
            propsHeader={{
              headerText,
              TopicText: "6.13 ตรวจสอบรถผิดปกติ MTC (Audit)",
            }}
            columnPerPage={13}
            rowPerPage={25}
            propsClass="print-border-footer"
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

        <Modal
          maskClosable={false}
          centered
          footer={false}
          visible={visiblePopup}
          onCancel={() => {
            form.resetFields();
            setVisiblePopup(false);
            setSelectRecord(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Form
            layout="vertical"
            className="custom-ant-form"
            size="large"
            form={form}
          >
            {selectRecord ? (
              <Row>
                <Col span={5}>
                  <div className="mb-3">
                    {`วันที่-เวลา : ${!_isEmpty(selectRecord.trxDate) &&
                      _setYearThai(selectRecord.trxDate, dateFormatTrx)
                      }`}
                  </div>
                </Col>
                <Col span={2}>
                  <div className="mb-3">
                    {`No.Trx : ${_isNull(selectRecord.ntrx)}`}
                  </div>
                </Col>
                <Col span={13}>
                  <div className="mb-3">
                    {`การแก้ไขโดยพนักงานควบคุม : ${_isNull(
                      selectRecord.supBy
                    )} ${_isNull(selectRecord.supAdjDetail)
                      ? `(${_isNull(selectRecord.supAdjDetail)})`
                      : _isNull(selectRecord.supAdjDetail)
                      }`}
                  </div>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            <Row>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"ฝ่ายตรวจสอบแก้ไขเป็น"}
                    name={"auditAdjust"}
                    rules={[
                      {
                        required: false,
                        message: "กรุณาใส่ฝ่ายตรวจสอบแก้ไขเป็น!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      size={60}
                      placeholder="ฝ่ายตรวจสอบแก้ไขเป็น..."
                      className="rounded-pill max-WS "
                    >
                      {vehicleTypeList.map((val) => (
                        <Option value={val.vehicleTypeId} key={val.vehicleTypeId}>
                          {val.descriptionTh}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"ประเภทการชำระ"}
                    name={"auditPaymentMethod"}
                    rules={[
                      {
                        required: false,
                        message: "กรุณาใส่ประเภทการชำระ!",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      size={60}
                      placeholder="ประเภทการชำระ..."
                      className="rounded-pill max-WS "
                    >
                      {paymentMethodList.map((val) => (
                        <Option value={val.paymentmethodId} key={val.paymentmethodId}>
                          {val.paymentmethodDescriptionTh}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"จำนวนเงิน"}
                    name={"amount"}
                    rules={[{ required: false }]}
                  >
                    <Input
                      size={60}
                      placeholder="จำนวนเงิน..."
                      className="rounded-pill max-WS "
                    />
                  </Form.Item>
                </Col><Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"Class"}
                    name={"auditClass"}
                    rules={[{ required: false }]}
                  >
                    <Input
                      size={60}
                      placeholder="Class..."
                      className="rounded-pill max-WS "
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={<div></div>}>
                    <Button
                      disabled={!activeSave}
                      style={{ marginTop: -30 }}
                      htmlType="submit"
                      size="middle"
                      type="primary"
                      onClick={handleSubmit}
                    >
                      บันทึก
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10}>
                  <Form.Item
                    className="mb-3"
                    label={"หมายเหตุ"}
                    name={"auditRemark"}
                    rules={[{ required: false }]}
                  >
                    <Input
                      size={60}
                      placeholder="หมายเหตุ..."
                      className="rounded-pill max-WS "
                    />
                  </Form.Item>
                </Col>
              </Row>

            </Row>
          </Form>
        </Modal>

      </div>
            {/* v1.5.13 — fullscreen image popup (replaces window.open) */}
        <FullscreenImageModal
          src={fullscreenImg}
          onClose={() => setFullscreenImg(null)}
        />
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
)(ReportAuditMtc);
