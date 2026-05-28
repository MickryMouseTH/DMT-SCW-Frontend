import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { _exportFileExcel, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import { header213 } from "../../../tools/excel/header";
import { footer213 } from "../../../tools/excel/footer";
import summaryData from "./SummaryData";
import { Table,Typography } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M020000013 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import moment from "moment";
const dateFormat = "YYYY";
const { Text } = Typography;

const HolidayDailyAverageTrafficAndIncome = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollX, setScrollX] = useState({})
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({})

  // ----- Fields search ------ //
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
        // initialValue: _isEmpty(initialValue) ? moment().format('YYYY [escaped] YYYY') : initialValue.year,
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.year,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
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
    },
    {
      title: "ช่องทาง",
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
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
    },
    {
      title: "มกราคม",
      dataIndex: "trafficJanuary",
      key: "trafficJanuary",
      width: 70,
      align: "center",
    },
    {
      title: "กุมภาพันธ์",
      dataIndex: "trafficFebruary",
      key: "trafficFebruary",
      width: 70,
      align: "center",
    },
    {
      title: "มีนาคม",
      dataIndex: "trafficMarch",
      key: "trafficMarch",
      width: 70,
      align: "center",
    },
    {
      title: "เมษายน",
      dataIndex: "trafficApril",
      key: "trafficApril",
      width: 70,
      align: "center",
    },
    {
      title: "พฤษภาคม",
      dataIndex: "trafficMay",
      key: "trafficMay",
      width: 70,
      align: "center",
    },
    {
      title: "มิถุนายน",
      dataIndex: "trafficJune",
      key: "trafficJune",
      width: 70,
      align: "center",
    },
    {
      title: "กรกฏาคม",
      dataIndex: "trafficJuly",
      key: "trafficJuly",
      width: 70,
      align: "center",
    },
    {
      title: "สิงหาคม",
      dataIndex: "trafficAugust",
      key: "trafficAugust",
      width: 70,
      align: "center",
    },
    {
      title: "กันยายน",
      dataIndex: "trafficSeptember",
      key: "trafficSeptember",
      width: 70,
      align: "center",
    },
    {
      title: "ตุลาคม",
      dataIndex: "trafficOctober",
      key: "trafficOctober",
      width: 70,
      align: "center",
    },
    {
      title: "พฤศจิกายน",
      dataIndex: "trafficNovember",
      key: "trafficNovember",
      width: 70,
      align: "center",
    },
    {
      title: "ธันวาคม",
      dataIndex: "trafficDecember",
      key: "trafficDecember",
      width: 70,
      align: "center",
    },
    {
      title: "รวม",
      dataIndex: "trafficTotal",
      width: 70,
      key: "trafficTotal",
      align: "center",
      render: (text) => _isNull(text)
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    { name: "ปี", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.year,'YYYY') : "" },
  ];

  useEffect(() => {
    getPlazaList();
    // getDataInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    setScrollX({ x: 1300 })
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M020000013(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
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

  const getPlazaList = async () => {
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setPlazaList(res.list);
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
    handleChangeIdToName(value)
    setInitialValue(value);
    const year = _setYearThai(value.year,'YYYY')
    const dataOutput = {
      year: year-543,
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
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
    documentTitle: ["2.13 Yearly Exempt Traffic By Lane Report"]
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
            fileName: "2.13 Yearly Exempt Traffic By Lane Report",
            header: header213,
            footer: footer213,
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];
  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          fields={fields}
          onFinish={handleOnFinish}
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          action={action}
        />
        <div className="mt-10">
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={columns.length <= 12 ? false : scrollX}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            summary={summaryData}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            rowPerPage={20}
            dataSource={dataSource}
            header={header213}
            footer={footer213}
            columnPerPage={header213.length}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 12,
              TopicText: "2.13 ปริมาณรถที่ยกเว้นรายปี จำแนกรายด่าน รายช่องทาง",
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
)(HolidayDailyAverageTrafficAndIncome);
