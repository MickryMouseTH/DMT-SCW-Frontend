/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M060000016A, GET_DATA_INFO_M060000016A_getPaymentmethodListAPI } from "../../../service/api/report";
import {
  getTSBList_API,
  getSubVehicleTypeList_API,
  getShiftList_API,
} from "../../../service/api/util";
import {
  _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero, _setYearThai
} from "../../../tools/util";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;
const SummaryMoneyDificitMtcDailyReport = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [tsbList, setTsbList] = useState([]);
  const [paymentmethodList, setsPaymentmethodList] = useState([]);
  const [subVehicleTypeList, setSubVehicleTypeList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกจากวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกจากวันที่!" }],
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
          picker: "date",
          placeholder: "เลือกถึงวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกถึงวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.endDate,
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
      type: "select",
      option: {
        name: "paymentmethodId",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "ประเภทการชำระ...",
          optionValue: {
            values: ["ทั้งหมด", ...paymentmethodList],
            keyName: "paymentmethodDescriptionTh",
            keyValue: "paymentmethodId",
          },
        },
        rules: [{ required: false, message: "กรุณาเลือกประเภทการชำระ!" }],
        initialValue: initialValue.paymentmethodId ? initialValue.paymentmethodId : "ทั้งหมด",
      },
    },
    {
      type: "select",
      option: {
        name: "shiftId",
        label: "ผลัด",
        childrenProps: {
          placeholder: "เลือกผลัด...",
          optionValue: {
            values: ["ทั้งหมด", ...shiftList],
            keyName: "abbreviation",
            keyValue: "shiftId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกผลัด!",
          },
        ],
        initialValue: initialValue.shiftId ? initialValue.shiftId : "ทั้งหมด",
      },
    },
    {
      type: "select",
      option: {
        name: "vehicleId",
        label: "ประเภทรถ",
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
        // initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.vehicleId
        initialValue: initialValue.vehicleId ? initialValue.vehicleId : "ทั้งหมด",
      },
    },
  ];

  const columns = [
    {
      title: "วันที่",
      fixed: true,
      key: "date",
      dataIndex: "date",
      width: 120,
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
      title: "MTC System",
      align: 'center',
      children: [
        {
          title: "ปริมาณรถที่เก็บเงินได้ (คัน)",
          align: 'center',
          children: [
            {
              title: "เงินสด",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "cashClass1Trx",
                  dataIndex: "cashClass1Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "cashClass2Trx",
                  dataIndex: "cashClass2Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "cashClassTotalTrx",
                  dataIndex: "cashClassTotalTrx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "คูปอง",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "couponClass1Trx",
                  dataIndex: "couponClass1Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "couponClass2Trx",
                  dataIndex: "couponClass2Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "couponClassTotalTrx",
                  dataIndex: "couponClassTotalTrx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "EMV",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "emvClass1Trx",
                  dataIndex: "emvClass1Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "emvClass2Trx",
                  dataIndex: "emvClass2Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "emvClassTotalTrx",
                  dataIndex: "emvClassTotalTrx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "QRCode",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "qrClass1Trx",
                  dataIndex: "qrClass1Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "qrClass2Trx",
                  dataIndex: "qrClass2Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "qrClassTotalTrx",
                  dataIndex: "qrClassTotalTrx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "จำนวนรวม",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "totalClass1Trx",
                  dataIndex: "totalClass1Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "totalClass2Trx",
                  dataIndex: "totalClass2Trx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "totalClassTotalTrx",
                  dataIndex: "totalClassTotalTrx",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
          ],
        },
        {
          title: "จำนวนเงิน (บาท)",
          align: 'center',
          children: [
            {
              title: "เงินสด",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "cashClass1Revenue",
                  dataIndex: "cashClass1Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "cashClass2Revenue",
                  dataIndex: "cashClass2Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "cashClassTotalRevenue",
                  dataIndex: "cashClassTotalRevenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "คูปอง",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "couponClass1Revenue",
                  dataIndex: "couponClass1Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "couponClass2Revenue",
                  dataIndex: "couponClass2Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "couponClassTotalRevenue",
                  dataIndex: "couponClassTotalRevenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "EMV",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "emvClass1Revenue",
                  dataIndex: "emvClass1Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "emvClass2Revenue",
                  dataIndex: "emvClass2Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "emvClassTotalRevenue",
                  dataIndex: "emvClassTotalRevenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "QRCode",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "qrClass1Revenue",
                  dataIndex: "qrClass1Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "qrClass2Revenue",
                  dataIndex: "qrClass2Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "qrClassTotalRevenue",
                  dataIndex: "qrClassTotalRevenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
            {
              title: "จำนวนรวม",
              align: 'center',
              children: [
                {
                  title: "ป 1",
                  key: "totalClass1Revenue",
                  dataIndex: "totalClass1Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "ป 2",
                  key: "totalClass2Revenue",
                  dataIndex: "totalClass2Revenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
                {
                  title: "รวม",
                  key: "totalClassTotalRevenue",
                  dataIndex: "totalClassTotalRevenue",
                  align: 'center',
                  width: 80,
                  render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                },
              ],
            },
          ],
        },
        {
          title: "รวมทั้งสิ้น",
          align: 'center',
          children: [
            {
              title: "จำนวนรถ (คัน)",
              key: "totalClassTotalTrx",
              dataIndex: "totalClassTotalTrx",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "จำนวนเงิน (บาท)",
              key: "totalClassTotalRevenue",
              dataIndex: "totalClassTotalRevenue",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
        {
          title: "จำนวนเงินที่นับจากบริษัทเก็บเงิน / ธนาคาร (บาท)",
          key: "guardforceRevenue",
          dataIndex: "guardforceRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "ผลต่าง (บาท) +/(-)",
          key: "diffRevenue",
          dataIndex: "diffRevenue",
          align: 'center',
          width: 80,
          render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
        },
        {
          title: "Adjust หลังการตรวจสอบ Manaul",
          align: 'center',
          children: [
            {
              title: "เงินเรียกเก็บ พกง.",
              key: "auditAdjustSod",
              dataIndex: "auditAdjustSod",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "เงินยกเว้นตามเกณฑ์",
              key: "auditAdjustExcept",
              dataIndex: "auditAdjustExcept",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "เงินเกิน (รายได้)",
              key: "auditAdjustMcc",
              dataIndex: "auditAdjustMcc",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
            {
              title: "คงเหลือ",
              key: "auditAdjustBalance",
              dataIndex: "auditAdjustBalance",
              align: 'center',
              width: 80,
              render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    getTsbList();
    getPaymentmethodList();
    getSubVehicleType();
    getShiftList();
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
      const res = await GET_DATA_INFO_M060000016A_getPaymentmethodListAPI(null, props.auth.token);
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
    
    const totalAll = {
      date: 'TOTAL',
      cashClass1Trx: res.cashClass1TrxTotal,
      cashClass2Trx: res.cashClass2TrxTotal,
      cashClassTotalTrx: res.cashClassTotalTrxTotal,
      couponClass1Trx: res.couponClass1TrxTotal,
      couponClass2Trx: res.couponClass2TrxTotal,
      couponClassTotalTrx: res.couponClassTotalTrxTotal,
      emvClass1Trx: res.emvClass1TrxTotal,
      emvClass2Trx: res.emvClass2TrxTotal,
      emvClassTotalTrx: res.emvClassTotalTrxTotal,
      qrClass1Trx: res.qrClass1TrxTotal,
      qrClass2Trx: res.qrClass2TrxTotal,
      qrClassTotalTrx: res.qrClassTotalTrxTotal,
      totalClass1Trx: res.totalClass1TrxTotal,
      totalClass2Trx: res.totalClass2TrxTotal,
      totalClassTotalTrx: res.totalClassTotalTrxTotal,
      cashClass1Revenue: res.cashClass1RevenueTotal,
      cashClass2Revenue: res.cashClass2RevenueTotal,
      cashClassTotalRevenue: res.cashClassTotalRevenueTotal,
      couponClass1Revenue: res.couponClass1RevenueTotal,
      couponClass2Revenue: res.couponClass2RevenueTotal,
      couponClassTotalRevenue: res.couponClassTotalRevenueTotal,
      emvClass1Revenue: res.emvClass1RevenueTotal,
      emvClass2Revenue: res.emvClass2RevenueTotal,
      emvClassTotalRevenue: res.emvClassTotalRevenueTotal,
      qrClass1Revenue: res.qrClass1RevenueTotal,
      qrClass2Revenue: res.qrClass2RevenueTotal,
      qrClassTotalRevenue: res.qrClassTotalRevenueTotal,
      totalClass1Revenue: res.totalClass1RevenueTotal,
      totalClass2Revenue: res.totalClass2RevenueTotal,
      totalClassTotalRevenue: res.totalClassTotalRevenueTotal,
      guardforceRevenue: res.guardforceRevenueTotal,
      diffRevenue: res.diffRevenueTotal,
      auditAdjustSod: res.auditAdjustSodTotal,
      auditAdjustExcept: res.auditAdjustExceptTotal,
      auditAdjustMcc: res.auditAdjustMccTotal,
      auditAdjustBalance: res.auditAdjustBalanceTotal,
    }
    return {
      ...res, list: list,
      listExport: [...res.list, totalAll]
    }
  }

  const getDataInfo = async (data = null) => {
    console.log("getDataInfo", data)
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000016A(data, props.auth.token);
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
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    const paymentmethod = paymentmethodList.find((e) => e.paymentmethodId === DataList.paymentmethodId);
    const shift = shiftList.find((e) => e.shiftId === DataList.shiftId);
    const vehicle = subVehicleTypeList.find((e) => e.subVehicleTypeId === DataList.vehicleId);
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
      paymentmethodName: paymentmethod ? paymentmethod.paymentmethodDescriptionTh : "ทั้งหมด",
      shiftName: shift ? shift.abbreviation : "ทั้งหมด",
      vehicleName: vehicle ? vehicle.descriptionTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      paymentmethodId: value.paymentmethodId === "ทั้งหมด" ? null : value.paymentmethodId,
      shiftId: value.shiftId === "ทั้งหมด" ? null : value.shiftId,
      vehicleId: value.vehicleId === "ทั้งหมด" ? null : value.vehicleId,
    };
    getDataInfo(dataOutput);
  };


  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.16.1 รายงานสรุปรายได้ประจำวัน MTC"],
  });

  const headerText = [
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
    { name: "ด่าน", value: dataToPrint.tsbName ? dataToPrint.tsbName : "" },
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.paymentmethodName ? dataToPrint.paymentmethodName : "",
    },
    {
      name: "ผลัด",
      value: dataToPrint.shiftName ? dataToPrint.shiftName : "",
    },
    {
      name: "ประเภทรถ",
      value: dataToPrint.vehicleName ? dataToPrint.vehicleName : "",
    },
  ];

  const headerExcel = [
    { name: "วันที่", key: "date", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) เงินสด ป 1", key: "cashClass1Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) เงินสด ป 2", key: "cashClass2Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) เงินสด รวม", key: "cashClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) คูปอง ป 1", key: "couponClass1Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) คูปอง ป 2", key: "couponClass2Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) คูปอง รวม", key: "couponClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) EMV ป 1", key: "emvClass1Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) EMV ป 2", key: "emvClass2Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) EMV รวม", key: "emvClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) QRCode ป 1", key: "qrClass1Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) QRCode ป 2", key: "qrClass2Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) QRCode รวม", key: "qrClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) จำนวนรวม ป 1", key: "totalClass1Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) จำนวนรวม ป 2", key: "totalClass2Trx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ปริมาณรถที่เก็บเงินได้ (คัน) จำนวนรวม รวม", key: "totalClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) เงินสด ป 1", key: "cashClass1Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) เงินสด ป 2", key: "cashClass2Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) เงินสด รวม", key: "cashClassTotalRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) คูปอง ป 1", key: "couponClass1Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) คูปอง ป 2", key: "couponClass2Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) คูปอง รวม", key: "couponClassTotalRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) EMV ป 1", key: "emvClass1Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) EMV ป 2", key: "emvClass2Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) EMV รวม", key: "emvClassTotalRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) QRCode ป 1", key: "qrClass1Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) QRCode ป 2", key: "qrClass2Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) QRCode รวม", key: "qrClassTotalRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) จำนวนรวม ป 1", key: "totalClass1Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) จำนวนรวม ป 2", key: "totalClass2Revenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงิน (บาท) จำนวนรวม รวม", key: "totalClassTotalRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "รวมทั้งสิ้น จำนวนรถ (คัน)", key: "totalClassTotalTrx", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "รวมทั้งสิ้น จำนวนเงิน (บาท)", key: "totalClassTotalRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนเงินที่นับจากบริษัทเก็บเงิน / ธนาคาร (บาท)", key: "guardforceRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ผลต่าง (บาท) +/(-)", key: "diffRevenue", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Adjust หลังการตรวจสอบ Manaul เงินเรียกเก็บ พกง.", key: "auditAdjustSod", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Adjust หลังการตรวจสอบ Manaul เงินยกเว้นตามเกณฑ์", key: "auditAdjustExcept", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Adjust หลังการตรวจสอบ Manaul เงินเกิน (รายได้)	", key: "auditAdjustMcc", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Adjust หลังการตรวจสอบ Manaul คงเหลือ", key: "auditAdjustBalance", type: "nullColumn", align: 'center', className: 'text-center' },
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
            fileName: "6.16.1 รายงานสรุปรายได้ประจำวัน MTC",
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
                      <Text>TOTAL</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.cashClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={2}>
                      <Text>{_isNull(Number(dataSource.cashClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={3}>
                      <Text>{_isNull(Number(dataSource.cashClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.couponClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={5}>
                      <Text>{_isNull(Number(dataSource.couponClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(Number(dataSource.couponClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={7}>
                      <Text>{_isNull(Number(dataSource.emvClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={8}>
                      <Text>{_isNull(Number(dataSource.emvClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={9}>
                      <Text>{_isNull(Number(dataSource.emvClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={10}>
                      <Text>{_isNull(Number(dataSource.qrClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={11}>
                      <Text>{_isNull(Number(dataSource.qrClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={12}>
                      <Text>{_isNull(Number(dataSource.qrClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={13}>
                      <Text>{_isNull(Number(dataSource.totalClass1TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={14}>
                      <Text>{_isNull(Number(dataSource.totalClass2TrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={15}>
                      <Text>{_isNull(Number(dataSource.totalClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={16}>
                      <Text>{_isNull(Number(dataSource.cashClass1RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={17}>
                      <Text>{_isNull(Number(dataSource.cashClass2RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={18}>
                      <Text>{_isNull(Number(dataSource.cashClassTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={19}>
                      <Text>{_isNull(Number(dataSource.couponClass1RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={20}>
                      <Text>{_isNull(Number(dataSource.couponClass2RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={21}>
                      <Text>{_isNull(Number(dataSource.couponClassTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={22}>
                      <Text>{_isNull(Number(dataSource.emvClass1RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={23}>
                      <Text>{_isNull(Number(dataSource.emvClass2RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={24}>
                      <Text>{_isNull(Number(dataSource.emvClassTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={25}>
                      <Text>{_isNull(Number(dataSource.qrClass1RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={26}>
                      <Text>{_isNull(Number(dataSource.qrClass2RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={27}>
                      <Text>{_isNull(Number(dataSource.qrClassTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={28}>
                      <Text>{_isNull(Number(dataSource.totalClass1RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={29}>
                      <Text>{_isNull(Number(dataSource.totalClass2RevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={30}>
                      <Text>{_isNull(Number(dataSource.totalClassTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={31}>
                      <Text>{_isNull(Number(dataSource.totalClassTotalTrxTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={32}>
                      <Text>{_isNull(Number(dataSource.totalClassTotalRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={33}>
                      <Text>{_isNull(Number(dataSource.guardforceRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={34}>
                      <Text>{_isNull(Number(dataSource.diffRevenueTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={35}>
                      <Text>{_isNull(Number(dataSource.auditAdjustSodTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={36}>
                      <Text>{_isNull(Number(dataSource.auditAdjustExceptTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={37}>
                      <Text>{_isNull(Number(dataSource.auditAdjustMccTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={38}>
                      <Text>{_isNull(Number(dataSource.auditAdjustBalanceTotal))}</Text>
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
            dataSource={dataSource.listExport}
            HeaderBar={{
              headerText,
              TopicText: "6.16.1 รายงานสรุปรายได้ประจำวัน MTC"
            }}
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
)(SummaryMoneyDificitMtcDailyReport);
