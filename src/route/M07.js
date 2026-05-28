import React from 'react';
const M070000002 = React.lazy(() => import('../views/M07/M070000002/ReportTodIndividual'));
const M070000001 = React.lazy(() => import('../views/M07/M070000001/ImportEstimatedRevenueData'));
const M070000003 = React.lazy(() => import('../views/M07/M070000003/WorkingHoursInspectionReport'));
const M070000004 = React.lazy(() => import('../views/M07/M070000004/MorningRevenueReport'));
const M07000004A = React.lazy(() => import('../views/M07/M07000004A/MorningRevenueBeforeAuditReport'));
const M07000004B = React.lazy(() => import('../views/M07/M07000004B/DailyCompletelyRevenueReport'));
const M07000004B_ReportDetail = React.lazy(() => import('../views/M07/M07000004B/ReportDetail'));
const M0700004BA = React.lazy(() => import('../views/M07/M0700004BA/ReportHistoricalDailyRevenueAndDailyTraffic'));
const M0700004BB = React.lazy(() => import('../views/M07/M0700004BB/ImportFileYearly'));
const M07000004C = React.lazy(() => import('../views/M07/M07000004C/MorningRevenueAfterAuditReport'));
const M07000004D = React.lazy(() => import('../views/M07/M07000004D/ReportDailyRevenueAfterAudit'));
const M07000004E = React.lazy(() => import('../views/M07/M07000004E/ReportDailyRevenueYear'));
const M07000004F = React.lazy(() => import('../views/M07/M07000004F/MonthlyTollRevenueTrafficYearReport746'));
const M07000004G = React.lazy(() => import('../views/M07/M07000004G/MonthlyTollRevenueTrafficYearReport747'));
const M07000004H = React.lazy(() => import('../views/M07/M07000004H/SummaryOfTollVsTrafficReport'));
const M07000004I = React.lazy(() => import('../views/M07/M07000004I/TrafficVolumeOnTollwayReport'));
const M07000004J = React.lazy(() => import('../views/M07/M07000004J/MonthlyTollRevenueAndTrafficReport'));
const M07000004K = React.lazy(() => import('../views/M07/M07000004K/DailyTrafficReport'));
const M07000004L = React.lazy(() => import('../views/M07/M07000004L/TestVehicleToClientReport'));
const M070000005 = React.lazy(() => import('../views/M07/M070000005/MorningTrafficReport'));
const M07000005A = React.lazy(() => import('../views/M07/M07000005A/MorningTrafficBeforeAuditReport'));
const M07000005B = React.lazy(() => import('../views/M07/M07000005B/MorningTrafficAfterAuditReport'));
const M07000005D = React.lazy(() => import('../views/M07/M07000005D/ReportDailyTrafficAfterAudit'));
const M07000005E = React.lazy(() => import('../views/M07/M07000005E/ReportDailyTrafficYear'));
const M070000006 = React.lazy(() => import('../views/M07/M070000006/MorningHoulyTrafficReport'));
const M07000006A = React.lazy(() => import('../views/M07/M07000006A/ReportDailyTrafficAfterAudit'));
const M07000006B = React.lazy(() => import('../views/M07/M07000006B/ReportTrafficMtcByLane'));
const M07000006C = React.lazy(() => import('../views/M07/M07000006C/ReportTrafficEtcByLane'));
const M07000006D = React.lazy(() => import('../views/M07/M07000006D/MonthlySignalStatistics764'));
const M07000006E = React.lazy(() => import('../views/M07/M07000006E/MonthlySignalStatistics765'));
const M07000006F = React.lazy(() => import('../views/M07/M07000006F/ReportDailyBellSignalStatistics'));
const M070000007 = React.lazy(() => import('../views/M07/M070000007/DailyCompletelyRevenueReport'));
const M070000008 = React.lazy(() => import('../views/M07/M070000008/DailyCompletelyTrafficandRevenueReport'));
const M070000009 = React.lazy(() => import('../views/M07/M070000009/DailyReconcliationReport'));
const M070000010 = React.lazy(() => import('../views/M07/M0700000010/AverageDailyRevenue'));
const M070000013 = React.lazy(() => import('../views/M07/M0700000013/HourlyTrafficByPlazaAndLaneReport'));

