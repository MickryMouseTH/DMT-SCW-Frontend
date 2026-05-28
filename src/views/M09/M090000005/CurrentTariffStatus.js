import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import Swal from "sweetalert2";

// import { useReactToPrint } from "react-to-print";
// import PrintReport from "../../../components/print/PrintReport";

// import FormDefault from "../../../components/form/FormDefault";
// import { getPlazaListAPI } from "../../../service/api/util";
// import { header45, footer45 } from "../../../tools/excel";
import { GET_DATA_INFO_M09000005 } from "../../../service/api/report";
import { 
  // _exportFileExcel, 
  // _timeZoneThai,
   _isNull,
    // _isEmpty
  } from "../../../tools/util";
// import moment from "moment";
// const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const CurrentTariffStatus = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  // const [plazaList, setPlazaList] = useState([]);
  const [loadingDataSource, setLoadingDataSource] = useState(false);
  // const [initialValue, setInitialValue] = useState({});
  // const [dataToPrint, setDataToPrint] = useState({})

  // const fields = [
  //   {
  //     type: "select",
  //     option: {
  //       name: "plaza",
  //       label: "ด่าน",
  //       childrenProps: {
  //         placeholder: "เลือกด่าน...",
  //         optionValue: {
  //           values: ["ทั้งหมด", ...plazaList],
  //           keyName: "plazaNameTh",
  //           keyValue: "plazaId",
  //         },
  //       },
  //       rules: [
  //         {
  //           required: false,
  //           message: "กรุณาเลือกด่าน!",
  //         },
  //       ],
  //       initialValue: initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
  //     },
  //   },
  //   {
  //     type: "input",
  //     option: {
  //       name: "lane",
  //       label: "หมายเลขช่องทาง",
  //       childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง...", maxLength: "" },
  //       rules: [
  //         { required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" },
  //         { pattern: /^-?\d*(\.\d*)?$/, message: "Input a number" },
  //       ],
  //       initialValue: initialValue.lane,
  //     },
  //   },
  //   {
  //     type: "datePicker",
  //     option: {
  //       name: "startDate",
  //       label: "จากวันที่",
  //       childrenProps: {
  //         format: dateFormat,
  //         placeholder: "เลือกวันที่...",
  //       },
  //       rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
  //       initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss")/*.subtract(1, 'days')*/ : initialValue.startDate,
  //     },
  //   },
  //   {
  //     type: "datePicker",
  //     option: {
  //       name: "endDate",
  //       label: "ถึงวันที่",
  //       childrenProps: {
  //         format: dateFormat,
  //         placeholder: "เลือกวันที่...",
  //       },
  //       rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
  //       initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate,
  //     },
  //   },
  // ];

  const columns = [
    {
      title: "Plaza",
      key: "plazaName ",
      dataIndex: "plazaName",
      width: 70,
      align: "center",
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
      title: "Date Type",
      key: "Date_Type",
      dataIndex: "Date_Type",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Date Time",
      fixed: "right",
      key: "Date_Time",
      dataIndex: "Date_Time",
      width: 70,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Revision No.",
      fixed: "right",
      key: "Revision_No",
      dataIndex: "Revision_No",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Valid From",
      fixed: "right",
      key: "Valid_From",
      dataIndex: "Valid_From",
      width: 70,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Valid to",
      fixed: "right",
      key: "Valid_to",
      dataIndex: "Valid_to",
      width: 70,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class1",
      fixed: "right",
      key: "Class_1",
      dataIndex: "Class_1",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 2",
      fixed: "right",
      key: "Class_2",
      dataIndex: "Class_2",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 3",
      fixed: "right",
      key: "Class_3",
      dataIndex: "Class_3",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 4",
      fixed: "right",
      key: "Class_4",
      dataIndex: "Class_4",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 5",
      fixed: "right",
      key: "Class_5",
      dataIndex: "Class_5",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 6",
      fixed: "right",
      key: "Class_6",
      dataIndex: "Class_6",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 7",
      fixed: "right",
      key: "Class_7",
      dataIndex: "Class_7",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 8",
      fixed: "right",
      key: "Class_8",
      dataIndex: "Class_8",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 9",
      fixed: "right",
      key: "Class_9",
      dataIndex: "Class_9",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Class 0",
      fixed: "right",
      key: "Class_0",
      dataIndex: "Class_0",
      width: 20,
      align: "center",
      render: (text) => _isNull(text)
    },
  ];

  // const headerText = [
  //   { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
  //   { name: "ช่องทาง", value: dataToPrint.DataList ? dataToPrint.DataList.lane : "" },
  //   { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,'DD/MM/YYYY') : "" },
  //   { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,'DD/MM/YYYY') : "" },
  // ];

  useEffect(() => {
    getDataInfo()
    // getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getPlazaList = async () => {
  //   try {
  //     setLoadingDataSource(true);
  //     const res = await getPlazaListAPI(null, props.auth.token);
  //     if (res.status.code === "S200") {
  //       setPlazaList(res.list);
  //       setLoadingDataSource(false);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed to fetch. ",
  //         text: res.status.message,
  //       }).then(async (result) => {
  //         if (result.value) {
  //           setLoadingDataSource(false);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getDataInfo = async (data = null) => {
    try {
      setLoadingDataSource(true);
      const res = await GET_DATA_INFO_M09000005(data, props.auth.token);
      console.log("4.5", res);
      if (res.status.code === "S200") {
        setDataSource(res);
        setLoadingDataSource(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoadingDataSource(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleOnFinish = (value) => {
  //   handleChangeIdToName(value)
  //   setInitialValue(value);
  //   const dataOutput = {
  //     startDate: _timeZoneThai(value.startDate),
  //     endDate: _timeZoneThai(value.endDate),
  //     plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
  //     laneId: value.lane,
  //   };
  //   console.log("4", dataOutput)
  //   getDataInfo(dataOutput);
  // };

  // const handleChangeIdToName = (DataList) => {

  //   const plaza = plazaList.find((e) => e.plazaId === DataList.plaza)
  //   setDataToPrint(
  //     {
  //       DataList,
  //       plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
  //     })
  // }

  // const handlePrintFile = () => {
  //   handlePrint();
  // };
  // const printReportRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => printReportRef.current,
  //   documentTitle: ["9.5 Daily Average Traffic Revenue Report"],
  // });

  // const action = [
  //   {
  //     name: "พิมพ์",
  //     props: {
  //       type: "primary",
  //       ghost: false,
  //       onClick: handlePrintFile,
  //       // disabled: dataSource.list.length < 1,
  //     },
  //   },
  //   {
  //     name: "ส่งออก",
  //     props: {
  //       type: "primary",
  //       onClick: () =>
  //         _exportFileExcel({
  //           dataSource: dataSource,
  //           fileName: "9.5 Daily Average Traffic Revenue Report",
  //           header: header45,
  //           footer: footer45,
  //         }),
  //       // disabled: dataSource.list.length < 1,
  //     },
  //   },
  // ];

  return (
    <Skeleton loading={loadingDataSource} active>
      <div>
        {/* <FormDefault
          fields={fields}
          onFinish={handleOnFinish}
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          action={action}
        /> */}
        <div className="mt-20">
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loadingDataSource}
          />
        </div>
        {/* <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={dataSource}
            header={header45}
            footer={footer45}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 12,
              TopicText: "9.5 ปริมาณจราจร/รายได้เฉลี่ยรายวัน"
            }}
          />
        </div> */}
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};


export default connect(mapStateToProps, mapDispatchToProps)(CurrentTariffStatus)
