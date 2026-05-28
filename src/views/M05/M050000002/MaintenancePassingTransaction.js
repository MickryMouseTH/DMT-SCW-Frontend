import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M050000003 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import Summary from "./summaryData";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import moment from "moment";

import { header33 } from "../../../tools/excel/header";
import { footer33 } from "../../../tools/excel/footer";
const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;

const MaintenancePassingTransaction = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scroll, setScroll] = useState({});

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
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
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
          showTime: true,
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
          showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
  ];

  const Fisrtcolumns = [
    {
      title: "ด่าน",
      dataIndex: "plazaAbbreviation",
      key: "plazaAbbreviation",
      align: "center",
      fixed: true,
      width: 25,
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
      title: "ช่องทาง",
      dataIndex: "laneAbbreviation",
      key: "laneAbbreviation",
      align: "center",
      fixed: true,
      width: 25,
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
      title: "เหตุผิดปรกติ",
      fixed: "left",
      align: "center",
      width: 100,
      children: [
        {
          title: "ผิดประเภท",
          dataIndex: "abnormalWrongType",
          key: "abnormalWrongType",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "ฝ่าด่าน",
          dataIndex: "abnormalViolation",
          key: "abnormalViolation",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "ยกเว้น",
          dataIndex: "abnormalExem",
          key: "abnormalExem",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "รถออกซ้าย",
          dataIndex: "abnormalLeftExit",
          key: "abnormalLeftExit",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "รวม",
          dataIndex: "abnormalTotal",
          key: "abnormalTotal",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
      ],
    },
    {
      title: "DIS-รถผิดประเภท",
      fixed: "left",
      align: "center",
      width: 100,
      children: [
        {
          title: "กดผิด",
          dataIndex: "disAvc",
          key: "disAvc",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "วัดผิด",
          dataIndex: "disTc",
          key: "disTc",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
      ],
    },
    {
      title: "UAP-รถฝ่านด่าน",
      fixed: "left",
      align: "center",
      width: 100,
      children: [
        {
          title: "เก็บเงินได้",
          dataIndex: "uapMoney",
          key: "uapMoney",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "เก็บเงินไม่ได้",
          dataIndex: "uapNonMoney",
          key: "uapNonMoney",
          align: "center",
          width: 30,
          render: (text) =>
            _isNull(text)
        },
      ],
    },
    {
      title: "EXEM-รถยกเว้น",
      fixed: "left",
      align: "center",
      width: 100,
      children: [
        {
          title: "เข้าเกณฑ์",
          dataIndex: "exemQualify",
          key: "exemQualify",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "ไม่เข้าเกณฑ์",
          dataIndex: "exemNonQualify",
          key: "exemNonQualify",
          align: "center",
          width: 30,
          render: (text) =>
            _isNull(text)
        },
      ],
    },
    {
      title: "LEFTX-รถออกซ้าย",
      fixed: "left",
      align: "center",
      width: 100,
      children: [
        {
          title: "เข้าเกณฑ์",
          dataIndex: "leftExitQualify",
          key: "leftExitQualify",
          align: "center",
          width: 25,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "ไม่เข้าเกณฑ์",
          dataIndex: "leftExitNonQualify",
          key: "leftExitNonQualify",
          align: "center",
          width: 30,
          render: (text) =>
            _isNull(text)
        },
      ],
    },
    {
      title: "ไม่ยืนยัน NonAdj.",
      dataIndex: "nonAdjust",
      key: "nonAdjust",
      align: "center",
      width: 25,
      render: (text) =>
        _isNull(text)
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,dateFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,dateFormat)
        : "",
    },
  ];

  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        plaza: props.location.value.plaza,
        lane: props.location.value.lane,
      };
      setCurrentPage(props.location.currentPage);
      setDataToPrint(props.location.dataToPrint);
      getDataInfo(dataOutput);
    }
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setsPlazaList(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M050000003(data, props.auth.token);
      if (res.status.code === "S200") {
        setDataSource(res);
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
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
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: parseInt(value.lane),
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
    };
    getDataInfo(dataOutput);
  };

  const handleOnDetail = async (data, rowIndex) => {
    const sendItem = {
      auth: props.auth,
      laneId: data.laneId,
      plazaId: data.plazaId,
      startDate: _timeZoneThai(initialValue.startDate),
      endDate: _timeZoneThai(initialValue.endDate),
    };
    try {
      await props.history.push({
        pathname: `/reports/violation-summary-reports/${rowIndex}`,
        state: { ...sendItem },
        value: initialValue,
        dataToPrint: dataToPrint,
        currentPage: currentPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["5.3 Maintenance Passing Transaction"]
  });

  const mergeArrayObject = (arr1 = [], arr2 = []) => {
    return arr1.map((item, index) => {
      return { ...arr2[index], ...item };
    });
  };

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const sumFooter = (dataSourceList) => {
    let result = {};
    const sum = (pre, current) => {
      return pre || pre === 0 || pre === false ? (pre += current) : current;
    };
    dataSourceList.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        result = {
          ...result,
          [`total${key}`]: sum(result[`total${key}`], value),
        };
      }
    });
    return { ...dataSource, ...result };
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
            dataSource: {
              ...sumFooter(dataSource.list),
              list: mergeArrayObject(dataSource.list),
            },
            fileName: "5.3 Maintenance Passing Transaction",
            header: header33,
            footer: footer33,
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          fields={fields}
          onFinish={handleOnFinish}
          action={action}
        />
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            className="Row-click-to-Detail"
            rowKey={(row, ind) => ind}
            scroll={Fisrtcolumns.length > 12 ? scroll : false}
            columns={Fisrtcolumns}
            bordered
            dataSource={dataSource.list}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={Summary}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  handleOnDetail(record, rowIndex);
                },
              };
            }}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              ...sumFooter(dataSource.list),
              list: mergeArrayObject(dataSource.list),
            }}
            header={header33}
            propsClass="text-right"
            typeChild="nullColumn"
            propsHeader={{
              colSpan: 12,
              position: "d-flex justify-content-start",
              headerText,
              TopicText: "5.3 รายการผ่านทางโหมดบำรุงรักษา",
            }}
            totolTablePdfClass=""
            footer={footer33}
            columnPerPage={16}
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
)(MaintenancePassingTransaction);
