/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Row, Col, Form, Input, Table, Button, Popconfirm, Tooltip, ConfigProvider, Modal } from "antd";
import DatePicker from "../../../components/dataPicker";
import Skeleton from "../../../components/loading/Loading";
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import Select from "../../../components/form/select/SelectOption";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import {
  GET_DATA_INFO_MANAGE_TARIFF,
  ADD_DATA_INFO_MANAGE_TARIFF,
  EDIT_DATA_INFO_MANAGE_TARIFF,
  DELETE_DATA_INFO_MANAGE_TARIFF,
  NEW_DATA_INFO_MANAGE_TARIFF,
  RELEASE_DATA_INFO_MANAGE_TARIFF,
} from "../../../service/api/tariff";
import moment from "moment";
import { _isEmpty, _timeZoneThai2, _isNull, _setYearThai } from '../../../tools/util';
import locale from 'antd/es/date-picker/locale/th_TH';
import { getPlazaListAPI } from "../../../service/api/util";
import { header93 } from "../../../tools/excel/header";
import { footer93 } from "../../../tools/excel/footer";
const { Text } = Typography;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const UserRoleGroup = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [selectRecord, setSelectRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState([])
  const [initialValue, setInitialValue] = useState({});
  const [scrollX, setScrollX] = useState({});
  const refFocus = useRef(null);
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [plazaList, setsPlazaList] = useState([]);
  const [disabledButtonNew, setDisabledButtonNew] = useState(true);
  const [disabledButtonAdd, setDisabledButtonAdd] = useState(true);
  const [disabledButtonRelease, setDisabledButtonRelease] = useState(true);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [class0, setClass0] = useState(null);
  const [class1, setClass1] = useState(null);
  const [class2, setClass2] = useState(null);
  const [class3, setClass3] = useState(null);
  const [class4, setClass4] = useState(null);
  const [class5, setClass5] = useState(null);
  const [class6, setClass6] = useState(null);
  const [class7, setClass7] = useState(null);
  const [class8, setClass8] = useState(null);
  const [class9, setClass9] = useState(null);

  useEffect(() => {
    getPlazaList();
    setScrollX({ x: 1300 });
    getDataInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const optionSelectPlaza = {
    name: "plazaId",
    label: "ด่าน",
    childrenProps: {
      placeholder: "เลือกด่าน...",
      optionValue: {
        values: [...plazaList],
        keyName: "plazaNameTh",
        keyValue: "plazaId",
      },
    },
    rules: [
      {
        required: true,
        message: "กรุณาเลือกด่าน!",
      },
    ],
    initialValue: initialValue.plazaId ? initialValue.plazaId : "",
  }

  const optionDatePickerValidFromDate = {
    name: "validfromdate",
    label: "Valid From Date Time",
    childrenProps: {
      format: dateFormat,
      placeholder: "Valid From Date...",
      showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
    },
    rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
    initialValue: _isEmpty(initialValue)
      ? moment("00:00:00", "HH:mm:ss")
      : moment(initialValue.validfromdate, "HH:mm:ss"),
  };

  const optionDatePickerValidToDate = {
    name: "validtodate",
    label: "Valid To Date Time",
    childrenProps: {
      format: dateFormat,
      placeholder: "Valid To Date...",
      showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
    },
    rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
    initialValue: _isEmpty(initialValue)
      ? moment("00:00:00", "HH:mm:ss")
      : moment(initialValue.validfromdate, "HH:mm:ss"),
  };

  const optionInputPriceClass0 = {
    name: "PriceClass0",
    label: "Price Class 0",
    initialValue: initialValue.PriceClass0,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass1 = {
    name: "PriceClass1",
    label: "Price Class 1",
    initialValue: initialValue.PriceClass1,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass2 = {
    name: "PriceClass2",
    label: "Price Class 2",
    initialValue: initialValue.PriceClass2,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass3 = {
    name: "PriceClass3",
    label: "Price Class 3",
    initialValue: initialValue.PriceClass3,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass4 = {
    name: "PriceClass4",
    label: "Price Class 4",
    initialValue: initialValue.PriceClass4,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass5 = {
    name: "PriceClass5",
    label: "Price Class 5",
    initialValue: initialValue.PriceClass5,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass6 = {
    name: "PriceClass6",
    label: "Price Class 6",
    initialValue: initialValue.PriceClass6,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass7 = {
    name: "PriceClass7",
    label: "Price Class 7",
    initialValue: initialValue.PriceClass7,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass8 = {
    name: "PriceClass8",
    label: "Price Class 8",
    initialValue: initialValue.PriceClass8,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const optionInputPriceClass9 = {
    name: "PriceClass9",
    label: "Price Class 9",
    initialValue: initialValue.PriceClass9,
    childrenProps: { placeholder: "Number Price Class...", maxLength: "" },
    rules: [
      { required: false, message: "กรุณาป้อนข้อมูล!" },
      { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
    ],
  };

  const columns = [
    {
      title: "Plaza",
      key: "plazaName",
      dataIndex: "plazaName",
      width: 60,
      align: "left",
    },
    {
      title: "Valid From Date",
      key: "validFromDate",
      dataIndex: "validFromDate",
      width: 110,
      align: "center",
      render: (text, record) =>
        <div className="text-center">
          {text}
        </div>,
    },
    {
      title: "Valid From Time",
      key: "validFromTime",
      dataIndex: "validFromTime",
      render: (text, record) =>
        <div className="text-center">
          {text}
        </div>,
      width: 120,
      align: "center",
    },
    {
      title: "Valid to Date",
      key: "validToDate",
      dataIndex: "validToDate",
      width: 110,
      align: "center",
      render: (text, record) =>
        <div className="text-center">
          {text}
        </div>,
    },
    {
      title: "Valid to Time",
      key: "validToTime",
      dataIndex: "validToTime",
      render: (text, record) =>
        <div className="text-center">
          {text}
        </div>,
      width: 110,
      align: "center",
    },
    {
      title: "Class 1",
      key: "fareClass1",
      dataIndex: "fareClass1",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },

    {
      title: "Class 2",
      key: "fareClass2",
      dataIndex: "fareClass2",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 3",
      key: "fareClass3",
      dataIndex: "fareClass3",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 4",
      key: "fareClass4",
      dataIndex: "fareClass4",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 5",
      key: "fareClass5",
      dataIndex: "fareClass5",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 6",
      key: "fareClass6",
      dataIndex: "fareClass6",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 7",
      key: "fareClass7",
      dataIndex: "fareClass7",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 8",
      key: "fareClass8",
      dataIndex: "fareClass8",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 9",
      key: "fareClass9",
      dataIndex: "fareClass9",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Class 0",
      key: "fareClass0",
      dataIndex: "fareClass0",
      render: (text, record) =>
        <div className="text-right">
          {text}
        </div>,
      width: 70,
      align: "center",
    },
    {
      title: "Action",
      fixed: "right",
      key: "detail",
      dataIndex: "",
      width: 175,
      align: "center",
      render: (text, record) =>
        <span>
          <Tooltip title="แก้ไข">
            <Button size="small" type="primary" icon={<EditOutlined />} className="mr-5" hidden={disabledButtonAdd}
              onClick={() => {
                handleEditmenuSelete(record);
                setClass0(record.fareClass0);
                setClass1(record.fareClass1);
                setClass2(record.fareClass2);
                setClass3(record.fareClass3);
                setClass4(record.fareClass4);
                setClass5(record.fareClass5);
                setClass6(record.fareClass6);
                setClass7(record.fareClass7);
                setClass8(record.fareClass8);
                setClass9(record.fareClass9);
                setVisibleEdit(true);
              }}>
              Edit
            </Button>
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title="Sure to delete?"
            onConfirm={() => handleDeleteData(record.key)}
          >
            <Button
              size="small"
              type="primary"
              ghost="true"
              icon={<DeleteFilled />}
              className="del-button" hidden={disabledButtonAdd}
            />
          </Popconfirm>
        </span>
    },
  ];

  const getPlazaList = async () => {
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

  const getDataInfo = async () => {
    const dataOutput = {
      networkId: 10
    };
    try {
      setLoading(true)
      const res = await GET_DATA_INFO_MANAGE_TARIFF(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false)
        setDisabledButtonNew(res.disabledButtonNew);
        setDisabledButtonAdd(res.disabledButtonAdd);
        setDisabledButtonRelease(res.disabledButtonRelease);
        setDataSource(res);
        setItem(res.list)
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {

          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    formAdd
      .validateFields()
      .then((data) => {
        handleOnAdd(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
  };

  const handleOnAdd = async (value) => {
    setInitialValue(value);
    const dataOutput = {
      networkId: 10,
      plazaId: value.plazaId,
      validFromDateTime: _timeZoneThai2(value.validfromdate),
      validToDateTime: _timeZoneThai2(value.validtodate),
      priceClass0: value.PriceClass0,
      priceClass1: value.PriceClass1,
      priceClass2: value.PriceClass2,
      priceClass3: value.PriceClass3,
      priceClass4: value.PriceClass4,
      priceClass5: value.PriceClass5,
      priceClass6: value.PriceClass6,
      priceClass7: value.PriceClass7,
      priceClass8: value.PriceClass8,
      priceClass9: value.PriceClass9,
    };
    try {
      setLoading(true)
      const res = await ADD_DATA_INFO_MANAGE_TARIFF(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          text: res.status.message,
        });
        getDataInfo();
        formAdd.resetFields();
        setLoading(false)
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleEditmenuSelete = async (record) => {
    window.scrollTo(0, 0)
    !_isEmpty(refFocus.current) && refFocus.current.focus();
    setSelectRecord({ ...record })
  };

  const headerText = [];

  const handleOnEdit = async (data) => {
    Swal.fire({
      title: 'คุณต้องการแก้ไขข้อมูลหรือไม่ ?',
      text: "ข้อมูลของคุณจะถูกแก้ไข!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#91098f',
      cancelButtonColor: '#e6e6e6',
      confirmButtonText: 'ตกลง',
      cancelButtonText: '<span style="color:black">ยกเลิก</span>',
    }).then(async (result) => {
      if (result.value) {
        try {
          setLoading(true)
          const res = await EDIT_DATA_INFO_MANAGE_TARIFF(data, props.auth.token);
          if (res.status.code === "S200") {
            Swal.fire(
              'สำเร็จ!',
              'ข้อมูลของคุณถูกแก้ไขเรียบร้อย',
              'success'
            )
            getDataInfo();
            setLoading(false)
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to fetch. ",
              text: res.status.message,
            }).then(async (result) => {
              if (result.value) {
                setLoading(false)
              }
            })
          }
        }
        catch (error) {
          console.log(error);
          setLoading(false)
        }
      }
    })
  };

  const handleDeleteData = async (key) => {
    const dataRecord = {
      key: key
    };
    try {
      setLoading(true)
      const res = await DELETE_DATA_INFO_MANAGE_TARIFF(dataRecord, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          text: res.status.message,
        });
        getDataInfo();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {

          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewVersion = async () => {
    const data = {
      networkId: 10
    };
    try {
      setLoading(true)
      const res = await NEW_DATA_INFO_MANAGE_TARIFF(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "สร้างข้อมูลสำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRelease = async () => {
    const data = {
      networkId: 10
    };
    try {
      setLoading(true)
      const res = await RELEASE_DATA_INFO_MANAGE_TARIFF(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "นำข้อมูลไปใช้สำเร็จ",
          text: res.status.message,
        });
        getDataInfo()
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false)
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["9.3 มุมมองปฏิทินอัตราค่าผ่านทาง"],
  });

  const action = [
    {
      name: "New",
      props: {
        type: "primary",
        disabled: disabledButtonNew,
        onClick: handleNewVersion,
      },
    },
    {
      name: "นำไปใช้งาน",
      props: {
        type: "primary",
        disabled: disabledButtonRelease,
        onClick: handleRelease,
      },
    },
    {
      name: "PDF",
      props: {
        type: "primary",
        onClick: handlePrintFile,
      },
    },
  ];

  const formWrapper = { md: 24, lg: 18 };
  const buttonWrapper = { md: 24, lg: 3, xl: 3 };
  const typeButtonAdd = "primary";
  const submitButtonAddText = "ADD";

  return (
    <Skeleton loading={loading} active>
      <div>
        <Form
          layout="vertical"
          className="custom-ant-form"
          size="large"
          form={formAdd}
          onFinish={handleSubmit}
        >
          <Row>
            <Col {...formWrapper}>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10} key={optionSelectPlaza.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionSelectPlaza.label}
                    name={optionSelectPlaza.name}
                    rules={optionSelectPlaza.rules}
                  >
                    <Select size={60}  {...optionSelectPlaza.childrenProps} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10} key={optionDatePickerValidFromDate.name}>
                  <ConfigProvider locale="th_TH">
                    <Form.Item className="mb-3" label={optionDatePickerValidFromDate.label} name={optionDatePickerValidFromDate.name} rules={optionDatePickerValidFromDate.rules}>
                      <DatePicker size={60} locale={locale} className="rounded-pill max-WS w-100"
                        {...optionDatePickerValidFromDate.childrenProps}
                        disabledDate={false}
                      />
                    </Form.Item>
                  </ConfigProvider>
                </Col>
                <Col span={10} key={optionDatePickerValidToDate.name}>
                  <ConfigProvider locale="th_TH">
                    <Form.Item className="mb-3" label={optionDatePickerValidToDate.label} name={optionDatePickerValidToDate.name} rules={optionDatePickerValidToDate.rules}>
                      <DatePicker size={60} locale={locale} className="rounded-pill max-WS w-100"
                        {...optionDatePickerValidToDate.childrenProps}
                        disabledDate={false}
                      />
                    </Form.Item>
                  </ConfigProvider>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10} key={optionInputPriceClass1.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass1.label}
                    name={optionInputPriceClass1.name}
                    rules={optionInputPriceClass1.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass1.childrenProps} />
                  </Form.Item>
                </Col>
                <Col span={10} key={optionInputPriceClass2.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass2.label}
                    name={optionInputPriceClass2.name}
                    rules={optionInputPriceClass2.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass2.childrenProps} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10} key={optionInputPriceClass3.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass3.label}
                    name={optionInputPriceClass3.name}
                    rules={optionInputPriceClass3.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass3.childrenProps} />
                  </Form.Item>
                </Col>
                <Col span={10} key={optionInputPriceClass4.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass4.label}
                    name={optionInputPriceClass4.name}
                    rules={optionInputPriceClass4.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass4.childrenProps} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10} key={optionInputPriceClass5.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass5.label}
                    name={optionInputPriceClass5.name}
                    rules={optionInputPriceClass5.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass5.childrenProps} />
                  </Form.Item>
                </Col>
                <Col span={10} key={optionInputPriceClass6.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass6.label}
                    name={optionInputPriceClass6.name}
                    rules={optionInputPriceClass6.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass6.childrenProps} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10} key={optionInputPriceClass7.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass7.label}
                    name={optionInputPriceClass7.name}
                    rules={optionInputPriceClass7.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass7.childrenProps} />
                  </Form.Item>
                </Col>
                <Col span={10} key={optionInputPriceClass8.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass8.label}
                    name={optionInputPriceClass8.name}
                    rules={optionInputPriceClass8.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass8.childrenProps} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={10} key={optionInputPriceClass9.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass9.label}
                    name={optionInputPriceClass9.name}
                    rules={optionInputPriceClass9.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass9.childrenProps} />
                  </Form.Item>
                </Col>
                <Col span={10} key={optionInputPriceClass0.name}>
                  <Form.Item
                    className="mb-3"
                    label={optionInputPriceClass0.label}
                    name={optionInputPriceClass0.name}
                    rules={optionInputPriceClass0.rules}
                  >
                    <Input size={60} className="rounded-pill max-WS " {...optionInputPriceClass0.childrenProps} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col>
                  <Button htmlType="submit" type={typeButtonAdd} className="m-5 mt-10" disabled={disabledButtonAdd}>
                    {submitButtonAddText}
                  </Button>
                </Col>
              </Row>

            </Col>

            <Col {...buttonWrapper} className="text-right">
              {action.map((b, index) => (
                <Button {...b.props} key={index} className="m-5 mt-10">
                  {b.name}
                </Button>
              ))}
            </Col>

          </Row>
        </Form>

        {/* <FormDefault
          fields={handleFields()}
          onFinish={handleOnFinish()}
          submitText={handleOnSubmit()}
          typeButton={handleOnTypeButton()}
          formWrapper={{ md: 24, lg: 21, xl: 21 }}
          buttonWrapper={{ md: 24, lg: 3, xl: 3 }}
          buttonSpan={{ span: 10 }}
          action={action}
          textAlign={"text-right"}
        /> */}

        <div className="mt-10">
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scrollX}
            columns={columns}
            bordered
            dataSource={_isEmpty(item) ? dataSource.list : item}
            textAlign={"text-left"}
            pagination={{
              pageSize: 100
            }}

          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            rowPerPage={20}
            dataSource={{
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            }}
            header={header93}
            footer={footer93}
            propsHeader={{
              headerText,
              TopicText: "9.3 มุมมองปฏิทินอัตราค่าผ่านทาง",
            }}
            columnPerPage={13}
            propsClass="print-border-footer"
          />
        </div>

        <Modal
          title="แก้ไข"
          centered
          footer={false}
          visible={visibleEdit}
          onCancel={() => {
            formEdit.resetFields();
            setVisibleEdit(false);
            setClass0(null);
            setClass1(null);
            setClass2(null);
            setClass3(null);
            setClass4(null);
            setClass5(null);
            setClass6(null);
            setClass7(null);
            setClass8(null);
            setClass9(null);
          }
          }
          width={800}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Form
            layout="vertical"
            className="custom-ant-form"
            size="large"
            form={formEdit}
          >
            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>ด่าน : &nbsp;</Text>
                  <Text>{_isNull(selectRecord.plazaName)}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Valid From Date Time : &nbsp;</Text>
                  <Text>{!_isEmpty(selectRecord.validFrom) && (_setYearThai(selectRecord.validFrom,dateFormat))}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={24}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Valid To Date Time : &nbsp;</Text>
                  <Text>{!_isEmpty(selectRecord.validTo) && (_setYearThai(selectRecord.validTo,dateFormat))}</Text>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 1 : &nbsp;</Text>
                  <Input onChange={event => setClass1(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass1}>
                  </Input>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 2 : &nbsp;</Text>
                  <Input onChange={event => setClass2(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass2}>
                  </Input>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 3 : &nbsp;</Text>
                  <Input onChange={event => setClass3(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass3}>
                  </Input>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 4 : &nbsp;</Text>
                  <Input onChange={event => setClass4(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass4}>
                  </Input>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 5 : &nbsp;</Text>
                  <Input onChange={event => setClass5(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass5}>
                  </Input>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 6 : &nbsp;</Text>
                  <Input onChange={event => setClass6(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass6}>
                  </Input>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 7 : &nbsp;</Text>
                  <Input onChange={event => setClass7(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass7}>
                  </Input>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 8 : &nbsp;</Text>
                  <Input onChange={event => setClass8(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass8}>
                  </Input>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around" style={{ marginTop: 8, marginLeft: 5 }}>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 9 : &nbsp;</Text>
                  <Input onChange={event => setClass9(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass9}>
                  </Input>
                </Col>
                <Col span={12}>
                  <Text style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Price Class 0 : &nbsp;</Text>
                  <Input onChange={event => setClass0(event.target.value)}
                    type="text"
                    size={500}
                    placeholder="Prict Class..."
                    className="rounded-pill max-WS "
                    defaultValue={selectRecord.fareClass0}>
                  </Input>
                </Col>
              </Row>
            ) : (<></>)}

            {selectRecord ? (
              <Row className="d-flex justify-content-around">
                <Col span={12} className="d-flex justify-content-center">
                  <Button
                    style={{ marginTop: 30, marginLeft: 10 }}
                    htmlType="submit"
                    size="middle"
                    type="primary"
                    onClick={() => {
                      const data = {
                        key: selectRecord.key,
                        priceClass0: class0,
                        priceClass1: class1,
                        priceClass2: class2,
                        priceClass3: class3,
                        priceClass4: class4,
                        priceClass5: class5,
                        priceClass6: class6,
                        priceClass7: class7,
                        priceClass8: class8,
                        priceClass9: class9,
                      }
                      handleOnEdit(data);
                      formEdit.resetFields();
                      setVisibleEdit(false);
                      setClass0(null);
                      setClass1(null);
                      setClass2(null);
                      setClass3(null);
                      setClass4(null);
                      setClass5(null);
                      setClass6(null);
                      setClass7(null);
                      setClass8(null);
                      setClass9(null);
                    }}
                  >
                    ยืนยัน
                  </Button>
                </Col>
                <Col span={12} className="d-flex justify-content-center">
                  <Button
                    style={{ marginTop: 30, marginLeft: 10 }}
                    htmlType="submit"
                    size="middle"
                    type="primary"
                    onClick={() => {
                      formEdit.resetFields();
                      setVisibleEdit(false);
                      setClass0(null);
                      setClass1(null);
                      setClass2(null);
                      setClass3(null);
                      setClass4(null);
                      setClass5(null);
                      setClass6(null);
                      setClass7(null);
                      setClass8(null);
                      setClass9(null);
                    }}
                  >
                    ยกเลิก
                  </Button>
                </Col>
              </Row>
            ) : (<></>)}

          </Form>
        </Modal>

      </div>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoleGroup)
