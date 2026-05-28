/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Typography, Button } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M030000007 } from "../../../service/api/report";
import { getPlazaListAPI, getShiftList_API } from "../../../service/api/util";
import moment from "moment";
import { header37 } from "../../../tools/excel/header";
import { footer37 } from "../../../tools/excel/footer";

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
  const [shiftList, setShiftList] = useState([])

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
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        // initialValue: initialValue.date,
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.date,
      },
    },
    {
      type: "select",
      option: {
        name: "shiftId",
        label: "รหัสกะ",
        childrenProps: {
          placeholder: "เลือกรหัสกะ...",
          optionValue: {
            values: ["ทั้งหมด", ...shiftList],
            keyName: "abbreviation",
            keyValue: "shiftId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกรหัสกะ!",
          },
        ],
        initialValue: initialValue.shiftId ? initialValue.shiftId : "ทั้งหมด",
      },
    },
  ];

  const columns = [
    {
      title: "ช่องทาง",
      dataIndex: "laneAbbreviation",
      key: "laneAbbreviation",
      align: "center",
      fixed: true,
      width: 100,
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
      title: "วันที่-เวลา",
      key: "trxDateTime",
      dataIndex: "trxDateTime",
      width: 150,
      align: "center",
      render: (text) => _isEmpty(text) ? "" : _setYearThai(text, "DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "กะ",
      key: "shift",
      dataIndex: "shift",
      width: 50,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "จำนวนเหตุการณ์",
      fixed: "left",
      align: "center",
      children: [
        {
          title: "รถยกเว้น-เข้าเกณท์",
          dataIndex: "trxExceptQualify",
          key: "trxExceptQualify",
          align: "center",
          width: 150,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "รถยกเว้น-ไม่เข้าเกณท์",
          dataIndex: "trxExceptNotQualify",
          key: "trxExceptNotQualify",
          align: "center",
          width: 150,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "ฝ่าด่าน-เก็บเงินได้",
          dataIndex: "trxVioPayment",
          key: "trxVioPayment",
          align: "center",
          width: 150,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "ฝ่าด่าน-เก็บเงินไม่ได้",
          dataIndex: "trxVioNotPayment",
          key: "trxVioNotPayment",
          align: "center",
          width: 150,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "รถออกซ้าย-เข้าเกณท์",
          dataIndex: "trxExiteLeftQualify",
          key: "trxExiteLeftQualify",
          align: "center",
          width: 150,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "รถออกซ้าย-ไม่เข้าเกณท์",
          dataIndex: "trxExiteLeftNotQualify",
          key: "trxExiteLeftNotQualify",
          align: "center",
          width: 150,
          render: (text) =>
            _isNull(text)
        },
      ],
    },
    {
      title: "รวม",
      dataIndex: "trxTotal",
      key: "trxTotal",
      align: "center",
      width: 150,
      render: (text) =>
        _isNull(text)
    },
    {
      title: "รหัสพนักงาน",
      key: "staffId",
      dataIndex: "staffId",
      width: 120,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ชื่อพนักงาน",
      key: "staffName",
      dataIndex: "staffName",
      width: 120,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ใบบันทึก",
      fixed: "right",
      key: "descript",
      dataIndex: "descript",
      width: 150,
      align: "center",
      render: (text, record) => (
        _isEmpty(record.seckey) ? "" : <Button type="primary" size="small" onClick={() => handleDetail(record)}>รายละเอียด</Button>
      ),
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
    {
      name: "รหัสกะ",
      value: dataToPrint.shiftName ? dataToPrint.shiftName : "",
    },
    {
      name: "วันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.date, "DD/MM/YYYY")
        : "",
    },

  ];

  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        date: _timeZoneThai(props.location.value.date),
        plazaId:
          props.location.value.plaza === "ทั้งหมด"
            ? null
            : props.location.value.plaza,
        laneId: _isEmpty(props.location.value.lane)
          ? null
          : props.location.value.lane,
        shiftId:
          props.location.value.shiftId === "ทั้งหมด"
            ? null
            : props.location.value.shiftId,
        staffId: _isEmpty(props.location.value.staffId)
          ? null
          : props.location.value.staffId,
      };
      setCurrentPage(props.location.currentPage);
      getDataInfo(dataOutput);
      setDataToPrint(props.location.dataToPrint);
    }

    getPlazaList();
    getShiftList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetail = async (item) => {
    if (item.seckey) {
      const sendItem = {
        item: item.seckey,
        auth: props.auth,
      };
      try {
        await props.history.push({
          // pathname: `/reports/tod-reports/reportdetail/${item.index}`,
          pathname: `/reports/event-by-staff-lane-shift/reportdetail`,
          state: { ...sendItem },
          value: initialValue,
          currentPage: currentPage,
          dataToPrint: dataToPrint,
        });
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
          setLoading(false);
        }
      });
    }
  };
  // const _shift = {
  //   "SHIFT 1": "เช้า",
  //   "SHIFT 2": "บ่าย",
  //   "SHIFT 3": "เย็น",
  // }

  // const addIndex = (res) => {
  //   const list = res.list.map((item, index) => {
  //     // return {...item,index:index + 1,differentAmount: item.declareAmount - item.totalAmount
  //     return {
  //       ...item, shiftTypeTh: _shift[item.shiftTypeName] ? _shift[item.shiftTypeName] : ""
  //     }
  //   })
  //   return { ...res, list: list }
  // }

  const getPlazaList = async () => {
    setScroll({ x: 1500 });
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
      const res = await GET_DATA_INFO_M030000007(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res)
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
      date: _timeZoneThai(value.date),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: _isEmpty(value.lane) ? null : value.lane,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
      shiftId: value.shiftId === "ทั้งหมด" ? null : value.shiftId,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.7 Event By Staff Lane Shift Report"],
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
            dataSource: {
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            },
            fileName: "3.7 Event By Staff Lane Shift Report",
            header: header37,
            footer: footer37,
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
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      <Text type="secondary" align="center">
                        {dataSource.list.length}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left">
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={{
            ...dataSource,
            rows: "rows",
            count: _isNull(Number(dataSource.list.length)),
          }}
          header={header37}
          footer={footer37}
          propsHeader={{
            position: "d-flex justify-content-center",
            colSpan: 8,
            headerText,
            TopicText: "3.7 ใบบันทึกเหตุการณ์ แยกตามพนักงาน-ช่องทาง-กะ",
          }}
          propsClass="print-border-footer"
          columnPerPage={header37.length}
          columnTotalChange={{
            trxDateTime: "รวม"
          }}
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
