import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { Typography, Tabs, Radio } from "antd";
import { useReactToPrint } from "react-to-print";

import Skeleton from "../../../components/loading/Loading"

import PrintReport from "../../../components/print/PrintReport";
import SummaryData from "./_SummaryData";
import Render24Table from "../../../components/table/Render24Table";
import FormDefault from "../../../components/form/FormDefault";

import {
  _isEmpty,
  _exportFileExcel25,
  _timeZoneThai,
  _isNull,
  _setYearThai
} from "../../../tools/util";
import { getPlazaListAPI } from "../../../service/api/util";
import { GET_DATA_INFO_M020000005 } from "../../../service/api/report";
import { createHeader25 } from "../../../tools/excel/header";
import { createFooter25 } from "../../../tools/excel/footer";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";
const { TabPane } = Tabs;

const { Text } = Typography;
const MonthlyTrafficeRevenue = (props) => {
  const [mode, setMode] = useState("");
  const [dataSource, setDataSource] = useState({ hourList: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loadingDataSource, setLoadingDataSource] = useState(false);
  const [countTable, setCountTable] = useState(0);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scrollX, setScrollX] = useState({})
  const [currentTab, setCurrentTab] = useState(0)

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setMode(mode);
  };

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
        childrenProps: { format: dateFormat, placeholder: "เลือกวันที่..." },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment(new Date(), 'DD/MM/YYYY') : initialValue.date,
      },
    },
    {
      type: "timePicker",
      option: {
        name: "hour",
        label: "ชั่วโมง",
        childrenProps: { placeholder: "เลือกเวลา...", format: "HH" },
        rules: [{ required: false, message: "กรุณาเลือกเวลา(ชั่วโมง)!" }],
        initialValue: initialValue.hour ? initialValue.hour : '',
      },
    },
  ];

  const renderColumns = (indColumn = null) => {
    const columnPL = {
      title: "ด่าน",
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      align: "center",
      fixed: true,
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
    };

    const columnL = {
      title: "ช่องทาง",
      fixed: true,
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
    };

    const columnH = {
      title: "ปริมาณ",
      key: "totalMinute00",
      dataIndex: "totalMinute00",
      width: 70,
      align: "center",
      render: (text) => _isNull(text),
    };

    const columnTotal = {
      title: "รวม",
      align: "center",
      key: "minuteTotal",
      dataIndex: "minuteTotal",
      width: 70,
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
    };

    const mixField = (item) => {
      let column = { ...columnH };
      column.title = item;
      column.key = `minute${item}`;
      column.dataIndex = `minute${item}`;

      return column;
    };

    let columns1 = [
      columnPL,
      columnL,
      ...["00", "05", "10", "15", "20", "25"].map(mixField),
    ];
    let columns2 = [
      columnPL,
      columnL,
      ...["30", "35", "40", "45", "50", "55"].map(mixField),
      columnTotal,
    ];
    const columns = [columns1, columns2];
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
        ? _setYearThai(dataToPrint.DataList.date,dateFormat)
        : "",
    },
    {
      name: "ชั่วโมง",
      value: dataToPrint.DataList && dataToPrint.DataList.hour
        ? moment(dataToPrint.DataList.hour).format("HH")
        : "",
    },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setScrollX({ x: 1300 })
    try {
      setLoadingDataSource(true);
      const res = await GET_DATA_INFO_M020000005(data, props.auth.token);
      if (res.status.code === "S200") {
        setMode("top");
        setDataSource(res);
        setCountTable(parseInt(res.hourList.length));
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
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["2.5 Five Minutes Traffic Report"],
  });
  const handlePrintFile = () => {
    handlePrint();
  };
  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    if (value.hour) {
      const dataOutput = {
        plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
        date: _timeZoneThai(value.date, "day"),
        hour: value.hour?Number(moment(value.hour).format("HH")):'',
        laneId: value.lane,
      };
      setCurrentTab(dataOutput.hour)
      getDataInfo(dataOutput);
    } else {
      const dataOutput = {
        plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
        date: _timeZoneThai(value.date, "day"),
        laneId: value.lane,
        hour: null
      };

      getDataInfo(dataOutput);
    }

  };

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const _findMaxLength = (hourList) => {
    let max = hourList[0]
    hourList.forEach((item) => {
      if (item.list.length > max.list.length) {
        max = item
      }
    })
    return max
  }

  const refacter25DataSource = (hourList) => {
    let result = { list: [] };
    const baseArr = _findMaxLength(hourList)
    baseArr.list.forEach((item, index) => {
      let resultObject = {};
      for (let i = 0; i < hourList.length; i++) {
        resultObject = {
          ...resultObject,
          [`${i}minute00`]: _tryConvert(hourList[i], index, 'minute00'),
          [`${i}minute05`]: _tryConvert(hourList[i], index, 'minute05'),
          [`${i}minute10`]: _tryConvert(hourList[i], index, 'minute10'),
          [`${i}minute15`]: _tryConvert(hourList[i], index, 'minute15'),
          [`${i}minute20`]: _tryConvert(hourList[i], index, 'minute20'),
          [`${i}minute25`]: _tryConvert(hourList[i], index, 'minute25'),
          [`${i}minute30`]: _tryConvert(hourList[i], index, 'minute30'),
          [`${i}minute35`]: _tryConvert(hourList[i], index, 'minute35'),
          [`${i}minute40`]: _tryConvert(hourList[i], index, 'minute40'),
          [`${i}minute45`]: _tryConvert(hourList[i], index, 'minute45'),
          [`${i}minute50`]: _tryConvert(hourList[i], index, 'minute50'),
          [`${i}minute55`]: _tryConvert(hourList[i], index, 'minute55'),
          [`${i}minuteTotal`]: _tryConvert(hourList[i], index, 'minuteTotal'),
          laneAbbreviation: item.laneAbbreviation,
          plazaAbbreviation: item.plazaAbbreviation,
        };

        result = {
          ...result,
          [`${i}totalMinute00`]: hourList[i].totalMinute00,
          [`${i}totalMinute05`]: hourList[i].totalMinute05,
          [`${i}totalMinute10`]: hourList[i].totalMinute10,
          [`${i}totalMinute15`]: hourList[i].totalMinute15,
          [`${i}totalMinute20`]: hourList[i].totalMinute20,
          [`${i}totalMinute25`]: hourList[i].totalMinute25,
          [`${i}totalMinute30`]: hourList[i].totalMinute30,
          [`${i}totalMinute35`]: hourList[i].totalMinute35,
          [`${i}totalMinute40`]: hourList[i].totalMinute40,
          [`${i}totalMinute45`]: hourList[i].totalMinute45,
          [`${i}totalMinute50`]: hourList[i].totalMinute50,
          [`${i}totalMinute55`]: hourList[i].totalMinute55,
          [`${i}totalMinuteTotal`]: hourList[i].totalMinuteTotal,
        };
      }
      result.list.push(resultObject);
    });
    // }
    return result;
  };

  const _tryConvert = (value, index, key) => {
    try {
      if (value.list[index][key] || value.list[index][key] === 0) {
        return value.list[index][key]
      }
      return ""
    } catch (error) {
      return ""
    }
  }

  const _header25 = (hourList) => {
    let result = [
      {
        name: '',
        key: '',
        children: [
          { name: 'ด่าน', key: 'plazaAbbreviation', type: "customColumn", align: 'center', className: 'text-center' },
          { name: 'ช่องทาง', key: 'laneAbbreviation', align: 'center', className: 'text-center' },
        ],
      },
    ];

    for (let i = 0; i < 24; i++) {
      if (hourList[i].list.length) {
        result = [
          ...result,
          {
            name: `ชั่วโมงที่-${i}`,
            key: '',
            children: [
              { name: '00', key: `${i}minute00`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '05', key: `${i}minute05`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '10', key: `${i}minute10`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '15', key: `${i}minute15`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '20', key: `${i}minute20`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '25', key: `${i}minute25`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '30', key: `${i}minute30`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '35', key: `${i}minute35`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '40', key: `${i}minute40`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '45', key: `${i}minute45`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '50', key: `${i}minute50`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: '55', key: `${i}minute55`, type: "nullColumn", align: 'center', className: 'text-center' },
              { name: 'รวม', key: `${i}minuteTotal`, type: "nullColumn", align: 'center', className: 'text-center' },
            ],
          },
        ];
      }
    }
    return result
  }

  const _footer = (hourList) => {
    const defaultKey = [
      "totalMinute00",
      "totalMinute05",
      "totalMinute10",
      "totalMinute15",
      "totalMinute20",
      "totalMinute25",
      "totalMinute30",
      "totalMinute35",
      "totalMinute40",
      "totalMinute45",
      "totalMinute50",
      "totalMinute55",
      "totalMinuteTotal",
    ];
    let result = [{ key: "รวม" }, { key: "รวม" }];
    for (let i = 0; i < 24; i++) {
      if (hourList[i].list.length) {
        defaultKey.forEach((item, index) => {
          result.push({ key: `${i}${item}`, type: "nullColumn" });
        });
      }
    }
    return result;
  }


  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        disabled: dataSource.hourList.length < 1,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel25({
            dataSource: dataSource.hourList,
            fileName: "2.5 Five Minutes Traffic Report",
            header: createHeader25(),
            footer: createFooter25(),
          }),
        disabled: dataSource.hourList.length < 1,
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
        {dataSource.hourList.length < 1 ? (
          <div className="mt-10">
            <Render24Table
              tableQuantity={renderColumns()}
              dataSource={dataSource.hourList}
              // loading={loadingDataSource}
              SummaryData={SummaryData}
            />
          </div>
        ) : (
            <Radio.Group
              className="mt-10"
              onChange={handleModeChange}
              value={mode}
              style={{ marginBottom: 8 }}
            >
              <Radio.Button value="top">เเนวนอน</Radio.Button>
              <Radio.Button value="left">เเนวตั้ง</Radio.Button>
            </Radio.Group>
          )}
        <Tabs
          defaultActiveKey={currentTab.toString()}
          tabPosition={mode}
          style={
            mode === "top"
              ? { height: 650 }
              : mode === "left"
                ? { height: 600 }
                : { height: "auto" }
          }
        >
          {[...Array(countTable).keys()].map((i) => (
            <TabPane tab={`ชั่วโมงที่-${i}`} key={i}>
              <div style={{ marginTop: "12px" }}>
                <Render24Table
                  tableQuantity={renderColumns()}
                  dataSource={dataSource.hourList[i]}
                  scroll={scrollX}
                  // loading={loadingDataSource}
                  SummaryData={SummaryData}
                />
              </div>
              <div className="d-none">
                <PrintReport
                  ref={printReportRef}
                  dataSource={refacter25DataSource(dataSource.hourList)}
                  header={_header25(dataSource.hourList)}
                  footer={_footer(dataSource.hourList)}
                  propsClass="text-right"
                  columnPerPage={1}
                  rowPerPage={20}
                  fixedLoop={24}
                  propsHeader={{
                    headerText,
                    position: "d-flex justify-content-start",
                    colSpan: 12,
                    TopicText: "2.5 ปริมาณจราจรราย 5 นาที",
                  }}
                />
              </div>
            </TabPane>
          ))}
        </Tabs>
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
)(MonthlyTrafficeRevenue);
