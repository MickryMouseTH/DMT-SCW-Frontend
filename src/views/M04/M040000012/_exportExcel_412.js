/* eslint-disable no-unused-vars */
import XLSX from "xlsx";
import {
    createHeader,
    createData,
    createFooter,
    createMergeCell
} from "../../../tools/util"

const _exportExcel_412 = ({
    dataSource = [],
    header = [],
    footer = [],
    fileName = "report",
    sheetName = "sheet1",
    wbProps = {
      Title: "Report",
      Subject: "Report",
      Author: "Red Stapler",
      CreatedDate: new Date(),
    },
    columnOneCell = false
  }) => {
    let wb = XLSX.utils.book_new();
    wb.Props = wbProps;
    let ws = XLSX.utils.json_to_sheet(createHeader(header), {
      skipHeader: true,
      origin: "A1",
    });
  
    const item = createData(dataSource.list, header);
    XLSX.utils.sheet_add_json(ws, item, { skipHeader: true, origin: -1 });
  
    const _footer = createFooter(dataSource, footer);
    XLSX.utils.sheet_add_json(ws, _footer, { skipHeader: true, origin: -1 });
    //r = row; c = column; s = start; e = end;
    ws["!merges"] = createMergeCell(header, ws, columnOneCell);
    const range = XLSX.utils.decode_range(ws['!ref'])
    for (let r = range.s.r; r <= range.e.r; r++) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        let cell = ws[XLSX.utils.encode_cell({ r: r, c: c })]
        if (!cell) {
          continue;
        }
        else {
          if (cell.t !== 'n') {
            if (Number(cell.v) === 'NaN') {
              continue;
            } else {
              cell.z = '0.00'
            }
          } else {
            if(c === 7 || c === 8 || c === 9 || c === 10){
              cell.z = '#,##0.00'
            } else {
              cell.z = '#,##0'
            }
          }
        }
        // cell.z = '0.00'
        // cell.z = '#,##0.00'----> show value width commar number but ist show symbol #### when user double click its change to number 
        // format and commar when value is morethan thouson
      }
    }
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    return XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export default _exportExcel_412