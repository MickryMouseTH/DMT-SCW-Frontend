/* eslint-disable no-unused-vars */
import XLSX from "xlsx";
import moment from "moment";
import { column_prefix, header_25, footer_25 } from "./column_prefix";
import { _isNull, _PlusZeroExport, _isEmpty, _isTypeTrueExport, _isNullExport, _isZeroExport, _isSeperateExport } from "../../tools/util";
import {
  footer41,
  footer43,
  footer44,
  footer45,
  footer46,
  footer48,
  footer21,
} from "./footer";
import {
  header41,
  header43,
  header44,
  header45,
  header46,
  header48,
  header21,
  header93,
} from "./header";

const createHeader = (header) => {
  let row1 = {};
  let row2 = {};
  let row3 = {};
  let count = 0;
  for (let p = 0; p < header.length; p++) {
    if (header[p].children && header[p].children.length) {
      for (let c = 0; c < header[p].children.length; c++) {
        if (header[p].children[c].children && header[p].children[c].children.length) {
          for (let c2 = 0; c2 < header[p].children[c].children.length; c2++) {
            row1 = { ...row1, [column_prefix[count]]: header[p].name };
            row2 = { ...row2, [column_prefix[count]]: header[p].children[c].name };
            row3 = { ...row3, [column_prefix[count]]: header[p].children[c].children[c2].name };
            count++;
          }
        } else {
          row1 = { ...row1, [column_prefix[count]]: header[p].name };
          row2 = { ...row2, [column_prefix[count]]: header[p].children[c].name };
          count++;
        }
      }
    } else {
      row1 = { ...row1, [column_prefix[count]]: header[p].name };
      row2 = { ...row2, [column_prefix[count]]: "" };
      count++;
    }
  }
  return [row1, row2, row3];
};

const createHeader814 = (headerText, header) => {
  let rowHeaderSearch = {};
  let row1 = {};
  let row2 = {};
  let row3 = {};
  let count = 0;
  for (let p = 0; p < header.length; p++) {
    if (header[p].children && header[p].children.length) {
      for (let c = 0; c < header[p].children.length; c++) {
        if (header[p].children[c].children && header[p].children[c].children.length) {
          for (let c2 = 0; c2 < header[p].children[c].children.length; c2++) {
            row1 = { ...row1, [column_prefix[count]]: header[p].name };
            row2 = { ...row2, [column_prefix[count]]: header[p].children[c].name };
            row3 = { ...row3, [column_prefix[count]]: header[p].children[c].children[c2].name };
            count++;
          }
        } else {
          row1 = { ...row1, [column_prefix[count]]: header[p].name };
          row2 = { ...row2, [column_prefix[count]]: header[p].children[c].name };
          count++;
        }
      }
    } else {
      row1 = { ...row1, [column_prefix[count]]: header[p].name };
      row2 = { ...row2, [column_prefix[count]]: "" };
      count++;
    }
  }
  if (headerText.length > 0) {
    count = 0;
    rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
    rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
    rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
    rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
    if (headerText.length > 0) {
      rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: headerText[0].name + " : " + headerText[0].value };
      rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
      rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
      rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
    }
    if (headerText.length > 1) {
      rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: headerText[1].name + " : " + headerText[1].value };
      rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
      rowHeaderSearch = { ...rowHeaderSearch, [column_prefix[count++]]: "" };
    }
    return [rowHeaderSearch, {}, row1, row2, row3];
  }
  return [row1, row2, row3];
};

const createMergeCell = (header, ws, columnOneCell) => {
  let merge = [];
  //create merge for header
  let start = { col: 0, row: 0 };
  let end = { col: 0, row: 0 };
  for (let i = 0; i < header.length; i++) {
    if (header[i].children && header[i].children.length) {
      merge = [
        ...merge,
        {
          s: { r: start.row, c: start.col },
          e: { r: end.row, c: end.col + header[i].children.length - 1 },
        },
      ];
      start = { ...start, col: start.col + header[i].children.length };
      end = { ...end, col: end.col + header[i].children.length };
    } else {
      merge = [
        ...merge,
        { s: { r: start.row, c: start.col }, e: { r: 1, c: start.col } },
      ];
      start = { row: 0, col: start.col + 1 };
      end = { row: 0, col: end.col + 1 };
    }
  }
  //create merge for footer
  const range = XLSX.utils.decode_range(ws["!ref"]);
  merge = columnOneCell === true ?
    [
      ...merge,
      {
        s: { r: range.e.r, c: 0 },
        e: { r: range.e.r, c: 0 },
      },
    ]
    : [
      ...merge,
      {
        s: { r: range.e.r, c: 0 },
        e: { r: range.e.r, c: 1 },
      },
    ];
  return merge;
};

