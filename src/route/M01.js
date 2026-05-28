import React from 'react';
const M010000001 = React.lazy(() => import('../views/M01/M010000001'));
const M010000002 = React.lazy(() => import('../views/M01/M010000002'));
const M010000002_ReportDetail = React.lazy(() => import('../views/M01/M010000002/ReportDetail'));
const M010000001_ReportDetail = React.lazy(() => import('../views/M01/M010000001/ReportDetail'));

const M010000003 = React.lazy(() => import('../views/M01/M010000003/Top5StatisticalOpeningHours'));
const M010000004 = React.lazy(() => import('../views/M01/M010000004/Top5LaneAlarmStatisticsReports'));
const M010000003_ReportDetail = React.lazy(() => import('../views/M01/M010000003/ReportDetail'));
const M010000004_ReportDetail = React.lazy(() => import('../views/M01/M010000004/ReportDetail'));

const M01 = [
  {
    id: "M01",
    path: '/',
    exact: true,
    name: 'M01',
    // component: Dashboard
  },
  {
    id: "M010000001",
    path: '/reports/lane-operating-statistics-reports',
    name: 'M010000001',
    exact: true,
    parentName: ['M01'],
    component: M010000001
  },
  {
    id: "M010000001",
    path: '/reports/lane-operating-statistics-reports/reportdetail/:id',
    name: 'M01000000101',
    exact: true,
    parentName: ['M01', 'M010000002'],
    component: M010000001_ReportDetail
  },
  {
    id: "M010000002",
    path: '/reports/lane-alarm-statistics-reports',
    name: 'M010000002',
    exact: true,
    parentName: ['M01'],
    component: M010000002
  },
  {
    id: "M010000002",
    path: '/reports/lane-alarm-statistics-reports/reportdetail/:id',
    name: 'M01000000201',
    exact: true,
    parentName: ['M01', 'M010000002'],
    component: M010000002_ReportDetail
  },

  {
    id: "M010000003",
    path: '/reports/top-5-statistical-opening-hours',
    name: 'M010000003',
    exact: true,
    parentName: ['M01'],
    component: M010000003
  },
  {
    id: "M010000003",
    path: '/reports/top-5-statistical-opening-hours/reportdetail/:id',
    name: 'M01000000301',
    exact: true,
    parentName: ['M01', 'M010000003'],
    component: M010000003_ReportDetail
  },
  {
    id: "M010000004",
    path: '/reports/top-5-lane-alarm-statistics-reports',
    name: 'M010000004',
    exact: true,
    parentName: ['M01'],
    component: M010000004
  },
  {
    id: "M010000004",
    path: '/reports/top-5-lane-alarm-statistics-reports/reportdetail/:id',
    name: 'M01000000401',
    exact: true,
    parentName: ['M01', 'M010000004'],
    component: M010000004_ReportDetail
  },
]
export default M01