import { Fetch, FetchFormData } from "../../tools/fecth";
import { apiV1 } from "../../config/ApiServer";
import { apiURL } from "../../config/ApiServer";
// import dataInfo from '../../components/data.json'

import {
  //  shiftData, paymentData, menu212, menu215, menu215_Test ,
  // data610
  // data75,
  // data76,
  data73,
  // data74,
  // data79,
  data710
} from '../../components/MockData'

// import { mockdata } from "../../views/M06/M060000002/mockdata";
import { mockData09, mockData095 } from "../../views/M09/M090000005/MockData";

// ------ M01 รายงานด้านสถิติ -----
export const GET_DATA_INFO_M010000001 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneOperatingStatistics/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_INFO_M010000001
  return res;
};
export const GET_DATA_DETAIL_M010000001 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneOperatingStatistics/detail`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M010000001
  return res;
};
export const GET_DATA_INFO_M010000002 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneAlarmStatistics/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_INFO_M010000002
  return res;
};
export const GET_DATA_DETAIL_M010000002 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneAlarmStatistics/detail`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M010000002
  return res;
};

export const GET_DATA_INFO_M010000003 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneOperatingStatisticsTop5/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_INFO_M010000002
  return res;
};

export const GET_DATA_DETAIL_M010000003 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneOperatingStatisticsTop5/detail`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M010000002
  return res;
};
export const GET_DATA_INFO_M010000004 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneAlarmStatisticsTop5/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_INFO_M010000002
  return res;
};

export const GET_DATA_DETAIL_M010000004 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportLaneAlarmStatisticsTop5/detail`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M010000002
  return res;
};
// ------ M02 รายงานด้สนการเงิน -----
export const GET_DATA_INFO_M020000001 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportDailyAverageTrafficAndIncome/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000001
  return res;
};
export const GET_DATA_INFO_M020000002 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportWorkingdayDailyAverageTrafficAndIncome/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000002
  return res;
};
export const GET_DATA_INFO_M020000003 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportSaturedaySundayDailyAverageTrafficAndIncome/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000003
  return res;
};
export const GET_DATA_INFO_M020000004 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportHolidayDailyAverageTrafficAndIncome/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};
export const GET_DATA_INFO_M020000005 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportFiveMinutesTraffic/search`,
    data,
    null,
    token.atoken
  );
  // const res = menu215_Test
  // const res = menu215
  return res;
};
export const GET_DATA_INFO_M020000006 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportHourlyTraffic/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};
export const GET_DATA_INFO_M020000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportDailyTrafficAndIncome/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};
export const GET_DATA_INFO_M020000008 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportMonthlyTrafficAndIncome/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};
export const GET_DATA_INFO_M020000009 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportYearlyTrafficAndIncome/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};
export const GET_DATA_INFO_M020000010 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportDailyExemptTraffic/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};

export const GET_DATA_INFO_M020000011 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportMonthlyExemptTraffic/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};

export const GET_DATA_INFO_M020000012 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportHourlyTrafficAndIncomeByLane/search`,
    data,
    null,
    token.atoken
  );
  // const res = menu212
  return res;
};
export const GET_DATA_INFO_M020000013 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportYearlyExemptTrafficByLane/search`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};

export const GET_DATA_INFO_M020000014 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportTrafficByShift/search`,
    data,
    null,
    token.atoken
  );
  // const res = shiftData;

  return res;
};
export const GET_DATA_INFO_M020000015 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportTrafficByPayment/search`,
    data,
    null,
    token.atoken
  );
  // const res = paymentData;

  return res;
};
// ------ M03 การปฏิบัติงานของด่าน -----
export const GET_DATA_INFO_M030000001 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportSupervisorAdjustment/search`, data, null, token.atoken);
  return res;
};
export const GET_DATA_INFO_M030000002 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportDailyViolation/search`, data, null, token.atoken);
  // const res = dataInfo32
  return res;
};
export const GET_DATA_DETAIL_M030000003 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportViolationSummary/detail`,
    data,
    null,
    token.atoken
  );
  // const res = DATA_DETAIL_M020000004
  return res;
};
export const GET_DATA_INFO_M030000003 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportViolationSummary/search`, data, null, token.atoken);
  // const res = dataInfo33
  return res;
};
export const GET_DATA_INFO_M030000004 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportPassingTransactions/search`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};
export const GET_DATA_INFO_M030000004_Page_Search = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportPassingTransactions/searchPage`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};
export const GET_DATA_INFO_M030000005 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportListOfJobs/search`, data, null, token.atoken);
  // const res = dataInfo35
  return res;
};
export const GET_DATA_INFO_M030000006 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportTod/search`, data, null, token.atoken);
  // const res = dataInfo36
  return res;
};

export const GET_DATA_DETAIL_M030000006 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportTod/detail`,
    data,
    null,
    token.atoken
  );

  return res;
};

