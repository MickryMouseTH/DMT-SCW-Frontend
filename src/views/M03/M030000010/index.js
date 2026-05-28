/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import PrintHeader from "./printHeader";
import { Table, Typography } from "antd";
import { _isNull, _isZero, _PlusZero, _isEmpty, _isSeperate, _setYearThai } from "../../../tools/util";
const { Text } = Typography;

const Print = ({
  header = [],
  dataSource = [],
  columnPerPage,
  rowPerPage,
  footer = [],
  propsHeader,
  propsClass = "",
  columnTotalChange,
  oneColumnfooter = false,
  dataSecondTable = [],
  columnSecondTable = []
  // typeChild = "",
}) => {
  const [report, setReport] = useState(<></>);
  useEffect(() => {
    GENERATE_REPORT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  const GENERATE_REPORT = () => {
    const source = _splitDataSource();
    const sourceHeader = _splitHeader();
    const _footer = reformatFooter(header, footer, dataSource);
    let html = [];
    source.forEach((sourceItem, sourceIndex) => {
      //
      const isLastPage = sourceIndex === source.length - 1;

      const hasFooter = !_isEmpty(_footer);
      const _dataSource = hasFooter
        ? isLastPage
          ? [...sourceItem, _footer]
          : sourceItem
        : sourceItem;
      sourceHeader.forEach((headerItem, headerIndex) => {
        //
        const _columns = generateColumn(headerItem);
        //
        html = [
          ...html,
          // <div key={`${sourceIndex}${headerIndex}`} className="border"> BORDER OUTLINE TABLE BIG
          <div key={`${sourceIndex}${headerIndex}`} className="m-10">
            {/* <div className="page-break"></div> origin old year use this */}
            <PrintHeader
              {...propsHeader}
              page={sourceIndex + 1}
              pageTotal={source.length}
              tablePage={headerIndex + 1}
              tablePageTotal={sourceHeader.length}
            />
            <Table
              rowKey={(record, index) => index}
              dataSource={_dataSource}
              bordered
              size="small"
              // className={`print-size print-border ${propsClass}`}
              className={sourceIndex === source.length - 1 ? `print-size print-border ${propsClass}` : `print-size print-border`}
              pagination={false}
              columns={_columns}
              summary={null}
            />
            <div className="page-break"></div>  {/* new use this its active firefox*/}

            {!_isEmpty(dataSecondTable) && !_isEmpty(columnSecondTable) ?
              <>
              <div className="page-break"></div>
                <PrintHeader
                  {...propsHeader}
                  page={source.length+1}
                  pageTotal={source.length+1}
                  tablePage={headerIndex + 1}
                  tablePageTotal={sourceHeader.length}
                />
                <Table
                  rowKey={(record, index) => index}
                  dataSource={dataSecondTable}
                  bordered
                  size="small"
                  className={sourceIndex === source.length - 1 ? `print-size print-border ${propsClass}` : `print-size print-border`}
                  pagination={false}
                  columns={columnSecondTable}
                  summary={null}
                />
              </>
              : null}
          </div>,
        ];
      });
    });
    setReport(html);
  };

  const _splitDataSource = () => {
    const { list } = dataSource;
    const length = Math.ceil(list.length / rowPerPage);
    let result = [];
    let start = 0;
    for (let i = 0; i < length; i++) {
      const _split = [...list].splice(start, rowPerPage);
      result = [...result, _split];
      start += rowPerPage;
    }
    if (result.length <= 0) {
      result = [[{}]]
    }
    return result;
  };

  const _splitHeader = () => {
    const length = Math.ceil(header.length / columnPerPage);
    const prefix = header[0];
    let result = [];
    let start = 1;
    for (let i = 0; i < length; i++) {
      const _split = [...header].splice(start, columnPerPage);
      result = [...result, [prefix, ..._split]];
      start += columnPerPage;
    }
    if (columnPerPage <= 1) {
      result.pop();
    }
    return result;
  };

  const reformatFooter = (header = [], footer = [], dataSource = []) => {
    if (header.length < 1 || footer.length < 1 || dataSource.length < 1)
      return {};
    let reforgeHeader = [];
    header.forEach((headerItem) => {
      if (headerItem.children && headerItem.children.length) {
        headerItem.children.forEach((childrenItem) => {
          reforgeHeader = [...reforgeHeader, childrenItem];
        });
      } else {
        reforgeHeader = [...reforgeHeader, headerItem];
      }
    });

    let result = {};
    footer.forEach((item, index) => {
      result = { ...result, [reforgeHeader[index].key]: dataSource[item.key] };
    });
    if (oneColumnfooter === true) {
      if (_isEmpty(columnTotalChange)) {
        return { ...result, plazaAbbreviation: "รวม" };
      } else {
        return { ...result, ...columnTotalChange };
      }
    } else {
      if (_isEmpty(columnTotalChange)) {
        return { ...result, no: "Total", plazaAbbreviation: "rows", resDate: "ยอดรวม" };
      } else {
        return { ...result, plazaAbbreviation: "", ...columnTotalChange };
      }
    }
    // return oneColumnfooter === true ?
    // { ...result, plazaAbbreviation: "รวม" }
    // : _isEmpty(columnTotalChange) ? { ...result, plazaAbbreviation: "", laneAbbreviation: "รวม" }
    // : { ...result, plazaAbbreviation: "", ...columnTotalChange }
  };

  const generateColumn = (header) => {
    const result = header.map((item, index) => {
      if (item.children && item.children.length) {
        return {
          title: item.name,
          dataIndex: item.key,
          key: item.key,
          align: item.align,
          width: item.width,
          children: generateColumn(item.children),
        };
      } else {
        return typeCheck(item);
      }
    });
    return result;
  };

  const _dateRow = (text, type) => {
    if (_isEmpty(text)) return "";
    if (Number(text)) return text;
    if (text === "รวม") return text;
    const date =
      type === "date"
        ? _setYearThai(text,"DD/MM/YYYY HH:mm:ss")
        : type === "dateDay"
          ? _setYearThai(text,"DD/MM/YYYY")
          : _setYearThai(text,"DD/MM/YYYY HH:mm:ss");
    if (date === "Invalid date") return text;
    return date;
  };

  const checkCustom = (text, customValue) => {
    if (!_isEmpty(text)) {
      if (!_isEmpty(customValue)) {
        const result = customValue.filter((item) =>
          item.name === text)
        return !_isEmpty(result[0]) ? result[0].class : ''
      }
    }
  }

  const typeCheck = (item) => {
    const defaultColumn = {
      title: item.name,
      dataIndex: item.key,
      key: item.key,
      align: item.align,
      width: item.width,
    };

    switch (item.type) {
      case "date":
        return {
          ...defaultColumn,
          render: (text) => (
            <div style={{ textAlign: `${item.align}` }}>
              {_dateRow(text)}
            </div>
          ),
        };
      case "dateDay":
        return {
          ...defaultColumn,
          render: (text) => (
            <div style={{ textAlign: `${item.align}` }}>
              {_dateRow(text, "dateDay")}
              {}
            </div>
          ),
        };
      case "signal":
        return {
          ...defaultColumn,
          render(text) {
            return {
              props: {
                className: `${item.className}`,
              },
              children: <Text>{_PlusZero(text)}</Text>,
            };
          },
        };
      case "customColumn":
        return {
          ...defaultColumn,
          render(text, record) {
            return {
              props: {
                className: `${item.className}`,
              },
              children: <Text>{_isNull(text)}</Text>,
            };
          },
        };
      case "jobNo":
        return {
          ...defaultColumn,
          render(text, record) {
            return {
              props: {
                className: `${item.className}`,
              },
              children: <Text>{_isNull(text)}</Text>,
            };
          },
        };
      case "nullColumn":
        return {
          ...defaultColumn,
          render(text, record) {

            return {
              props: {
                className: `${item.className}`,
              },
              children: <Text className={checkCustom(text, item.textCustom)}>{_isNull(text)}</Text>,
            };
          },
        };
      case "seperate":
        return {
          ...defaultColumn,
          render(text, record) {
            return {
              props: {
                className: `${item.className}`,
              },
              children: <Text>{_isSeperate(text)}</Text>,
            };
          },
        };
      case "zeroColumn":
        return {
          ...defaultColumn,
          render(text, record) {
            return {
              props: {
                className: `${item.className}`,
              },
              children: <Text>{_isZero(text)}</Text>,
            };
          },
        };
      default:
        return defaultColumn;
    }
  };

  return <div>{report}</div>;
};

export default Print;
