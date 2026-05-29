/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Table, Button, Modal, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FullscreenImageModal from "../../../components/imagePreview/FullscreenImageModal";
import FullscreenVideoModal from "../../../components/imagePreview/FullscreenVideoModal";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000011 } from "../../../service/api/report";
import {
  getPlazaListAPI,
  getSignalCodeListAPI,
  getPaymentmethodListAPI,
  getSignalCodeList_MTC_API
} from "../../../service/api/util";
import {
  // _exportFileExcel, 
  _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai
} from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header611 } from "../../../tools/excel/header";
import { footer611 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;

const SupervisorAdjustment = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [signalCodeList, setsSignalCodeList] = useState([]);
  const [signalCodeListMTC, setsSignalCodeListMTC] = useState([]);
  const [paymentmethodList, setsPaymentmethodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [visible, setVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState([])
  const [visibleVdo, setVisibleVdo] = useState(false);
  const [previewVdo, setPreviewVdo] = useState([])
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [fullscreenVdo, setFullscreenVdo] = useState(null);
  // ----- Fields search ------ //

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
          showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
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
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') },
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
  ];

  // ----- columns Table ------ //
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
              <div className="text-right">{text}</div>
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
              {_isNull(text)}
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
              {_isNull(text)}
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
      render: (text) =>
        _isNull(text)
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
        </div>)
    },
    {
      title: "วันที่ผ่านด่าน",
      dataIndex: "trxDateTime",
      key: "trxDateTime",
      width: 100,
      align: "center",
      render: (text) => !_isEmpty(text) && _setYearThai(text, "DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "พนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 60,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "TC/OBU",
      dataIndex: "tcClass",
      key: "tcClass",
      width: 60,
      align: "center",
      render(text) {
        return {
          children: (
            <Text align="center">
              {_isZero(text)}
            </Text>
          ),
        };
      }
    },
    {
      title: "AVC",
      dataIndex: "avcClass",
      key: "avcClass",
      width: 40,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "amount",
      key: "amount",
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
      title: "sup.Class",
      dataIndex: "supClass",
      key: "supClass",
      width: 80,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "sup.Fare",
      dataIndex: "supFare",
      key: "supFare",
      width: 80,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "audit.Class",
      dataIndex: "auditClass",
      key: "auditClass",
      width: 80,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "audit.Payment",
      dataIndex: "auditPayment",
      key: "auditPayment",
      width: 80,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "audit.Event",
      dataIndex: "auditEvent",
      key: "auditEvent",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "audit.Fare",
      dataIndex: "auditFare",
      key: "auditFare",
      width: 80,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "audit.Remark",
      dataIndex: "auditRemark",
      key: "auditRemark",
      width: 150,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "เหตุผิดปรกติ",
      dataIndex: "abnormality",
      key: "abnormality",
      width: 150,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ประเภทการผ่านด่าน",
      dataIndex: "passingType",
      key: "passingType",
      width: 150,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ประเภทย่อย",
      dataIndex: "subType",
      key: "subType",
      width: 150,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ทะเบียน",
      dataIndex: "plateNo",
      key: "plateNo",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: 130,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ยี่ห้อ-รุ่น",
      dataIndex: "brandModel",
      key: "brandModel",
      width: 100,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "สี",
      dataIndex: "brandModelColor",
      key: "brandModelColor",
      width: 100,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "สังกัด",
      dataIndex: "under",
      key: "under",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ศูนย์-ผู้รับแจ้ง",
      dataIndex: "centerRecipient",
      key: "centerRecipient",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ตำรวจ-ผู้รับแจ้ง",
      dataIndex: "policeRecipients",
      key: "policeRecipients",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "Supervisor",
      dataIndex: "supStaffId",
      key: "supStaffId",
      width: 90,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "Audit",
      dataIndex: "auditStaffId",
      key: "auditStaffId",
      width: 90,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_isNull(text)}
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
        ? _setYearThai(dataToPrint.DataList.startDate, dateFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate, dateFormat)
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

  const previewImage = (data) => {
    setPreviewImg(data.images)
    setVisible(true)
  }

  const previewVideo = (data) => {
    setFullscreenVdo(data.videoUrl);
    // setPreviewVdo(data.videoUrl);
    // setVisibleVdo(true);
  }

  const previewImageNewPage = (url) => {
    setFullscreenImg(url);
  }

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list, prefixText: 'Total', secondText: 'rows', count: list.length }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000011(data, props.auth.token);
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

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 31) {
      const dataOutput = {
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
        plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
        laneId: value.lane ? value.lane : null,
        jobNo: value.jobNo ? value.jobNo : null,
        staffId: value.staffId ? value.staffId : null,
        signalCodeId: value.signalCode === "ทั้งหมด" ? null : value.signalCode,
        eventFlagId: value.eventFlag === "ทั้งหมด" ? null : value.eventFlag,
        paymentmethodId: value.paymentmethod === "ทั้งหมด" ? null : value.paymentmethod,
      };
      getDataInfo(dataOutput);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch. ",
        text: "Start date and End date out of lenght 31 days",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.11 Audit Adjustment Report"],
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
            reportType: "611",
            fileName: "6.11 Audit Adjustment Report",
            data: dataSource,
          })
        // _exportFileExcel({
        //   dataSource: {
        //     ...dataSource,
        //     rows: "rows",
        //     count: _isNull(Number(dataSource.list.length)),
        //   },
        //   fileName: "3.1 Supervisor Adjustment Report",
        //   header: header31,
        //   footer: footer31,
        // }),
        // disabled: dataSource.list.length < 1,
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
            // scroll={scroll}
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={2}>
                      <Text>rows</Text>
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
            header={header611}
            footer={footer611}
            propsHeader={{
              headerText,
              TopicText: "3.1 รายงานการปรับปรุงรายการโดยพนักงานควบคุม",
            }}
            columnPerPage={13}
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

      </div>
            {/* v1.5.13 — fullscreen image popup (replaces window.open) */}
        <FullscreenImageModal
          src={fullscreenImg}
          onClose={() => setFullscreenImg(null)}
        />
        {/* v1.5.16 — fullscreen video popup (MJPEG via <img>); replaces window.open */}
        <FullscreenVideoModal
          src={fullscreenVdo}
          onClose={() => setFullscreenVdo(null)}
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
)(SupervisorAdjustment);
