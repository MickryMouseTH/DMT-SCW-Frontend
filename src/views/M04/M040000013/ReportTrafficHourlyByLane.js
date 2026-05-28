import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M040000013 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const ReportTrafficByPlaza = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [plazaList, setPlazaList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});

  useEffect(() => {
    // setScroll({ x: 1300 })
    setPaymentList(["MTC", "ETC"]);
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
      title: "ช่องทาง",
      fixed: true,
      key: "laneName",
      dataIndex: "laneName",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="left">
              <div className="text-left">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "1",
      key: "hour01",
      dataIndex: "hour01",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "2",
      key: "hour02",
      dataIndex: "hour02",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "3",
      key: "hour03",
      dataIndex: "hour03",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "4",
      key: "hour04",
      dataIndex: "hour04",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "5",
      key: "hour05",
      dataIndex: "hour05",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "6",
      key: "hour06",
      dataIndex: "hour06",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "7",
      key: "hour07",
      dataIndex: "hour07",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "8",
      key: "hour08",
      dataIndex: "hour08",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "9",
      key: "hour09",
      dataIndex: "hour09",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "10",
      key: "hour10",
      dataIndex: "hour10",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "11",
      key: "hour11",
      dataIndex: "hour11",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "12",
      key: "hour12",
      dataIndex: "hour12",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "13",
      key: "hour13",
      dataIndex: "hour13",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "14",
      key: "hour14",
      dataIndex: "hour14",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "15",
      key: "hour15",
      dataIndex: "hour15",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "16",
      key: "hour16",
      dataIndex: "hour16",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "17",
      key: "hour17",
      dataIndex: "hour17",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "18",
      key: "hour18",
      dataIndex: "hour18",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "19",
      key: "hour19",
      dataIndex: "hour19",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "20",
      key: "hour20",
      dataIndex: "hour20",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "21",
      key: "hour21",
      dataIndex: "hour21",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "22",
      key: "hour22",
      dataIndex: "hour22",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "23",
      key: "hour23",
      dataIndex: "hour23",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "24",
      key: "hour24",
      dataIndex: "hour24",
      width: 30,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-right">{_isNull(text)}</div>
        </Text>
      )
    },
  ];

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่..."
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
          placeholder: "เลือกวันที่..."
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
    {
      type: "select",
      option: {
        name: "plazaId",
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
        initialValue: initialValue.plazaId ? initialValue.plazaId : "ทั้งหมด",
      },
    },
    {
      type: "select",
      option: {
        name: "paymentId",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "ประเภทการชำระ",
          optionValue: {
            values: ["ทั้งหมด", ...paymentList],
            keyValue: "paymentId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทการชำระ!",
          },
        ],
        initialValue: initialValue.paymentId ? initialValue.paymentId : "ทั้งหมด",
      },
    }
  ];

  const header413 = [
    { name: "ช่องทาง", key: "laneName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "1", key: "hour01", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "2", key: "hour02", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "3", key: "hour03", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "4", key: "hour04", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "5", key: "hour05", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "6", key: "hour06", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "7", key: "hour07", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "8", key: "hour08", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "9", key: "hour09", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "10", key: "hour10", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "11", key: "hour11", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "12", key: "hour12", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "13", key: "hour13", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "14", key: "hour14", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "15", key: "hour15", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "16", key: "hour16", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "17", key: "hour17", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "18", key: "hour18", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "19", key: "hour19", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "20", key: "hour20", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "21", key: "hour21", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "22", key: "hour22", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "23", key: "hour23", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "24", key: "hour24", type: "nullColumn", align: 'center', className: 'text-right' }
  ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.13 รายงานปริมาณจารจรรายชัวโมง(แยกตาม LANE)"],
  });

  const addIndex = (res) => {

    const totalAll = {
      laneName: 'รวม',
      hour01: res.totalHour01,
      hour02: res.totalHour02,
      hour03: res.totalHour03,
      hour04: res.totalHour04,
      hour05: res.totalHour05,
      hour06: res.totalHour06,
      hour07: res.totalHour07,
      hour08: res.totalHour08,
      hour09: res.totalHour09,
      hour10: res.totalHour10,
      hour11: res.totalHour11,
      hour12: res.totalHour12,
      hour13: res.totalHour13,
      hour14: res.totalHour14,
      hour15: res.totalHour15,
      hour16: res.totalHour16,
      hour17: res.totalHour17,
      hour18: res.totalHour18,
      hour19: res.totalHour19,
      hour20: res.totalHour20,
      hour21: res.totalHour21,
      hour22: res.totalHour22,
      hour23: res.totalHour23,
      hour24: res.totalHour24
    }

    return {
      ...res,
      listExport: [...res.list, totalAll]
    }
  }

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () => {
          _exportFileExcel({
            dataSource: { list: dataSource.listExport },
            fileName: "4.13 รายงานปริมาณจารจรรายชัวโมง(แยกตาม LANE)",
            header: header413,
          });
        },
      },
    },
  ];

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
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

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M040000013(dataOutput, props.auth.token);
      console.log("res 4.13", res);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
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
    const plaza = plazaList.find((e) => e.plazaId === DataList.plazaId);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      paymentName: DataList.paymentId ? DataList.paymentId : "ทั้งหมด"
    });
    console.log("Print -> ", DataList);
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 31) {
      const dataOutput = {
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
        plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
        paymentId: value.paymentId === "ทั้งหมด" ? null : value.paymentId === "MTC" ? 1 : 2
      };
      getDataDailyTollCollction(dataOutput);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch. ",
        text: "Start date and End date out of lenght 31 days",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const headerText = [
    { name: "วันที่ดำเนินการ", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    { name: "ประเภทการชำระ", value: dataToPrint.paymentName ? dataToPrint.paymentName : "" }
  ];

  return (
    <Skeleton loading={loading} active>
      <FormDefault
        fields={fields}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
        onFinish={handleOnFinish}
        action={action}
      />
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          scroll={scroll}
          rowKey={(row, ind) => ind}
          columns={columnsOne}
          bordered
          dataSource={dataSource.list}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.list) ? false : true,
            position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"],
          }}
          summary={() => {
            return (
              <>
                <Table.Summary.Row className="bg_default">
                  <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                    รวม
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour01))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour02))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour03))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour04))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour05))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour06))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour07))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour08))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour09))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour10))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour11))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour12))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour13))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour14))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour15))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour16))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour17))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour18))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour19))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour20))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour21))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour22))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour23))}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <Text>{_isNull(Number(dataSource.totalHour24))}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataSource.listExport}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 6,
            TopicText: "4.13 รายงานปริมาณจารจรรายชัวโมง(แยกตาม LANE)"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportTrafficByPlaza);