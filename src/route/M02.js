import React from 'react';
const M020000001 = React.lazy(() => import('../views/M02/M020000001'));
const M020000002 = React.lazy(() => import('../views/M02/M020000002'));
const M020000003 = React.lazy(() => import('../views/M02/M020000003'));
const M020000004 = React.lazy(() => import('../views/M02/M020000004'));
const M020000005 = React.lazy(() => import('../views/M02/M020000005'));
const M020000006 = React.lazy(() => import('../views/M02/M020000006'));
const M020000007 = React.lazy(() => import('../views/M02/M020000007'));
const M020000008 = React.lazy(() => import('../views/M02/M020000008'));
const M020000009 = React.lazy(() => import('../views/M02/M020000009'));
const M020000010 = React.lazy(() => import('../views/M02/M020000010'));
const M020000011 = React.lazy(() => import('../views/M02/M020000011'));
const M020000012 = React.lazy(() => import('../views/M02/M020000012/ChannelListOfTrafficAndTotalRevenue'));
const M020000013 = React.lazy(() => import('../views/M02/M020000013/NumberOfVehicles'));
const M020000014 = React.lazy(() => import('../views/M02/M020000014/ShiftTrafficVolume'));
const M020000015 = React.lazy(() => import('../views/M02/M020000015/TrafficVolumeByTypeOfToll'));

const M02 = [
  {
    id: "M02",
    path: '/M02',
    exact: true,
    name: 'M01',
    // component: M020000001
  },
  {
    id: "M020000001",
    path: '/reports/daily-average-traffic-and-income',
    exact: true,
    name: 'M020000001',
    parentName: ['M02'],
    component: M020000001
  },
  {
    id: "M020000002",
    path: "/reports/workingday-daily-average-traffic-and-income",
    exact: true,
    name: 'M020000002',
    parentName: ['M02'],
    component: M020000002
  },
  {
    id: "M020000003",
    path: "/reports/satureday-Sunday-daily-average-traffic-and-income",
    exact: true,
    name: 'M020000003',
    parentName: ['M02'],
    component: M020000003
  },
  {
    id: "M020000004",
    path: "/reports/holiday-daily-average-traffic-and-income",
    exact: true,
    name: 'M020000004',
    parentName: ['M02'],
    component: M020000004
  },
  {
    id: "M020000005",
    path: "/reports/minutes-traffic",
    exact: true,
    name: 'M020000005',
    parentName: ['M02'],
    component: M020000005
  },
  {
    id: "M020000006",
    path: "/reports/hourly-traffic",
    exact: true,
    name: 'M020000006',
    parentName: ['M02'],
    component: M020000006
  },
  {
    id: "M020000007",
    path: "/reports/daily-traffic-and-income",
    exact: true,
    name: 'M020000007',
    parentName: ['M02'],
    component: M020000007
  },
  {
    id: "M020000008",
    path: "/reports/monthly-traffic-and-income",
    exact: true,
    name: 'M020000008',
    parentName: ['M02'],
    component: M020000008
  },
  {
    id: "M020000009",
    path: "/reports/yearly-traffic-and-income",
    exact: true,
    name: 'M020000009',
    parentName: ['M02'],
    component: M020000009
  },
  {
    id: "M020000010",
    path: "/reports/daily-exempt-traffic",
    exact: true,
    name: 'M020000010',
    parentName: ['M02'],
    component: M020000010
  },
  {
    id: "M020000011",
    path: "/reports/monthly-exempt-traffic",
    exact: true,
    name: 'M020000011',
    parentName: ['M02'],
    component: M020000011
  },
  {
    id: "M020000012",
    path: "/reports/channel-list-of-traffic-and-total-revenue",
    exact: true,
    name: 'M020000012',
    parentName: ['M02'],
    component: M020000012
  },
  {
    id: "M020000013",
    path: "/reports/annual-number-of-exempt-vehicles-classified-by-checkpoints-by-channels",
    exact: true,
    name: 'M020000013',
    parentName: ['M02'],
    component: M020000013
  },
  {
    id: "M020000014",
    path: "/reports/shift-traffic-volume",
    exact: true,
    name: 'M020000014',
    parentName: ['M02'],
    component: M020000014
  },
  {
    id: "M020000015",
    path: "/reports/traffic-volume-by-type-of-toll-payment-And-percentage",
    exact: true,
    name: 'M020000015',
    parentName: ['M02'],
    component: M020000015
  }
]
export default M02