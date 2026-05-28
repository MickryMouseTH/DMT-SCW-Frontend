/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table, Button } from "antd";

import { _exportFileExcel, _timeZoneThai, _isEmpty, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M010000001 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import moment from "moment";
import { header11 } from "../../../tools/excel/header";
import Skeleton from "../../../components/loading/Loading"

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const LaneOperatingStatisticsReports = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
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
          showTime: true
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
          showTime: true
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate,
      },
    },
  ];

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
      width: 150,
      align: "center",
      render: (text) => _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "วันเวลาสิ้นสุด",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      align: "center",
      render: (text) => _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "ชม.เปิด",
      dataIndex: "hourOpen",
      key: "hourOpen",
      width: 90,
      align: "center",
    },
    {
      title: "ชม.ทำงาน",
      dataIndex: "hourClose",
      key: "hourClose",
      width: 90,
      align: "center",
    },
    {
      title: "ชม.ปิด",
      dataIndex: "hourOperate",
      key: "hourOperate",
      width: 90,
      align: "center",
    },
    {
      title: "% เปิด",
      dataIndex: "percentOpen",
      key: "percentOpen",
      width: 90,
      align: "center",
    },
    {
      title: "% ทำงาน",
      dataIndex: "percentOperate",
      key: "percentOperate",
      width: 90,
      align: "center",
    },
    {
      title: "% ปิด",
      dataIndex: "percentClose",
      key: "percentClose",
      width: 90,
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <Button size="small" onClick={() => handleDetail(record)}>รายละเอียด</Button>
      ),
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,'DD/MM/YYYY HH:mm:ss') : "" },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,'DD/MM/YYYY HH:mm:ss') : "" },
  ];

  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        plazaId: props.location.value.plaza === "ทั้งหมด" ? null : props.location.value.plaza,
        laneId: _isEmpty(props.location.value.lane) ? null : Number(props.location.value.lane),
      }
      setCurrentPage(props.location.currentPage)
      getDataInfo(dataOutput)
      setDataToPrint(props.location.dataToPrint)
    }

    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlazaList = async () => {
    setScrollX({ x: 1300 })
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
  const getDataInfo = async (data = null) => {

    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M010000001(data, props.auth.token);
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
  const handleDetail = async (item) => {
    const sendItem = {
      item: item,
      auth: props.auth,
    };
    try {
      await props.history.push({
        pathname: `/reports/lane-operating-statistics-reports/reportdetail/${item.laneId}`,
        state: { ...sendItem },
        value: initialValue,
        currentPage: currentPage,
        dataToPrint: dataToPrint
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value)
    setInitialValue(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: Number(value.lane),
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
    documentTitle: ["1.1 Lane Operating Statistics Report"],
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
            fileName: "1.1 Lane Operating Statistics Report",
            header: header11,
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];
  return (
    <Skeleton loading={loading} active>
      <FormDefault fields={fields}
        onFinish={handleOnFinish}
        action={action}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
      />
      <div className="mt-10">
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          scroll={columns.length <= 12 ? false : scrollX}
          columns={columns}
          bordered
          dataSource={dataSource.list}
          pagination={{ current: currentPage, onChange: (page, pageSize) => setCurrentPage(page) }}
        />
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={dataSource}
          header={header11}
          columnPerPage={header11.length}
          propsHeader={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 12,
            TopicText: "1.1 สถิติจำนวนชั่วโมงการเปิด-ปิด และการหยุดใช้งานของช่องทาง"
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
)(LaneOperatingStatisticsReports);