export const GET_DATA_INFO_M030000007 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportEventByStaffLaneShift/search`, data, null, token.atoken);
  // const res = dataInfo36
  return res;
};

export const GET_DATA_DETAIL_M030000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportEventByStaffLaneShift/detail`,
    data,
    null,
    token.atoken
  );

  return res;
};

export const GET_DATA_INFO_M030000008 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportCrashByLane/search`, data, null, token.atoken);
  // const res = dataInfo36
  return res;
};

export const GET_DATA_INFO_M030000009 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/passingTrancsactionEmvQr/search`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M030000010 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/passingTrancsactionEtc/search`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M030000011 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportCardPassingTransactions/search`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};
export const GET_DATA_INFO_M030000011_Page_Search = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportCardPassingTransactions/searchPage`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};

export const GET_DATA_INFO_M030000012 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportComparisonTrafficAndBisDaily/search`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M030000013 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportComparisonTrafficAndBisLane/search`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_DAILY_M030000014 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportCompareScwBisDaily/search`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_HOURLY_M030000014 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportCompareScwBisDaily/searchHourly`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_FIVE_MINNUTE_M030000014 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportCompareScwBisDaily/searchFiveMinnute`, data, null, token.atoken);
  return res;
};

// ------ M04 รายงานด่านการจราจร / รายได้ฝ่ายตวรสอบ -----
export const GET_DATA_INFO_M040000001 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportHourlyTrafficRevenue/search`,
    data,
    null,
    token.atoken
  );

  return res;
};
export const GET_DATA_INFO_M040000002 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportDailyTrafficRevenue/search`,
    data,
    null,
    token.atoken
  );

  return res;
};
export const GET_DATA_INFO_M04000003 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportMonthlyTrafficRevenue/search`,
    data,
    null,
    token.atoken
  );

  return res;
};
export const GET_DATA_INFO_M04000004 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportHourlyAverageTrafficRevenue/search`,
    data,
    null,
    token.atoken
  );

  return res;
};
export const GET_DATA_INFO_M04000005 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportDailyAverageTrafficRevenue/search`,
    data,
    null,
    token.atoken
  );

  return res;
};
export const GET_DATA_INFO_M04000006 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportMonthlyAverageTrafficRevenue/search`,
    data,
    null,
    token.atoken
  );
  // return dataInfo;
  return res;
};
export const GET_DATA_INFO_M04000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportYearlyAverageTrafficRevenue/search`,
    data,
    null,
    token.atoken
  );

  return res;
};
export const GET_DATA_INFO_M04000008 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportSummaryTrafficAndRevenueDaily/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M04000009 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportSummaryTrafficAndRevenueMonthly/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M040000011 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficByPlaza/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M040000012 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportAmountHourlyTraffic/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M040000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficHourlyByLane/search`, data, null, token.atoken
  );
  return res;
};

export const GET_PAYMENT_LIST_M040000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficHourlyByLane/paymentList`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M040000014_PAGE1 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficCompareMtcEtc4Wheel/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M040000014_PAGE2 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficCompareMtcEtc4Wheel/searchDaily`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M04000014A = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/mtcEtcYearReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M040000015 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTraffic415/search`, data, null, token.atoken
  );
  return res;
};

// ------ M05 รายงานการบำรุงรักษา -----
// export const GET_DATA_INFO_M050000001 = async (data, token) => {
//   const res = await Fetch("POST", `${apiV1}/report/reportSupervisorAdjustment/search`, data, null, token.atoken);
//   return res;
// };
// export const GET_DATA_INFO_M050000002 = async (data, token) => {
//   const res = await Fetch("POST",`${apiV1}/report/reportDailyViolation/search`,data,null,token.atoken );
//   // const res = dataInfo32
//   return res;
// };
// export const GET_DATA_DETAIL_M050000003 = async (data, token) => {
//   const res = await Fetch(
//     "POST",
//     `${apiV1}/report/reportMaintenanceViolationSummary/detail`,
//     data,
//     null,
//     token.atoken
//   );
//   // const res = DATA_DETAIL_M020000004
//   return res;
// };

export const GET_DATA_INFO_M050000003 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportMaintenancePassingTransactions/search`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};