const M07 = [
  {
    id: "M07",
    path: '/',
    exact: true,
    name: 'M07',
    // component: Dashboard
  },
  {
    id: "M070000001",
    path: '/import-estimated-revenue-data',
    exact: true,
    name: 'M070000001',
    parentName: ['M07'],
    component: M070000001
  },
  {
    id: "M070000002",
    path: '/individual-submission-reports',
    exact: true,
    name: 'M070000002',
    parentName: ['M07'],
    component: M070000002
  },
  {
    id: "M070000003",
    path: '/working-hours-inspection-report',
    exact: true,
    name: 'M070000003',
    parentName: ['M07'],
    component: M070000003
  },
  {
    id: "M070000004",
    path: '/morning-revenue-report',
    exact: true,
    name: 'M070000004',
    parentName: ['M07'],
    component: M070000004
  },
  {
    id: "M07000004A",
    path: '/shift-revenue-before-audit-report',
    exact: true,
    name: 'M07000004A',
    parentName: ['M07'],
    component: M07000004A
  },
  {
    id: "M07000004B",
    path: '/daily-completely-revenue-report2',
    exact: true,
    name: 'M07000004B',
    parentName: ['M07'],
    component: M07000004B
  },  
  {
    id: "M07000004B",
    path: '/daily-completely-revenue-report2/reportdetail',
    name: 'M07000004B01',
    exact: true,
    parentName: ['M07', 'M07000004B'],
    component: M07000004B_ReportDetail
  },
  {
    id: "M0700004BA",
    path: '/report-historical-daily-revenue-and-daily-traffic',
    exact: true,
    name: 'M0700004BA',
    parentName: ['M07'],
    component: M0700004BA
  },
  {
    id: "M0700004BB",
    path: '/import-file-yearly',
    exact: true,
    name: 'M0700004BB',
    parentName: ['M07'],
    component: M0700004BB
  },
  {
    id: "M07000004C",
    path: '/shift-revenue-after-audit-report',
    exact: true,
    name: 'M07000004C',
    parentName: ['M07'],
    component: M07000004C
  },
  {
    id: "M07000004D",
    path: '/report-daily-revenue-after-audit',
    exact: true,
    name: 'M07000004D',
    parentName: ['M07'],
    component: M07000004D
  },
  {
    id: "M07000004E",
    path: '/report-daily-revenue-year',
    exact: true,
    name: 'M07000004E',
    parentName: ['M07'],
    component: M07000004E
  },
  {
    id: "M07000004F",
    path: '/monthly-toll-revenue-traffic-year-report-746',
    exact: true,
    name: 'M07000004F',
    parentName: ['M07'],
    component: M07000004F
  },
  {
    id: "M07000004G",
    path: '/monthly-toll-revenue-traffic-year-report-747',
    exact: true,
    name: 'M07000004G',
    parentName: ['M07'],
    component: M07000004G
  },
  {
    id: "M07000004H",
    path: '/summary-of-toll-vs-traffic-report',
    exact: true,
    name: 'M07000004H',
    parentName: ['M07'],
    component: M07000004H
  },
  {
    id: "M07000004I",
    path: '/traffic-volume-on-tollway-report',
    exact: true,
    name: 'M07000004I',
    parentName: ['M07'],
    component: M07000004I
  },
  {
    id: "M07000004J",
    path: '/monthly-toll-revenue-and-traffic-report',
    exact: true,
    name: 'M07000004J',
    parentName: ['M07'],
    component: M07000004J
  },
  {
    id: "M07000004K",
    path: '/daily-traffic-report',
    exact: true,
    name: 'M07000004K',
    parentName: ['M07'],
    component: M07000004K
  },
  {
    id: "M07000004L",
    path: '/test-vehicle-to-client-report',
    exact: true,
    name: 'M07000004L',
    parentName: ['M07'],
    component: M07000004L
  },
  {
    id: "M070000005",
    path: '/morning-traffic-report',
    exact: true,
    name: 'M070000005',
    parentName: ['M07'],
    component: M070000005
  },
  {
    id: "M07000005A",
    path: '/daily-revenue-before-audit-report',
    exact: true,
    name: 'M07000005A',
    parentName: ['M07'],
    component: M07000005A
  },
  {
    id: "M07000005B",
    path: '/daily-revenue-after-audit-report',
    exact: true,
    name: 'M07000005B',
    parentName: ['M07'],
    component: M07000005B
  },
  {
    id: "M07000005D",
    path: '/report-daily-traffic-after-audit',
    exact: true,
    name: 'M07000005D',
    parentName: ['M07'],
    component: M07000005D
  },
  {
    id: "M07000005E",
    path: '/report-daily-traffic-year',
    exact: true,
    name: 'M07000005E',
    parentName: ['M07'],
    component: M07000005E
  },
  {
    id: "M070000006",
    path: '/morning-houly-traffic-report',
    exact: true,
    name: 'M070000006',
    parentName: ['M07'],
    component: M070000006
  },
  {
    id: "M07000006A",
    path: '/report-daily-traffic-after-audit2',
    exact: true,
    name: 'M07000006A',
    parentName: ['M07'],
    component: M07000006A
  },
  {
    id: "M07000006B",
    path: '/report-traffic-mtc-by-lane',
    exact: true,
    name: 'M07000006B',
    parentName: ['M07'],
    component: M07000006B
  },
  {
    id: "M07000006C",
    path: '/report-traffic-etc-by-lane',
    exact: true,
    name: 'M07000006C',
    parentName: ['M07'],
    component: M07000006C
  },
  {
    id: "M07000006D",
    path: '/monthly-signal-statistics-764',
    exact: true,
    name: 'M07000006D',
    parentName: ['M07'],
    component: M07000006D
  },
  {
    id: "M07000006E",
    path: '/monthly-signal-statistics-765',
    exact: true,
    name: 'M07000006E',
    parentName: ['M07'],
    component: M07000006E
  },
  {
    id: "M07000006F",
    path: '/report-daily-bell-signal-statistics',
    exact: true,
    name: 'M07000006F',
    parentName: ['M07'],
    component: M07000006F
  },
  {
    id: "M070000007",
    path: '/daily-completely-revenue-report',
    exact: true,
    name: 'M070000007',
    parentName: ['M07'],
    component: M070000007
  },
  {
    id: "M070000008",
    path: '/daily-completely-traffic-and-revenue-report',
    exact: true,
    name: 'M070000008',
    parentName: ['M07'],
    component: M070000008
  },
  {
    id: "M070000009",
    path: '/daily-reconcliation-report',
    exact: true,
    name: 'M070000009',
    parentName: ['M07'],
    component: M070000009
  },
  {
    id: "M070000010",
    path: '/average-daily-revenue',
    exact: true,
    name: 'M070000010',
    parentName: ['M07'],
    component: M070000010
  },
  {
    id: "M070000013",
    path: '/hourly-traffic-by-plaza-and-lane',
    exact: true,
    name: 'M070000013',
    parentName: ['M07'],
    component: M070000013
  },
]
export default M07