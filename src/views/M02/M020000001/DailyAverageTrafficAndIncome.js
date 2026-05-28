import React, { useEffect, useState, useRef } from "react";

import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";

import Swal from "sweetalert2";
import { connect } from "react-redux";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import summaryData from "./SummaryData";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M020000001 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import { footer21, header21 } from "../../../tools/excel";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";

const DailyAverageTrafficAndIncome = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
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
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
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
          //showTime: true
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.startDate,
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
          //showTime: true
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate,
      },
    },
  ];

  const columns = [
    {
      title: "ด่าน",
      fixed: true,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      width: 60,
      align: "center",
    },
    {
      title: "ช่องทาง",
      fixed: true,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      width: 60,
      align: "center",
    },
    {
      title: "จำนวนวัน",
      dataIndex: "numberDays",
      key: "numberDays",
      width: 70,
      align: "center",
    },
    {
      title: "ปริมาณจราจรเฉลี่ย",
      dataIndex: "averageTraffic",
      width: 400,
      key: "averageTraffic",
      align: "center",
      render: (text) =>
        <div className='text-right'>
          {_isNull(text)}
        </div>
    },
    {
      title: "รายได้เฉลี่ย",
      dataIndex: "averageRevenue",
      width: 400,
      key: "averageRevenue",
      align: "center",
      render: (text) =>
        <div className='text-right'>
          {_isNull(text)}
        </div>
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,dateFormat) : "" },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,dateFormat) : "" },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    setScrollX({ x: 1300 })
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M020000001(data, props.auth.token);
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
        setsPlazaList(res.list);
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
    const dataOutput = {
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane,
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      duration: 1
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
    documentTitle: ["2.1 Daily Average Traffic And Income Report"],
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
            fileName: "2.1 Daily Average Traffic And Income Report",
            header: header21,
            footer: footer21,
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
            dataSource={dataSource}
            header={header21}
            footer={footer21}
            columnPerPage={header21.length}
            rowPerPage={20}
            propsClass="print-border-footer text-right"
            colSumSpan={3}
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 12,
              TopicText: "2.1 ปริมาณจราจรและรายได้เฉลี่ยต่อวัน"
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
)(DailyAverageTrafficAndIncome);
