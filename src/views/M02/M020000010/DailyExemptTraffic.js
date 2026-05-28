import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import { Typography } from "antd";
import { useReactToPrint } from "react-to-print";
import Skeleton from "../../../components/loading/Loading"

import PrintReport from "../../../components/print/PrintReport";
import SummaryData from "./SummaryData";
import RenderTable from "../../../components/table";
import FormDefault from "../../../components/form/FormDefault";
import { customColumn, customTotal } from "../../../tools/excel/header";
import {
  _isEmpty,
  _exportFileExcel,
  refacterHeader,
  refacterDataSource,
  refacterFooterDataSource,
  refacterFooter,
  _timeZoneThai,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { getPlazaListAPI } from "../../../service/api/util";
import { GET_DATA_INFO_M020000010 } from "../../../service/api/report";
import moment from "moment";
const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const DailyExemptTraffic = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loadingDataSource, setLoadingDataSource] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scrollX, setScrollX] = useState({});

  const fields = [
    {
      type: "select",
      option: {
        name: "plaza",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
            keyName: "plazaNameTh",
            keyValue: "plazaId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "lane",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.lane,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.startDate,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
  ];

  const renderColumns = (indColumn = null) => {
    const columnPL = {
      title: "วันที่",
      align: "center",
      children: [
        {
          title: "ด่าน",
          key: "plazaAbbreviation",
          dataIndex: "plazaAbbreviation",
          align: "center",
          width: 100,
          fixed: true,
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
        {
          title: "ช่องทาง",
          key: "laneAbbreviation",
          dataIndex: "laneAbbreviation",
          align: "center",
          width: 100,
          fixed: true,
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
    const columnH = {
      title: "00",
      width: 70,
      align: "center",
      children: [
        {
          title: "ยกเว้น",
          key: "trafficExem",
          dataIndex: "trafficExem",
          width: 60,
          align: "center",
          render: (text) => _isNull(Number(text)),
        },
        {
          title: "ออกซ้าย",
          key: "trafficLeftX",
          dataIndex: "trafficLeftX",
          width: 60,
          align: "center",
          render: (text) => _isNull(Number(text)),
        },
        {
          title: "ขบวน",
          key: "trafficHpmc",
          dataIndex: "trafficHpmc",
          width: 60,
          align: "center",
          render: (text) => _isNull(Number(text)),
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
        if (ch.title === "ยกเว้น") {
          chItem.render = (text, record) => {
            const traffic = record.columnList.find(
              (clm) => clm.columnName === item.columnName
            );
            return (
              <span>
                {_isEmpty(traffic)
                  ? null
                  : _isNull(Number(traffic["trafficExem"]))}
              </span>
            );
          };
        }
        if (ch.title === "ออกซ้าย") {
          chItem.render = (text, record) => {
            const traffic = record.columnList.find(
              (clm) => clm.columnName === item.columnName
            );
            return (
              // <span>{_isEmpty(traffic) ? null : _isNull(Number(traffic["trafficEmer"]))}</span>
              <span>
                {_isEmpty(traffic)
                  ? null
                  : _isNull(Number(traffic["trafficLeftX"]))}
              </span>
            );
          };
        }
        if (ch.title === "ขบวน") {
          chItem.render = (text, record) => {
            const traffic = record.columnList.find(
              (clm) => clm.columnName === item.columnName
            );
            return (
              <span>
                {_isEmpty(traffic)
                  ? null
                  : _isNull(Number(traffic["trafficHpmc"]))}
              </span>
            );
          };
        }
        if (item.columnName === "Total") delete chItem.width;
        return chItem;
      });
      return column;
    };
    const sliceColumn = (accumulator, currentValue) => {
      if (accumulator.length) {
        if (accumulator[accumulator.length - 1].length !== 6)
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
          .map((item) => [columnPL, ...item]),
      ];
    }
    return _isEmpty(indColumn) ? columns : columns[indColumn];
  };

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY")
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY")
        : "",
    },
  ];

  useEffect(() => {
    getPlazaList();
    setScrollX({ x: 1300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["2.10 Daily Exempt Traffic Report"],
  });
  const handlePrintFile = () => {
    handlePrint();
  };

  const getPlazaList = async () => {
    try {
      setLoadingDataSource(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setPlazaList(res.list);
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
      const res = await GET_DATA_INFO_M020000010(data, props.auth.token);
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
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane,
    };

    OnSearchDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const CustomFooterExport = (dataSource = []) => {
    let result = {};
    for (let i = 0; i < dataSource.length; i++) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(dataSource[i])) {
        if (key !== "columnName") {
          const data = {
              [`totaltrafficExem${dataSource[i].columnName}`]: dataSource[i]
               .trafficExem,
              [`totaltrafficLeftX${dataSource[i].columnName}`]: dataSource[i]
                .trafficLeftX,
              [`totaltrafficHpmc${dataSource[i].columnName}`]: dataSource[i]
                .trafficHpmc,
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
            footer: refacterFooter(dataSource.totalColumnList),
            fileName: "2.10 Daily Exempt Traffic Report",
            dataSource: {
              list: refacterDataSource(dataSource.list),
              ...refacterFooterDataSource(dataSource.totalColumnList, CustomFooterExport(dataSource.totalColumnList)),
            },
            header: refacterHeader(
              dataSource.list,
              customColumn,
              customTotal,
              [],
              "วันที่"
            ),
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];

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
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <RenderTable
            tableQuantity={renderColumns()}
            dataSource={dataSource}
            loading={loadingDataSource}
            SummaryData={SummaryData}
            scroll={scrollX}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            rowPerPage={20}
            dataSource={{
              list: refacterDataSource(dataSource.list),
              ...refacterFooterDataSource(dataSource.totalColumnList, CustomFooterExport(dataSource.totalColumnList)),
            }}
            header={refacterHeader(
              dataSource.list,
              customColumn,
              customTotal,
              [],
              "วันที่"
            )}
            footer={refacterFooter(dataSource.totalColumnList)}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 12,
              TopicText: "2.10 ปริมาณรถที่ยกเว้นรายวัน",
            }}
            columnPerPage={6}
          />
        </div>
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DailyExemptTraffic);
