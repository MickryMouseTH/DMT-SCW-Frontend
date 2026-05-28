/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Typography, Table, Button, Row } from "antd";
import { _exportFileExcel, _isEmpty, _setYearThai } from "../../../tools/util";
import PrintReport from "../../../components/print/PrintReport";
import FormDefault from "../../../components/form/FormDefault";
import { useReactToPrint } from "react-to-print";
import { GET_DATA_DETAIL_M010000001 } from "../../../service/api/report";
import { header11_Detail } from "../../../tools/excel/header";
import Skeleton from "../../../components/loading/Loading";
const { Text } = Typography;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const ReportDetail = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [dataToPrint, setDataToPrint] = useState({})
  const [scrollX, setScrollX] = useState({})

  useEffect(() => {
    _isEmpty(props.location.state)
      ? goBack()
      : getDataInfo(props.location.state);
  }, []);

  const goBack = () => {
    props.history.push({
      pathname: `/reports/lane-operating-statistics-reports/`,
      value: props.location.value,
      currentPage: props.location.currentPage,
      dataToPrint: props.location.dataToPrint
    });
  };

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,dateFormat) : "" },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,dateFormat) : "" },
  ]

  const getDataInfo = async (data = null) => {
    setScrollX({ x: 1300 })
    setDataToPrint(props.location.dataToPrint)
    const dataDetail = {
      startDate: data.item.startDate,
      endDate: data.item.endDate,
      laneId: Number(data.item.laneId),
      plazaId: data.item.plazaId,
    };
    try {
      setLoading(true);
      const res = await GET_DATA_DETAIL_M010000001(
        dataDetail,
        props.auth.token
      );
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
      }
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
    documentTitle: ["1.1 Lane Operating Statistics Report Detail"],
  });

  const columns = [
    {
      title: "ด่าน",
      fixed: "left",
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "bg_default",
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
      fixed: "left",
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "bg_default",
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
      title: "วันเวลาเริ่ม",
      dataIndex: "startDate",
      key: "startDate",
      width: 200,
      align: "center",
      render: (text) => _setYearThai(text,dateFormat),
    },
    {
      title: "วันเวลาสิ้นสุด",
      dataIndex: "endDate",
      key: "endDate",
      width: 200,
      align: "center",
      render: (text) => _setYearThai(text,dateFormat),
    },
    {
      title: "รหัสพนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 90,
      align: "center",
    },
    {
      title: "ชื่อพนักงาน",
      dataIndex: "staffNameTh",
      key: "staffNameTh",
      width: 90,
      align: "center",
    },
    {
      title: "รหัสหัวหน้าพนักงาน",
      dataIndex: "supStaffId",
      key: "supStaffId",
      width: 120,
      align: "center",
    },
    {
      title: "ชื่อหัวหน้าพนักงาน",
      dataIndex: "supStaffNameTh",
      key: "supStaffNameTh",
      width: 120,
      align: "center",
    },
    {
      title: "เหตุการ",
      dataIndex: "event",
      key: "event",
      width: 90,
      align: "center",
    },
    {
      title: "ระยะเวลา",
      dataIndex: "duration",
      key: "duration",
      width: 90,
      align: "center",
    },
  ];
  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        // // disabled: dataSource.list.length < 1,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel({
            dataSource: dataSource,
            fileName: "1.1 Lane Operating Statistics Detail Report",
            header: header11_Detail,
          }),
        // // disabled: dataSource.list.length < 1,
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
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
        <div className="mt-10">
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={columns.length <= 12 ? false : scrollX}
            columns={columns}
            bordered
            dataSource={dataSource.list}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={dataSource}
            header={header11_Detail}
            columnPerPage={header11_Detail.length}
            propsHeader={{
              colSpan: 12,
              headerText,
              position: "d-flex justify-content-start",
              TopicText: "1.1 รายละเอียด สถิติจำนวนชั่วโมงการเปิด-ปิด และการหยุดใช้งานของช่องทาง"
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