const createData = (dataSource, header) => {
  let result = [];
  for (let d = 0; d < dataSource.length; d++) {
    let data = {};
    let count = 0;
    for (let p = 0; p < header.length; p++) {
      if (header[p].children && header[p].children.length) {
        for (let c = 0; c < header[p].children.length; c++) {
          data = {
            ...data,
            [column_prefix[count]]:
              header[p].children[c].type === "date"
                // eslint-disable-next-line react-hooks/exhaustive-deps
                ? _isTypeTrueExport(dataSource[d][header[p].children[c].key], header[p].children[c].type)
                // ? _isEmpty(dataSource[d][header[p].children[c].key]) ? "" : moment(dataSource[d][header[p].children[c].key]).add(543, 'year').format("DD/MM/YYYY HH:mm:ss")
                : header[p].children[c].type === "zeroColumn"
                  ? _isZeroExport(dataSource[d][header[p].children[c].key])
                  : header[p].children[c].type === "nullColumn"
                    ? _isNullExport(dataSource[d][header[p].children[c].key])
                    ///////////////////////////////////include for isnull column /////////////////////
                    : header[p].children[c].type === "customColumn"
                      ? _isNullExport(dataSource[d][header[p].children[c].key])
                      ///////////////////////////////////include for isnull column /////////////////////
                      : header[p].children[c].type === "percentColumn"
                        ? _isNullExport(dataSource[d][header[p].children[c].key]) !== "" ? Number(dataSource[d][header[p].children[c].key]).toFixed(2)
                          : dataSource[d][header[p].children[c].key]
                        ///////////////////////////////////include for isnull column /////////////////////
                        : header[p].children[c].type === "seperate"
                          ? _isSeperateExport(dataSource[d][header[p].children[c].key])
                          : header[p].children[c].type === "dateDay"
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            ? _isTypeTrueExport(dataSource[d][header[p].children[c].key], header[p].children[c].type)
                            // ? _isEmpty(dataSource[d][header[p].children[c].key]) ? "" : moment(dataSource[d][header[p].children[c].key]).add(543, 'year').format("DD/MM/YYYY")
                            : dataSource[d][header[p].children[c].key]
          };
          count++;
        }
      } else {
        data = {
          ...data,
          [column_prefix[count]]:
            header[p].type === "date"
              // eslint-disable-next-line react-hooks/exhaustive-deps
              ? _isTypeTrueExport(dataSource[d][header[p].key], header[p].type)
              : header[p].type === "signal"
                ? _PlusZeroExport(dataSource[d][header[p].key])
                : header[p].type === "zeroColumn"
                  ? _isZeroExport(dataSource[d][header[p].key])
                  : header[p].type === "nullColumn"
                    ? _isNullExport(dataSource[d][header[p].key])
                    : header[p].type === "seperate"
                      ? _isSeperateExport(dataSource[d][header[p].key])
                      ///////////////////////////////////include for isnull column /////////////////////
                      : header[p].type === "customColumn"
                        ? _isNullExport(dataSource[d][header[p].key])
                        ///////////////////////////////////include for isnull column /////////////////////
                        : header[p].type === "percentColumn"
                          ? _isNullExport(dataSource[d][header[p].key]) !== "" ? Number(dataSource[d][header[p].key]).toFixed(2)
                            : dataSource[d][header[p].key]
                          ///////////////////////////////////include for isnull column /////////////////////
                          : header[p].type === "dateDay"
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            ? _isTypeTrueExport(dataSource[d][header[p].key], header[p].type)
                            : dataSource[d][header[p].key],
        };
        count++;
      }
    }
    result.push(data);
  }
  return result;
};

const createFooter = (dataSource, footer) => {
  let result = {};
  let count = 0;
  for (let f = 0; f < footer.length; f++) {
    if (footer[f].key === "รวม") {
      result = { ...result, [column_prefix[count]]: "รวม" };
    } else if (footer[f].key === "รวมทั้งหมด") {
      result = { ...result, [column_prefix[count]]: "รวมทั้งหมด" };
    } else {
      result = {
        ...result,
        [column_prefix[count]]: _isNullExport(dataSource[footer[f].key]),
      };
    }
    count++;
  }
  return [result];
};

