/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table, Button, Modal, Row, Col, Pagination } from "antd";
import Skeleton from "../../../components/loading/Loading"
import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M030000004_Page_Search, GET_DATA_INFO_M030000004 } from "../../../service/api/report";
import {
  getPlazaListAPI,
  getSignalCodeListAPI,
  getPaymentmethodListAPI,
  getSignalCodeList_MTC_API,
  getSubVehicleTypeList_API,
  getSubVehicleTypeOtherList_API
} from "../../../service/api/util";
import {
  // _exportFileExcel, 
  _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai
} from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header34 } from "../../../tools/excel/header";
import { footer34 } from "../../../tools/excel/footer";
// import NoImage from '../../../assets/img/no-image.jpg'

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const PassingTransactions = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [signalCodeList, setsSignalCodeList] = useState([]);
  const [signalCodeListMTC, setsSignalCodeListMTC] = useState([]);
  const [paymentmethodList, setsPaymentmethodList] = useState([]);
  const [subVehicleTypeList, setSubVehicleTypeList] = useState([]);
  const [subVehicleTypeOtherList, setSubVehicleTypeOtherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([])
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([])
  // v1.5.12 — single image url shown in the FullscreenImageModal popup
  const [fullscreenImg, setFullscreenImg] = useState(null);

  const [PagintaionSize, setPaginationSize] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  const [dataSearch, setDataSearch] = useState({})
  const [totalPage, setTotalPage] = useState(0)
  const [dataPDF, setDataPDF] = useState({ list: [] })
  const [renderFact, setRenderFact] = useState(false)
  const [disableExportBtn,setDisableExportBtn] = useState(false)
  const [disablePDFtBtn,setDisablePDFBtn] = useState(false)

  const fields = [
    {
      type: "select",
      option: {
        name: "plaza",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
            keyName: "plazaNameTh",
            keyValue: "plazaId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.plaza
        // initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "lane",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.lane,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.startDate,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
    {
      type: "input",
      option: {
        name: "jobNo",
        label: "Job no.",
        childrenProps: { placeholder: "เลขที่ใบงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนข้อมูลเลขที่ใบงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.jobNo,
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
        name: "signalCode",
        label: "สัญญาณการผ่านทาง ETC",
        childrenProps: {
          placeholder: "สัญญาณการผ่านทาง...",
          optionValue: {
            values: ["ทั้งหมด", ...signalCodeList],
            keyName: "descriptionTh",
            keyValue: "signalCodeId",
          },
        },
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.signalCode
      },
    },
    {
      type: "select",
      option: {
        name: "eventFlag",
        label: "สัญญาณการผ่านทาง MTC",
        childrenProps: {
          placeholder: "สัญญาณการผ่านทาง...",
          optionValue: {
            values: ["ทั้งหมด", ...signalCodeListMTC],
            keyName: "descriptionTh",
            keyValue: "eventFlagId",
          },
        },
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.eventFlag
      },
    },
    {
      type: "select",
      option: {
        name: "paymentmethod",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "ประเภทการชำระ...",
          optionValue: {
            values: ["ทั้งหมด", ...paymentmethodList],
            keyName: "paymentmethodDescriptionTh",
            keyValue: "paymentmethodId",
          },
        },
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.paymentmethod
      },
    },
    {
      type: "select",
      option: {
        name: "subVehicleType",
        label: "ประเภทรถตาม TC/OBU",
        childrenProps: {
          placeholder: "เลือกประเภทรถ...",
          optionValue: {
            values: ["ทั้งหมด", ...subVehicleTypeList],
            keyName: "descriptionTh",
            keyValue: "subVehicleTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทรถ!",
          },
        ],
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.subVehicleType
      },
    },
    {
      type: "input",
      option: {
        name: "pan",
        label: "PAN",
        childrenProps: { placeholder: "PAN..." },
        rules: [{ required: false, message: "กรุณาป้อน PAN!" }],
        initialValue: initialValue.pan,
      },
    },
    {
      type: "select",
      option: {
        name: "avcVehicleType",
        label: "ประเภทรถตาม AVC",
        childrenProps: {
          placeholder: "เลือกประเภทรถ...",
          optionValue: {
            values: ["ทั้งหมด", ...subVehicleTypeOtherList],
            keyName: "descriptionTh",
            keyValue: "subVehicleTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทรถ!",
          },
        ],
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.avcVehicleType
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
              <div className="text-right">{_isNull(text)}</div>
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
        <div className='text-left'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormat))}
        </div>
    },
    {
      title: "พนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 60,
      align: "center",
      render: (text) =>
        <div className='text-right'>
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
      title: "ล้อ",
      dataIndex: "wheel",
      key: "wheel",
      width: 40,
      align: "center",
      render: (text) =>
        <div className='text-right'>
          {_isNull(text)}
        </div>
    },
    {
      title: "เพลา",
      dataIndex: "shaft",
      key: "shaft",
      width: 40,
      align: "center",
      render: (text) =>
        <div className='text-right'>
          {_isNull(text)}
        </div>
    },
    {
      title: "ล้อคู่",
      dataIndex: "twinWheels",
      key: "twinWheels",
      width: 40,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
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
      title: "PAN/CardNo/CustName",
      dataIndex: "ref1Pan",
      key: "ref1Pan",
      width: 200,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
    {
      title: "สัญญาณการผ่านทาง",
      dataIndex: "signalCode",
      key: "signalCode",
      width: 180,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_PlusZero(text)}
        </div>
      )
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
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,dateFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,dateFormat)
        : "",
    },
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.DataList ? dataToPrint.paymentmethodName : "",
    },
    {
      name: "Job no.",
      value: dataToPrint.DataList ? dataToPrint.DataList.jobNo : "",
    },
    {
      name: "สัญญาณการผ่านทาง ETC",
      value: dataToPrint.DataList ? dataToPrint.signalCodeName : "",
    },
    {
      name: "สัญญาณการผ่านทาง MTC",
      value: dataToPrint.DataList ? dataToPrint.eventFlagName : "",
    },
  ];

  useEffect(() => {
    getPlazaList();
    getSignalCodeList();
    getPaymentmethodList();
    getSignalCodeListMTC();
    getSubVehicleType();
    getSubVehicleTypeOther();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsPlazaList(res.list);
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

  const getSignalCodeList = async () => {
    try {
      setLoading(true);
      const res = await getSignalCodeListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsSignalCodeList(res.list);
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

  const getSignalCodeListMTC = async () => {
    try {
      setLoading(true);
      const res = await getSignalCodeList_MTC_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setsSignalCodeListMTC(res.list);
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
      const res = await getPaymentmethodListAPI(null, props.auth.token);
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

  const getSubVehicleType = async () => {
    try {
      setLoading(true);
      const res = await getSubVehicleTypeList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setSubVehicleTypeList(res.list);
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
  
  const getSubVehicleTypeOther = async () => {
    try {
      setLoading(true);
      const res = await getSubVehicleTypeOtherList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setSubVehicleTypeOtherList(res.list);
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

  const addIndex = (res, dataOutput) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: (dataOutput.pageRequest.pageIndex - 1) * dataOutput.pageRequest.maxRowSize + (index + 1) }
    })
    return {
      ...res, list: list,
      totalRow: !_isEmpty(res.pageResponse) ? res.pageResponse.totalSize : list.length,
      prefixText: 'Total',
      secondText: 'row',
      totalAmountBth: `${res.totalAmount} บาท`,
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo",data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000004_Page_Search(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res, data));
        setTotalPage(res.pageResponse.totalSize)
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

  // v1.5.12 — clicking an image in the Image Preview modal opens a
  // second in-app popup with the full-size image (was window.open before).
  const previewImageNewPage = (url) => {
    setFullscreenImg(url);
  }

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    const paymentmethod = paymentmethodList.find(
      (e) => e.paymentmethodId === DataList.paymentmethod
    );
    const signalCode = signalCodeList.find(
      (e) => e.signalCodeId === DataList.signalCode
    );
    const eventFlag = signalCodeListMTC.find(
      (e) => e.eventFlagId === DataList.eventFlag
    );
    setDataToPrint({
      DataList,
      signalCodeName: signalCode ? signalCode.descriptionTh : "ทั้งหมด",
      eventFlagName: eventFlag ? eventFlag.descriptionTh : "ทั้งหมด",
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      paymentmethodName: paymentmethod
        ? paymentmethod.paymentmethodDescriptionTh
        : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);
    setPaginationSize({
      ...PagintaionSize,pageNumber: 1,
    })
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: _isEmpty(value.lane) ? null : value.lane,
      pan: _isEmpty(value.pan) ? null : value.pan,
      jobNo: _isEmpty(value.jobNo) ? null : value.jobNo,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
      signalCodeId: value.signalCode === "ทั้งหมด" ? null : value.signalCode,
      eventFlagId: value.eventFlag === "ทั้งหมด" ? null : value.eventFlag,
      paymentmethodId: value.paymentmethod === "ทั้งหมด" ? null : value.paymentmethod,
      subVehicleTypeId: value.subVehicleType === "ทั้งหมด" ? null : value.subVehicleType,
      avcVehicleTypeId: value.avcVehicleType === "ทั้งหมด" ? null : value.avcVehicleType,
      pageRequest: {
        maxRowSize: PagintaionSize.pageSize,
        // pageIndex: PagintaionSize.pageNumber
        pageIndex: 1
      }
    };
    setDataSearch(dataOutput) //set data to change pagination for new fetch API
    getDataInfo(dataOutput);
  };

  const handlePrintFile = async () => {
    setDisablePDFBtn(true)
    await HandlePrintPDF();
    setRenderFact(true)
    setTimeout(function () { handlePrint(); setRenderFact(false) }, 1000);
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.4 Passing Transactions Report"],
    onAfterPrint: ()=>setDisablePDFBtn(false)
  });

  const handleExportExcel = async () => {
    setDisableExportBtn(true)
    const resultexcel = await HandlePrintPDF();

      exportExcelJs({
        reportType: "34",
        fileName: "3.4 Passing Transactions Report",
        data: resultexcel,
      })
      
    setDisableExportBtn(false)
  }

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        disabled: disablePDFtBtn
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: handleExportExcel,
        disabled: disableExportBtn
      },
    },
  ];

  const HandlePrintPDF = async () => {
    try {
      const dataOutput = {
        startDate: dataSearch.startDate,
        endDate: dataSearch.endDate,
        plazaId: dataSearch.plazaId,
        laneId: dataSearch.laneId,
        pan: dataSearch.pan,
        jobNo: dataSearch.jobNo,
        staffId: dataSearch.staffId,
        signalCodeId: dataSearch.signalCodeId,
        paymentmethodId: dataSearch.paymentmethodId,
        subVehicleTypeId: dataSearch.subVehicleType,
        avcVehicleTypeId: dataSearch.avcVehicleType,
        eventFlagId: dataSearch.eventFlagId,
        pageRequest: {
          maxRowSize: PagintaionSize.pageSize,
          pageIndex: PagintaionSize.pageNumber
        }
      }

      const res = await GET_DATA_INFO_M030000004(!_isEmpty(dataOutput) ? dataOutput : null, props.auth.token);
      if (res.status.code === "S200") {
        setDataPDF(addIndex(res, dataOutput));
        console.log("3.4 data => ",res);
        return addIndex(res, dataOutput)
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

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
            pagination={false}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{!_isEmpty(dataSource.pageResponse) ? _isNull(Number(dataSource.pageResponse.totalSize)) : dataSource.list.length}</Text>
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
          {!_isEmpty(dataSource.list) ?
            <Row justify='end' className="mt-10">
              <Pagination pageSizeOptions={["10", "20", "50", "70"]}
                current={PagintaionSize.pageNumber}
                defaultPageSize={PagintaionSize.pageSize}
                onChange={(page, size) => {
                  setPaginationSize({
                    pageNumber: page,
                    pageSize: size
                  })
                  const dataOutput = {
                    startDate: dataSearch.startDate,
                    endDate: dataSearch.endDate,
                    plazaId: dataSearch.plazaId,
                    laneId: dataSearch.laneId,
                    pan: dataSearch.pan,
                    jobNo: dataSearch.jobNo,
                    staffId: dataSearch.staffId,
                    signalCodeId: dataSearch.signalCodeId,
                    eventFlagId: dataSearch.eventFlagId,
                    paymentmethodId: dataSearch.paymentmethodId,
                    subVehicleTypeId: dataSearch.subVehicleTypeId,
                    avcVehicleTypeId: dataSearch.avcVehicleTypeId,
                    pageRequest: {
                      maxRowSize: size,
                      pageIndex: page
                    }
                  }
                  getDataInfo(dataOutput)
                }}
                onShowSizeChange={(current, size) => {
                  setPaginationSize({
                    pageNumber: current,
                    pageSize: size
                  })

                  const dataOutput = {
                    startDate: dataSearch.startDate,
                    endDate: dataSearch.endDate,
                    plazaId: dataSearch.plazaId,
                    laneId: dataSearch.laneId,
                    pan: dataSearch.pan,
                    jobNo: dataSearch.jobNo,
                    staffId: dataSearch.staffId,
                    signalCodeId: dataSearch.signalCodeId,
                    eventFlagId: dataSearch.eventFlagId,
                    paymentmethodId: dataSearch.paymentmethodId,
                    subVehicleTypeId: dataSearch.subVehicleTypeId,
                    avcVehicleTypeId: dataSearch.avcVehicleTypeId,
                    pageRequest: {
                      maxRowSize: size,
                      pageIndex: current
                    }
                  }
                  getDataInfo(dataOutput)
                }}
                size="small" total={totalPage} showSizeChanger />
                {/* size="small" total={totalPage} showTotal={total => `Total ${total} items`} showSizeChanger /> */}
            </Row> : null}
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={renderFact ? {
              ...dataPDF,
              rows: "rows",
              count: _isNull(Number(dataPDF.list.length)),
            } : { list: [] }}
            header={header34}
            footer={footer34}
            propsHeader={{
              headerText,
              TopicText: "3.4 รายการรถผ่านทาง",
            }}
            columnPerPage={header34.length}
            propsClass="print-border-footer"
            rowPerPage={PagintaionSize.pageSize >= 20 ? 20 : PagintaionSize.pageSize}
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

        {/* v1.5.12 — fullscreen image popup; opens when a thumbnail in the
            Image Preview modal is clicked. Replaces the legacy window.open. */}
        <FullscreenImageModal
          src={fullscreenImg}
          onClose={() => setFullscreenImg(null)}
        />
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
)(PassingTransactions);
