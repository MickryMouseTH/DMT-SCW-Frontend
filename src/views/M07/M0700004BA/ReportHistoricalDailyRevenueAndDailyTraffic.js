import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
// import { useReactToPrint } from "react-to-print";
import moment from 'moment'
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import { Table, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading";

import { GET_DATA_INFO_M0700004BA, DOWNLOAD_FILE_PDF_M0700004BA } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF"

const dateFormat = "DD/MM/YYYY";

const ReportHistoricalDailyRevenueAndDailyTraffic = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list1: [], list1ColumnCurrentYearActualAdr: '' });
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});

  useEffect(() => {
    setScroll({ x: 2000, y: 800 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "operationalDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.operationalDate,
      },
    }
  ];

  const column01 = [
    {
      title: '',
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      align: 'center',
      width: 80,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>{dataSource.list1ColumnCurrentYearActualAdr}</b>,
      key: "currentYearActualAdr",
      dataIndex: "currentYearActualAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>{dataSource.list1ColumnPreviousYearActualAdr}</b>,
      key: "previousYearActualAdr",
      dataIndex: "previousYearActualAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>% Variance</b>,
      key: "percentVariance",
      dataIndex: "percentVariance",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>{dataSource.list1ColumnCurrentBudgetAdr}</b>,
      key: "currentBudgetAdr",
      dataIndex: "currentBudgetAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>{dataSource.list1ColumnPercentVarianceBudgetAdr}</b>,
      key: "percentVarianceBudgetAdr",
      dataIndex: "percentVarianceBudgetAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column02 = [
    {
      title: '',
      fixed: true,
      key: "dateFormat",
      dataIndex: "dateFormat",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>Actual Daily Revenue (THB)</b>,
      key: "actualDailyRevenue",
      dataIndex: "actualDailyRevenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>3 days moving average</b>,
      key: "days3MovingAverage",
      dataIndex: "days3MovingAverage",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>7 days moving average</b>,
      key: "days7MovingAverage",
      dataIndex: "days7MovingAverage",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Cash (THB)</b>,
      key: "cashAmount",
      dataIndex: "cashAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>%</b>,
      key: "cashPercent",
      dataIndex: "cashPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Coupon (THB)</b>,
      key: "couponAmount",
      dataIndex: "couponAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>%</b>,
      key: "couponPercent",
      dataIndex: "couponPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>QR-Code</b>,
      key: "qrcodeAmount",
      dataIndex: "qrcodeAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>%</b>,
      key: "qrcodePercent",
      dataIndex: "qrcodePercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>EMV</b>,
      key: "emvAmount",
      dataIndex: "emvAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>%</b>,
      key: "emvPercent",
      dataIndex: "emvPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>M-Pass</b>,
      key: "mpassAmount",
      dataIndex: "mpassAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>%</b>,
      key: "mpassPercent",
      dataIndex: "mpassPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>EasyPass</b>,
      key: "easypassAmount",
      dataIndex: "easypassAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>%</b>,
      key: "easypassPercent",
      dataIndex: "easypassPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Org. Traffic (VpD)</b>,
      key: "orgTrafficAmount",
      dataIndex: "orgTrafficAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>NE Traffic Excl. LKN (VpD)</b>,
      key: "neTrafficAmount",
      dataIndex: "neTrafficAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Traffic Total</b>,
      key: "totalTrafficAmount",
      dataIndex: "totalTrafficAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column03 = [
    {
      title: <b></b>,
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "total",
      dataIndex: "total",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "cashAmount",
      dataIndex: "cashAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "cashPercent",
      dataIndex: "cashPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "couponAmount",
      dataIndex: "couponAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "couponPercent",
      dataIndex: "couponPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "qrcodeAmount",
      dataIndex: "qrcodeAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "qrcodePercent",
      dataIndex: "qrcodePercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "emvAmount",
      dataIndex: "emvAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "emvPercent",
      dataIndex: "emvPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "mpassAmount",
      dataIndex: "mpassAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "mpassPercent",
      dataIndex: "mpassPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "easypassAmount",
      dataIndex: "easypassAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "easypassPercent",
      dataIndex: "easypassPercent",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "orgTrafficAmount",
      dataIndex: "orgTrafficAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "neTrafficAmount",
      dataIndex: "neTrafficAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "totalTrafficAmount",
      dataIndex: "totalTrafficAmount",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column04 = [
    {
      title: <b></b>,
      key: "detail",
      dataIndex: "detail",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "trafficValue",
      dataIndex: "trafficValue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b></b>,
      key: "percentValue",
      dataIndex: "percentValue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column05 = [
    {
      title: <b></b>,
      key: "detail",
      dataIndex: "detail",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>Original</b>,
      key: "original",
      dataIndex: "original",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>North Ext</b>,
      key: "northExt",
      dataIndex: "northExt",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Total</b>,
      key: "total",
      dataIndex: "total",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column06 = [
    {
      title: <b>Daily</b>,
      key: "daily",
      dataIndex: "daily",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>Date</b>,
      key: "currentDate",
      dataIndex: "currentDate",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-center'>{_isNull(text)}</div>
    },
    {
      title: <b>Cur.Wk. Actual Daily Revenue</b>,
      key: "currentRevenue",
      dataIndex: "currentRevenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Date</b>,
      key: "previousDate",
      dataIndex: "previousDate",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-center'>{_isNull(text)}</div>
    },
    {
      title: <b>Prev.Wk. Actual Daily Revenue</b>,
      key: "previousRevenue",
      dataIndex: "previousRevenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Day-to-Day Var.</b>,
      key: "dayToDayVar",
      dataIndex: "dayToDayVar",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Remarks</b>,
      key: "remark",
      dataIndex: "remark",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
  ]

  const column07 = [
    {
      title: <b>Period</b>,
      key: "currentPeriod",
      dataIndex: "currentPeriod",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>Wk.Rev.Todate</b>,
      key: "currentRevenue",
      dataIndex: "currentRevenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Cur.Wk.ADR. Todate</b>,
      key: "currentAdr",
      dataIndex: "currentAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Period</b>,
      key: "previousPeriod",
      dataIndex: "previousPeriod",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Prev.Wk.ADR. Todate</b>,
      key: "previousAdr",
      dataIndex: "previousAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Wk-to-Wk Var.</b>,
      key: "percentValue",
      dataIndex: "percentValue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column08 = [
    {
      title: <b></b>,
      key: "index",
      dataIndex: "index",
      align: 'center',
      width: 30,
      render: (text) => <div className='text-center'>{_isNull(text)}</div>
    },
    {
      title: <b>Period</b>,
      key: "datePeriod",
      dataIndex: "datePeriod",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b> Wk.Rev.</b>,
      key: "weeklyRevenue",
      dataIndex: "weeklyRevenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Wk.ADR.</b>,
      key: "weeklyAdr",
      dataIndex: "weeklyAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Wk-to-Wk Var.</b>,
      key: "weekToWeek",
      dataIndex: "weekToWeek",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Ratio to YTD.ADR.</b>,
      key: "ratioToYtdAdr",
      dataIndex: "ratioToYtdAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column09 = [
    {
      title: <b>Period</b>,
      key: "datePeriod",
      dataIndex: "datePeriod",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-center'>{_isNull(text)}</div>
    },
    {
      title: <b>Cur.Mth.Rev.</b>,
      key: "currentMonthlyRevenue",
      dataIndex: "currentMonthlyRevenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Cur.Mth.ADR.</b>,
      key: "currentMonthlyAdr",
      dataIndex: "currentMonthlyAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Cur.Mth.Daily Budget</b>,
      key: "currentMonthlyBudget",
      dataIndex: "currentMonthlyBudget",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Var. to Budget</b>,
      key: "varBudget",
      dataIndex: "varBudget",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Prev.Mth.ADR.</b>,
      key: "previousMonthlyAdr",
      dataIndex: "previousMonthlyAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Mth-to-Mth Var.</b>,
      key: "monthlyToMonthlyVar",
      dataIndex: "monthlyToMonthlyVar",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column10 = [
    {
      title: <b>Month</b>,
      key: "monthValue",
      dataIndex: "monthValue",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>Mth. Budget</b>,
      key: "monthBudget",
      dataIndex: "monthBudget",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Mth.Rev.</b>,
      key: "monthRevenue",
      dataIndex: "monthRevenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Budget ADR.</b>,
      key: "budgetAdr",
      dataIndex: "budgetAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Mth.ADR.</b>,
      key: "monthAdr",
      dataIndex: "monthAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Var. to Budget</b>,
      key: "varToBudget",
      dataIndex: "varToBudget",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Ratio to YTD.ADR.</b>,
      key: "ratioToYtdAdr",
      dataIndex: "ratioToYtdAdr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const column11 = [
    {
      title: <b>Period</b>,
      key: "detail",
      dataIndex: "detail",
      align: 'center',
      width: 100,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>Period</b>,
      key: "period",
      dataIndex: "period",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-left'>{_isNull(text)}</div>
    },
    {
      title: <b>Revenue</b>,
      key: "revenue",
      dataIndex: "revenue",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Budget</b>,
      key: "budget",
      dataIndex: "budget",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>ADR.</b>,
      key: "adr",
      dataIndex: "adr",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Daily Budget</b>,
      key: "dailyBudget",
      dataIndex: "dailyBudget",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
    {
      title: <b>Var. to Budget</b>,
      key: "varToBudget",
      dataIndex: "varToBudget",
      align: 'center',
      width: 70,
      render: (text) => <div className='text-right'>{_isNull(text)}</div>
    },
  ]

  const headerText = [
    {
      name: "วันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.operationalDate, "DD/MM/YYYY")
        : "",
    }
  ];

  const handlePrintFile = () => {
    // handlePrint();
    handleDownload();
  };

  const printReportRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => printReportRef.current,
  //   documentTitle: ["7.4.2.1 Historical Daily Revenue and Daily Traffic"],
  // });

  const headerExcel = [
    { name: "", key: "A", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "", key: "B", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "C", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "D", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "E", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "F", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "G", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "H", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "I", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "J", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "K", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "L", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "M", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "N", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "O", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "P", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "Q", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "R", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "S", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "T", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "U", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "V", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "W", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "X", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "Y", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "", key: "Z", type: "nullColumn", align: 'center', className: 'text-right' }
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
        onClick: () =>
          _exportFileExcel({
            dataSource: { list: dataSource.listExportExcel },
            fileName: "7.4.2.1 Historical Daily Revenue and Daily Traffic",
            header: headerExcel,
          }),
      },
    },
  ];

  const addIndex = (res) => {

    const list1Head = {
      A: '',
      B: res.list1ColumnCurrentYearActualAdr,
      C: res.list1ColumnPreviousYearActualAdr,
      D: '% Variance',
      E: res.list1ColumnCurrentBudgetAdr,
      F: res.list1ColumnPercentVarianceBudgetAdr,
    }
    const list1 = res.list1.map((item) => {
      return {
        A: item.detail,
        B: item.currentYearActualAdr,
        C: item.previousYearActualAdr,
        D: item.percentVariance,
        E: item.currentBudgetAdr,
        F: item.percentVarianceBudgetAdr,
      }
    })

    const list2Head = {
      A: '',
      B: 'Actual Daily Revenue (THB)',
      C: '3 days moving average',
      D: '7 days moving average',
      E: 'Cash (THB)',
      F: '%',
      G: 'Coupon (THB)',
      H: '%',
      I: 'QR-Code',
      J: '%',
      K: 'EMV',
      L: '%',
      M: 'M-Pass',
      N: '%',
      O: 'EasyPass',
      P: '%',
      Q: 'Org. Traffic (VpD)',
      R: 'NE Traffic Excl. LKN (VpD)',
      S: 'Tarffic Total',
    }
    const list2 = res.list2.map((item) => {
      return {
        A: item.dateFormat,
        B: item.actualDailyRevenue,
        C: item.days3MovingAverage,
        D: item.days7MovingAverage,
        E: item.cashAmount,
        F: item.cashPercent,
        G: item.couponAmount,
        H: item.couponPercent,
        I: item.qrcodeAmount,
        J: item.qrcodePercent,
        K: item.emvAmount,
        L: item.emvPercent,
        M: item.mpassAmount,
        N: item.mpassPercent,
        O: item.easypassAmount,
        P: item.easypassPercent,
        Q: item.orgTrafficAmount,
        R: item.neTrafficAmount,
        S: item.totalTrafficAmount,
      }
    })

    const list3Head = {
      A: '',
      B: '',
      C: '',
      D: '',
      E: '',
      F: '',
      G: '',
      H: '',
      I: '',
      J: '',
      K: '',
      L: '',
      M: '',
      N: '',
      O: '',
      P: '',
      Q: '',
    }
    const list3 = res.list3.map((item) => {
      return {
        A: item.detail,
        B: item.total,
        C: item.cashAmount,
        D: item.cashPercent,
        E: item.couponAmount,
        F: item.couponPercent,
        G: item.qrcodeAmount,
        H: item.qrcodePercent,
        I: item.emvAmount,
        J: item.emvPercent,
        K: item.mpassAmount,
        L: item.mpassPercent,
        M: item.easypassAmount,
        N: item.easypassPercent,
        O: item.orgTrafficAmount,
        P: item.neTrafficAmount,
        Q: item.totalTrafficAmount,
      }
    })
    const list3Summary = {
      A: '',
      B: '',
      C: '',
      D: '',
      E: '',
      F: '',
      G: '',
      H: '',
      I: '',
      J: '',
      K: '',
      L: '',
      M: '',
      N: '% Variance to Traffic ' + res.currentYear,
      O: res.list3TotalOrgTrafficAmount,
      P: res.list3TotalNeTrafficAmount,
      Q: res.list3TotalTotalTrafficAmount,
    }

    const list4Head = {
      A: '',
      B: '',
      C: '',
    }
    const list4 = res.list4.map((item) => {
      return {
        A: item.detail,
        B: item.trafficValue,
        C: item.percentValue,
      }
    })

    const list5Head = {
      A: '',
      B: 'Original',
      C: 'North Ext',
      D: 'Total',
    }
    const list5 = res.list5.map((item) => {
      return {
        A: item.detail,
        B: item.original,
        C: item.northExt,
        D: item.total,
      }
    })
    const list5Summary = {
      A: '',
      B: res.list5TotalOriginal,
      C: res.list5TotalNorthExt,
      D: res.list5TotalTotal,
    }

    const list6Head = {
      A: 'Daily',
      B: 'Date',
      C: 'Cur.Wk. Actual Daily Revenue',
      D: 'Date',
      E: 'Prev.Wk. Actual Daily Revenue',
      F: 'Day-to-Day Var.',
      G: 'Remarks',
    }
    const list6 = res.list6.map((item) => {
      return {
        A: item.daily,
        B: item.currentDate,
        C: item.currentRevenue,
        D: item.previousDate,
        E: item.previousRevenue,
        F: item.dayToDayVar,
        G: item.remark,
      }
    })

    const list7Head = {
      A: 'Period',
      B: 'Wk.Rev.Todate',
      C: 'Cur.Wk.ADR. Todate',
      D: 'Period',
      E: 'Prev.Wk.ADR. Todate',
      F: 'Wk-to-Wk Var.',
    }
    const list7 = res.list7.map((item) => {
      return {
        A: item.currentPeriod,
        B: item.currentRevenue,
        C: item.currentAdr,
        D: item.previousPeriod,
        E: item.previousAdr,
        F: item.percentValue,
      }
    })

    const list8Head = {
      A: '',
      B: 'Period',
      C: 'Wk.Rev.',
      D: 'Wk.ADR.',
      E: 'Wk-to-Wk Var.',
      F: 'Ratio to YTD.ADR.',
    }
    const list8 = res.list8.map((item) => {
      return {
        A: item.index,
        B: item.datePeriod,
        C: item.weeklyRevenue,
        D: item.weeklyAdr,
        E: item.weekToWeek,
        F: item.ratioToYtdAdr,
      }
    })

    const list9Head = {
      A: 'Period',
      B: 'Cur.Mth.Rev.',
      C: 'Cur.Mth.ADR.',
      D: 'Cur.Mth.Daily Budget',
      E: 'Var. to Budget',
      F: 'Prev.Mth.ADR.',
      G: 'Mth-to-Mth Var.',
    }
    const list9 = res.list9.map((item) => {
      return {
        A: item.datePeriod,
        B: item.currentMonthlyRevenue,
        C: item.currentMonthlyAdr,
        D: item.currentMonthlyBudget,
        E: item.varBudget,
        F: item.previousMonthlyAdr,
        G: item.monthlyToMonthlyVar,
      }
    })

    const list10Head = {
      A: 'Month',
      B: 'Mth. Budget',
      C: 'Mth.Rev.',
      D: 'Budget ADR.',
      E: 'Mth.ADR.',
      F: 'Var. to Budget',
      G: 'Ratio to YTD.ADR.',
    }
    const list10 = res.list10.map((item) => {
      return {
        A: item.monthValue,
        B: item.monthBudget,
        C: item.monthRevenue,
        D: item.budgetAdr,
        E: item.monthAdr,
        F: item.varToBudget,
        G: item.ratioToYtdAdr,
      }
    })

    const list11Head = {
      A: 'Period',
      B: 'Period',
      C: 'Revenue',
      D: 'Budget',
      E: 'ADR.',
      F: 'Daily Budget',
      G: 'Var. to Budget',
    }
    const list11 = res.list11.map((item) => {
      return {
        A: item.detail,
        B: item.period,
        C: item.revenue,
        D: item.budget,
        E: item.adr,
        F: item.dailyBudget,
        G: item.varToBudget,
      }
    })

    return {
      ...res
      , listExportExcel: [list1Head, ...list1, {}, {}
        , list2Head, ...list2, {}
        , list3Head, ...list3, list3Summary, {}
        , list4Head, ...list4, {}, {}
        , list5Head, ...list5, list5Summary, {}, {}
        , list6Head, ...list6, {}, {}
        , list7Head, ...list7, {}, {}
        , list8Head, ...list8, {}, {}
        , list9Head, ...list9, {}, {}
        , list10Head, ...list10, {}, {}
        , list11Head, ...list11, {}, {}]
    }
  }

  const getData = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M0700004BA(dataOutput, props.auth.token);
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
  }

  const handleDownload = async () => {
    try {
      await DOWNLOAD_FILE_PDF_M0700004BA(dataSource, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeIdToName = (DataList) => {
    setDataToPrint({
      DataList,
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      operationalDate: _timeZoneThai(value.operationalDate),
    };
    getData(dataOutput);
  };

  return (
    <Skeleton loading={loading} active>
      <FormDefault
        fields={fields}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
        onFinish={handleOnFinish}
        action={action}
      />
      <div className={_isEmpty(dataSource.list1) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column01}
          bordered
          dataSource={dataSource.list1}
          pagination={false}
          summary={null}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list2) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scroll}
          columns={column02}
          bordered
          dataSource={dataSource.list2}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list3) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={scroll}
          columns={column03}
          bordered
          dataSource={dataSource.list3}
          pagination={false}
          summary={() => {
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={14}>
                    <div style={{ textAlign: "right" }}><b>{dataSource.list3TotalDetail}</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}><b>{dataSource.list3TotalOrgTrafficAmount}</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}><b>{dataSource.list3TotalNeTrafficAmount}</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}><b>{dataSource.list3TotalTotalTrafficAmount}</b></div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list4) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column04}
          bordered
          dataSource={dataSource.list4}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list5) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column05}
          bordered
          dataSource={dataSource.list5}
          pagination={false}
          summary={() => {
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={1}>
                    <div style={{ textAlign: "right" }}><b></b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}><b>{dataSource.list5TotalOriginal}</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}><b>{dataSource.list5TotalNorthExt}</b></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <div style={{ textAlign: "right" }}><b>{dataSource.list5TotalTotal}</b></div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list6) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column06}
          bordered
          dataSource={dataSource.list6}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list7) ? "mt-10" : "mt-0"}>
        <div style={{ textAlign: "left" }}><b>Weekly</b></div>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column07}
          bordered
          dataSource={dataSource.list7}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list8) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column08}
          bordered
          dataSource={dataSource.list8}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list9) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column09}
          bordered
          dataSource={dataSource.list9}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list10) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column10}
          bordered
          dataSource={dataSource.list10}
          pagination={false}
        />
      </div>
      <br />
      <div className={_isEmpty(dataSource.list11) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={column11}
          bordered
          dataSource={dataSource.list11}
          pagination={false}
        />
      </div>
      <br />
      <Row>
        <Col span={3} className={"text-right"}><b>{dataSource.footerDate}</b></Col>
      </Row>
      <Row>
        <Col span={3} className={"text-right"}>Actual Daily Revenue = </Col>
        <Col span={2} className={"text-center"}>{_isNull(dataSource.footerActualDailyRevenue)}</Col>
        <Col span={1} className={"text-left"}>THB</Col>
      </Row>
      <Row>
        <Col span={3} className={"text-right"}>Traffic Original = </Col>
        <Col span={2} className={"text-center"}>{_isNull(dataSource.footerOrgTrafficAmount)}</Col>
        <Col span={1} className={"text-left"}>VpD</Col>
      </Row>
      <Row>
        <Col span={3} className={"text-right"}>Traffic Northern Extension = </Col>
        <Col span={2} className={"text-center"}>{_isNull(dataSource.footerNeTrafficAmount)}</Col>
        <Col span={1} className={"text-left"}>VpD</Col>
      </Row>


      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataSource}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 24,
            TopicText: "7.4.2.1 Historical Daily Revenue and Daily Traffic"
          }} />
      </div>
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportHistoricalDailyRevenueAndDailyTraffic)