export const _exportFileExcel25 = ({
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
}) => {
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet([{}]);
  let originCount = 1;
  let _merge = [];
  wb.Props = wbProps;

  for (
    let dataSourceIndex = 0;
    dataSourceIndex < dataSource.length;
    dataSourceIndex++
  ) {
    const header = createHeader25(dataSourceIndex, header_25);
    const data = createDataSource25(
      header_25,
      dataSource[dataSourceIndex].list
    );
    const footer = createFooter25(footer_25, dataSource[dataSourceIndex]);
    XLSX.utils.sheet_add_json(ws, [...header, ...data, ...footer], {
      skipHeader: true,
      origin: `A${originCount}`,
    });
    const appendMerge = createMerge25(
      originCount,
      dataSource[dataSourceIndex].list.length
    );
    _merge = [..._merge, ...appendMerge];
    originCount += 4 + dataSource[dataSourceIndex].list.length;
  }
  ws["!merges"] = _merge;

  const range = XLSX.utils.decode_range(ws['!ref'])
  for (let r = range.s.r; r <= range.e.r; r++) {
    console.log(r)
    for (let c = range.s.c; c <= range.e.c; c++) {
      let cell = ws[XLSX.utils.encode_cell({ r: r, c: c })]
      // if(!cell || cell.t != 'n') continue;
      cell.z = '#0.00'
    }
  }

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  return XLSX.writeFile(wb, `${fileName}.xlsx`);
};

const createHeader25 = (mainIndex, header) => {
  let row1 = { A: `ชั่วโมงที่-${mainIndex + 1}` };
  let row2 = {};
  let count = 0;
  for (let i = 0; i < header.length; i++) {
    row2 = { ...row2, [column_prefix[count]]: header[i].title };
    count++;
  }
  return [row1, row2];
};

const typeCheck = (value) => {
  if (typeof value === "number") {
    return new Intl.NumberFormat().format(value);
  } else {
    return value;
  }
};

const createDataSource25 = (header, dataSource) => {
  let result = [];
  for (
    let dataSourceIndex = 0;
    dataSourceIndex < dataSource.length;
    dataSourceIndex++
  ) {
    let row = {};
    let count = 0;
    for (let headerIndex = 0; headerIndex < header.length; headerIndex++) {
      row = {
        ...row,
        [column_prefix[count]]: typeCheck(
          dataSource[dataSourceIndex][header[headerIndex].key]
        ),
      };
      count++;
    }
    result.push(row);
  }
  return result;
};

const createFooter25 = (footer, dataSource) => {
  dataSource = { ...dataSource, total: "รวม" };
  let row = {};
  let count = 0;
  for (let footerIndex = 0; footerIndex < footer.length; footerIndex++) {
    row = {
      ...row,
      [column_prefix[count]]: typeCheck(dataSource[footer[footerIndex].key]),
    };
    count++;
  }
  return [row];
};

const createMerge25 = (originCount, dataSourceLength) => {
  const title = {
    s: { r: originCount - 1, c: 0 },
    e: { r: originCount - 1, c: 14 },
  };
  const footer = {
    s: { r: originCount + dataSourceLength + 1, c: 0 },
    e: { r: originCount + dataSourceLength + 1, c: 1 },
  };

  return [title, footer];
};

