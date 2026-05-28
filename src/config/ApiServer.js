// import 'dotenv/config'
// const { REACT_APP_API_DEVELOPMENT, REACT_APP_API_PRODUCTION, REACT_APP_API_V1, NODE_ENV } = process.env

// export const apiURL = NODE_ENV !== 'production' ? REACT_APP_API_DEVELOPMENT : REACT_APP_API_PRODUCTION;
// export const apiV1 = REACT_APP_API_V1;

export const apiURL = window.environment.REACT_APP_API;
export const apiV1 = window.environment.REACT_APP_API_V1;

// console.log("NODE_ENV :: ", NODE_ENV)
// console.log(REACT_APP_API_DEVELOPMENT, REACT_APP_API_PRODUCTION, REACT_APP_API_V1, NODE_ENV)
// export const apiURL = 'http://evthai.info:8110'; //server solar
// export const apiURL = 'http://172.30.192.9:8110';//siteoffice new
// export const apiURL = 'http://192.168.244.252:8110'; //siteoffice old
// export const apiV1 = '/dmt-scw/api/v1';