export const GET_DATA_INFO_M050000004 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportMaintenanceListOfJobs/search`, data, null, token.atoken);
  // const res = dataInfo35
  return res;
};

export const GET_DATA_INFO_M050000005 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportMaintenanceTod/search`, data, null, token.atoken);
  // const res = dataInfo36
  return res;
};

export const GET_DATA_DETAIL_M050000005 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportMaintenanceTod/detail`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M050000006 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/checkBalanceEtc/search`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M050000007 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportAvcErrorSummary/search`, data, null, token.atoken);
  return res;
};

export const UPLOAD_FILE_EXCEL_M060000001 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileRevenue/upload`,
    data,
    token.atoken
  );

  return res;
};

export const GET_DATA_INFO_M060000002 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystem/search`,
    data,
    null,
    token.atoken
  );
  // const res = mockdata;

  return res;
};

export const GET_DATA_SEND_TO_FINANCE_M060000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystem/sendToFinance`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_SEND_TO_SUPERVISOR_M060000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystem/sendToSupervisor`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOD_DETAIL_M060000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystem/todDetail`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_ADJUST_SAVE_M060000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystem/adjustSave`, data, null, token.atoken
  );

  return res;
};

export const UPLOAD_FILE_BANK_M060000003 = async (data, token) => {
  const res = await FetchFormData(
    "POST", `${apiV1}/report/reportImportFileBankReconcile/upload`, data, token.atoken
  );

  return res;
};

export const GET_DATA_COMPARE_BANK_M060000004 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportImportFileBankReconcile/search`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_DAILY_TOLL_COLLECTION_M060000005 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDailyTollCollection/search`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOLL_AUDIT_MTC_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/search`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOLL_AUDIT_MTC_SUB_ADJ_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/subAdjSearch`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOLL_AUDIT_MTC_TOD_SOD_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/todSodSearch`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOLL_AUDIT_MTC_MCC_TOD_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/mccTodSearch`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOLL_AUDIT_MTC_MCC_SOD_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/mccSodSearch`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOLL_AUDIT_MTC_BIS_TOLL_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/bisTollSearch`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_TOLL_AUDIT_MTC_SUB_ADJ_DETAIL_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/subAdjDetailSearch`, data, null, token.atoken
  );

  return res;
};


export const GET_DATA_TOLL_AUDIT_MTC_TOD_SOD_DETAIL_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/todSodDetailSearch`, data, null, token.atoken
  );

  return res;
};

export const POST_SUB_ADJUST_DETAIL_SAVE_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/subAdjDetailSave`, data, null, token.atoken
  );

  return res;
};

export const POST_SUB_ADJUST_DETAIL_SAVE_ALL_M060000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTollAuditMtc/subAdjDetailSaveAll`, data, null, token.atoken
  );

  return res;
};

export const GET_DATA_INFO_M070000001 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportTodIndividual/search`, data, null, token.atoken);
  return res;
};

// ------ M09 อื่นๆ -----
export const GET_DATA_INFO_M09000004 = async (data, token) => {
  // const res = await Fetch(
  //   "POST",
  //   `${apiV1}/report/reportDailyAverageTrafficRevenue/search`,
  //   data,
  //   null,
  //   token.atoken
  // );
  const res = mockData09

  return res;
};

export const GET_DATA_INFO_M09000005 = async (data, token) => {
  // const res = await Fetch(
  //   "POST",
  //   `${apiV1}/report/reportDailyAverageTrafficRevenue/search`,
  //   data,
  //   null,
  //   token.atoken
  // );
  const res = mockData095

  return res;
};

