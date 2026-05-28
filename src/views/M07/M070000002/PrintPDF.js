import React from "react";
import { Table, Row, Col } from "antd";
import { getReportType, columnType } from "../../../tools/constrant";
import moment from "moment";

export class PrintReport extends React.Component {
  render() {
    const {
      reportType = "",
      data = { list: [] },
      rowsLength = 10,
      columnsLength = 8,
      reportTitle = "",
      additionTitle = [],
      headerTitle,
      columnCustom = {},
      propsClassChildren = "",
      propsClassHeader = "",
      totalCoulumn = [],
      dataTotalTale = []
    } = this.props;
    
    const pageLength = Math.ceil(data.list.length / rowsLength);
    return (
      <div>
      <FunctionalPrint
        reportType={reportType}
        data={data}
        rowsLength={rowsLength}
        columnsLength={columnsLength}
        reportTitle={reportTitle}
        additionTitle={additionTitle}
        headerTitle={headerTitle}
        columnCustom={columnCustom}
        propsClassChildren={propsClassChildren}
        propsClassHeader={propsClassHeader}
      />
       <PrintHeader
          pageLength={pageLength+1}
          current={pageLength+1}
          reportTitle={reportTitle}
          additionTitle={additionTitle}
          propsClassHeader={propsClassHeader}
        />
        <Table
          rowKey={(record, index) => index}
          dataSource={dataTotalTale}
          // bordered
          size="small"
          pagination={false}
          summary={null}
          columns={totalCoulumn}
          // className='print-siznew print-border'
          className={`print-size print-border`}
        />
      </div>
    );
  }
}

const FunctionalPrint = ({
  data,
  reportType,
  rowsLength,
  columnsLength,
  reportTitle,
  additionTitle,
  headerTitle,
  propsClassHeader,
}) => {
  const splitData = (data, length) => {
    const pageLength = Math.ceil(data.length / length);

    let result = [];
    for (let i = 0; i < pageLength; i++) {
      const start = i * length;
      const splited = [...data].splice(start, length);
      result = [...result, splited];
    }
    return result;
  };

  const splitColumn = (data, length) => {
    const prefix = data.filter((item) => item.prefix);
    const pureColumn = data.filter((item) => !item.prefix);
    const lengthWithPrefix = length - prefix.length;
    const loop = Math.ceil(pureColumn.length / lengthWithPrefix);

    let result = [];
    for (let i = 0; i < loop; i++) {
      const start = i * lengthWithPrefix;
      const splited = [...pureColumn].splice(start, lengthWithPrefix);
      result = [...result, [...prefix, ...splited]];
    }
    return result;
  };

  const generateTable = ({ dataSource, header, i, j, pageLength, title }) => {
    const columns = generateColumn(header);
    return (
      <div key={`${i}${j}`}>
        {/* <div className="page-break"></div>  {/*old use this active in chorme */}
        <PrintHeader
          pageLength={pageLength}
          current={i + 1}
          reportTitle={reportTitle}
          additionTitle={additionTitle}
          propsClassHeader={propsClassHeader}
        />
        <Table
          rowKey={(record, index) => index}
          dataSource={dataSource}
          // bordered
          title={title}
          size="small"
          pagination={false}
          summary={null}
          columns={columns}
          // className='print-siznew print-border'
          className={`print-size print-border`}
        />
        <div className="page-break"></div>{/*new use this active in filefox */}
      </div>
    );
  };

  const generateFooter = (data, footer) => {
    data = { ...data, prefixTotal: "รวม" };

    let result = {};
    footer.forEach((item) => {
      result = {
        ...result,
        [item.headerKey]: insertCommaToNumber(data[item.key]),
      };
    });
    return result;
  };

  const generateColumn = (columns) => {
    return columns.map((item) => {
      const defaultC = {
        title: item.header,
        dataIndex: item.key,
        key: item.key,
      };
      switch (item.type) {
        case columnType.DEFAULT:
          return {
            ...defaultC,
            render: (value) => {
              return inspectNull(value);
            },
          };
        case columnType.NUMBER:
          return {
            ...defaultC,
            render: (value) => {
              return insertCommaToNumber(value);
            },
          };
        case columnType.DATE:
          return {
            ...defaultC,
            render: (value) => {
              return convertDateTimeFormat(value);
            },
          };
        case columnType.DATETIME:
          return {
            ...defaultC,
            render: (value) => {
              return convertDateTimeFormat(value, "DD/MM/YYYY HH:mm:ss");
            },
          };
        case columnType.TIME:
          return {
            ...defaultC,
            render: (value) => {
              return convertDateTimeFormat(value, "HH:mm:ss");
            },
          };
        default:
          return defaultC;
      }
    });
  };

  const generateHTML = () => {
    const type = getReportType(reportType);
    const footer = generateFooter(data, type.footer);
    let splitedData;
    const splitedHeader = splitColumn(type.header, columnsLength);
    if (footer.length <= 0 || !footer.length) {
      splitedData = splitData(data.list, rowsLength);
    }
    else {
      splitedData = splitData([...data.list, footer], rowsLength);
    }
    return splitedData
      .map((dataItem, i) => {
        return splitedHeader.map((columnItem, j) => {
          return generateTable({
            dataSource: dataItem,
            header: columnItem,
            i: i,
            j: j,
            pageLength: splitedData.length,
            title: headerTitle === {} ? false : headerTitle
          });
        });
      })
      .flat(Infinity);
  };

  const inspectNull = (value) => {
    if (!value && value !== 0) return "";
    return value;
  };

  const insertCommaToNumber = (value) => {
    if (!value) return "0";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const convertDateTimeFormat = (value, format = "DD/MM/YYYY") => {
    if (!value) return "";
    return moment(value).format(format);
  };

  return <div>{generateHTML()}</div>;
};

const PrintHeader = ({ pageLength, current, reportTitle, additionTitle, propsClassHeader }) => {
  return (
    <div
      style={{ fontSize: 12, marginBottom: '-2px' }}
      className={`${propsClassHeader} border-top-gray border-left-gray border-right-gray`}
    >
      <Row className="pt-5 pb-5">
        <Col
          span={4}
          className="d-flex flex-column align-items-end justify-content-end"
        >
          <img src="/assets/img/brand/logo.jpg" width={35} alt="logo"></img>
        </Col>
        <Col
          span={16}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <p className="mb-0">บริษัท ทางยกระดับดอนเมืองจำกัด (มหาชน)</p>
          <p className="mb-0">
            เลขที่ 40/40 ถ. วิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพฯ 10210
            โทร. 0-2792-6500
          </p>
        </Col>
      </Row>
      <Row className="border-top-gray border-bottom-gray">
        <Col
          span={4}
          className="d-flex flex-column align-items-center border-right-gray"
        >
          วันที่พิมพ์ : {moment(new Date()).add(543, "year").format("L")}{" "}
          {moment(new Date()).add(543, "year").format("LT")}
        </Col>
        <Col
          span={16}
          className="d-flex flex-column align-items-center border-right-gray"
        >
          {reportTitle}
        </Col>
        <Col span={4} className="d-flex flex-column align-items-center ">
          Page: {current} of {pageLength}
        </Col>
      </Row>
      <Row className="border-bottom-gray pb-1 pt-1">
        {additionTitle.map((item, index) => {
          return (
            <Col span={6} key={index}>
              <Row>
                <Col span={11} className="d-flex justify-content-end">
                  {item.name}
                </Col>
                <Col span={1} className="d-flex justify-content-center">
                  :
                </Col>
                <Col span={12} className="d-flex justify-content-start">
                  {item.value ? item.value : "-"}
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
