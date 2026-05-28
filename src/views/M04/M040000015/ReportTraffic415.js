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

import { GET_DATA_INFO_M040000015 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;

const ReportTraffic415 = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [minuteList, setMinuteList] = useState([]);
  const [plazaList, setPlazaList] = useState([]);
  const [dataToPrint, setDataToPrint] = useState({});

  useEffect(() => {
    // setScroll({ x: 1300 })
    setMinuteList(["1 Minute", "5 Minute", "10 Minute", "15 Minute", "30 Minute", "60 Minute"]);
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "ลำดับ",
      fixed: true,
      key: "order",
      dataIndex: "order",
      width: 40,
      align: "center",
      render(text) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="left">
              <div className="text-center">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ด่าน",
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
            <Text type="secondary" align="left">
              <div className="text-left">{_isNull(text)}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ช่องทาง",
      key: "laneName",
      dataIndex: "laneName",
      width: 40,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-center">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "ชั่วโมงที่",
      key: "hour",
      dataIndex: "hour",
      width: 40,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-center">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "นาที",
      key: "minute",
      dataIndex: "minute",
      width: 40,
      align: "center",
      render: (text) => (
        <Text align="center">
          <div className="text-center">{_isNull(text)}</div>
        </Text>
      )
    },
    {
      title: "จำนวน(คัน)",
      key: "traffic",
      dataIndex: "traffic",
      width: 40,
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
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('06:00:00', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("06:00:00", "HH:mm:ss")
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
          showTime: { defaultValue: moment() }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
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
      type: "input",
      option: {
        name: "laneId",
        label: "ช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.laneId,
      },
    },
    {
      type: "select",
      option: {
        name: "minute",
        label: "ค้นหาราย",
        childrenProps: {
          placeholder: "ค้นหาราย",
          optionValue: {
            values: [...minuteList],
            keyValue: "minute",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทการชำระ!",
          },
        ],
        initialValue: initialValue.minute ? initialValue.minute : "30 Minute",
      },
    }
  ];

  const header413 = [
    { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ด่าน", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-left' },
    { name: "ช่องทาง", key: "laneName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ชั่วโมงที่", key: "hour", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "นาที", key: "minute", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "จำนวน(คัน)", key: "traffic", type: "nullColumn", align: 'center', className: 'text-right' }
  ]

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["4.15 รายงานปริมาณการจราจร"],
  });

  const addIndex = (res) => {
    return {
      ...res,
      listExport: [...res.list]
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
            fileName: "4.15 รายงานปริมาณการจราจร",
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

  const getData = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M040000015(dataOutput, props.auth.token);
      console.log("res 4.15", res);
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
      laneId: DataList.laneId ? DataList.laneId : "",
      minute: DataList.minute ? DataList.minute : ""
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
      let minute = null;
      if (value.minute === "1 Minute") {
        minute = 1;
      } else if (value.minute === "5 Minute") {
        minute = 5;
      } else if (value.minute === "10 Minute") {
        minute = 10;
      } else if (value.minute === "15 Minute") {
        minute = 15;
      } else if (value.minute === "30 Minute") {
        minute = 30;
      } else if (value.minute === "60 Minute") {
        minute = 60;
      }
      const dataOutput = {
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
        plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
        laneId: value.laneId,
        minute: minute
      };
      getData(dataOutput);
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
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    { name: "ช่องทาง", value: dataToPrint.laneId ? dataToPrint.laneId : "" },
    { name: "ค้นหาราย", value: dataToPrint.minute ? dataToPrint.minute : "" }
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
          summary={() => { }}
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
            TopicText: "4.15 รายงานปริมาณการจราจร"
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
)(ReportTraffic415);