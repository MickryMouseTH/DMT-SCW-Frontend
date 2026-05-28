import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { _exportFileExcel, _isEmpty, _timeZoneThai, _setYearThai } from "../../../tools/util";
import { header38 } from "../../../tools/excel/header";
import { Table,Typography } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M030000008 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const TrafficVolumeByTypeOfToll = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollX, setScrollX] = useState({})
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({})
  const [currentPage, setCurrentPage] = useState(1);

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
      type: "input",
      option: {
        name: "lane",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "Input a number" },
        ],
        initialValue: initialValue.lane,
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
          showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
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
      title: "Device",
      dataIndex: "device",
      key: "device",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          children: (
            <Text align="center">
              {text}
            </Text>
          ),
        };
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          children: (
            <Text align="center">
              {text}
            </Text>
          ),
        };
      },
    },
    {
      title: "Occurred",
      key: "occurred",
      dataIndex: "occurred",
      width: 150,
      align: "center",
      render: (text) => _isEmpty(text) ? "" : _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Recovered",
      key: "recovered",
      dataIndex: "recovered",
      width: 150,
      align: "center",
      render: (text) => _isEmpty(text) ? "" : _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      width: 70,
      align: "center",
      render(text, record) {
        return {
          children: (
            <Text align="center">
              {text}
            </Text>
          ),
        };
      },
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    { name: "วันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.date,dateFormat) : "" },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    setScrollX({ x: 1300 })
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000008(data, props.auth.token);
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
    const dataOutput = {
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      date: _timeZoneThai(value.date),
      laneId: value.lane,
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
    documentTitle: ["3.8 Crash By Lane Report"]
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
            fileName: "3.8 Crash By Lane Report",
            header: header38,
            columnOneCell: true
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
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={columns.length <= 12 ? false : scrollX}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={dataSource}
            header={header38}
            columnPerPage={header38.length}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 8,
              TopicText: "3.8 รายงานข้อขัดข้องรายช่องทาง",
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
)(TrafficVolumeByTypeOfToll);
