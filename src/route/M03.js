import React from 'react';
const M030000001 = React.lazy(() => import('../views/M03/M030000001'));
const M030000002 = React.lazy(() => import('../views/M03/M030000002'));
const M030000003 = React.lazy(() => import('../views/M03/M030000003'));
const M030000003_SecondTable = React.lazy(() => import('../views/M03/M030000003/ViolationReportSecondTable'));
const M030000004 = React.lazy(() => import('../views/M03/M030000004'));
const M030000005 = React.lazy(() => import('../views/M03/M030000005'));
const M030000006 = React.lazy(() => import('../views/M03/M030000006'));
const M030000006_ReportDetail = React.lazy(() => import('../views/M03/M030000006/ReportDetail'));
const M030000007 = React.lazy(() => import('../views/M03/M030000007/ChronicleRport'));
const M030000007_ReportDetail = React.lazy(() => import('../views/M03/M030000007/ReportDetail'));
const M030000008 = React.lazy(() => import('../views/M03/M030000008/CrashByLane'));
const M030000009 = React.lazy(() => import('../views/M03/M030000009/PassingTransactionEmvQr'));
const M030000010 = React.lazy(() => import('../views/M03/M030000010/PassingTransactionEtc'));
const M030000011 = React.lazy(() => import('../views/M03/M030000011/CardPassingTransactions'));
const M030000012 = React.lazy(() => import('../views/M03/M030000012/ComparisonTrafficAndBisDaily'));
const M030000013 = React.lazy(() => import('../views/M03/M030000013/ComparisonTrafficAndBisLane'));
const M030000014 = React.lazy(() => import('../views/M03/M030000014/CompareScwBisDaily'));
const M030000014_hourly = React.lazy(() => import('../views/M03/M030000014/CompareScwBisHourly'));
const M030000014_five_minnute = React.lazy(() => import('../views/M03/M030000014/CompareScwBisFiveMinnute'));

const M03 = [
  {
    id: "M03",
    path: '/',
    exact: true,
    name: 'M03',
    // component: Dashboard
  },
  {
    id: "M030000001",
    path: '/reports/supervisor-adjustment',
    exact: true,
    name: 'M030000001',
    parentName: ['M03'],
    component: M030000001
  },
  {
    id: "M030000002",
    path: '/reports/daily-violation-reports',
    exact: true,
    name: 'M030000002',
    parentName: ['M03'],
    component: M030000002
  },
  {
    id: "M030000003",
    path: '/reports/violation-summary-reports',
    exact: true,
    name: 'M030000003',
    parentName: ['M03'],
    component: M030000003
  },
  {
    id: "M030000003",
    path: '/reports/violation-summary-reports/:id',
    exact: true,
    name: 'M030000003_second_table',
    parentName: ['M03', 'M030000003'],
    component: M030000003_SecondTable
  },
  {
    id: "M030000004",
    path: '/reports/passing-transactions',
    exact: true,
    name: 'M030000004',
    parentName: ['M03'],
    component: M030000004
  },
  {
    id: "M030000005",
    path: '/reports/list-of-jobs',
    exact: true,
    name: 'M030000005',
    parentName: ['M03'],
    component: M030000005
  },
  {
    id: "M030000006",
    path: '/reports/tod-reports',
    exact: true,
    name: 'M030000006',
    parentName: ['M03'],
    component: M030000006
  },
  // {
  //   id: "M030000006",
  //   path: '/reports/tod-reports/reportdetail/:id',
  //   name: 'M03000000601',
  //   exact: true,
  //   parentName: ['M03', 'M030000006'],
  //   component: M030000006_ReportDetail
  // },
  {
    id: "M030000006",
    path: '/reports/tod-reports/reportdetail',
    name: 'M03000000601',
    exact: true,
    parentName: ['M03', 'M030000006'],
    component: M030000006_ReportDetail
  },
  {
    id: "M030000007",
    path: '/reports/event-by-staff-lane-shift',
    exact: true,
    name: 'M030000007',
    parentName: ['M03'],
    component: M030000007
  },
  {
    id: "M030000007",
    path: '/reports/event-by-staff-lane-shift/reportdetail',
    name: 'M03000000701',
    exact: true,
    parentName: ['M03', 'M030000007'],
    component: M030000007_ReportDetail
  },
  {
    id: "M030000008",
    path: '/reports/crash-by-lane',
    exact: true,
    name: 'M030000008',
    parentName: ['M03'],
    component: M030000008
  },
  {
    id: "M030000009",
    path: '/reports/passing-transaction-emv-qr',
    exact: true,
    name: 'M030000009',
    parentName: ['M03'],
    component: M030000009
  },
  {
    id: "M030000010",
    path: '/reports/passing-transaction-etc',
    exact: true,
    name: 'M030000010',
    parentName: ['M03'],
    component: M030000010
  },
  {
    id: "M030000011",
    path: '/reports/card-passing-transaction',
    exact: true,
    name: 'M030000011',
    parentName: ['M03'],
    component: M030000011
  },
  {
    id: "M030000012",
    path: '/reports/comparison-traffic-and-bis-daily',
    exact: true,
    name: 'M030000012',
    parentName: ['M03'],
    component: M030000012
  },
  {
    id: "M030000013",
    path: '/reports/comparison-traffic-and-bis-lane',
    exact: true,
    name: 'M030000013',
    parentName: ['M03'],
    component: M030000013
  },
  {
    id: "M030000014",
    path: '/reports/compare-scw-bis-daily',
    exact: true,
    name: 'M030000014',
    parentName: ['M04'],
    component: M030000014
  },
  {
      id: "M030000014",
      path: '/reports/compare-scw-bis-hourly/:id',
      exact: true,
      name: 'M03000001401',
      parentName: ['M04', 'M030000014'],
      component: M030000014_hourly
  },
  {
      id: "M030000014",
      path: '/reports/compare-scw-bis-five-minnute/:id',
      exact: true,
      name: 'M03000001402',
      parentName: ['M04', 'M030000014'],
      component: M030000014_five_minnute
  },
  
]
export default M03