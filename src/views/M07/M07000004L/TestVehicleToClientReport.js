/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000004L } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getYearListAPI, getMonthListAPI } from "../../../service/api/util";
import PrintReport from "./PrintReport";

const TestVehicleToClientReport = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByList, setSortByList] = useState([]);

  const fields = [
    {
      type: "select",
      option: {
        name: "monthId",
        label: "เดือน",
        childrenProps: {
          placeholder: "เลือกเดือน...",
          optionValue: {
            values: [...monthList],
            keyName: "monthNameTh",
            keyValue: "monthId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกเดือน!",
          },
        ],
        initialValue: initialValue.monthId ? initialValue.monthId : Number(moment().format('MM')),
      },
    },
    {
      type: "select",
      option: {
        name: "yearId",
        label: "ปี",
        childrenProps: {
          placeholder: "เลือกปี...",
          optionValue: {
            values: [...yearList],
            keyName: "yearNameTh",
            keyValue: "yearId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกปี!",
          },
        ],
        initialValue: initialValue.yearId ? initialValue.yearId :
          moment().format('YYYY') > 2543 ? moment().format('YYYY') : Number(moment().format('YYYY')) + 543,
      },
    },
    {
      type: "select",
      option: {
        name: "sortBy",
        label: "เรียงตาม",
        childrenProps: {
          placeholder: "เรียงตาม",
          optionValue: {
            values: [...sortByList],
            keyValue: "sortBy",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกเรียงตาม!",
          },
        ],
        initialValue: initialValue.sortBy ? initialValue.sortBy : "ตรวจสอบค่าผ่านทางภายใน",
      },
    },
  ];

  const columns = [
    {
      title: "Date",
      fixed: true,
      key: "operationalDate",
      dataIndex: "operationalDate",
      width: 50,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "center", fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Toll booth section",
      fixed: true,
      key: "tsbNameEn",
      dataIndex: "tsbNameEn",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "left", fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "",
      fixed: true,
      key: "tsbNameTh",
      dataIndex: "tsbNameTh",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "left", fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Cash",
      show: true,
      align: 'center',
      children: [
        {
          title: "Number of vehicle type 1",
          key: "cashTrxClass1",
          dataIndex: "cashTrxClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Number of vehicle type 2",
          key: "cashTrxClass2",
          dataIndex: "cashTrxClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 1 toll fee (inc. VAT)",
          key: "cashFeeClass1",
          dataIndex: "cashFeeClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 2 toll fee (inc. VAT)",
          key: "cashFeeClass2",
          dataIndex: "cashFeeClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "Coupon",
      show: true,
      align: 'center',
      children: [
        {
          title: "Number of vehicle type 1",
          key: "couponTrxClass1",
          dataIndex: "couponTrxClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Number of vehicle type 2",
          key: "couponTrxClass2",
          dataIndex: "couponTrxClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 1 toll fee (inc. VAT)",
          key: "couponFeeClass1",
          dataIndex: "couponFeeClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 2 toll fee (inc. VAT)",
          key: "couponFeeClass2",
          dataIndex: "couponFeeClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "EMV",
      show: true,
      align: 'center',
      children: [
        {
          title: "Number of vehicle type 1",
          key: "emvTrxClass1",
          dataIndex: "emvTrxClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Number of vehicle type 2",
          key: "emvTrxClass2",
          dataIndex: "emvTrxClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 1 toll fee (inc. VAT)",
          key: "emvFeeClass1",
          dataIndex: "emvFeeClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 2 toll fee (inc. VAT)",
          key: "emvFeeClass2",
          dataIndex: "emvFeeClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "QR-Code",
      show: true,
      align: 'center',
      children: [
        {
          title: "Number of vehicle type 1",
          key: "qrcodeTrxClass1",
          dataIndex: "qrcodeTrxClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Number of vehicle type 2",
          key: "qrcodeTrxClass2",
          dataIndex: "qrcodeTrxClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 1 toll fee (inc. VAT)",
          key: "qrcodeFeeClass1",
          dataIndex: "qrcodeFeeClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 2 toll fee (inc. VAT)",
          key: "qrcodeFeeClass2",
          dataIndex: "qrcodeFeeClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "M-Pass",
      show: true,
      align: 'center',
      children: [
        {
          title: "Number of vehicle type 1",
          key: "mpassTrxClass1",
          dataIndex: "mpassTrxClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Number of vehicle type 2",
          key: "mpassTrxClass2",
          dataIndex: "mpassTrxClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 1 toll fee (inc. VAT)",
          key: "mpassFeeClass1",
          dataIndex: "mpassFeeClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 2 toll fee (inc. VAT)",
          key: "mpassFeeClass2",
          dataIndex: "mpassFeeClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "EasyPass",
      show: true,
      align: 'center',
      children: [
        {
          title: "Number of vehicle type 1",
          key: "easyPassTrxClass1",
          dataIndex: "easyPassTrxClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Number of vehicle type 2",
          key: "easyPassTrxClass2",
          dataIndex: "easyPassTrxClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 1 toll fee (inc. VAT)",
          key: "easyPassFeeClass1",
          dataIndex: "easyPassFeeClass1",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
        {
          title: "Vehicle Type 2 toll fee (inc. VAT)",
          key: "easyPassFeeClass2",
          dataIndex: "easyPassFeeClass2",
          align: 'center',
          width: 50,
          render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
        },
      ],
    },
    {
      title: "Number of Violation",
      key: "violation",
      dataIndex: "violation",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "Revenue of Vehicle Type 1",
      key: "revenueClass1",
      dataIndex: "revenueClass1",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "Revenue of Vehicle Type 2",
      key: "revenueClass2",
      dataIndex: "revenueClass2",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "Total revenue from SOD",
      key: "revenueTotal",
      dataIndex: "revenueTotal",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "Total revenue from SOD (exc. VAT)",
      key: "revenueVat",
      dataIndex: "revenueVat",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "Total revenue from TOD",
      key: "totalRevenueFromTod",
      dataIndex: "totalRevenueFromTod",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "Difference TOD and SOD",
      key: "differenceTodAndSod",
      dataIndex: "differenceTodAndSod",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "EXEMPT",
      key: "exempt",
      dataIndex: "exempt",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "DMTCARD",
      key: "dmtcard",
      dataIndex: "dmtcard",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "HPMC",
      key: "hpmc",
      dataIndex: "hpmc",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
    {
      title: "LEFTEXIT",
      key: "leftexit",
      dataIndex: "leftexit",
      align: 'center',
      width: 50,
      render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{_isNull(text)}</div>
    },
  ];

  const getMonthList = async () => {
    try {
      setLoading(true);
      const res = await getMonthListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setMonthList(res.list);
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

  const getYearList = async () => {
    try {
      setLoading(true);
      const res = await getYearListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setYearList(res.list);
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

  const headerText = [
    { name: "เดือน", value: dataToPrint.DataList ? dataToPrint.monthName : "" },
    { name: "ปี", value: dataToPrint.DataList ? String(dataToPrint.yearId) : "" },
    { name: "เรียงตาม", value: dataToPrint.DataList ? String(dataToPrint.DataList.sortBy) : "" },
  ];

  useEffect(() => {
    setScroll({ x: 4500 });
    getMonthList();
    getYearList();
    setSortByList(["ตรวจสอบค่าผ่านทางภายใน", "ตรวจสอบค่าผ่านทางภายนอก"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addIndex = (res) => {
    // const list = res.list.map((item, index) => {
    //   return { ...item, index: index + 1 }
    // })
    return {
      ...res,
      listExport: [...res.list]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000004L(data, props.auth.token);
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
    const month = monthList.find((e) => e.monthId === DataList.monthId)
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    setDataToPrint(
      {
        DataList,
        monthName: month ? month.monthNameTh : "",
        yearId: year ? year.yearId : "",
      })
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      monthId: value.monthId === "" ? null : value.monthId,
      yearId: value.yearId === "" ? null : value.yearId,
      sortBy: value.sortBy === "ตรวจสอบค่าผ่านทางภายใน" ? 1 : 2,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.4.12 Test Vehicle - To Client"],
  });

  const headerExcel = [
    { name: "Date", key: "operationalDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Toll booth section", key: "tsbNameEn", type: "nullColumn", align: 'center', className: 'text-left' },
    { name: "", key: "tsbNameTh", type: "nullColumn", align: 'center', className: 'text-left' },
    { name: "Cash Number of vehicle type 1", key: "cashTrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Cash Number of vehicle type 2", key: "cashTrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Cash Vehicle Type 1 toll fee (inc. VAT)", key: "cashFeeClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Cash Vehicle Type 2 toll fee (inc. VAT)", key: "cashFeeClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Coupon Number of vehicle type 1", key: "couponTrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Coupon Number of vehicle type 2", key: "couponTrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Coupon Vehicle Type 1 toll fee (inc. VAT)", key: "couponFeeClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Coupon Vehicle Type 2 toll fee (inc. VAT)", key: "couponFeeClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EMV Number of vehicle type 1", key: "emvTrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EMV Number of vehicle type 2", key: "emvTrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EMV Vehicle Type 1 toll fee (inc. VAT)", key: "emvFeeClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EMV Vehicle Type 2 toll fee (inc. VAT)", key: "emvFeeClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "QR-Code Number of vehicle type 1", key: "qrcodeTrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "QR-Code Number of vehicle type 2", key: "qrcodeTrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "QR-Code Vehicle Type 1 toll fee (inc. VAT)", key: "qrcodeFeeClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "QR-Code Vehicle Type 2 toll fee (inc. VAT)", key: "qrcodeFeeClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "M-Pass Number of vehicle type 1", key: "mpassTrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "M-Pass Number of vehicle type 2", key: "mpassTrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "M-Pass Vehicle Type 1 toll fee (inc. VAT)", key: "mpassFeeClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "M-Pass Vehicle Type 2 toll fee (inc. VAT)", key: "mpassFeeClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EasyPass Number of vehicle type 1", key: "easyPassTrxClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EasyPass Number of vehicle type 2", key: "easyPassTrxClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EasyPass Vehicle Type 1 toll fee (inc. VAT)", key: "easyPassFeeClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EasyPass Vehicle Type 2 toll fee (inc. VAT)", key: "easyPassFeeClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Number of Violation", key: "violation", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Revenue of Vehicle Type 1", key: "revenueClass1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Revenue of Vehicle Type 2", key: "revenueClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total revenue from SOD", key: "revenueTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total revenue from SOD (exc. VAT)", key: "revenueVat", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Total revenue from TOD", key: "totalRevenueFromTod", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "Difference TOD and SOD", key: "differenceTodAndSod", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "EXEMPT", key: "exempt", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "DMTCARD", key: "dmtcard", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "HPMC", key: "hpmc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "LEFTEXIT", key: "leftexit", type: "nullColumn", align: 'center', className: 'text-right' },
  ]

  const headerPDF = [
    { name: "Date", key: "operationalDate", type: "nullColumn", align: 'center', className: 'text-center', width: 70 },
    { name: "Toll booth section", key: "tsbNameEn", type: "nullColumn", align: 'center', className: 'text-left', width: 70 },
    { name: "", key: "tsbNameTh", type: "nullColumn", align: 'center', className: 'text-left', width: 70 },
    {
      name: "Cash",
      key: "",
      children: [
        { name: "Number of vehicle type 1", key: "cashTrxClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Number of vehicle type 2", key: "cashTrxClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 1 toll fee (inc. VAT)", key: "cashFeeClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 2 toll fee (inc. VAT)", key: "cashFeeClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
      ],
    },
    {
      name: "Coupon",
      key: "",
      children: [
        { name: "Number of vehicle type 1", key: "couponTrxClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Number of vehicle type 2", key: "couponTrxClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 1 toll fee (inc. VAT)", key: "couponFeeClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 2 toll fee (inc. VAT)", key: "couponFeeClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
      ],
    },
    {
      name: "EMV",
      key: "",
      children: [
        { name: "Number of vehicle type 1", key: "emvTrxClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Number of vehicle type 2", key: "emvTrxClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 1 toll fee (inc. VAT)", key: "emvFeeClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 2 toll fee (inc. VAT)", key: "emvFeeClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
      ],
    },
    {
      name: "QR-Code",
      key: "",
      children: [
        { name: "Number of vehicle type 1", key: "qrcodeTrxClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Number of vehicle type 2", key: "qrcodeTrxClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 1 toll fee (inc. VAT)", key: "qrcodeFeeClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 2 toll fee (inc. VAT)", key: "qrcodeFeeClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
      ],
    },
    {
      name: "M-Pass",
      key: "",
      children: [
        { name: "Number of vehicle type 1", key: "mpassTrxClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Number of vehicle type 2", key: "mpassTrxClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 1 toll fee (inc. VAT)", key: "mpassFeeClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 2 toll fee (inc. VAT)", key: "mpassFeeClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
      ],
    },
    {
      name: "EasyPass",
      key: "",
      children: [
        { name: "Number of vehicle type 1", key: "easyPassTrxClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Number of vehicle type 2", key: "easyPassTrxClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 1 toll fee (inc. VAT)", key: "easyPassFeeClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
        { name: "Vehicle Type 2 toll fee (inc. VAT)", key: "easyPassFeeClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
      ],
    },
    { name: "Number of Violation", key: "violation", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Revenue of Vehicle Type 1", key: "revenueClass1", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Revenue of Vehicle Type 2", key: "revenueClass2", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Total revenue from SOD", key: "revenueTotal", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Total revenue from SOD (exc. VAT)", key: "revenueVat", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Total revenue from TOD", key: "totalRevenueFromTod", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "Difference TOD and SOD", key: "differenceTodAndSod", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "EXEMPT", key: "exempt", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "DMTCARD", key: "dmtcard", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "HPMC", key: "hpmc", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
    { name: "LEFTEXIT", key: "leftexit", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
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
            dataSource: { list: dataSource.listExport },
            fileName: "7.4.12 Test Vehicle - To Client",
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
              defaultPageSize: 12,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.listExport ? dataSource.listExport.length : 0)),
            }}
            header={headerPDF}
            footer={[]}
            // columnPerPage={headerPDF.length}
            columnPerPage={7}
            propsHeader={{
              headerText,
              TopicText: "7.4.12 Test Vehicle - To Client",
            }}
            // propsClass="print-border-footer"
            rowPerPage={24} //จำนวนเเถวในเเต่ละหน้าของข้อมูล เมื่อ ปริ้น PDF default คือ 10 หากไม่ได้ใส่
          />
        </div>
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
)(TestVehicleToClientReport);