export const GET_DATA_INFO_M060000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinance/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_EXPORT_M060000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinance/export`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_EXPORT_CASH_M060000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinance/exportCash`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_EXPORT_COUPON_M060000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinance/exportCoupon`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_BACK_TO_AUDIT_M060000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinance/backToAudit`, data, null, token.atoken
  );
  return res;
};


export const GET_DATA_TOD_DETAIL_M060000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinance/todDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_ADJUST_SAVE_M060000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinance/adjustSave`, data, null, token.atoken
  );
  return res;
};


export const GET_DATA_INFO_M06B000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceQrCode/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_EXPORT_M06B000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceQrCode/export`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_TOD_DETAIL_M06B000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceQrCode/todDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_ADJUST_SAVE_M06B000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceQrCode/adjustSave`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M06C000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceEmv/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_EXPORT_M06C000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceEmv/export`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_TOD_DETAIL_M06C000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceEmv/todDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_ADJUST_SAVE_M06C000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceEmv/adjustSave`, data, null, token.atoken
  );
  return res;
};


export const GET_DATA_INFO_M06D000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceMPass/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_EXPORT_M06D000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceMPass/export`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_TOD_DETAIL_M06D000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceMPass/todDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M06E000007 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceEasyPass/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_EXPORT_M06E000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceEasyPass/export`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_TOD_DETAIL_M06E000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportCompareRevenueShippingCompaniesWithSystemFinanceEasyPass/todDetail`, data, null, token.atoken
  );
  return res;
};

export const UPLOAD_FILE_EXCEL_M060000008 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileCoupon/upload`,
    data,
    token.atoken
  );

  return res;
};

export const UPLOAD_FILE_EXCEL_M060000009 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileKbankQr/upload`,
    data,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000010 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportStatisticsTodMinusIndividual/search`,
    data,
    null,
    token.atoken
  );
  // const res = data610
  return res;
};

export const GET_DATA_PRINT_M060000010 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportStatisticsTodMinusIndividual/printLetter`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000011 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportAuditAdjustment/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000012 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportTodDif/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000013 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportAuditMtc/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000013A = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionSodTrx/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const POST_FARECLASS_M060000013A = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionSodTrx/fareClass`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const POST_SAVE_M060000013A = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionSodTrx/save`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000013B = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionSodAmount/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const POST_SAVE_M060000013B = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionSodAmount/save`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000013C = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionMcc/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const POST_SAVE_M060000013C = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionMcc/save`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000015A = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionExcept/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const POST_SAVE_M060000015A = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditPassingTransactionExcept/save`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const POST_SAVE_M060000013 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportAuditMtc/save`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_PAYMENTMETHOD_M060000013 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportAuditMtc/paymentmethodList`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000014 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportMtcRevenueComparisonWithCountingByStaff/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000015 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportComparMtcAndMoneyCountingCompany/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000016 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportSummaryMoneyDificitMtc/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const CALCULATE_DATA_M060000016 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportSummaryMoneyDificitMtc/calculateData`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000016A = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/summaryMoneyDificitMtcDailyReport/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000016A_getPaymentmethodListAPI = async (data, token) => {
  const networkId = {
    "networkId": 10
  }
  const res = await Fetch("POST", `${apiV1}/report/summaryMoneyDificitMtcDailyReport/paymentmethodList`, data || networkId, null, token.atoken);
  return res;
}

export const GET_DATA_INFO_M060000016B = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/summaryMoneyDificitEtcDailyReport/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000016B_getPaymentmethodListAPI = async (data, token) => {
  const networkId = {
    "networkId": 10
  }
  const res = await Fetch("POST", `${apiV1}/report/summaryMoneyDificitEtcDailyReport/paymentmethodList`, data || networkId, null, token.atoken);
  return res;
}

export const GET_DATA_INFO_M060000016C = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/summaryMoneyDificitMtcEtcDailyReport/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000016C_getPaymentmethodListAPI = async (data, token) => {
  const networkId = {
    "networkId": 10
  }
  const res = await Fetch("POST", `${apiV1}/report/summaryMoneyDificitMtcEtcDailyReport/paymentmethodList`, data || networkId, null, token.atoken);
  return res;
}

