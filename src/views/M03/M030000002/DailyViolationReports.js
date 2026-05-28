import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M030000002 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import moment from "moment";
import { header32 } from "../../../tools/excel/header";
import { footer32 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;
const DailyViolationReports = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});

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
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
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
          showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
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
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') },
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
    {
      type: "input",
      option: {
        name: "jobNo",
        label: "Job no.",
        childrenProps: { placeholder: "เลขที่ใบงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนข้อมูลเลขที่ใบงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.jobNo,
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "รหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนรหัสพนักงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.staffId,
      },
    },
  ];

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      fixed: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" >
              <div className="text-right">{text}</div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ด่าน",
      fixed: true,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
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
      fixed: true,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      width: 70,
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
      title: "Job No.",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 60,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "Ntrx",
      dataIndex: "ntrx",
      key: "ntrx",
      width: 60,
      align: "center",
      render: (text) =>
        <div className="text-right">{_isNull(text)}</div>
    },
    {
      title: "วันที่ผ่านด่าน",
      dataIndex: "trxDateTime",
      key: "trxDateTime",
      width: 100,
      align: "center",
      render: (text) => !_isEmpty(text) && _setYearThai(text,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "รหัสพนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "TC/OBU",
      dataIndex: "tcClass",
      key: "tcClass",
      width: 60,
      align: "center",
      render(text) {
        return {
          children: (
            <Text align="center">
              {_isZero(text)}
            </Text>
          ),
        };
      }
    },
    {
      title: "AVC",
      dataIndex: "avcClass",
      key: "avcClass",
      width: 40,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "amount",
      key: "amount",
      width: 70,
      align: "center",
      render: (text) =>
        <div className="text-right">{_isNull(text)}</div>

    },
    {
      title: "ประเภทการชำระ",
      dataIndex: "paymentTypeName",
      key: "paymentTypeName",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "เหตุผิดปรกติ",
      dataIndex: "abnormality",
      key: "abnormality",
      width: 150,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ประเภทการผ่านด่าน",
      dataIndex: "passingType",
      key: "passingType",
      width: 130,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ประเภทย่อย",
      dataIndex: "subType",
      key: "subType",
      width: 130,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ทะเบียน",
      dataIndex: "plateNo",
      key: "plateNo",
      width: 85,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: 130,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ยี่ห้อ-รุ่น",
      dataIndex: "brandModel",
      key: "brandModel",
      width: 80,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "สี",
      dataIndex: "brandModelColor",
      key: "brandModelColor",
      width: 100,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "สังกัด",
      dataIndex: "under",
      key: "under",
      width: 90,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ศูนย์-ผู้รับแจ้ง",
      dataIndex: "centerRecipient",
      key: "centerRecipient",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "ตำรวจ-ผู้รับแจ้ง",
      dataIndex: "policeRecipients",
      key: "policeRecipients",
      width: 120,
      align: "center",
      render: (text) =>
        _isNull(text)
    },
    {
      title: "Supervisor",
      dataIndex: "supStaffId",
      key: "supStaffId",
      width: 90,
      align: "center",
      render: (text) =>
        <div className='text-left'>
          {_isNull(text)}
        </div>
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY")
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY")
        : "",
    },
    {
      name: "Job no.",
      value: dataToPrint.DataList ? dataToPrint.DataList.jobNo : "",
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

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000002(data, props.auth.token);
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

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane,
      staffId: value.staffId,
      jobNo: value.jobNo,
    };
    getDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.2 Daily Violation Report"],
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
            footer: footer32,
            fileName: "3.2 Daily Violation Report",
            header: header32,
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
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={2}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            }}
            footer={footer32}
            header={header32}
            propsHeader={{
              headerText,
              TopicText: "3.2 รายงานการฝ่าฝืนรายวัน",
            }}
            columnPerPage={header32.length}
            propsClass="print-border-footer"
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
)(DailyViolationReports);
