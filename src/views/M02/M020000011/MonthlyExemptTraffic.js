import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import { Typography } from "antd";
import { useReactToPrint } from "react-to-print";
import Skeleton from "../../../components/loading/Loading"

import SummaryData from "./SummaryData";
import PrintReport from "../../../components/print/PrintReport";
import RenderTable from "../../../components/table";
import FormDefault from "../../../components/form/FormDefault";

import { _isEmpty, _exportFileExcel, _isNull, _setYearThai } from "../../../tools/util";
import { getPlazaListAPI } from "../../../service/api/util";
import { GET_DATA_INFO_M020000011 } from "../../../service/api/report";
import { header211 } from "../../../tools/excel/header";
import { footer211 } from "../../../tools/excel/footer";

const { Text } = Typography;
const dateFormat = "YYYY";

const MonthlyExemptTraffic = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loadingDataSource, setLoadingDataSource] = useState(false);
  const [yearTitle, setYearTitle] = useState(moment());
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
          // { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.lane,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "year",
        label: "ปี",
        childrenProps: {
          format: dateFormat,
          picker: "year",
          placeholder: "เลือกปี...",
        },
        rules: [{ required: true, message: "กรุณาเลือกปี!" }],
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.year,
      },
    },
  ];

  const renderColumns = (indColumn = null) => {
    const columnPL = {
      title: "เดือน-" + _setYearThai(yearTitle,'YYYY'),
      align: "center",
      // width: 100,
      children: [
        {
          title: "ด่าน",
          key: "plazaAbbreviation",
          dataIndex: "plazaAbbreviation",
          align: "center",
          width: 150,
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
          fixed: true,
          width: 150,
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
      title: "",
      width: 80,
      align: "center",
      children: [
        {
          title: "ยกเว้น",
          key: "trafficExemMonthly",
          dataIndex: "trafficExemMonthly",
          width: 70,
          align: "center",
          render: (text) => _isNull(text)
        },
        {
          title: "ออกซ้าย",
          key: "trafficLeftXMonthly",
          dataIndex: "trafficLeftXMonthly",
          width: 70,
          align: "center",
          render: (text) => _isNull(text)
        },
        {
          title: "ขบวน",
          key: "trafficHpmcMonthly",
          dataIndex: "trafficHpmcMonthly",
          width: 70,
          align: "center",
          render: (text) => _isNull(text)
        },
      ],
    };
    const columnTotal = {
      title: "รวม",
      align: "center",
      children: [
        {
          title: "ยกเว้น",
          key: "trafficExemMonthlyTotal",
          dataIndex: "trafficExemMonthlyTotal",
          align: "center",
          width: 90,
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
        {
          title: "ออกซ้าย",
          key: "trafficLeftXMonthlyTotal",
          dataIndex: "trafficLeftXMonthlyTotal",
          align: "center",
          width: 90,
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
        {
          title: "ขบวน",
          key: "trafficHpmcMonthlyTotal",
          dataIndex: "trafficHpmcMonthlyTotal",
          align: "center",
          width: 90,
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
      column.title = item.name;
      column.key = `trafficMonthly${item.key}`;
      column.dataIndex = `trafficMonthly${item.key}`;
      column.children = columnH.children.map((childrenItem) => {
        const chItem = { ...childrenItem };
        if (childrenItem.title === "ยกเว้น") {
          chItem.key = `trafficExemMonthly${item.key}`;
          chItem.dataIndex = `trafficExemMonthly${item.key}`;
        }
        if (childrenItem.title === "ออกซ้าย") {
          chItem.key = `trafficLeftXMonthly${item.key}`;
          chItem.dataIndex = `trafficLeftXMonthly${item.key}`;
        }
        if (childrenItem.title === "ขบวน") {
          chItem.key = `trafficHpmcMonthly${item.key}`;
          chItem.dataIndex = `trafficHpmcMonthly${item.key}`;
        }
        return chItem;
      });

      return column;
    };

    let columns1 = [
      columnPL,
      ...[
        { key: "01", name: "มกราคม" },
        { key: "02", name: "กุมภาพันธ์" },
        { key: "03", name: "มีนาคม" },
        { key: "04", name: "เมษายน" },
        { key: "05", name: "พฤษภาคม" },
        { key: "06", name: "มิถุนายน" },
      ].map(mixField),
    ];
    let columns2 = [
      columnPL,
      ...[
        { key: "07", name: "กรกฏาคม" },
        { key: "08", name: "สิงหาคม" },
        { key: "09", name: "กันยายน" },
        { key: "10", name: "ตุลาคม" },
        { key: "11", name: "พฤศจิกายน" },
        { key: "12", name: "ธันวาคม" },
      ].map(mixField),
      columnTotal,
    ];

    const columns = [columns1, columns2];

    return _isEmpty(indColumn) ? columns : columns[indColumn];
  };

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
    { name: "ปี", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.year,'YYYY') : "" },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlazaList = async () => {
    setScrollX({ x: 1400 })
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
      const res = await GET_DATA_INFO_M020000011(data, props.auth.token);
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
    const year = _setYearThai(value.year,'YYYY')
    setYearTitle(value.year);
    const dataOutput = {
      year: year-543,
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane,
    };
    getDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {

    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza)
    setDataToPrint(
      {
        DataList,
        plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      })
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["2.11 Monthly Exempt Traffic Report"],
  });

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
            fileName: "2.11 Monthly Exempt Traffic Report",
            header: header211(_setYearThai(yearTitle,'YYYY')),
            footer: footer211,
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
          action={action}
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
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
            dataSource={dataSource}
            header={header211(_setYearThai(yearTitle,'YYYY'))}
            footer={footer211}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 8,
              TopicText: "2.11 ปริมาณรถที่ยกเว้นรายเดือน"
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
)(MonthlyExemptTraffic);
