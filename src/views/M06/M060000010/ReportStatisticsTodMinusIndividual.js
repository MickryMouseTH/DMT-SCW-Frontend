import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Typography, Button } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { useReactToPrint } from "react-to-print";
import PrintLetter from "./PrintLetter"
import moment from "moment";

import PrintReport from "../../../components/print/PrintReport";
import SummaryData from "./SummaryData";
import RenderTable from "../../../components/table/RenderTable";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

import {
  _isEmpty,
  _exportFileExcel,
  refacterHeader,
  refacterDataSource,
  refacterFooterDataSource,
  refacterFooter,
  _isNull
} from "../../../tools/util";
import { getMonthListAPI } from "../../../service/api/util";
import { getYearListAPI } from "../../../service/api/util";
import { header610, Totalheader610 } from "../../../tools/excel/header";
import { GET_DATA_INFO_M060000010 } from "../../../service/api/report";
import { GET_DATA_PRINT_M060000010 } from "../../../service/api/report";
const { Text } = Typography;

const ReportStatisticsTodMinusIndividual = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [dataSourcePrintLetter, setDataSourcePrintLetter] = useState({ list: [] });
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [flagMonthList, setFlagMonthList] = useState([]);
  const [loadingDataSource, setLoadingDataSource] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({})
  const [scrollX, setScrollX] = useState({})

  const fields = [
    {
      type: "select",
      option: {
        name: "monthId",
        label: "เดือน",
        childrenProps: {
          placeholder: "เลือกเดือน...",
          optionValue: {
            values: [...monthList],
            keyName: "monthNameTh",
            keyValue: "monthId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกเดือน!",
          },
        ],
        initialValue: initialValue.monthId ? initialValue.monthId : Number(moment().format('MM')),
      },
    },
    {
      type: "select",
      option: {
        name: "yearId",
        label: "ปี",
        childrenProps: {
          placeholder: "เลือกปี...",
          optionValue: {
            values: [...yearList],
            keyName: "yearNameTh",
            keyValue: "yearId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกปี!",
          },
        ],
        initialValue: initialValue.yearId ? initialValue.yearId :
          moment().format('YYYY') > 2543 ? moment().format('YYYY') : Number(moment().format('YYYY')) + 543,
      },
    },
    {
      type: "select",
      option: {
        name: "flagMonthId",
        label: "ข้อมูล",
        childrenProps: {
          placeholder: "เลือกข้อมูล...",
          optionValue: {
            values: [...flagMonthList],
            keyName: "flagMonthName",
            keyValue: "flagMonthId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกข้อมูล!",
          },
        ],
        initialValue: initialValue.flagMonthId ? initialValue.flagMonthId : 1,
      },
    },
  ];

  const renderColumns = (indColumn = null) => {
    const columnPL = {
      title: "วันที่",
      align: "center",
      fixed: true,
      children: [
        {
          title: "พนักงาน",
          key: "staffId",
          dataIndex: "staffId",
          align: "center",
          fixed: true,
          width: 60,
          render(text, record) {
            return {
              props: {
                className: "secondary bg_default",
              },
              children: (
                <Text type="secondary" align="center">
                  {text}
                </Text>
              ),
            };
          },
        },
      ],
    };

    const columnPrint = {
      title: "ออกจดหมายแจ้ง",
      dataIndex: "xxx",
      key: "xxx",
      width: 120,
      align: "center",
      render: (text, record) => (
        <Button size="small" onClick={() => handlePrintLetter(record)}>พิมพ์</Button>
      ),
    };

    const columnH = {
      title: "00",
      width: 80,
      align: "center",
      children: [
        {
          title: "ส่งเงินขาด",
          key: "diff",
          dataIndex: "diff",
          width: 80,
          align: "center",
          render: (text) => _isNull(text)
        },
        {
          title: "เรียกเก็บเพิ่ม",
          key: "charge",
          dataIndex: "charge",
          width: 80,
          align: "center",
          render: (text) => _isNull(text)
        },
      ],
    };

    const mixField = (item) => {
      let column = { ...columnH };
      column.title = item.columnName;
      column.children = columnH.children.map((ch) => {
        const chItem = { ...ch };
        delete chItem.key;
        delete chItem.dataIndex;
        if (ch.title === "ส่งเงินขาด") {
          chItem.render = (text, record) => {
            const diff = record.columnList.find(
              (clm) => clm.columnName === item.columnName
            );
            return <span>{_isEmpty(diff) ? null : _isNull(diff["diff"])}</span>;
          };
        }
        if (ch.title === "เรียกเก็บเพิ่ม") {
          chItem.render = (text, record) => {
            const charge = record.columnList.find(
              (clm) => clm.columnName === item.columnName
            );
            return <span>{_isEmpty(charge) ? null : _isNull(charge["charge"])}</span>;
          };
        }
        // if (item.columnName === "Total") delete chItem.width;
        return chItem;
      });
      return column;
    };

    const sliceColumn = (accumulator, currentValue) => {
      if (accumulator.length) {
        if (accumulator[accumulator.length - 1].length !== 18)
          accumulator[accumulator.length - 1].push(currentValue);
        else accumulator.push([currentValue]);
      } else accumulator.push([currentValue]);
      return accumulator;
    };

    let columns1 = [columnPL];
    let columns = [columns1];
    if (!_isEmpty(dataSource.list)) {
      columns = [
        ...dataSource.totalColumnList
          .map(mixField)
          .reduce(sliceColumn, [])
          .map((item) => [columnPL, ...item, columnPrint]),
      ];
    }
    return _isEmpty(indColumn) ? columns : columns[indColumn];
  };

  const headerText = [
    { name: "เดือน", value: dataToPrint.DataList ? dataToPrint.monthName : "" },
    { name: "ปี", value: dataToPrint.DataList ? dataToPrint.yearName : "" },
    { name: "ข้อมูล", value: dataToPrint.DataList ? dataToPrint.flagMonthName : "" },
  ];
  // ------- end ---------------//
  useEffect(() => {
    getMonthList();
    getYearList();
    getFlagMonthList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrintLetter = async (item) => {
    if (item.seckey) {
      const data = {
        seckey: item.seckey,
      };
      try {
        const resPrint = await GET_DATA_PRINT_M060000010(data, props.auth.token);
        if (resPrint.status.code === "S200") {
          setDataSourcePrintLetter(resPrint);
          handlePrintLetter2();
          setLoadingDataSource(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to fetch. ",
            text: resPrint.status.message,
          }).then(async (result) => {
            if (result.value) {
              setLoadingDataSource(false);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have seckey",
      }).then(async (result) => {
        if (result.value) {
          setLoadingDataSource(false);
        }
      });
    }
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.10 รายงานสถิติยอดเงินนำส่งติดลบสะสมรายบุคคล"],
  });
  const handlePrintFile = () => {
    handlePrint();
  };

  const getFlagMonthList = async () => {
    try {
      setLoadingDataSource(true);
      const list = [
        {
          flagMonthId: 1,
          flagMonthName: "ต้นเดือน"
        },
        {
          flagMonthId: 2,
          flagMonthName: "ปลายเดือน"
        }
      ];
      setFlagMonthList(list);
      setLoadingDataSource(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthList = async () => {
    setScrollX({ x: 1300 })
    try {
      setLoadingDataSource(true);
      const res = await getMonthListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setMonthList(res.list);
        setLoadingDataSource(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoadingDataSource(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getYearList = async () => {
    try {
      setLoadingDataSource(true);
      const res = await getYearListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setYearList(res.list);
        setLoadingDataSource(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoadingDataSource(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const OnSearchDataInfo = async (data = null) => {
    try {
      setLoadingDataSource(true);
      const res = await GET_DATA_INFO_M060000010(data, props.auth.token);
      if (res.status.code === "S200") {
        setDataSource(res);
        setLoadingDataSource(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoadingDataSource(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnFinish = (value) => {
    handleChangeIdToName(value)
    setInitialValue(value);
    const dataOutput = {
      flagMonthId: value.flagMonthId === "" ? null : value.flagMonthId,
      monthId: value.monthId === "" ? null : value.monthId,
      yearId: value.yearId === "" ? null : value.yearId,
    };

    OnSearchDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {

    const month = monthList.find((e) => e.monthId === DataList.monthId)
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    const flagMonth = flagMonthList.find((e) => e.flagMonthId === DataList.flagMonthId)
    setDataToPrint(
      {
        DataList,
        monthName: month ? month.monthNameTh : "",
        yearName: year ? year.yearNameTh : "",
        flagMonthName: flagMonth ? flagMonth.flagMonthName : "",
      })
  }

  const footerExport = [{ key: "รวม" }];

  const HeaderExport = [
    {
      name: "พนักงาน",
      key: "staffId",
      type: "customColumn",
      align: "center",
      className: "text-center",
    },
  ];

  const CustomFooterExport = (dataSource = []) => {
    let result = {};
    for (let i = 0; i < dataSource.length; i++) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(dataSource[i])) {
        if (key !== "columnName") {
          const data = {
            [`totaldiff${dataSource[i].columnName}`]: dataSource[i]
              .diff,
            [`totalcharge${dataSource[i].columnName}`]: dataSource[i]
              .charge,
          }
          result = {
            ...result,
            ...data,
          };
        }
      }
    }
    return result;
  };

  const customDataSource = (dataSource = []) => {
    let result = dataSource.map((item, index) => {
      console.log(dataSource)
      let _result = {
        staffId: item.staffId,
      };
      for (let i = 0; i < item.columnList.length; i++) {
        for (const [key, value] of Object.entries(item.columnList[i])) {
          if (key !== "columnName") {
            _result = {
              ..._result,
              [`${key}${item.columnList[i].columnName}`]: _isNull(value)
            };
          }
        }
      }
      return _result;
    });
    return result;
  };

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        // disabled: dataSource.list.length < 1,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel({
            // footer: refacterFooter(dataSource.totalColumnList,true),
            footer: refacterFooter(dataSource.totalColumnList, footerExport),
            fileName: "6.10 รายงานสถิติยอดเงินนำส่งติดลบสะสมรายบุคคล",
            dataSource: {
              list: refacterDataSource(dataSource.list, customDataSource(dataSource.list)),
              ...refacterFooterDataSource(dataSource.totalColumnList, CustomFooterExport(dataSource.totalColumnList)),
            },
            header: refacterHeader(dataSource.list, header610, Totalheader610, HeaderExport, "วันที่"),
            columnOneCell: true
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];
  
  const componentRef = useRef();
  const handlePrintLetter2 = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: ["จดหมายแจ้ง"],
  });

  return (
    <Skeleton loading={loadingDataSource} active>
      <div>
        <FormDefault
          fields={fields}
          onFinish={handleOnFinish}
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          action={action}
        />
        <div className="mt-10">
          <RenderTable
            scroll={scrollX}
            tableQuantity={renderColumns()}
            dataSource={dataSource}
            SummaryData={SummaryData}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              list: refacterDataSource(dataSource.list, customDataSource(dataSource.list)),
              ...refacterFooterDataSource(dataSource.totalColumnList, CustomFooterExport(dataSource.totalColumnList)),
            }}
            header={refacterHeader(dataSource.list, header610, Totalheader610, HeaderExport, "วันที่")}
            footer={refacterFooter(dataSource.totalColumnList, footerExport)}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 12,
              TopicText: "6.10 รายงานสถิติยอดเงินนำส่งติดลบสะสมรายบุคคล"
            }}
            oneColumnfooter={true}
            columnTotalChange={{
              staffId: "รวม"
            }}
          />
        </div>
        <div className="d-none">
          <PrintLetter className="BillPDF" ref={componentRef} data={_isEmpty(dataSourcePrintLetter)?[]:dataSourcePrintLetter} />
        </div>

      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportStatisticsTodMinusIndividual);
