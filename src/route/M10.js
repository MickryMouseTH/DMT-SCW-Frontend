import React from 'react';
const M100000001 = React.lazy(() => import('../views/M10/M100000001/ReportEtcForTaxInvoice'));
const M100000002 = React.lazy(() => import('../views/M10/M100000002/MonthlyEtcReport'));
const M100000003 = React.lazy(() => import('../views/M10/M100000003/ETaxFile'));

const M10 = [
  {
    id: "M10",
    path: '/',
    exact: true,
    name: 'M10',
    // component: Dashboard
  },
  {
    id: "M100000001",
    path: '/report-etc-for-tax-invoice',
    exact: true,
    name: 'M100000001',
    parentName: ['M10'],
    component: M100000001
  },
  {
    id: "M100000002",
    path: '/monthly-etc-report',
    exact: true,
    name: 'M100000002',
    parentName: ['M10'],
    component: M100000002
  },
  {
    id: "M100000003",
    path: '/e-tax-file',
    exact: true,
    name: 'M100000003',
    parentName: ['M10'],
    component: M100000003
  }
]
export default M10