export const GET_DATA_INFO_M060000016D = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/summaryTrafficExceptReport/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000016D_getPaymentmethodListAPI = async (data, token) => {
  const networkId = {
    "networkId": 10
  }
  const res = await Fetch("POST", `${apiV1}/report/summaryTrafficExceptReport/paymentmethodList`, data || networkId, null, token.atoken);
  return res;
}

export const GET_DATA_INFO_M060000016E = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportTrafficDiffBank/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000016E_getPaymentmethodListAPI = async (data, token) => {
  const networkId = {
    "networkId": 10
  }
  const res = await Fetch("POST", `${apiV1}/report/reportTrafficDiffBank/paymentmethodList`, data || networkId, null, token.atoken);
  return res;
}

export const GET_DATA_INFO_M060000017 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/reportEmployeeBillingAmount/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000018 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/approveRevenueCalculate/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const APPROVE_M060000018 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/approveRevenueCalculate/approve`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const CALCULATE_DATA_M060000018 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/approveRevenueCalculate/calculateData`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000019 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/postSapRevenue/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const POST_M060000019 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/postSapRevenue/post`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M060000020 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditDataEtc/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_OVERDUE_M060000020 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditDataEtc/listOverdue`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_CSV_M060000020 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/auditDataEtc/exportCsv`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = "AuditDataEtc.csv";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_EXCEL_M060000020 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/auditDataEtc/exportExcel`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = "AuditDataEtc.xlsx";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M060000021 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditSellingCoupon/search`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const GET_DATA_COUPON_M060000021 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditSellingCoupon/couponList`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const SAVE_ADJUST_COUPON_M060000021 = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/auditSellingCoupon/adjust`,
    data,
    null,
    token.atoken
  );
  return res;
};

export const UPLOAD_FILE_ETC_M060000015 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileJsonTransaction/upload/etc`,
    data,
    token.atoken
  );
  return res;
};

export const UPLOAD_FILE_ETC_M060000016 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileDoh/upload/doh`,
    data,
    token.atoken
  );
  return res;
};

export const UPLOAD_FILE_EXCEL_M070000001 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileHoliday/upload`,
    data,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M070000003 = async (data, token) => {
  // const res = await Fetch(
  //   "POST", `${apiV1}/report/reportMorningRevenueReport/search`, data, null, token.atoken
  // );
  const res = data73;
  return res;
};

export const GET_DATA_INFO_M070000004 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMorningRevenueReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004A = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMorningRevenueBeforeAuditReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004B = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportDailyCompletelyRevenue742/search`, data, null, token.atoken);
  return res;
};

export const DOWNLOAD_FILE_PDF_M07000004B = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportDailyCompletelyRevenue742/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = "7.4.2 Daily Completely Revenue Report.pdf";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};


export const UPLOAD_FILE_EXCEL_M0700004BB = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileYearly/upload`,
    data,
    token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M0700004BA = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportHistoricalDailyRevenueAndDailyTraffic/search`, data, null, token.atoken);
  return res;
};

export const DOWNLOAD_FILE_PDF_M0700004BA = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportHistoricalDailyRevenueAndDailyTraffic/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = "7.4.2.1 Historical Daily Revenue and Daily Traffic.pdf";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M07000004C = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMorningRevenueAfterAuditReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004D = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportAverageDailyRevenue/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004E = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDailyRevenueYear/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004F = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/monthlyTollRevenueTrafficYearReport746/search`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_PDF_M07000004F = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/monthlyTollRevenueTrafficYearReport746/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = "7.4.6 Monthly Toll Revenue & Traffic Report Year.pdf";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M07000004G = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/monthlyTollRevenueTrafficYearReport747/search`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_PDF_M07000004G = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/monthlyTollRevenueTrafficYearReport747/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = "7.4.7 Monthly Toll Revenue & Traffic Report Year.pdf";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M07000004H = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/summaryOfTollVsTrafficReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004I = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/trafficVolumeOnTollwayReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004J = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/monthlyTollRevenueAndTrafficReport/search`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_PDF_M07000004J = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/monthlyTollRevenueAndTrafficReport/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = "7.4.10 Monthly Toll Revenue & Traffic Report.pdf";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M07000004K = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/dailyTrafficReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000004L = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/testVehicleToClientReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M070000005 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMorningTrafficReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000005A = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMorningTrafficBeforeAuditReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000005B = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMorningTrafficAfterAuditReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000005D = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportAverageDailyTraffic/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000005E = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDailyTrafficYear/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M070000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDailyRevenueAfterAudit/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M070000006_OLD = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMorningHoulyTrafficReport/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000006A = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDailyTrafficAfterAudit/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000006B = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficMtcByLane/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000006C = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficEtcByLane/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000006D = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/monthlySignalStatistics764/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000006E = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/monthlySignalStatistics765/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M07000006F = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDailyBellSignalStatistics/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M070000007 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportDailyCompletelyRevenue/search`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M070000009 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDailyReconcliation/search`, data, null, token.atoken
  );
  // const  res = data79
  return res;
};

