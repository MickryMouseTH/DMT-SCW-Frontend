import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { Typography } from "antd";
import Skeleton from "../../../components/loading/Loading"

import SummaryData from "./_SummaryData";
import RenderTable from "../../../components/table";
import FormDefault from "../../../components/form/FormDefault";

import {
  _isEmpty,
  _exportFileExcel,
  _timeZoneThai,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { getPlazaListAPI } from "../../../service/api/util";
import { GET_DATA_INFO_M020000006 } from "../../../service/api/report";
import { header26 } from "../../../tools/excel/header";
import { footer26 } from "../../../tools/excel/footer";
import moment from "moment";
const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const MonthlyTrafficAndIncome = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loadingDataSource, setLoadingDataSource] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});

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
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
      },
    },
  ];

  const renderColumns = (indColumn = null) => {
    const columnPL = {
      title: "ชั่วโมง",
      align: "center",
      children: [
        {
          title: "ด่าน",
          key: "plazaAbbreviation",
          dataIndex: "plazaAbbreviation",
          align: "center",
          width: 50,
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
          width: 50,
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
      align: "center",
      children: [
        {
          title: "ปริมาณ",
          key: "trafficHourly00",
          dataIndex: "trafficHourly00",
          width: 70,
          align: "center",
          render: (text) => _isNull(text),
        },
      ],
    };
    const columnTotal = {
      title: "รวม",
      align: "center",
      children: [
        {
          title: "ปริมาณ",
          key: "trafficHourlyTotal",
          dataIndex: "trafficHourlyTotal",
          width: 50,
          align: "center",
          render(text, record) {
            return {
              props: {
                className: "secondary bg_default",
              },
              children: (
                <Text type="secondary" align="center">
                  {_isNull(text)}
                </Text>
              ),
            };
          },
        },
      ],
    };

    const mixField = (item) => {
      let column = { ...columnH };
      column.title = item;
      column.key = `trafficHourly${item}`;
      column.dataIndex = `trafficHourly${item}`;
      column.children = columnH.children.map((ch) => {
        const chItem = { ...ch };
        if (ch.title === "ปริมาณ") {
          chItem.key = `trafficHourly${item}`;
          chItem.dataIndex = `trafficHourly${item}`;
        }
        return chItem;
      });

      return column;
    };

    let columns1 = [
      columnPL,
      ...["00", "01", "02", "03", "04", "05", "06"].map(mixField),
    ];
    let columns2 = [
      columnPL,
      ...["07", "08", "09", "10", "11", "12", "13"].map(mixField),
    ];
    let columns3 = [
      columnPL,
      ...["14", "15", "16", "17", "18", "19", "20"].map(mixField),
    ];
    let columns4 = [columnPL, ...["21", "22", "23"].map(mixField), columnTotal];
    const columns = [columns1, columns2, columns3, columns4];

    return _isEmpty(indColumn) ? columns : columns[indColumn];
  };

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "วันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.date,"DD/MM/YYYY")
        : "",
    },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePrintFile = () => {
    handlePrint();
  };
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["2.6 Hourly Traffic Report"],
  });

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

  const getDataInfo = async (data = null) => {
    try {
      setLoadingDataSource(true);
      const res = await GET_DATA_INFO_M020000006(data, props.auth.token);
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
      date: _timeZoneThai(value.date),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane,
    };

    getDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
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
            dataSource: dataSource,
            fileName: "2.6 Hourly Traffic Report",
            header: header26,
            footer: footer26,
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
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          onFinish={handleOnFinish}
          action={action}
        />
        <div className="mt-10">
          <RenderTable
            tableQuantity={renderColumns()}
            dataSource={dataSource}
            loading={loadingDataSource}
            SummaryData={SummaryData}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={dataSource}
            header={header26}
            footer={footer26}
            columnPerPage={13}
            rowPerPage={20}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 8,
              TopicText: "2.6 ปริมาณจราจรรายชั่วโมง",
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
)(MonthlyTrafficAndIncome);
