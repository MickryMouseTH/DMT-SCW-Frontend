import React from 'react';
import { Table, Card, Row, Col, Typography } from 'antd';
import { _isNull, _isEmpty } from '../../../tools/util';
import PrintHeader from "./printHeader";
import "./portrait.css";
const { Text } = Typography;

class ComponentToPrint extends React.Component {

  render() {

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
        title: (!_isEmpty(this.props.dataSource)) ? !_isEmpty(this.props.dataSource.list1ColumnCurrentYearActualAdr) ? <b>{this.props.dataSource.list1ColumnCurrentYearActualAdr}</b> : "" : "",
        key: "currentYearActualAdr",
        dataIndex: "currentYearActualAdr",
        align: 'center',
        width: 70,
        render: (text) => <div className='text-right'>{_isNull(text)}</div>
      },
      {
        title: (!_isEmpty(this.props.dataSource)) ? !_isEmpty(this.props.dataSource.list1ColumnPreviousYearActualAdr) ? <b>{this.props.dataSource.list1ColumnPreviousYearActualAdr}</b> : "" : "",
        key: "previousYearActualAdr",
        dataIndex: "previousYearActualAdr",
        align: 'center',
        width: 70,
        render: (text, record) => <div className={record.order === 3 ? "text-right text-fuchsia" : "text-right text-blue"}>{_isNull(text)}</div>
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
        title: (!_isEmpty(this.props.dataSource)) ? !_isEmpty(this.props.dataSource.list1ColumnCurrentBudgetAdr) ? <b>{this.props.dataSource.list1ColumnCurrentBudgetAdr}</b> : "" : "",
        key: "currentBudgetAdr",
        dataIndex: "currentBudgetAdr",
        align: 'center',
        width: 70,
        render: (text) => <div className='text-right'>{_isNull(text)}</div>
      },
      {
        title: (!_isEmpty(this.props.dataSource)) ? !_isEmpty(this.props.dataSource.list1ColumnPercentVarianceBudgetAdr) ? <b>{this.props.dataSource.list1ColumnPercentVarianceBudgetAdr}</b> : "" : "",
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
        key: "dateFormat",
        dataIndex: "dateFormat",
        align: 'center',
        width: 50,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Actual Daily Revenue (THB)</b>,
        key: "actualDailyRevenue",
        dataIndex: "actualDailyRevenue",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>3 days moving average</b>,
        key: "days3MovingAverage",
        dataIndex: "days3MovingAverage",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>7 days moving average</b>,
        key: "days7MovingAverage",
        dataIndex: "days7MovingAverage",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Cash (THB)</b>,
        key: "cashAmount",
        dataIndex: "cashAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>%</b>,
        key: "cashPercent",
        dataIndex: "cashPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Coupon (THB)</b>,
        key: "couponAmount",
        dataIndex: "couponAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>%</b>,
        key: "couponPercent",
        dataIndex: "couponPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>QR-Code</b>,
        key: "qrcodeAmount",
        dataIndex: "qrcodeAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>%</b>,
        key: "qrcodePercent",
        dataIndex: "qrcodePercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: '',
        key: "dateFormat",
        dataIndex: "dateFormat",
        align: 'center',
        width: 50,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>EMV</b>,
        key: "emvAmount",
        dataIndex: "emvAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>%</b>,
        key: "emvPercent",
        dataIndex: "emvPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>M-Pass</b>,
        key: "mpassAmount",
        dataIndex: "mpassAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>%</b>,
        key: "mpassPercent",
        dataIndex: "mpassPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>EasyPass</b>,
        key: "easypassAmount",
        dataIndex: "easypassAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>%</b>,
        key: "easypassPercent",
        dataIndex: "easypassPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Org. Traffic (VpD)</b>,
        key: "orgTrafficAmount",
        dataIndex: "orgTrafficAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>NE Traffic Excl. LKN (VpD)</b>,
        key: "neTrafficAmount",
        dataIndex: "neTrafficAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 1 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Tarffic Total</b>,
        key: "totalTrafficAmount",
        dataIndex: "totalTrafficAmount",
        align: 'center',
        width: 30,
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
      },
    ]

    const column03 = [
      {
        title: <b></b>,
        fixed: true,
        key: "detail",
        dataIndex: "detail",
        align: 'center',
        width: 60,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "total",
        dataIndex: "total",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "cashAmount",
        dataIndex: "cashAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "cashPercent",
        dataIndex: "cashPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "couponAmount",
        dataIndex: "couponAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "couponPercent",
        dataIndex: "couponPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "qrcodeAmount",
        dataIndex: "qrcodeAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "qrcodePercent",
        dataIndex: "qrcodePercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "emvAmount",
        dataIndex: "emvAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "emvPercent",
        dataIndex: "emvPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "mpassAmount",
        dataIndex: "mpassAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "mpassPercent",
        dataIndex: "mpassPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "easypassAmount",
        dataIndex: "easypassAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "easypassPercent",
        dataIndex: "easypassPercent",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "orgTrafficAmount",
        dataIndex: "orgTrafficAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "neTrafficAmount",
        dataIndex: "neTrafficAmount",
        align: 'center',
        width: 30,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b></b>,
        key: "totalTrafficAmount",
        dataIndex: "totalTrafficAmount",
        align: 'center',
        width: 30,
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
        render: (text) => <div className='text-left text-blue'>{_isNull(text)}</div>
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
        render: (text) => <div className='text-left text-blue'>{_isNull(text)}</div>
      },
      {
        title: <b>Original</b>,
        key: "original",
        dataIndex: "original",
        align: 'center',
        width: 70,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>North Ext</b>,
        key: "northExt",
        dataIndex: "northExt",
        align: 'center',
        width: 70,
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
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
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
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
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
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
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
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
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
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
        render: (text, record) => <div className={record.index === 10 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b> Wk.Rev.</b>,
        key: "weeklyRevenue",
        dataIndex: "weeklyRevenue",
        align: 'center',
        width: 70,
        render: (text, record) => <div className={record.index === 10 ? "text-right text-green" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Wk.ADR.</b>,
        key: "weeklyAdr",
        dataIndex: "weeklyAdr",
        align: 'center',
        width: 70,
        render: (text, record) => <div className={record.index === 10 ? "text-right text-green" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Wk-to-Wk Var.</b>,
        key: "weekToWeek",
        dataIndex: "weekToWeek",
        align: 'center',
        width: 70,
        render: (text, record) => <div className={record.index === 10 ? "text-right text-green" : "text-right"}>{_isNull(text)}</div>
      },
      {
        title: <b>Ratio to YTD.ADR.</b>,
        key: "ratioToYtdAdr",
        dataIndex: "ratioToYtdAdr",
        align: 'center',
        width: 70,
        render: (text, record) => <div className={record.index === 10 ? "text-right text-green" : "text-right"}>{_isNull(text)}</div>
      },
    ]

    const column09 = [
      {
        title: <b>Period</b>,
        key: "datePeriod",
        dataIndex: "datePeriod",
        align: 'center',
        width: 100,
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
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
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
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
        render: (text) => <div className='text-right text-blue'>{_isNull(text)}</div>
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
        render: (text, record) => <div className={record.order === 1 ? "text-right text-green" : record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
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
        render: (text, record) => <div className={record.order === 2 ? "text-right text-blue" : "text-right"}>{_isNull(text)}</div>
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

    return (
      <div className=" d-flex justify-content-center">
        <Card className="w-100">
          <Row>
            <Col span={24} className="text-center" style={{ marginTop: '-10px' }}>
              <PrintHeader
                dateText={this.props.dataSource.dateText}
                headerText={this.props.dataSource.headerText}
              />
            </Col>
          </Row>
          <Row className="w-50">
            <Col span={24} className="text-center mb-5 mt-5">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list1}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column01}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center mb-5">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list2}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column02}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center mb-0">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list3}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column03}
                showHeader={false}
                footer={() => {
                  return (
                    <Row>
                      <Col
                        span={21}
                        style={{
                          textAlign: "end",
                          maxWidth: "100%",
                          padding: "2px 0",
                        }}
                      >
                        <Text className='font-5' style={{ padding: "0 5px" }}><b>{this.props.dataSource.list3TotalDetail}</b></Text>
                      </Col>
                      <Col span={1}
                        style={{ textAlign: "end", padding: "2px 0" }}
                      >
                        <Text style={{ padding: "0 0px" }} className='font-5 text-right'>
                          <b>{this.props.dataSource.list3TotalOrgTrafficAmount}</b>
                        </Text>
                      </Col>
                      <Col span={1}
                        style={{ textAlign: "end", padding: "2px 0" }}
                      >
                        <Text style={{ padding: "0 0px" }} className='font-5 text-right'>
                          <b>{this.props.dataSource.list3TotalNeTrafficAmount}</b>
                        </Text>
                      </Col>
                      <Col span={1}
                        style={{ textAlign: "end", padding: "2px 0" }}
                      >
                        <Text style={{ padding: "0 0px" }} className='font-5 text-right'>
                          <b>{this.props.dataSource.list3TotalTotalTrafficAmount}</b>
                        </Text>
                      </Col>
                    </Row>
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12} className="text-center mb-0">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list4}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column04}
                summary={null}
                showHeader={false}
              />
            </Col>
            <Col span={12} className="text-center mb-0">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list5}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column05}
                footer={() => {
                  return (
                    <Row>
                      <Col
                        span={6}
                        style={{
                          textAlign: "end",
                          maxWidth: "100%",
                          padding: "2px 0",
                        }}
                      >
                      </Col>
                      <Col span={6}
                        style={{ textAlign: "end", padding: "2px 0" }}
                      >
                        <Text style={{ padding: "0 0px" }} className='font-5 text-right'>
                          <b>{this.props.dataSource.list5TotalOriginal}</b>
                        </Text>
                      </Col>
                      <Col span={6}
                        style={{ textAlign: "end", padding: "2px 0" }}
                      >
                        <Text style={{ padding: "0 0px" }} className='font-5 text-right'>
                          <b>{this.props.dataSource.list5TotalNorthExt}</b>
                        </Text>
                      </Col>
                      <Col span={6}
                        style={{ textAlign: "end", padding: "2px 0" }}
                      >
                        <Text style={{ padding: "0 0px" }} className='font-5 text-right'>
                          <b>{this.props.dataSource.list5TotalTotal}</b>
                        </Text>
                      </Col>
                    </Row>
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-center mb-5">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list6}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column06}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={2} className="text-center mb-0 font-7">
              <b>Weekly</b>
            </Col>
            <Col span={22} className="text-center mb-5">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list7}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column07}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={2} className="text-center mb-0 font-7">
            </Col>
            <Col span={22} className="text-center mb-5">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list8}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column08}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={2} className="text-center mb-0 font-7">
              <b>Monthly</b>
            </Col>
            <Col span={22} className="text-center mb-5">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list9}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column09}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={2} className="text-center mb-0 font-7">
            </Col>
            <Col span={22} className="text-center mb-5">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list10}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column10}
                summary={null}
              />
            </Col>
          </Row>
          <Row>
            <Col span={2} className="text-center mb-0 font-7">
              <b>Yearly</b>
            </Col>
            <Col span={22} className="text-center mb-0">
              <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataSource.list11}
                bordered
                size="small"
                className={`print-size5 print-border`}
                pagination={false}
                columns={column11}
                footer={() => {
                  return (
                    <Row>
                      <Col
                        span={24}
                        style={{
                          textAlign: "center",
                          maxWidth: "100%",
                          padding: "0px 0",
                        }}
                      >
                        <Text className='font-5' style={{ padding: "0 0px" }}><b>(Based on the latest ADR.)</b></Text>
                      </Col>
                    </Row>
                  );
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}


export default ComponentToPrint;