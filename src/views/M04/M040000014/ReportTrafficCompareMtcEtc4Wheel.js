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

import { GET_DATA_INFO_M040000014_PAGE1 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const ReportTrafficCompareMtcEtc4Wheel = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [tsbList, setTsbList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});

  useEffect(() => {
    // setScroll({ x: 1300 })
    if (props.location.value) {
      setInitialValue(props.location.value);      
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        tsbId: props.location.value.tsbId === "ทั้งหมด" ? null : props.location.value.tsbId,
      }
      getDataInfo(dataOutput);
    }
    getTSBList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: <b>วันที่</b>,
      fixed: true,
      key: "date",
      dataIndex: "date",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-center" style={{ cursor: "pointer" }}
                onClick={() => handleDetail(record)}>{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: <b>จำนวนรายการ (เที่ยว)</b>,
      key: "",
      align: 'center',
      children: [
        {
          title: <b>MTC</b>,
          key: "trafficMtc",
          dataIndex: "trafficMtc",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div>
        },
        {
          title: <b>ETC</b>,
          key: "trafficEtc",
          dataIndex: "trafficEtc",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
        {
          title: <b>รวม</b>,
          key: "trafficTotal",
          dataIndex: "trafficTotal",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
      ],
    },
    {
      title: <b>% การใช้</b>,
      key: "",
      align: 'center',
      children: [
        {
          title: <b>MTC</b>,
          key: "percentMtc",
          dataIndex: "percentMtc",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div>
        },
        {
          title: <b>ETC</b>,
          key: "percentEtc",
          dataIndex: "percentEtc",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
      ],
    },
    {
      title: <b>ETC ผ่านได้</b>,
      key: "",
      align: 'center',
      children: [
        {
          title: <b>EasyPass</b>,
          key: "trafficNormalEasypass",
          dataIndex: "trafficNormalEasypass",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div>
        },
        {
          title: <b>M-Pass</b>,
          key: "trafficNormalMpass",
          dataIndex: "trafficNormalMpass",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
        {
          title: <b>รวม</b>,
          key: "trafficNormalTotal",
          dataIndex: "trafficNormalTotal",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
      ],
    },
    {
      title: <b>ETC ผ่านไม่ได้</b>,
      key: "",
      align: 'center',
      children: [
        {
          title: <b>ไม่พบบัตร</b>,
          key: "trafficAbnormalNotFound",
          dataIndex: "trafficAbnormalNotFound",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div>
        },
        {
          title: <b>เงินไม่พอ</b>,
          key: "trafficAbnormalNotEnoughMoney",
          dataIndex: "trafficAbnormalNotEnoughMoney",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
        {
          title: <b>รวม</b>,
          key: "trafficAbnormalTotal",
          dataIndex: "trafficAbnormalTotal",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
      ],
    },
    {
      title: <b>% ช่องทาง ETC</b>,
      key: "",
      align: 'center',
      children: [
        {
          title: <b>ETC ผ่านได้</b>,
          key: "percentNormal",
          dataIndex: "percentNormal",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div>
        },
        {
          title: <b>ETC ผ่านไม่ได้</b>,
          key: "percentAbnormal",
          dataIndex: "percentAbnormal",
          align: 'center',
          width: 60,
          render: (text, record) => <div style={{ textAlign: "right", cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div >
        },
      ],
    },
    {
      title: <b>ฝ่าด่าน</b>,
      key: "trafficVio",
      dataIndex: "trafficVio",
      width: 40,
      align: "center",
      render: (text, record) => (
        <Text align="center">
          <div className="text-right" style={{ cursor: "pointer" }}
            onClick={() => handleDetail(record)}>{_isNull(text)}</div>
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
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...tsbList],
            keyName: "tsbNameTh",
            keyValue: "tsbId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.tsbId ? initialValue.tsbId : "ทั้งหมด",
      },
    },
  ];


  const handleDetail = async (item) => {
    if (item.date) {
      try {
        await props.history.push({
          pathname: `/reports/report-traffic-compare-mtc-etc-4wheel/detail/${item.date}`,
          date: item.date,
          tsbId: initialValue.tsbId,
          value: initialValue,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have date",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const getTSBList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
        setLoading(false);
        setTsbList(res.list);
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

  const header414 = [
    { name: "วันที่", key: "date", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวนรายการ (เที่ยว) MTC", key: "trafficMtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) ETC", key: "trafficEtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) รวม", key: "trafficTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% การใช้ MTC", key: "percentMtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% การใช้ ETC", key: "percentEtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านได้ EasyPass", key: "trafficNormalEasypass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านได้ M-Pass", key: "trafficNormalMpass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านได้ รวม", key: "trafficNormalTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ ไม่พบบัตร", key: "trafficAbnormalNotFound", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ เงินไม่พอ", key: "trafficAbnormalNotEnoughMoney", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ รวม", key: "trafficAbnormalTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% ช่องทาง ETC ผ่านได้", key: "percentNormal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% ช่องทาง ETC ผ่านไม่ได้", key: "percentAbnormal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ฝ่าด่าน", key: "trafficVio", type: "nullColumn", align: 'center', className: 'text-right' }
  ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.14 ข้อมูลปริมาณการผ่านทาง MTC เทียบกับ ETC รายวัน เฉพาะ 4 ล้อ"],
  });

  const addIndex = (res) => {

    const totalAll = {
      date: 'รวม',
      trafficMtc: res.totalTrafficMtc,
      trafficEtc: res.totalTrafficEtc,
      trafficTotal: res.totalTrafficTotal,
      percentMtc: res.totalPercentMtc,
      percentEtc: res.totalPercentEtc,
      trafficNormalEasypass: res.totalTrafficNormalEasypass,
      trafficNormalMpass: res.totalTrafficNormalMpass,
      trafficNormalTotal: res.totalTrafficNormalTotal,
      trafficAbnormalNotFound: res.totalTrafficAbnormalNotFound,
      trafficAbnormalNotEnoughMoney: res.totalTrafficAbnormalNotEnoughMoney,
      trafficAbnormalTotal: res.totalTrafficAbnormalTotal,
      percentNormal: res.totalPercentNormal,
      percentAbnormal: res.totalPercentAbnormal,
      trafficVio: res.totalTrafficVio
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
            fileName: "4.14 ข้อมูลปริมาณการผ่านทาง MTC เทียบกับ ETC รายวัน เฉพาะ 4 ล้อ",
            header: header414,
          });
        },
      },
    },
  ];

  const getDataInfo = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M040000014_PAGE1(dataOutput, props.auth.token);
      console.log("res 4.14", res);
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
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด"
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
        tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      };
      getDataInfo(dataOutput);
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
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY HH:mm:ss") : "", },
    { name: "ด่าน", value: dataToPrint.tsbName ? dataToPrint.tsbName : "" },
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
          columns={columns}
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
                    <b>รวม</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficMtc))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficEtc))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficTotal))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(dataSource.totalPercentMtc)}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(dataSource.totalPercentEtc)}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficNormalEasypass))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficNormalMpass))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficNormalTotal))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficAbnormalNotFound))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficAbnormalNotEnoughMoney))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficAbnormalTotal))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(dataSource.totalPercentNormal)}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(dataSource.totalPercentAbnormal)}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficVio))}</Text></b>
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
            TopicText: "4.14 ข้อมูลปริมาณการผ่านทาง MTC เทียบกับ ETC รายวัน เฉพาะ 4 ล้อ"
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
)(ReportTrafficCompareMtcEtc4Wheel);