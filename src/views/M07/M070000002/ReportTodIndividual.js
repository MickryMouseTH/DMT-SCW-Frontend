/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
// import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Typography} from "antd";
import Skeleton from "../../../components/loading/Loading"

import {
  _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M070000001 } from "../../../service/api/report";
import { getPlazaListAPI, getShiftList_API } from "../../../service/api/util";
import moment from "moment";
import { header72 } from "../../../tools/excel/header";
// import { footer71 } from "../../../tools/excel/footer";
// import SummaryData from "./SummaryData";

// import { exportExcelJs } from "../../../tools/exceljs";
import { PrintReport } from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const TODReports = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scroll, setScroll] = useState({});
  const [shiftList, setShiftList] = useState([]);

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
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "ป้อนรหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนรหัสพนักงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.staffId,
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
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        // initialValue: initialValue.startDate,
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
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        // initialValue: initialValue.endDate,
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : // ? moment('00:00:00','HH:mm:ss')
          initialValue.endDate,
      },
    },
    {
      type: "select",
      option: {
        name: "shiftId",
        label: "ผลัด",
        childrenProps: {
          placeholder: "เลือกผลัด...",
          optionValue: {
            values: ["ทั้งหมด", ...shiftList],
            keyName: "abbreviation",
            keyValue: "shiftId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกผลัด!",
          },
        ],
        initialValue: initialValue.shiftId ? initialValue.shiftId : "ทั้งหมด",
      },
    },
  ];

  const columns = [
    {
      title: "ด่าน",
      // fixed: "left",
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      width: 70,
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
    {
      title: "วันที่ของรายได้",
      key: "operationalDate",
      dataIndex: "operationalDate",
      width: 100,
      align: "center",
      render: (text) =>
        _isEmpty(text)
          ? ""
          : _setYearThai(text,"DD/MM/YYYY"),
    },
    {
      title: "กะ",
      key: "shiftTypeName",
      dataIndex: "shiftTypeName",
      width: 50,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "นำส่งครั้งที่",
      key: "declareNo",
      dataIndex: "declareNo",
      width: 90,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "วันเวลาเริ่มปฏิบัติงาน",
      key: "bojDateTime",
      dataIndex: "bojDateTime",
      width: 150,
      align: "center",
      render: (date) =>
        _isEmpty(date)
          ? ""
          : _setYearThai(date,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "วันเวลาเลิกปฏิบัติงาน",
      key: "eojDateTime",
      dataIndex: "eojDateTime",
      width: 150,
      align: "center",
      render: (date) =>
        _isEmpty(date)
          ? ""
          : _setYearThai(date,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Job no.",
      key: "jobNo",
      dataIndex: "jobNo",
      width: 150,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "วันเวลาที่ส่งเงิน",
      key: "declareDateTime",
      dataIndex: "declareDateTime",
      width: 150,
      align: "center",
      render: (date) =>
        _isEmpty(date)
          ? ""
          : _setYearThai(date,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "รหัสพนักงาน",
      key: "staffId",
      dataIndex: "staffId",
      width: 100,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ชื่อพนักงาน",
      key: "staffNameTh",
      dataIndex: "staffNameTh",
      width: 200,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ถุงเงิน",
      key: "moneyBagNo",
      dataIndex: "moneyBagNo",
      width: 70,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ประเภทการนำส่ง",
      fixed: "right",
      key: "declareType",
      dataIndex: "declareType",
      width: 150,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ยอดคำนวณได้",
      fixed: "right",
      key: "totalAmount ",
      dataIndex: "totalAmount",
      width: 100,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ยอดนำส่ง",
      fixed: "right",
      key: "declareAmount",
      dataIndex: "declareAmount",
      width: 90,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ส่งขาด/ส่งเกิน",
      fixed: "right",
      key: " differentAmount",
      dataIndex: "differentAmount",
      width: 120,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "รวม",
      fixed: "right",
      key: " totalofType",
      dataIndex: "totalofType",
      width: 100,
      align: "center",
      render: (text) => _isNull(text),
    },
  ];

  const columnsTotal = [
    {
      title: "รวมทั้งหมด",
      align: "center",
      children: [
        {
          title: "ประเภทการนำส่ง",
          key: "declareType",
          dataIndex: "declareType",
          width: 120,
          align: "center",
          render: (text) => _isNull(text),
        },
        {
          title: "ยอดคำนวณได้",
          key: "totalAmount ",
          dataIndex: "totalAmount",
          width: 100,
          align: "center",
          render: (text) => _isNull(text),
        },
        {
          title: "ยอดนำส่ง",
          key: "declareAmount",
          dataIndex: "declareAmount",
          width: 90,
          align: "center",
          render: (text) => _isNull(text),
        },
        {
          title: "ส่งขาด/ส่งเกิน",
          key: " differentAmount",
          dataIndex: "differentAmount",
          width: 120,
          align: "center",
          render: (text) => _isNull(text),
        },
      ],
    },
  ];

  // const headerText = [
  //   { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
  //   {
  //     name: "รหัสพนักงาน",
  //     value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
  //   },
  //   {
  //     name: "ผลัด",
  //     value: dataToPrint.shiftName ? dataToPrint.shiftName : "",
  //   },
  //   {
  //     name: "จากวันที่",
  //     value: dataToPrint.DataList
  //       ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY")
  //       : "",
  //   },
  //   {
  //     name: "ถึงวันที่",
  //     value: dataToPrint.DataList
  //       ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY")
  //       : "",
  //   },
  // ];

  useEffect(() => {
    getPlazaList();
    getShiftList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addIndex = (res) => {

    const list = res.list.map((item, index) => {
      return {
        ...item,
        index: index + 1,
        differentAmount:
          item.declareType === "ขายคูปอง"
            ? 0
            : item.declareAmount -
            (item.declareType === "ขายคูปอง" ? 0 : item.totalAmount),
        totalofType:
          item.totalAmount +
          item.declareAmount +
          (item.declareType === "ขายคูปอง"
            ? 0
            : item.declareAmount -
            (item.declareType === "ขายคูปอง" ? 0 : item.totalAmount)),
      };
    });

    const listExport = res.totalList.map((item, index) => {
      return {
        // ...item,
        plazaAbbreviation: item.declareType,
        operationalDate: item.totalAmount,
        shiftTypeName: item.declareAmount,
        declareNo: item.differentAmount,
      };
    });

    let totalAmountSum = 0;
    let totalDeclareAmount = 0;
    let totalDifferentAmount = 0;

    res.totalList.forEach(({ totalAmount, declareAmount, differentAmount }) => {
      totalAmountSum += totalAmount;
      totalDeclareAmount += declareAmount;
      totalDifferentAmount += differentAmount;
    });


    const dataListExcel = [...list, {
      declareType: 'รวม',
      totalAmount: totalAmountSum,
      declareAmount: totalDeclareAmount,
      differentAmount: totalDeclareAmount - totalAmountSum,
      totalofType: totalAmountSum + totalDeclareAmount + (totalDeclareAmount - totalAmountSum)
    }, {}, {},
    { plazaAbbreviation: 'รวมทั้งหมด' },
    {
      plazaAbbreviation: 'ประเภทการนำส่ง',
      operationalDate: 'ยอดคำนวณได้',
      shiftTypeName: 'ยอดนำส่ง',
      declareNo: 'ส่งขาด/ส่งเกิน'
    },
    ...listExport
    ];

    console.log("dataListExcel", dataListExcel)
    console.log(" list", list)

    return {
      ...res,
      // list: list,
      list: [...list, {

        declareType: 'รวม',
        totalAmount: totalAmountSum,
        declareAmount: totalDeclareAmount,
        differentAmount: totalDeclareAmount - totalAmountSum,
        totalofType: totalAmountSum + totalDeclareAmount + (totalDeclareAmount - totalAmountSum)
      }],
      listExport: dataListExcel,
      totalAmountSum: totalAmountSum,
      totalDeclareAmount: totalDeclareAmount,
      totalDifferentAmount: totalDifferentAmount,
      allTotal: totalAmountSum + totalDeclareAmount + totalDifferentAmount,
    };
  };

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setPlazaList(res.list);
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

  const getShiftList = async () => {
    setScroll({ x: 1500 });
    try {
      setLoading(true);
      const res = await getShiftList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setShiftList(res.list);
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
      const res = await GET_DATA_INFO_M070000001(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
        console.log("res 7.2", addIndex(res));
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

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    const shift = shiftList.find((e) => e.shiftId === DataList.shiftId);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      shiftName: shift ? shift.abbreviation : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
      shiftTypeId: value.shiftId === "ทั้งหมด" ? null : value.shiftId,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.2 Individual submission reports"],
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
          // exportExcelJs({
          //   reportType: "72",
          //   data: {list: dataSource.listExport},
          //   fileName: "7.2 Individual submission reports"
          // }),
          _exportFileExcel({
            dataSource: { list: dataSource.listExport },
            fileName: "7.2 Individual submission reports",
            header: header72,
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
            rowKey={(row, ind) => ind}
            scroll={columns.length > 12 ? scroll : false}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list)
                ? false
                : ["topRight", "bottomRight"],
            }}
          // summary={SummaryData}
          />
        </div>
        <div className="mt-10 mb-10">
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={false}
            columns={columnsTotal}
            bordered
            dataSource={dataSource.totalList}
            pagination={false}
          />
        </div>
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          totalCoulumn={columnsTotal}
          dataTotalTale={dataSource.totalList}
          data={dataSource}
          reportType='72'
          reportTitle='7.2 รายงานนำส่งรายบุคคล'
          columnsLength={16}
          additionTitle={[
            { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
            {
              name: "รหัสพนักงาน",
              value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
            },
            {
              name: "ผลัด",
              value: dataToPrint.shiftName ? dataToPrint.shiftName : "",
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
          ]}
        />
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TODReports);