const _exportFileExcel = ({
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
          cell.z = '0'
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

const _exportFileExcelWithComma = ({
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
          cell.z = '#,##0'
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

const _exportFileExcel_Menu411 = ({
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
          if (c === 11 || c === 12) {
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

const _exportFileExcelWithComma814 = ({
  dataSource = [],
  headerText = [],
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
  let ws = XLSX.utils.json_to_sheet(createHeader814(headerText, header), {
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
          cell.i = '#,##0.00'
          cell.j = '#,##0.00'
          cell.k = '#,##0.00'
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

const _exportFileExcelWithComma102 = ({
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
          cell.i = '#,##0.00'
          cell.j = '#,##0.00'
          cell.k = '#,##0.00'
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

const refacterHeader = (
  dataSource = [],
  customColumn = [],
  customTotal = [],
  headerCustom = [],
  headerName = "ชั่วโมง"
) => {
  let header = [
    {
      name: headerName,
      key: "",
      children: !_isEmpty(headerCustom) ? headerCustom
        : [
          {
            name: "ด่าน",
            key: "plazaAbbreviation",
            type: "customColumn",
            align: "center",
            className: "text-center",
          },
          {
            name: "ช่องทาง",
            key: "laneAbbreviation",
            type: "customColumn",
            align: "center",
            className: "text-center",
          },
        ],
    },
  ];
  if (dataSource && dataSource.length) {
    const column = dataSource[0].columnList;
    column.forEach((item, index) => {
      if (index === column.length - 1) {
        header = [
          ...header,
          {
            name: "รวม",
            key: "",
            children: !_isEmpty(customTotal)
              ? customTotal
              : [
                {
                  name: "ปริมาณ",
                  key: `trafficTotal`,
                  type: "nullColumn",
                  align: "center",
                  className: "text-center",
                },
                {
                  name: "รายได้",
                  key: `revenueTotal`,
                  type: "nullColumn",
                  align: "center",
                  className: "text-right",
                },
              ],
          },
        ];
      }
      else {
        header = [
          ...header,
          {
            name: column[index].columnName,
            key: "",
            children: !_isEmpty(customColumn)
              // customColumn && customColumn.length
              ? customColumn.map((item) => {
                return {
                  name: item.name,
                  key: `${item.key}${column[index].columnName}`,
                  align: "center",
                  type: "nullColumn",
                  className: "text-center",
                };
              })
              : [
                {
                  name: "ปริมาณ",
                  key: `traffic${column[index].columnName}`,
                  align: "center",
                  type: "nullColumn",
                  className: "text-center",
                },
                {
                  name: "รายได้",
                  key: `revenue${column[index].columnName}`,
                  type: "nullColumn",
                  align: "center",
                  className: "text-right",
                },
              ],
          },
        ];
      }
    });
  }
  return header;
};

const refacterDataSource = (dataSource = [], refacterDataSource) => {
  let result = dataSource.map((item, index) => {
    let _result = {
      plazaAbbreviation: item.plazaAbbreviation,
      laneAbbreviation: item.laneAbbreviation,
    };
    for (let i = 0; i < item.columnList.length; i++) {
      for (const [key, value] of Object.entries(item.columnList[i])) {
        if (key !== "columnName") {
          _result = {
            ..._result,
            [`${key}${item.columnList[i].columnName}`]: _isNullExport(value)
          };
        }
      }
    }
    return _result;
  });

  return !_isEmpty(refacterDataSource) ? refacterDataSource : result;
};

const refacterFooterDataSource = (dataSource = [], custom = {}) => {
  let result = {};
  for (let i = 0; i < dataSource.length; i++) {
    for (const [key, value] of Object.entries(dataSource[i])) {
      if (key !== "columnName") {
        const data = !_isEmpty(custom)
          ? custom : {
            [`totaltraffic${dataSource[i].columnName}`]: dataSource[i]
              .traffic,
            [`totalrevenue${dataSource[i].columnName}`]: dataSource[i]
              .revenue,
          };
        result = {
          ...result,
          ...data,
        };
      }
    }
  }
  return result;
};

const refacterFooter = (dataSource = [], customFooter = []) => {
  let footer = !_isEmpty(customFooter) ? customFooter : [{ key: "รวม" }, { key: "รวม" }];
  for (let i = 0; i < dataSource.length; i++) {
    for (const [key, value] of Object.entries(dataSource[i])) {
      if (key !== "columnName") {
        footer = [
          ...footer,
          { key: `total${key}${dataSource[i].columnName}`, align: "center" },
        ];
      }
    }
  }
  return footer;
};

export {
  _exportFileExcel,
  _exportFileExcelWithComma,
  _exportFileExcel_Menu411,
  _exportFileExcelWithComma814,
  _exportFileExcelWithComma102,
  refacterHeader,
  refacterDataSource,
  refacterFooterDataSource,
  refacterFooter,
  createHeader,
  createData,
  createFooter,
  createMergeCell,
};

export {
  header21,
  header41,
  header43,
  header44,
  header45,
  header46,
  header48,
  header93,
  footer21,
  footer41,
  footer43,
  footer44,
  footer45,
  footer46,
  footer48,
};
