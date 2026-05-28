import React from 'react';
const M060000001 = React.lazy(() => import('../views/M06/M060000001/ImportFileRevenue'));
const M060000002 = React.lazy(() => import('../views/M06/M060000002/CompareRevenueShipping'));
const M060000002_todDetail = React.lazy(() => import('../views/M06/M060000002/TODDetail'));
const M060000003 = React.lazy(() => import('../views/M06/M060000003/ImportDataFromTheBank'));
const M060000004 = React.lazy(() => import('../views/M06/M060000004/CompareDMTWithBankInformation'));
const M060000005 = React.lazy(() => import('../views/M06/M060000005/DailyTollCollectionReport'));
const M060000006 = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcMain'));
const M010000006_supAdj = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcSupAdj'));
const M010000006_todSod = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcTodSod'));
const M010000006_mccTod = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcMccTod'));
const M010000006_mccSod = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcMccSod'));
const M010000006_bisTod = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcBisToll'));
const M010000006_supAdjDetail = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcSupAdjDetail'));
const M010000006_todSodDetail = React.lazy(() => import('../views/M06/M060000006/TollAuditMtcTodSodDetail'));

const M060000007 = React.lazy(() => import('../views/M06/M060000007/CompareRevenueShippingFinance'));
const M060000007_todDetail = React.lazy(() => import('../views/M06/M060000007/TODDetail'));
const M06A000007 = React.lazy(() => import('../views/M06/M06A000007/CompareRevenueShippingFinance'));
const M06A000007_todDetail = React.lazy(() => import('../views/M06/M06A000007/TODDetail'));
const M06B000007 = React.lazy(() => import('../views/M06/M06B000007/CompareRevenueShippingFinance'));
const M06B000007_todDetail = React.lazy(() => import('../views/M06/M06B000007/TODDetail'));
const M06C000007 = React.lazy(() => import('../views/M06/M06C000007/CompareRevenueShippingFinance'));
const M06C000007_todDetail = React.lazy(() => import('../views/M06/M06C000007/TODDetail'));
const M06D000007 = React.lazy(() => import('../views/M06/M06D000007/CompareRevenueShippingFinance'));
const M06D000007_todDetail = React.lazy(() => import('../views/M06/M06D000007/TODDetail'));
const M06E000007 = React.lazy(() => import('../views/M06/M06E000007/CompareRevenueShippingFinance'));
const M06E000007_todDetail = React.lazy(() => import('../views/M06/M06E000007/TODDetail'));

const M060000008 = React.lazy(() => import('../views/M06/M060000008/ImportFileCoupon'));
const M060000009 = React.lazy(() => import('../views/M06/M060000009/ImportFileKbankQr'));
const M060000010 = React.lazy(() => import('../views/M06/M060000010/ReportStatisticsTodMinusIndividual'));
const M060000011 = React.lazy(() => import('../views/M06/M060000011/ReportAuditAdjustment'));
const M060000012 = React.lazy(() => import('../views/M06/M060000012/ReportTodDif'));
const M060000013 = React.lazy(() => import('../views/M06/M060000013/ReportAuditMtc'));
const M06000013A = React.lazy(() => import('../views/M06/M060000013A/AuditPassingTransactionSodTrx'));
const M06000013B = React.lazy(() => import('../views/M06/M060000013B/AuditPassingTransactionSodAmount'));
const M06000013C = React.lazy(() => import('../views/M06/M060000013C/AuditPassingTransactionMcc'));
const M060000014 = React.lazy(() => import('../views/M06/M060000014/ReportMtcRevenueComparisonWithCountingByStaff'));
const M060000015 = React.lazy(() => import('../views/M06/M060000015/ReportComparMtcAndMoneyCountingCompany'));
const M06000015A = React.lazy(() => import('../views/M06/M060000015A/AuditPassingTransactionExcept'));
const M060000016 = React.lazy(() => import('../views/M06/M060000016/ReportSummaryMoneyDificitMtc2'));
const M06000016A = React.lazy(() => import('../views/M06/M060000016A/SummaryMoneyDificitMtcDailyReport'));
const M06000016B = React.lazy(() => import('../views/M06/M060000016B/SummaryMoneyDificitEtcDailyReport'));
const M06000016C = React.lazy(() => import('../views/M06/M060000016C/SummaryMoneyDificitMtcEtcDailyReport'));
const M06000016D = React.lazy(() => import('../views/M06/M060000016D/SummaryTrafficExceptReport'));
const M06000016E = React.lazy(() => import('../views/M06/M060000016E/ReportTrafficDiffBank'));
const M060000017 = React.lazy(() => import('../views/M06/M060000017/ReportEmployeeBillingAmount'));
const M060000018 = React.lazy(() => import('../views/M06/M060000018/ApproveRevenueCalculate'));
const M060000019 = React.lazy(() => import('../views/M06/M060000019/PostSapRevenue'));
const M060000020 = React.lazy(() => import('../views/M06/M060000020/AuditDataEtc'));
const M060000020_page2 = React.lazy(() => import('../views/M06/M060000020/AuditDataEtcPage2'));
const M060000021 = React.lazy(() => import('../views/M06/M060000021/AuditSellingCouponPage1'));
const M060000021_page2 = React.lazy(() => import('../views/M06/M060000021/AuditSellingCouponPage2'));

