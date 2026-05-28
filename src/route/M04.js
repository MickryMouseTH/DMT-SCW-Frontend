import React from 'react';
const M040000001 = React.lazy(() => import('../views/M04/M040000001'));
const M040000002 = React.lazy(() => import('../views/M04/M040000002'));
const M040000003 = React.lazy(() => import('../views/M04/M040000003'));
const M040000004 = React.lazy(() => import('../views/M04/M040000004'));
const M040000005 = React.lazy(() => import('../views/M04/M040000005'));
const M040000006 = React.lazy(() => import('../views/M04/M040000006'));
const M040000007 = React.lazy(() => import('../views/M04/M040000007'));
const M040000008 = React.lazy(() => import('../views/M04/M040000008/SummaryTrafficAndRevenueDaily'));
const M040000009 = React.lazy(() => import('../views/M04/M040000009/SummaryTrafficAndRevenueMonthly'));
const M040000011 = React.lazy(() => import('../views/M04/M040000011/ReportTrafficByPlaza'));
const M040000012 = React.lazy(() => import('../views/M04/M040000012/ReportAmountHourlyTraffic'));
const M040000013 = React.lazy(() => import('../views/M04/M040000013/ReportTrafficHourlyByLane'));
const M040000014 = React.lazy(() => import('../views/M04/M040000014/ReportTrafficCompareMtcEtc4Wheel'));
const M04000014A = React.lazy(() => import('../views/M04/M04000014A/MtcEtcYearReport'));
const M040000014_DETAIL = React.lazy(() => import('../views/M04/M040000014/ReportTrafficCompareMtcEtc4WheelPage2'));
const M040000015 = React.lazy(() => import('../views/M04/M040000015/ReportTraffic415'));

const M04 = [
  {
    id: "M04",
    path: '/',
    exact: true,
    name: 'M04',
    // component: Dashboard
  },
  {
    id: "M040000001",
    path: '/reports/hourly-traffic-revenue',
    exact: true,
    name: 'M040000001',
    parentName: ['M04'],
    component: M040000001
  },
  {
    id: "M040000002",
    path: '/reports/daily-traffic-revenue',
    exact: true,
    name: 'M040000002',
    parentName: ['M04'],
    component: M040000002
  },
  {
    id: "M040000003",
    path: '/reports/monthly-traffic-revenue',
    exact: true,
    name: 'M040000003',
    parentName: ['M04'],
    component: M040000003
  },
  {
    id: "M040000004",
    path: '/reports/hourly-average-traffic-revenue',
    exact: true,
    name: 'M040000004',
    parentName: ['M04'],
    component: M040000004
  },
  {
    id: "M040000005",
    path: '/reports/daily-average-traffic-revenue',
    exact: true,
    name: 'M040000005',
    parentName: ['M04'],
    component: M040000005
  },
  {
    id: "M040000006",
    path: '/reports/monthly-average-traffic-revenue',
    exact: true,
    name: 'M040000006',
    parentName: ['M04'],
    component: M040000006
  },
  {
    id: "M040000007",
    path: '/reports/yearly-average-traffic-revenue',
    exact: true,
    name: 'M040000007',
    parentName: ['M04'],
    component: M040000007
  },
  {
    id: "M040000008",
    path: '/reports/summary-traffic-and-revenue-daily',
    exact: true,
    name: 'M040000008',
    parentName: ['M04'],
    component: M040000008
  },
  {
    id: "M040000009",
    path: '/reports/summary-traffic-and-revenue-monthly',
    exact: true,
    name: 'M040000009',
    parentName: ['M04'],
    component: M040000009
  },
  {
    id: "M040000011",
    path: '/reports/report-traffic-by-plaza',
    exact: true,
    name: 'M040000011',
    parentName: ['M04'],
    component: M040000011
  },
  {
    id: "M040000012",
    path: '/reports/report-amount-hourly-traffic',
    exact: true,
    name: 'M040000012',
    parentName: ['M04'],
    component: M040000012
  },
  {
    id: "M040000013",
    path: '/reports/report-traffic-hourly-by-lane',
    exact: true,
    name: 'M040000013',
    parentName: ['M04'],
    component: M040000013
  },
  {
    id: "M040000014",
    path: '/reports/report-traffic-compare-mtc-etc-4wheel',
    exact: true,
    name: 'M040000014',
    parentName: ['M04'],
    component: M040000014
  },
  {
    id: "M04000014A",
    path: '/reports/mtc-etc-year-report',
    exact: true,
    name: 'M04000014A',
    parentName: ['M04'],
    component: M04000014A
  },
  {
    id: "M040000014",
    path: '/reports/report-traffic-compare-mtc-etc-4wheel/detail/:id',
    exact: true,
    name: 'M04000001401',
    parentName: ['M04'],
    component: M040000014_DETAIL
  },
  {
    id: "M040000015",
    path: '/reports/report-traffic-415',
    exact: true,
    name: 'M040000015',
    parentName: ['M04'],
    component: M040000015
  },
]
export default M04