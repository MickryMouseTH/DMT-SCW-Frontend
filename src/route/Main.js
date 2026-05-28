import React from 'react';
const Dashboard = React.lazy(() => import('../views/Dashboard'));
// const changepUserPassword = React.lazy(() => import('../views/ChangeUserPassword/ChangeUserPassword'));

const Main = [
  {
    id: "M00",
    path: '/',
    exact: true,
    name: 'Dashboard',
    component: Dashboard
  },
  {
    id: "M00",
    path: '/dashboard',
    exact: true,
    name: 'M010000001',
    parentName: ['M00'],
    component: Dashboard
  },
]
export default Main