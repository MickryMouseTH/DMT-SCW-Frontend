import { Fetch } from '../../tools/fecth';
import { apiV1 } from '../../config/ApiServer'


const networkId = {
  "networkId": 10
}

export const getPlazaListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/plazaList`, data || networkId, null, token.atoken);
  return res;
}
export const getPlazaBoundListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/plazaBoundList`, data || networkId, null, token.atoken);
  return res;
}
export const getSignalCodeListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/signalCodeList`, data || networkId, null, token.atoken);
  return res;
}
export const getPaymentmethodListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/paymentmethodList`, data || networkId, null, token.atoken);
  return res;
}
export const getSignalCodeList_MTC_API = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/eventFlagList`, data || networkId, null, token.atoken);
  return res;
}
export const getShiftList_API = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/shiftList`, data || networkId, null, token.atoken);
  return res;
}
export const getTSBList_API = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/tsbList`, data || networkId, null, token.atoken);
  return res;
}
export const getVehicleTypeList_API = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/vehicleType`, data || networkId, null, token.atoken);
  return res;
}
export const getSubVehicleTypeList_API = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/subVehicleType`, data || networkId, null, token.atoken);
  return res;
}
export const getSubVehicleTypeOtherList_API = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/subVehicleTypeOther`, data || networkId, null, token.atoken);
  return res;
}
export const getMonthListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/monthList`, data || networkId, null, token.atoken);
  return res;
}
export const getYearListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/yearList`, data || networkId, null, token.atoken);
  return res;
}
export const getEventAbnormalListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/eventAbnormalList`, data || networkId, null, token.atoken);
  return res;
}
export const getSearchTypeListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/searchTypeList`, data || networkId, null, token.atoken);
  return res;
}

export const getVehicleModelAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/vehicleModel`, data || networkId, null, token.atoken);
  return res;
}
export const getVehicleSubModelAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/vehicleSubModel`, data || networkId, null, token.atoken);
  return res;
}
export const getVehicleColorAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/vehicleColor`, data || networkId, null, token.atoken);
  return res;
}
export const getVehicleAgencyAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/vehicleAgency`, data || networkId, null, token.atoken);
  return res;
}
export const getSecurityMenuActionAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/securityMenuAction`, data || networkId, null, token.atoken);
  return res;
}
export const getAuditAdjustReasonAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/auditAdjustReason`, data || networkId, null, token.atoken);
  return res;
}
export const getRevenueTypeListAPI = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/masterTable/revenueTypeList`, data || networkId, null, token.atoken);
  return res;
}
