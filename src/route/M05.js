import React from 'react';
const M050000001 = React.lazy(() => import('../views/M05/M050000001/MaintenanceLoginReports'));
const M050000002 = React.lazy(() => import('../views/M05/M050000002/MaintenancePassingTransaction'));
const M050000003 = React.lazy(() => import('../views/M05/M050000003/MaintenancePassingTransaction'));
const M050000004 = React.lazy(() => import('../views/M05/M050000004/MaintenanceTODReports'));
const M050000005 = React.lazy(() => import('../views/M05/M050000005/MaintenanceTODReports'));
const M050000005_ReportDetail = React.lazy(() => import('../views/M05/M050000005/ReportDetail'));
const M050000006 = React.lazy(() => import('../views/M05/M050000006/CheckBalanceEtc'));
const M050000007 = React.lazy(() => import('../views/M05/M050000007/ReportAvcErrorSummary'));

const M05 = [
  {
    id: "M05",
    path: '/reports',
    exact: true,
    name: 'M05',
    // component: Dashboard
  },
  {
    id: "M050000001",
    path: '/reports/alarm',
    exact: true,
    name: 'M050000001',
    parentName: ['M05'],
    component: M050000001
  },
  {
    id: "M050000002",
    path: '/reports/maintenance-login-reports',
    exact: true,
    name: 'M050000002',
    parentName: ['M05'],
    component: M050000002
  },
  {
    id: "M050000003",
    path: '/reports/maintenance-passing-transaction',
    exact: true,
    name: 'M050000003',
    parentName: ['M05'],
    component: M050000003
  },
  {
    id: "M050000004",
    path: '/reports/maintenance-list-of-job',
    exact: true,
    name: 'M050000004',
    parentName: ['M05'],
    component: M050000004
  },
  {
    id: "M050000005",
    path: '/reports/maintenance-tod-reports',
    exact: true,
    name: 'M050000005',
    parentName: ['M05'],
    component: M050000005
  },
  {
    id: "M050000005",
    path: '/reports/maintenance-tod-reports/report-detail',
    name: 'M050000005',
    exact: true,
    parentName: ['M05', 'M050000005'],
    component: M050000005_ReportDetail
  },
  {
    id: "M050000006",
    path: '/reports/check-balance-etc',
    exact: true,
    name: 'M050000006',
    parentName: ['M05'],
    component: M050000006
  },
  {
    id: "M050000007",
    path: '/reports/report-avc-error-summary',
    exact: true,
    name: 'M050000007',
    parentName: ['M05'],
    component: M050000007
  },
]
export default M05