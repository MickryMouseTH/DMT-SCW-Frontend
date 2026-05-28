import React from 'react';
const M080000001 = React.lazy(() => import('../views/M08/M080000001/TrafficByEtcReport'));
const M080000001_PlazaDetail = React.lazy(() => import('../views/M08/M080000001/PlazaDetail'));
const M080000001_LaneDetail = React.lazy(() => import('../views/M08/M080000001/LaneDetail'));
const M080000001_HourDetail = React.lazy(() => import('../views/M08/M080000001/HourDetail'));
const M080000002 = React.lazy(() => import('../views/M08/M080000002/TrafficAndRevenueByEtcReport'));
const M080000002_PlazaDetail = React.lazy(() => import('../views/M08/M080000002/PlazaDetail'));
const M080000002_LaneDetail = React.lazy(() => import('../views/M08/M080000002/LaneDetail'));
const M080000002_HourDetail = React.lazy(() => import('../views/M08/M080000002/HourDetail'));
const M080000003 = React.lazy(() => import('../views/M08/M080000003/ReportEtcTransactionNotIncome'));
const M080000003_PlazaDetail = React.lazy(() => import('../views/M08/M080000003/PlazaDetail'));
const M080000003_LaneDetail = React.lazy(() => import('../views/M08/M080000003/LaneDetail'));
const M080000003_HourDetail = React.lazy(() => import('../views/M08/M080000003/HourDetail'));
const M080000004 = React.lazy(() => import('../views/M08/M080000004/ReportAbnormalTransactionHandling'));
const M080000004_page2 = React.lazy(() => import('../views/M08/M080000004/ReportAbnormalTransactionHandlingPage2'));
const M080000005 = React.lazy(() => import('../views/M08/M080000005/ReportSendTrxToCs'));
const M080000006 = React.lazy(() => import('../views/M08/M080000006/ReportEtcTotalTransaction'));
const M080000007 = React.lazy(() => import('../views/M08/M080000007/ReportDcToGateway'));
const M080000008 = React.lazy(() => import('../views/M08/M080000008/ReportPaymentFromHighway'));
const M080000009 = React.lazy(() => import('../views/M08/M080000009/ReportPaymentFromHighwayCutOff'));
const M080000010 = React.lazy(() => import('../views/M08/M080000010/ReportPassingItemComparisonWithHighway'));
const M080000012 = React.lazy(() => import('../views/M08/M080000012/DailyTollTransactionFile'));
const M080000013 = React.lazy(() => import('../views/M08/M080000013/DailyTollTransactionFileExtra'));
const M080000014 = React.lazy(() => import('../views/M08/M080000014/ReportComparesEtcTransitDataWithPaymentTransaction'));
const M080000015 = React.lazy(() => import('../views/M08/M080000015/ReportPassingPaymentOverdue'));
const M080000016 = React.lazy(() => import('../views/M08/M080000016/ReportBillingEtc'));
const M080000017 = React.lazy(() => import('../views/M08/M080000017/ReportSummaryBillingEtc'));
const M080000018 = React.lazy(() => import('../views/M08/M080000018/PassingTransactionsSendCsBack'));
const M080000019 = React.lazy(() => import('../views/M08/M080000019/ImportFileJsonTransaction'));
const M080000020 = React.lazy(() => import('../views/M08/M080000020/ImportFileDOH'));
const M080000021_PAGE1 = React.lazy(() => import('../views/M08/M080000021/RefundEtcPage1'));
const M080000021_PAGE2 = React.lazy(() => import('../views/M08/M080000021/RefundEtcPage2'));
const M080000022_PAGE1 = React.lazy(() => import('../views/M08/M080000022/RecordCustomerInformationTaxPage1'));
const M080000022_PAGE2 = React.lazy(() => import('../views/M08/M080000022/RecordCustomerInformationTaxPage2'));

