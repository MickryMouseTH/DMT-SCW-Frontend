import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import {
  _exportFileExcel,
  _isEmpty,
  _isNull,
} from "../../../tools/util";
import { Typography, Table, Button, Row } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M040000014_PAGE2 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDFPage2 from "./PrintPDFPage2";

const { Text } = Typography;

const ReportTrafficCompareMtcEtc4Wheel = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [scroll, setScroll] = useState({});
  const [tsbList, setTsbList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});

  useEffect(() => {
    // setScroll({ x: 1300 })
    getTSBList();
    if (props.location.date) {
      getDataInfo();
    } else {
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    props.history.push({
      pathname: `/reports/report-traffic-compare-mtc-etc-4wheel/`,
      value: props.location.value
    });
  };

  const columns = [
    {
      title: <b>ลำดับ</b>,
      fixed: true,
      key: "order",
      dataIndex: "order",
      width: 30,
      align: "center",
      render(text) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-center"
              >{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: <b>ด่าน</b>,
      fixed: true,
      key: "plazaName",
      dataIndex: "plazaName",
      width: 70,
      align: "center",
      render(text) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              <div className="text-center"
              >{_isNull(text)}</div>
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
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div>
        },
        {
          title: <b>Easy Pass</b>,
          key: "trafficEasypass",
          dataIndex: "trafficEasypass",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
        },
        {
          title: <b>M-Pass</b>,
          key: "trafficMpass",
          dataIndex: "trafficMpass",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
        },
        {
          title: <b>ฝ่าด่าน</b>,
          key: "trafficVio",
          dataIndex: "trafficVio",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
        },
        {
          title: <b>รวม ETC</b>,
          key: "trafficTotalEtc",
          dataIndex: "trafficTotalEtc",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
        },
        {
          title: <b>รวม M&E</b>,
          key: "trafficTotalMtcEtc",
          dataIndex: "trafficTotalMtcEtc",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
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
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div>
        },
        {
          title: <b>เงินไม่พอ</b>,
          key: "trafficAbnormalNotEnoughMoney",
          dataIndex: "trafficAbnormalNotEnoughMoney",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
        },
        {
          title: <b>รวม</b>,
          key: "trafficAbnormalTotal",
          dataIndex: "trafficAbnormalTotal",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
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
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div>
        },
        {
          title: <b>ETC</b>,
          key: "percentEtc",
          dataIndex: "percentEtc",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
        },
      ],
    },
    {
      title: <b>% ETC ผ่านไม่ได้</b>,
      key: "",
      align: 'center',
      children: [
        {
          title: <b>ผ่านได้</b>,
          key: "percentEtcNormal",
          dataIndex: "percentEtcNormal",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div>
        },
        {
          title: <b>ผ่านไม่ได้</b>,
          key: "percentEtcAbnormal",
          dataIndex: "percentEtcAbnormal",
          align: 'center',
          width: 60,
          render: (text) => <div style={{ textAlign: "right" }}
          >{_isNull(text)}</div >
        },
      ],
    },
  ];

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
    { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ด่าน", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-left' },
    { name: "จำนวนรายการ (เที่ยว) MTC", key: "trafficMtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) Easy Pass", key: "trafficEasypass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) M-Pass", key: "trafficMpass", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) ฝ่าด่าน", key: "trafficVio", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) รวม ETC", key: "trafficTotalEtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "จำนวนรายการ (เที่ยว) รวม M&E", key: "trafficTotalMtcEtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ ไม่พบบัตร", key: "trafficAbnormalNotFound", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ เงินไม่พอ", key: "trafficAbnormalNotEnoughMoney", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "ETC ผ่านไม่ได้ รวม", key: "trafficAbnormalTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% การใช้ MTC", key: "percentMtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% การใช้ ETC", key: "percentEtc", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% ETC ผ่านได้", key: "percentEtcNormal", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: "% ETC ผ่านไม่ได้", key: "percentEtcAbnormal", type: "nullColumn", align: 'center', className: 'text-right' }
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
      order: '',
      plazaName: 'รวม',
      trafficMtc: res.totalTrafficMtc,
      trafficEasypass: res.totalTrafficEasypass,
      trafficMpass: res.totalTrafficMpass,
      trafficVio: res.totalTrafficVio,
      trafficTotalEtc: res.totalTrafficTotalEtc,
      trafficTotalMtcEtc: res.totalTrafficTotalMtcEtc,
      trafficAbnormalNotFound: res.totalTrafficAbnormalNotFound,
      trafficAbnormalNotEnoughMoney: res.totalTrafficAbnormalNotEnoughMoney,
      trafficAbnormalTotal: res.totalTrafficAbnormalTotal,
      percentMtc: res.totalPercentMtc,
      percentEtc: res.totalPercentEtc,
      percentEtcNormal: res.totalPercentEtcNormal,
      percentEtcAbnormal: res.totalPercentEtcAbnormal
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

  const getDataInfo = async () => {
    try {
      setLoading(true);
      const body = {
        date: `${props.match.params.id}`,
        tsbId: `${props.location.tsbId}` === "ทั้งหมด" ? null : `${props.location.tsbId}`
      };
      console.log("body", body)
      const res = await GET_DATA_INFO_M040000014_PAGE2(body, props.auth.token);
      console.log("res 4.14", res);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
        const tsb = tsbList.find((e) => e.tsbId === body.tsbId);
        setDataToPrint({
          date: res.date,
          tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด"
        });
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

  const headerText = [
    { name: "วันที่", value: dataToPrint.date ? dataToPrint.date : "", },
    { name: "ด่าน", value: dataToPrint.tsbName ? dataToPrint.tsbName : "" },
  ];

  return (
    <Skeleton loading={loading} active>
      <Row className="d-flex  justify-content-between">
        <Button onClick={goBack} className="m-15 ml-0 back-button-custom">
          Back
        </Button>
        <FormDefault
          className="text-right button-detail-mt-0"
          submitButton={false}
          actionBoutton={action}
        />
      </Row>
      <Row className="d-flex  justify-content-between">
        <b><Text>{_isNull(dataSource.date)}</Text></b>
      </Row>
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
                  <Table.Summary.Cell colSpan={2} className="text-center" index={0}>
                    <b>รวม</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficMtc))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficEasypass))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficMpass))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficVio))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficTotalEtc))}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(Number(dataSource.totalTrafficTotalMtcEtc))}</Text></b>
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
                    <b><Text>{_isNull(dataSource.totalPercentMtc)}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(dataSource.totalPercentEtc)}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(dataSource.totalPercentEtcNormal)}</Text></b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                    <b><Text>{_isNull(dataSource.totalPercentEtcAbnormal)}</Text></b>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
      <div className="d-none">
        <PrintPDFPage2
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