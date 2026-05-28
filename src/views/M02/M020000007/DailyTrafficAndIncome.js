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
import { GET_DATA_INFO_M020000007 } from "../../../service/api/report";
import moment from "moment";
const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const DailyTrafficAndIncome = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loadingDataSource, setLoadingDataSource] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({})
  const [scrollX, setScrollX] = useState({})

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
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.startDate,
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
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate,
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
          title: "ด่าน",
          key: "plazaAbbreviation",
          dataIndex: "plazaAbbreviation",
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
        {
          title: "ช่องทาง",
          key: "laneAbbreviation",
          dataIndex: "laneAbbreviation",
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
    const columnH = {
      title: "00",
      width: 80,
      align: "center",
      children: [
        {
          title: "ปริมาณ",
          key: "traffic",
          dataIndex: "traffic",
          width: 70,
          align: "center",
          render: (text) => _isNull(text)
        },
        {
          title: "รายได้",
          key: "revenue",
          dataIndex: "revenue",
          width: 70,
          align: "right",
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
        if (ch.title === "ปริมาณ") {
          chItem.render = (text, record) => {
            const traffic = record.columnList.find(
              (clm) => clm.columnName === item.columnName
            );
            return <span>{_isEmpty(traffic) ? null : _isNull(traffic["traffic"])}</span>;
          };
        }
        if (ch.title === "รายได้") {
          chItem.render = (text, record) => {
            const traffic = record.columnList.find(
              (clm) => clm.columnName === item.columnName
            );
            return <span>{_isEmpty(traffic) ? null : _isNull(traffic["revenue"])}</span>;
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
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,'DD/MM/YYYY') : "" },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,'DD/MM/YYYY') : "" },
  ];
  // ------- end ---------------//
  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["2.7 Daily Traffic And Income Report"],
  });
  const handlePrintFile = () => {
    handlePrint();
  };

  const getPlazaList = async () => {
    setScrollX({ x: 1300 })
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
      const res = await GET_DATA_INFO_M020000007(data, props.auth.token);
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
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane,
    };

    OnSearchDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {

    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza)
    setDataToPrint(
      {
        DataList,
        plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      })
  }


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
            fileName: "2.7 Daily Traffic And Income Report",
            dataSource: {
              list: refacterDataSource(dataSource.list),
              ...refacterFooterDataSource(dataSource.totalColumnList),
            },
            header: refacterHeader(dataSource.list, [], [], [], "วันที่"),
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
            rowPerPage={20}
            dataSource={{
              list: refacterDataSource(dataSource.list),
              ...refacterFooterDataSource(dataSource.totalColumnList),
            }}
            header={refacterHeader(dataSource.list, [], [], [], "วันที่")}
            footer={refacterFooter(dataSource.totalColumnList)}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 12,
              TopicText: "2.7 ปริมาณจราจรและรายได้รวม รายวัน"
            }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyTrafficAndIncome);