const M06 = [
    {
        id: "M06",
        path: '/reports',
        exact: true,
        name: 'M06',
        // component: Dashboard
    },
    {
        id: "M060000001",
        path: '/reports/import-file-revenue',
        exact: true,
        name: 'M060000001',
        parentName: ['M06'],
        component: M060000001
    },
    {
        id: "M060000002",
        path: '/reports/compare-revenue-shipping-companies-with-system',
        exact: true,
        name: 'M060000002',
        parentName: ['M06'],
        component: M060000002
    },
    {
        id: "M060000002",
        path: '/reports/compare-revenue-shipping-companies-with-system/tod-detail/:id',
        exact: true,
        name: 'M06000000201',
        parentName: ['M06', 'M060000002'],
        component: M060000002_todDetail
    },
    {
        id: "M060000003",
        path: '/reports/Import-Data-From-The-Bank',
        exact: true,
        name: 'M060000003',
        parentName: ['M06'],
        component: M060000003
    },
    {
        id: "M060000004",
        path: '/reports/compare-dmt-with-bank-information',
        exact: true,
        name: 'M060000004',
        parentName: ['M06'],
        component: M060000004
    },
    {
        id: "M060000005",
        path: '/reports/daily-toll-collection',
        exact: true,
        name: 'M060000005',
        parentName: ['M06'],
        component: M060000005
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc',
        exact: true,
        name: 'M060000006',
        parentName: ['M06'],
        component: M060000006
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc/sup-adj/:id',
        exact: true,
        name: 'M06000000601',
        parentName: ['M06', 'M060000006'],
        component: M010000006_supAdj
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc/tod-sod/:id',
        exact: true,
        name: 'M06000000601',
        parentName: ['M06', 'M060000006'],
        component: M010000006_todSod
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc/mcc-tod/:id',
        exact: true,
        name: 'M06000000601',
        parentName: ['M06', 'M060000006'],
        component: M010000006_mccTod
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc/mcc-sod/:id',
        exact: true,
        name: 'M06000000601',
        parentName: ['M06', 'M060000006'],
        component: M010000006_mccSod
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc/bis-toll/:id',
        exact: true,
        name: 'M06000000601',
        parentName: ['M06', 'M060000006'],
        component: M010000006_bisTod
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc/sup-adj-detail/:id',
        exact: true,
        name: 'M06000000601',
        parentName: ['M06', 'M060000006'],
        component: M010000006_supAdjDetail
    },
    {
        id: "M060000006",
        path: '/reports/toll-audit-mtc/tod-sod-detail/:id',
        exact: true,
        name: 'M06000000601',
        parentName: ['M06', 'M060000006'],
        component: M010000006_todSodDetail
    },
    {
        id: "M060000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance',
        exact: true,
        name: 'M060000007',
        parentName: ['M06'],
        component: M060000007
    },
    {
        id: "M060000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance/tod-detail/:id',
        exact: true,
        name: 'M06000000701',
        parentName: ['M06', 'M060000007'],
        component: M060000007_todDetail
    },
    {
        id: "M06A000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-cash-coupon',
        exact: true,
        name: 'M06A000007',
        parentName: ['M06'],
        component: M06A000007
    },
    {
        id: "M06A000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-cash-coupon/tod-detail/:id',
        exact: true,
        name: 'M06A00000701',
        parentName: ['M06', 'M06A000007'],
        component: M06A000007_todDetail
    },
    {
        id: "M06B000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-qr-code',
        exact: true,
        name: 'M06B000007',
        parentName: ['M06'],
        component: M06B000007
    },
    {
        id: "M06B000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-qr-code/tod-detail/:id',
        exact: true,
        name: 'M06B00000701',
        parentName: ['M06', 'M06B000007'],
        component: M06B000007_todDetail
    },
    {
        id: "M06C000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-emv',
        exact: true,
        name: 'M06C000007',
        parentName: ['M06'],
        component: M06C000007
    },
    {
        id: "M06C000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-emv/tod-detail/:id',
        exact: true,
        name: 'M06C00000701',
        parentName: ['M06', 'M06C000007'],
        component: M06C000007_todDetail
    },
    {
        id: "M06D000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-mpass',
        exact: true,
        name: 'M06D000007',
        parentName: ['M06'],
        component: M06D000007
    },
    {
        id: "M06D000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-mpass/tod-detail/:id',
        exact: true,
        name: 'M06D00000701',
        parentName: ['M06', 'M06D000007'],
        component: M06D000007_todDetail
    },
    {
        id: "M06E000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-epass',
        exact: true,
        name: 'M06E000007',
        parentName: ['M06'],
        component: M06E000007
    },
    {
        id: "M06E000007",
        path: '/reports/compare-revenue-shipping-companies-with-system-finance-epass/tod-detail/:id',
        exact: true,
        name: 'M06E00000701',
        parentName: ['M06', 'M06E000007'],
        component: M06E000007_todDetail
    },
    {
        id: "M060000008",
        path: '/reports/import-file-coupon',
        exact: true,
        name: 'M060000008',
        parentName: ['M06'],
        component: M060000008
    },
    {
        id: "M060000009",
        path: '/reports/import-file-kbank-qr',
        exact: true,
        name: 'M060000009',
        parentName: ['M06'],
        component: M060000009
    },
    {
        id: "M060000010",
        path: '/reports/report-statistics-tod-minus-individual',
        exact: true,
        name: 'M060000010',
        parentName: ['M06'],
        component: M060000010
    },
    {
        id: "M060000011",
        path: '/reports/report-audit-adjustment',
        exact: true,
        name: 'M060000011',
        parentName: ['M06'],
        component: M060000011
    },
    {
        id: "M060000012",
        path: '/reports/report-tod-dif',
        exact: true,
        name: 'M060000012',
        parentName: ['M06'],
        component: M060000012
    },
    {
        id: "M060000013",
        path: '/reports/report-audit-mtc',
        exact: true,
        name: 'M060000013',
        parentName: ['M06'],
        component: M060000013
    },
    {
        id: "M06000013A",
        path: '/reports/audit-passing-transaction-sod-trx',
        exact: true,
        name: 'M06000013A',
        parentName: ['M06'],
        component: M06000013A
    },
    {
        id: "M06000013B",
        path: '/reports/audit-passing-transaction-sod-amount',
        exact: true,
        name: 'M06000013B',
        parentName: ['M06'],
        component: M06000013B
    },
    {
        id: "M06000013C",
        path: '/reports/audit-passing-transaction-mcc',
        exact: true,
        name: 'M06000013C',
        parentName: ['M06'],
        component: M06000013C
    },
    {
        id: "M060000014",
        path: '/reports/report-mtc-revenue-comparison-with-counting-by-staff',
        exact: true,
        name: 'M060000014',
        parentName: ['M06'],
        component: M060000014
    },
    {
        id: "M060000015",
        path: '/reports/report-compar-mtc-and-money-counting-company',
        exact: true,
        name: 'M060000015',
        parentName: ['M06'],
        component: M060000015
    },
    {
        id: "M06000015A",
        path: '/reports/audit-passing-transaction-except',
        exact: true,
        name: 'M06000015A',
        parentName: ['M06'],
        component: M06000015A
    },
    {
        id: "M060000016",
        path: '/reports/report-summary-money-dificit-mtc',
        exact: true,
        name: 'M060000016',
        parentName: ['M06'],
        component: M060000016
    },
    {
        id: "M06000016A",
        path: '/reports/summary-money-dificit-mtc-daily-report',
        exact: true,
        name: 'M06000016A',
        parentName: ['M06'],
        component: M06000016A
    },
    {
        id: "M06000016B",
        path: '/reports/summary-money-dificit-etc-daily-report',
        exact: true,
        name: 'M06000016B',
        parentName: ['M06'],
        component: M06000016B
    },
    {
        id: "M06000016C",
        path: '/reports/summary-money-dificit-mtc-etc-daily-report',
        exact: true,
        name: 'M06000016C',
        parentName: ['M06'],
        component: M06000016C
    },
    {
        id: "M06000016D",
        path: '/reports/summary-traffic-except-report',
        exact: true,
        name: 'M06000016D',
        parentName: ['M06'],
        component: M06000016D
    },
    {
        id: "M06000016E",
        path: '/reports/report-traffic-diff-bank',
        exact: true,
        name: 'M06000016E',
        parentName: ['M06'],
        component: M06000016E
    },
    {
        id: "M060000017",
        path: '/reports/report-employee-billing-amount',
        exact: true,
        name: 'M060000017',
        parentName: ['M06'],
        component: M060000017
    },
    {
        id: "M060000018",
        path: '/reports/approve-revenue-calculate',
        exact: true,
        name: 'M060000018',
        parentName: ['M06'],
        component: M060000018
    },
    {
        id: "M060000019",
        path: '/reports/post-sap-revenue',
        exact: true,
        name: 'M060000019',
        parentName: ['M06'],
        component: M060000019
    },
    {
        id: "M060000020",
        path: '/reports/audit-data-etc',
        exact: true,
        name: 'M060000020',
        parentName: ['M06'],
        component: M060000020
    },
    {
        id: "M060000020",
        path: '/reports/audit-data-etc/page2',
        exact: true,
        name: 'M06000002001',
        parentName: ['M06', 'M060000020'],
        component: M060000020_page2
    },
    {
        id: "M060000021",
        path: '/reports/audit-selling-coupon',
        exact: true,
        name: 'M060000021',
        parentName: ['M06'],
        component: M060000021
    },
    {
        id: "M060000021",
        path: '/reports/audit-selling-coupon/page2',
        exact: true,
        name: 'M06000002101',
        parentName: ['M06', 'M060000021'],
        component: M060000021_page2
    },
]
export default M06