const M08 = [
  {
    id: "M08",
    path: '/',
    exact: true,
    name: 'M08',
    // component: Dashboard
  },
  {
    id: "M080000001",
    path: '/traffic-by-etc',
    exact: true,
    name: 'M080000001',
    parentName: ['M08'],
    component: M080000001
  },
  {
    id: "M080000001",
    path: '/traffic-by-etc/plaza-detail/:id',
    exact: true,
    name: 'M08000000101',
    parentName: ['M08', 'M080000001'],
    component: M080000001_PlazaDetail
  },
  {
    id: "M080000001",
    path: '/traffic-by-etc/lane-detail/:id',
    exact: true,
    name: 'M08000000101',
    parentName: ['M08', 'M080000001'],
    component: M080000001_LaneDetail
  },
  {
    id: "M080000001",
    path: '/traffic-by-etc/hour-detail/:id',
    exact: true,
    name: 'M08000000101',
    parentName: ['M08', 'M080000001'],
    component: M080000001_HourDetail
  },
  {
    id: "M080000002",
    path: '/traffic-and-revenue-by-etc',
    exact: true,
    name: 'M080000002',
    parentName: ['M08'],
    component: M080000002
  },
  {
    id: "M080000002",
    path: '/traffic-and-revenue-by-etc/plaza-detail/:id',
    exact: true,
    name: 'M08000000201',
    parentName: ['M08', 'M080000002'],
    component: M080000002_PlazaDetail
  },
  {
    id: "M080000002",
    path: '/traffic-and-revenue-by-etc/lane-detail/:id',
    exact: true,
    name: 'M08000000201',
    parentName: ['M08', 'M080000002'],
    component: M080000002_LaneDetail
  },
  {
    id: "M080000002",
    path: '/traffic-and-revenue-by-etc/hour-detail/:id',
    exact: true,
    name: 'M08000000201',
    parentName: ['M08', 'M080000002'],
    component: M080000002_HourDetail
  },
  {
    id: "M080000003",
    path: '/report-etc-transaction-not-income',
    exact: true,
    name: 'M080000003',
    parentName: ['M08'],
    component: M080000003
  },
  {
    id: "M080000003",
    path: '/report-etc-transaction-not-income/plaza-detail/:id',
    exact: true,
    name: 'M08000000301',
    parentName: ['M08', 'M080000003'],
    component: M080000003_PlazaDetail
  },
  {
    id: "M080000003",
    path: '/report-etc-transaction-not-income/lane-detail/:id',
    exact: true,
    name: 'M08000000301',
    parentName: ['M08', 'M080000003'],
    component: M080000003_LaneDetail
  },
  {
    id: "M080000003",
    path: '/report-etc-transaction-not-income/hour-detail/:id',
    exact: true,
    name: 'M08000000301',
    parentName: ['M08', 'M080000003'],
    component: M080000003_HourDetail
  },
  {
    id: "M080000004",
    path: '/report-abnormal-transaction-handling',
    exact: true,
    name: 'M080000004',
    parentName: ['M08'],
    component: M080000004
  },
  {
      id: "M080000004",
      path: '/report-abnormal-transaction-handling/page2/:id',
      exact: true,
      name: 'M08000000401',
      parentName: ['M06', 'M080000004'],
      component: M080000004_page2
  },
  {
    id: "M080000005",
    path: '/report-send-trx-cs',
    exact: true,
    name: 'M080000005',
    parentName: ['M08'],
    component: M080000005
  },
  {
    id: "M080000006",
    path: '/report-etc-total-transaction',
    exact: true,
    name: 'M080000006',
    parentName: ['M08'],
    component: M080000006
  },
  {
    id: "M080000007",
    path: '/report-dc-to-gateway',
    exact: true,
    name: 'M080000007',
    parentName: ['M08'],
    component: M080000007
  },
  {
    id: "M080000008",
    path: '/report-payment-from-highway',
    exact: true,
    name: 'M080000008',
    parentName: ['M08'],
    component: M080000008
  },
  {
    id: "M080000009",
    path: '/report-payment-from-highway-cut-off',
    exact: true,
    name: 'M080000009',
    parentName: ['M08'],
    component: M080000009
  },
  {
    id: "M080000010",
    path: '/report-passing-item-comparison-with-highway',
    exact: true,
    name: 'M080000010',
    parentName: ['M08'],
    component: M080000010
  },
  {
    id: "M080000012",
    path: '/daily-toll-transaction-file',
    exact: true,
    name: 'M080000012',
    parentName: ['M08'],
    component: M080000012
  },
  {
    id: "M080000013",
    path: '/daily-toll-transaction-file-extra',
    exact: true,
    name: 'M080000013',
    parentName: ['M08'],
    component: M080000013
  },
  {
    id: "M080000014",
    path: '/report-compares-etc-transit-data-with-payment-transaction',
    exact: true,
    name: 'M080000014',
    parentName: ['M08'],
    component: M080000014
  },
  {
    id: "M080000015",
    path: '/report-passing-payment-overdue',
    exact: true,
    name: 'M080000015',
    parentName: ['M08'],
    component: M080000015
  },
  {
    id: "M080000016",
    path: '/report-billing-etc',
    exact: true,
    name: 'M080000016',
    parentName: ['M08'],
    component: M080000016
  },
  {
    id: "M080000017",
    path: '/report-summary-billing-etc',
    exact: true,
    name: 'M080000017',
    parentName: ['M08'],
    component: M080000017
  },
  {
    id: "M080000018",
    path: '/passing-transactions-send-cs-back',
    exact: true,
    name: 'M080000018',
    parentName: ['M08'],
    component: M080000018
  },
  {
      id: "M080000019",
      path: '/reports/import-file-json-transaction',
      exact: true,
      name: 'M080000019',
      parentName: ['M08'],
      component: M080000019
  },
  {
      id: "M080000020",
      path: '/reports/import-file-doh',
      exact: true,
      name: 'M080000020',
      parentName: ['M08'],
      component: M080000020
  },
  {
      id: "M080000021",
      path: '/reports/refund-etc',
      exact: true,
      name: 'M080000021',
      parentName: ['M08'],
      component: M080000021_PAGE1
  },
  {
      id: "M080000021",
      path: '/reports/refund-etc/page2',
      exact: true,
      name: 'M08000002101',
      parentName: ['M08'],
      component: M080000021_PAGE2
  },
  {
      id: "M080000022",
      path: '/reports/record-customer-information-tax',
      exact: true,
      name: 'M080000022',
      parentName: ['M08'],
      component: M080000022_PAGE1
  },
  {
      id: "M080000022",
      path: '/reports/record-customer-information-tax/page2',
      exact: true,
      name: 'M08000002201',
      parentName: ['M08'],
      component: M080000022_PAGE2
  }
]
export default M08