export const GET_DATA_INFO_M070000010 = async (data, token) => {
  // const res = await Fetch(
  //   "POST", `${apiV1}/report/reportDailyTollCollection/search`, data, null, token.atoken
  // );
  const res = data710
  return res;
};

export const GET_DATA_INFO_M070000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportHourlyTrafficByPlazaAndLane/search`, data, null, token.atoken
  );
  // const  res = data79
  return res;
};

//M08
export const GET_DATA_INFO_M080000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficByEtc/search`, data, null, token.atoken
  );
  return res;
};

export const GET_PLAZA_DETAIL_M080000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficByEtc/plazaDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_LANE_DETAIL_M080000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficByEtc/laneDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_HOUR_DETAIL_M080000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficByEtc/hourDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficAndRevenueByEtc/search`, data, null, token.atoken
  );
  return res;
};

export const GET_PLAZA_DETAIL_M080000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficAndRevenueByEtc/plazaDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_LANE_DETAIL_M080000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficAndRevenueByEtc/laneDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_HOUR_DETAIL_M080000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportTrafficAndRevenueByEtc/hourDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000003 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcTransactionNotIncome/search`, data, null, token.atoken
  );
  return res;
};

export const GET_PLAZA_DETAIL_M080000003 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcTransactionNotIncome/plazaDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_LANE_DETAIL_M080000003 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcTransactionNotIncome/laneDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_HOUR_DETAIL_M080000003 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcTransactionNotIncome/hourDetail`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000004 = async (data, token) => {
  const res = await Fetch(
    // "POST", `${apiV1}/report/reportEtcTransactionNotIncomeByLane/search`, data, null, token.atoken
    "POST", `${apiV1}/report/reportAbnormalTransactionHandling/search`, data, null, token.atoken
  );
  return res;
};
export const GET_DATA_INFO_M080000004_Page_Search = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportAbnormalTransactionHandling/searchPage`, data, null, token.atoken);
  return res;
};
export const GET_DATA_INFO_M080000004_Search_Next_Previous = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportAbnormalTransactionHandling/searchNextPrevious`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M080000004_SaveFlagSendCs = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportAbnormalTransactionHandling/saveFlagSendCs`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M080000004_SaveFlagNormal = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportAbnormalTransactionHandling/saveFlagNormal`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M080000004_SaveFlag72 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/reportAbnormalTransactionHandling/saveFlag72`, data, null, token.atoken);
  return res;
};

export const GET_DATA_INFO_M080000005 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportSendTrxToCs/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000006 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcTotalTransaction/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000007 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportDcToGateway/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000008 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportPaymentFromHighway/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000009 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportPaymentFromHighwayCutOff/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000010 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportPassingItemComparisonWithHighway/search`, data, null, token.atoken
  );
  return res;
};
export const GET_DATA_INFO_M080000018 = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/passingTransactionsSendCsBack/search`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};

export const GET_DATA_INFO_M080000018_Page_Search = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/passingTransactionsSendCsBack/searchPage`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};

export const GET_DATA_INFO_M080000018_SEND_CS = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/passingTransactionsSendCsBack/sendCs`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};

