/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table, Typography } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_COMPARE_BANK_M060000004 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import moment from "moment";
import { header64 } from "../../../tools/excel/header";
import { footer64 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const TODReports = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scroll, setScroll] = useState({});

  ///////////////////////////////////////////MAKE LIST DATA TRX AND DATAX LIST////////////////////////////////////////////////////


  const paymentTypeList = [
    {
      name: "ทั้งหมด",
      value: 0
    },
    {
      name: "EMV",
      value: 3
    },
    {
      name: "QR Code",
      value: 4
    },
  ]

  const selectTypeList = [
    {
      name: "DMT ชนรายการกับธนาคาร",
      value: 1
    },
    {
      name: "ธนาคารชนรายการกับ DMT",
      value: 2
    },
    {
      name: "ชนรายการไม่ได้",
      value: 3
    },
  ]

  const whereTypeList = [
    {
      name: "ทั้งหมด",
      value: 0
    },
    {
      name: "Match รายการไม่ได้",
      value: 1
    },
    {
      name: "Match รายการได้",
      value: 2
    },
  ];
  ///////////////////////////////////////////MAKE LIST DATA TRX AND DATAX LIST////////////////////////////////////////////////////

  const fields = [

    {
      type: "datePicker",
      option: {
        name: "operationDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.operationDate,
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
        rules: [
          {
            required: false,
            message: "กรุณาป้อนหมายเลขช่องทาง!"
          }
        ],
        initialValue: initialValue.laneId,
      },
    },
    {
      type: "select",
      option: {
        name: "paymentType",
        label: "ประเภทการชำระ",
        childrenProps: {
          placeholder: "Payment Type",
          optionValue: {
            values: [...paymentTypeList],
            keyName: "name",
            keyValue: "value",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือก Type!",
          },
        ],
        initialValue: initialValue.paymentType ? initialValue.paymentType : 0,
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "ป้อนรหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนรหัสพนักงาน!" },
        ],
        initialValue: initialValue.staffId,
      },
    },
    {
      type: "input",
      option: {
        name: "jobNo",
        label: "JobNo",
        childrenProps: { placeholder: "เลขที่ใบงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนข้อมูลเลขที่ใบงาน!" },
        ],
        initialValue: initialValue.jobNo,
      },
    },
    {
      type: "select",
      option: {
        name: "selectType",
        label: "รายการค้นหา",
        childrenProps: {
          placeholder: "Payment Status",
          optionValue: {
            values: [...selectTypeList],
            keyName: "name",
            keyValue: "value",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือก รายการค้นหา !",
          },
        ],
        initialValue: initialValue.selectType ? initialValue.selectType : 1,
      },
    },
    {
      type: "select",
      option: {
        name: "whereType",
        label: "ข้อมูลการค้นหา",
        childrenProps: {
          placeholder: "Payment Type",
          optionValue: {
            values: [...whereTypeList],
            keyName: "name",
            keyValue: "value",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือก ข้อมูลการค้นหา !",
          },
        ],
        initialValue: initialValue.whereType ? initialValue.whereType : 0,
      },
    },
  ];

  const columns = [
    {
      title: "ด่าน",
      key: "plazaName",
      dataIndex: "plazaName",
      width: 60,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              {_isNull(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: "ช่องทาง",
      key: "laneAbbr",
      dataIndex: "laneAbbr",
      width: 100,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              {_isNull(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: "CardNo",
      dataIndex: "cardNo",
      key: "cardNo",
      align: "center",
      width: 150,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="text-left">
              {_isNull(text)}
            </Text>
          ),
        };
      },
    },
    {
      title: "DMT",
      align: "center",
      children: [
        {
          title: "StaffNo",
          dataIndex: "staffNo",
          key: "staffNo",
          width: 60,
          align: "center",
          render: (text) =>
            _isNull(text)
        },
        {
          title: "JobNo",
          dataIndex: "jobNo",
          key: "jobNo",
          width: 70,
          align: "center",
          render: (text) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>)
        },
        {
          title: "NtrxNo",
          dataIndex: "ntrx",
          key: "ntrx",
          width: 60,
          align: "center",
          render: (text) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>)
        },
        {
          title: "วันเวลาผ่านทาง",
          dataIndex: "trxDateTime",
          key: "trxDateTime",
          align: "center",
          width: 150,
          render: (trxDateTime) => _isEmpty(trxDateTime) ? "" : _setYearThai(trxDateTime, "DD/MM/YYYY HH:mm:ss"),
        },
        {
          title: "ประเภทรถ",
          dataIndex: "tcClass",
          key: "tcClass",
          align: "center",
          width: 100,
          render: (text) =>
            _isNull(text)
        },

        {
          title: "AVC",
          dataIndex: "avcClass",
          key: "avcClass",
          align: "center",
          width: 100,
          render: (text) =>
            _isNull(text)
        },

        {
          title: "ค่าผ่านทาง",
          dataIndex: "amount",
          key: "amounty",
          align: "center",
          width: 100,
          render: (text) =>
            <div className='text-right'>
              {/* { Number(_isNull(text)).toFixed(2) } */}
              {_isNull(text)}
            </div>
        },
      ],
    },
    {
      title: "BANK",
      fixed: "left",
      align: "center",
      children: [
        {
          title: "ประเภทการชำระ",
          dataIndex: "trxType",
          key: "trxType",
          align: "center",
          width: 100,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "JobNo",
          dataIndex: "bankJobNo",
          key: "bankJobNo",
          align: "center",
          width: 100,
          render: (text) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>)
        },
        {
          title: "NtrxNo",
          dataIndex: "bankNtrx",
          key: "bankNtrx",
          align: "center",
          width: 100,
          render: (text) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>)
        },
        {
          title: "TerminalId",
          dataIndex: "bankTerminalId",
          key: "bankTerminalId",
          align: "center",
          width: 100,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "EDC Approv",
          dataIndex: "bankApproveAmount",
          key: "bankApproveAmount",
          align: "center",
          width: 100,
          render: (text) =>
            <div className='text-right'>
              {/* { Number(_isNull(text)).toFixed(2) } */}
              {_isNull(text)}
            </div>
        },
        {
          title: "EDC Time",
          dataIndex: "bankEdcTime",
          key: "bankEdcTime",
          align: "center",
          width: 100,
          render: (text) =>
            _isNull(text)
        },
        {
          title: "EDC Approve Time",
          dataIndex: "bankApproveTime",
          key: "bankApproveTime",
          align: "center",
          width: 100,
          render: (text) =>
            _isNull(text)
        },
      ],
    },
  ];

  const headerText = [
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.operationDate, dateFormat)
        : "",
    },
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
    {
      name: "ประเภทการชำระ",
      value: dataToPrint.paymentType ? dataToPrint.paymentType : "",
    },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
    {
      name: "Job No",
      value: dataToPrint.DataList ? dataToPrint.DataList.jobNo : "",
    },
    {
      name: "รายการค้นหา",
      value: dataToPrint.selectType ? dataToPrint.selectType : "",
    },
    {
      name: "ข้อมูลการค้นหา",
      value: dataToPrint.whereType ? dataToPrint.whereType : "",
    },

  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlazaList = async () => {
    setScroll({ x: 1500 });
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
      const res = await GET_DATA_COMPARE_BANK_M060000004(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res)
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
    const paymentType = paymentTypeList.find((e) => e.value === DataList.paymentType)
    const selectType = selectTypeList.find((e) => e.value === DataList.selectType)
    const whereType = whereTypeList.find((e) => e.value === DataList.whereType)
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      paymentType: paymentType && paymentType.name,
      selectType: selectType && selectType.name,
      whereType: whereType && whereType.name
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      operationDate: _timeZoneThai(value.operationDate),
      plazaId: value.plazaId === "ทั้งหมด" ? null : value.plazaId,
      laneId: value.laneId ? value.laneId : null,
      paymentType: value.paymentType,
      jobNo: value.jobNo ? value.jobNo : null,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
      selectType: value.selectType,
      whereType: value.whereType,
    };

    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.4 Compare operating vehicle data with bank information"],
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
            dataSource: {
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            },
            fileName: "6.4 Compare operating vehicle data with bank information",
            header: header64,
            footer: footer64,
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          fields={fields}
          onFinish={handleOnFinish}
          action={action}
        />
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{!_isEmpty(dataSource.countRecord) ? dataSource.countRecord : dataSource.list.length}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={2}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={6} className="text-center" index={3}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(dataSource.amountTotalDmt)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={4} className="text-center" index={5}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={6}>
                      <Text>{_isNull(dataSource.amountTotalBank)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={7}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={8}>
                      <Text></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={{
            ...dataSource,
            rows: "rows",
            count: _isNull(Number(dataSource.list.length)),
          }}
          header={header64}
          footer={footer64}
          propsHeader={{
            position: "d-flex justify-content-center",
            colSpan: 6,
            headerText,
            TopicText: "6.4 เปรียบเทียบข้อมูล รถผ่านทาง กับ ข้อมูลธนาคาร",
          }}
          columnPerPage={header64.length}
        // columnTotalChange={{
        //   trxDateTime: "รวม"
        // }}
        />
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TODReports);
