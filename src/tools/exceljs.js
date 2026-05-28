import { Workbook } from "exceljs";
import { columnType, getReportType } from "./constrant";
import saveAs from "file-saver";
import moment from "moment";

export const exportExcelJs = async ({
  reportType = "",
  data = { list: [] },
  fileName = "filename",
  sheetName = "sheet1",
}) => {
  let wb = new Workbook();
  let ws = wb.addWorksheet(sheetName);



  const type = getReportType(reportType);
  if (reportType === '76') {
    type.header = type.header.map((item) => {
      delete item.header;
      return item;
    })
  }
  const columns = generateHeader(type.header);
  const rows = generateData(data.list, columns);
  const footer = generateFooter(data, type.footer);

  ws.columns = columns;
  ws.addRows(rows);
  ws.addRow(footer);

  
  type.header.forEach((item, index) => {
    // ws.getColumn(index + 1).numFmt = '0.00'
    if (item.type === columnType.NUMBER) {
      // ws.getColumn(index + 1).numFmt = '0'
      ws.eachRow(function(row, rowNumber) {
        const result = row.values.find((item)=>item === "Percent")
    
        if(result){
          ws.getRow(rowNumber).numFmt = '0.00'
        } else {
          ws.getRow(rowNumber).numFmt = '0'
        }
      });
    }
    if (item.type === columnType.PERCENT) {
      ws.getColumn(index + 1).numFmt = '0.00'
    }
  })

  ///*************** Check Column Header for change format type value to number
  // type.header.forEach((item, index) => {
  //   // ws.getColumn(index + 1).numFmt = '0.00'
  //   if (item.type === columnType.NUMBER) {
  //     ws.getColumn(index + 1).numFmt = '0'
  //   }
  //   if (item.type === columnType.PERCENT) {
  //     ws.getColumn(index + 1).numFmt = '0.00'
  //   }
  // })
  ///*************** Check Column Header for change format type value to number

  const buffer = await wb.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], { type: "application/octet-stream" }),
    `${fileName}.xlsx`
  );
};

const generateHeader = (header) => {
  return header.map((item) => {
    return { ...item, width: 15 };
  });
};

const generateData = (data, header) => {
  const result = data.map((dataItem) => {
    let obj = {};
    header.forEach((headerItem) => {
      const value = inspectNull(dataItem[headerItem.key]);
      switch (headerItem.type) {
        case columnType.NUMBER:
          const num = insertCommaToNumber(value);
          obj = { ...obj, [headerItem.key]: num };
          break;
        case columnType.PERCENT:
          const percent = insertPercentToNumber(value);
          obj = { ...obj, [headerItem.key]: percent };
          break;
        case columnType.DEFAULT:
          obj = { ...obj, [headerItem.key]: value };
          break;
        case columnType.DATE:
          const date = convertDateTimeFormat(value);
          obj = { ...obj, [headerItem.key]: date === 'Invalid Date' ? value : date };
          break;
        case columnType.DATETIME:
          const date_time = convertDateTimeFormat(value, "DD/MM/YYYY HH:mm:ss");
          obj = { ...obj, [headerItem.key]: date_time === 'Invalid Date' ? value : date_time };
          break;
        case columnType.TIME:
          const time = convertDateTimeFormat(value, "HH:mm:ss");
          obj = { ...obj, [headerItem.key]: time };
          break;
        default:
          break;
      }
    });
    return obj;
  });

  return result;
};

const generateFooter = (data, footer) => {
  data = { ...data, prefixTotal: "รวม" };

  let result = {};
  footer.forEach((item) => {
    result = { ...result, [item.headerKey]: insertCommaToNumber(data[item.key]) };
  });
  return result;
};

const inspectNull = (value) => {
  if (!value && value !== 0) return "";
  return value;
};

const insertCommaToNumber = (value) => {
  if (!value) return 0;
  return value;
  // if (!value) return "0";
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const insertPercentToNumber = (value) => {
  if (!value) return 0;
  // if (typeof value === 'number') return Number(value).toFixed(2);
  else return value;
  // if (!value) return "0";
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const convertDateTimeFormat = (value, format = "DD/MM/YYYY") => {
  if (!value) return "";
  return moment(value).format(format);
};

// const getReportType = (header) => {
//   switch (header) {
//     case "72":
//       return report72;
//     default:
//       return [];
//   }
// };