export const GET_DATA_INFO_M080000018_CHANGE_SIGNAL_CODE = async (data, token) => {
  const res = await Fetch("POST", `${apiV1}/report/passingTransactionsSendCsBack/changeSignalCode`, data, null, token.atoken);
  // const res = dataInfo34
  return res;
};

export const GET_DATA_INFO_M080000021 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/cancelTransactionEtc/search`, data, null, token.atoken
  );
  return res;
};

export const GET_LIST_TRX_M080000021 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/cancelTransactionEtc/listTrx`, data, null, token.atoken
  );
  return res;
};

export const SAVE_CANCEL_M080000021 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/cancelTransactionEtc/saveCancel`, data, null, token.atoken
  );
  return res;
};

export const SAVE_REFUND_DATE_M080000021 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/cancelTransactionEtc/saveRefundDate`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000022 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/recordCustomerInformationTax/search`, data, null, token.atoken
  );
  return res;
};

export const CANCEL_CUSTOMER_M080000022 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/recordCustomerInformationTax/calcel/customer`, data, null, token.atoken
  );
  return res;
};

export const SAVE_CUSTOMER_M080000022 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/recordCustomerInformationTax/save/customer`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_CONSENT_FORM_M080000022 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/recordCustomerInformationTax/download/consentForm`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.atoken
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {

      //Create a Blob from the PDF Stream
      const file = new Blob([blob], { type: 'application/pdf' });//Build a URL from the file
      const fileURL = URL.createObjectURL(file);//Open the URL on new Window
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;

      //var url = window.URL.createObjectURL(new Blob([blob]));
      //var a = document.createElement('a');
      //a.href = url;
      //a.download = data.fileName;
      //document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      //a.click();
      //a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M100000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcForTaxInvoice/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M100000001_Page_Search = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcForTaxInvoice/searchPage`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_CONSENT_FORM_M100000001 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportEtcForTaxInvoice/download/consentForm`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.atoken
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {

      //Create a Blob from the PDF Stream
      const file = new Blob([blob], { type: 'application/pdf' });//Build a URL from the file
      const fileURL = URL.createObjectURL(file);//Open the URL on new Window
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;

      //var url = window.URL.createObjectURL(new Blob([blob]));
      //var a = document.createElement('a');
      //a.href = url;
      //a.download = data.fileName;
      //document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      //a.click();
      //a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_CONSENT_CANCEL_M100000001 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportEtcForTaxInvoice/download/consentCancel`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.atoken
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {

      //Create a Blob from the PDF Stream
      const file = new Blob([blob], { type: 'application/pdf' });//Build a URL from the file
      const fileURL = URL.createObjectURL(file);//Open the URL on new Window
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;

      //var url = window.URL.createObjectURL(new Blob([blob]));
      //var a = document.createElement('a');
      //a.href = url;
      //a.download = data.fileName;
      //document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      //a.click();
      //a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const SAVE_CONSENT_FORM_M100000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcForTaxInvoice/save/consentForm`, data, null, token.atoken
  );
  return res;
};

export const CANCLE_CONSENT_FORM_M100000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcForTaxInvoice/cancle/consentForm`, data, null, token.atoken
  );
  return res;
};

export const SAVE_EDIT_CUSTOMER_M100000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcForTaxInvoice/save/editCustomer`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_RECEIPT_M100000001 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportEtcForTaxInvoice/download/receipt`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.atoken
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {

      //Create a Blob from the PDF Stream
      const file = new Blob([blob], { type: 'application/pdf' });//Build a URL from the file
      const fileURL = URL.createObjectURL(file);//Open the URL on new Window
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;

      //var url = window.URL.createObjectURL(new Blob([blob]));
      //var a = document.createElement('a');
      //a.href = url;
      //a.download = data.fileName;
      //document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      //a.click();
      //a.remove();  //afterwards we remove the element again  

    });
  return res;
};

export const SEARCH_CONSENT_FORM_M100000001 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportEtcForTaxInvoice/search/consentForm`, data, null, token.atoken
  );
  return res;
};

