import React from 'react';
const M090000001 = React.lazy(() => import('../views/M09/M090000001'));
const M090000002 = React.lazy(() => import('../views/M09/M090000002'));
const M090000003 = React.lazy(() => import('../views/M09/M090000003'));
const M090000004 = React.lazy(() => import('../views/M09/M090000004/TariffStatus'));
const M090000005 = React.lazy(() => import('../views/M09/M090000005/CurrentTariffStatus'));
const ManageUsers = React.lazy(() => import('../views/M09/M090000006'));
const ManageUsersGroup = React.lazy(() => import('../views//M09/M090000007'));
const ManageMenu = React.lazy(() => import('../views/M09/M090000008/ManageMenu'));
const ManagePermissionMenu = React.lazy(() => import('../views/M09/M090000009/ManagePermissionMenu'));
const changepUserPassword = React.lazy(() => import('../views/M09/M090000010/ChangeUserPassword'));
const resetPasswordUsers = React.lazy(() => import('../views/M09/M090000011/ResetPasswordUsers'));
const promotions = React.lazy(() => import('../views/M09/M090000012/Promotions'));
const dmtCard = React.lazy(() => import('../views/M09/M090000013/DmtCard'));
const importFileTransactionData = React.lazy(() => import('../views/M09/M090000014/ImportFileTransactionData'));
const importFileTfi = React.lazy(() => import('../views/M09/M090000015/ImportFileTfi'));
const downloadParameter = React.lazy(() => import('../views/M09/M090000016/DownloadParameter'));
const exceptCar = React.lazy(() => import('../views/M09/M090000017/ExceptCar'));

const M09 = [
  {
    id: "M09",
    path: '/',
    exact: true,
    name: 'M09',
    // component: Dashboard
  },
  {
    id: "M090000001",
    path: '/holiday-for-general',
    exact: true,
    name: 'M090000001',
    parentName: ['M09'],
    component: M090000001
  },
  {
    id: "M090000002",
    path: '/holiday-for-tariff-table',
    exact: true,
    name: 'M090000002',
    parentName: ['M09'],
    component: M090000002
  },
  {
    id: "M090000003",
    path: '/tariff-table',
    exact: true,
    name: 'M090000003',
    parentName: ['M09'],
    component: M090000003
  },
  {
    id: "M090000004",
    path: '/tariff-status',
    exact: true,
    name: 'M090000004',
    parentName: ['M09'],
    component: M090000004
  },
  {
    id: "M090000005",
    path: '/current-tariff-status',
    exact: true,
    name: 'M090000005',
    parentName: ['M09'],
    component: M090000005
  },
  {
    id: "M090000006",
    path: '/manageuser',
    exact: true,
    name: 'M090000006',
    parentName: ['M09'],
    component: ManageUsers
  },
  {
    id: "M090000007",
    path: '/manageusergroup',
    exact: true,
    name: 'M090000007',
    parentName: ['M09'],
    component: ManageUsersGroup
  },
  {
    id: "M090000008",
    path: '/managemenu',
    exact: true,
    name: 'M090000008',
    parentName: ['M09'],
    component: ManageMenu
  },
  {
    id: "M090000009",
    path: '/managepermissionmenu',
    exact: true,
    name: 'M090000009',
    parentName: ['M09'],
    component: ManagePermissionMenu
  },
  {
    id: "M090000010",
    path: '/changeuserpassword',
    exact: true,
    name: 'M090000010',
    parentName: ['M09'],
    component: changepUserPassword
  },
  {
    id: "M090000011",
    path: '/reset-password-users',
    exact: true,
    name: 'M090000011',
    parentName: ['M09'],
    component: resetPasswordUsers
  },
  {
    id: "M090000012",
    path: '/set-promotions',
    exact: true,
    name: 'M090000012',
    parentName: ['M09'],
    component: promotions
  },
  {
    id: "M090000013",
    path: '/dmt-card',
    exact: true,
    name: 'M090000013',
    parentName: ['M09'],
    component: dmtCard
  },
  {
    id: "M090000014",
    path: '/import-file-transaction-data',
    exact: true,
    name: 'M090000014',
    parentName: ['M09'],
    component: importFileTransactionData
  },
  {
    id: "M090000015",
    path: '/import-file-tfi',
    exact: true,
    name: 'M090000015',
    parentName: ['M09'],
    component: importFileTfi
  },
  {
    id: "M090000016",
    path: '/download-parameter',
    exact: true,
    name: 'M090000016',
    parentName: ['M09'],
    component: downloadParameter
  },
  {
    id: "M090000017",
    path: '/except-car',
    exact: true,
    name: 'M090000017',
    parentName: ['M09'],
    component: exceptCar
  }
]
export default M09