export const CREATE_FILE_M080000012 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/dailyTollTransactionFile/createFile`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_M080000012 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/dailyTollTransactionFile/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};


export const CREATE_FILE_M080000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/dailyTollTransactionFileExtra/createFile`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_M080000013 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/dailyTollTransactionFileExtra/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M100000002 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportMonthlyEtc/search`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_EXCEL_M01000002 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportMonthlyEtc/download/excel`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M080000014 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportComparesEtcTransitDataWithPaymentTransaction/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000015 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportPassingPaymentOverdue/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M080000016 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportBillingEtc/search`, data, null, token.atoken
  );
  return res;
};

export const CREATE_FILE_M080000016 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportBillingEtc/createFile`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_M080000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportBillingEtc/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_DATA_INFO_M080000017 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportSummaryBillingEtc/search`, data, null, token.atoken
  );
  return res;
};

export const GET_DOWNLOAD_FILE_INFO_M080000017 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportSummaryBillingEtc/getDownloadFile`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_M080000017 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/reportSummaryBillingEtc/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const GET_CANCEL_FILE_INFO_M080000017 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/reportSummaryBillingEtc/cancelFile`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M090000012 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/promotions/search`, data, null, token.atoken
  );
  return res;
};

export const GET_PROMOTIONS_TYPE_LIST_M090000012 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/promotions/typeList`, data, null, token.atoken
  );
  return res;
};

export const DELETE_M090000012 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/promotions/delete`, data, null, token.atoken
  );
  return res;
};

export const SAVE_M090000012 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/promotions/save`, data, null, token.atoken
  );
  return res;
};

export const GET_DATA_INFO_M090000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/cardAllowPassing/search`, data, null, token.atoken
  );
  return res;
};

export const GET_PLAZA_LIST_M090000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/cardAllowPassing/plazaList`, data, null, token.atoken
  );
  return res;
};

export const DELETE_M090000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/cardAllowPassing/delete`, data, null, token.atoken
  );
  return res;
};

export const SAVE_M090000013 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/management/cardAllowPassing/save`, data, null, token.atoken
  );
  return res;
};

export const UPLOAD_FILE_IMAGES_MTC_M090000014 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileTransactionData/upload/images/mtc`,
    data,
    token.atoken
  );
  return res;
};

export const UPLOAD_FILE_MTC_M090000014 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileTransactionData/upload/mtc`,
    data,
    token.atoken
  );
  return res;
};

export const UPLOAD_FILE_ETC_M090000014 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileTransactionData/upload/etc`,
    data,
    token.atoken
  );
  return res;
};

export const UPLOAD_FILE_IMAGE_M090000015 = async (data, token) => {
  const res = await FetchFormData(
    "POST",
    `${apiV1}/importFileTfi/upload`,
    data,
    token.atoken
  );

  return res;
};

export const DOWNLOAD_FILE_STAFF_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/staff`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_PROMOTION_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/promotion`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_TFI_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/tfi`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_DMT_CARD_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/dmtCard`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_TARIFF_MTC_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/tariffMTC`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_TARIFF_ETC_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/tariffETC`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_STATUSLIST_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/statuslist`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const DOWNLOAD_FILE_BLACKLIST_M090000016 = async (data, token) => {
  const url = `${apiURL}${apiV1}/downloadParameter/blacklist`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again  
    });
  return res;
};

export const CREATE_FILE_M100000003 = async (data, token) => {
  const res = await Fetch(
    "POST", `${apiV1}/report/eTaxFile/createFile`, data, null, token.atoken
  );
  return res;
};

export const DOWNLOAD_FILE_M100000003 = async (data, token) => {
  const url = `${apiURL}${apiV1}/report/eTaxFile/download/pdf`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(new Blob([blob]));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();  //afterwards we remove the element again
    });
  return res;
};

// ------ Dashboard — ปริมาณจราจร 24 ชม. ย้อนหลัง รายชั่วโมง แยกตามด่าน (v1.5.19) -----
// Response shape (see docs/api-dashboard-hourly-traffic.md):
//   { status, hours: string[24], plazas: [{ plazaId, plazaNameTh,
//     total: number[24], byPayment: { [payment]: number[24] } }] }
export const GET_DASHBOARD_HOURLY_TRAFFIC = async (data, token) => {
  const res = await Fetch(
    "POST",
    `${apiV1}/report/dashboardHourlyTraffic/search`,
    data,
    null,
    token.atoken
  );
  return res;
};