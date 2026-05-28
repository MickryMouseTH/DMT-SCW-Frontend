/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";

import { Table, Typography} from "antd";
import Skeleton from "../../../components/loading/Loading"

import { _isEmpty, _exportFileExcel, _timeZoneThai, _isNull, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M030000005 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import PrintReport from "../../../components/print/PrintReport";
import { header35 } from "../../../tools/excel/header";
import { footer35 } from "../../../tools/excel/footer";
const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;

const ListOfJobs = (props) => {
  const { t } = useTranslation("menus");
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
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
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "ป้อนรหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนป้อนรหัสพนักงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.staffId,
      },
    },
  ];
  // ----- columns Table ------ //
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
            <Text type="secondary">
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
      title: "วันเวลาเริ่มปฏิบัติงาน",
      dataIndex: "bojDateTime",
      key: "bojDateTime",
      width: 150,
      align: "center",
      render: (text) =>
        !_isEmpty(text) &&
        _setYearThai(text,dateFormat),
    },
    {
      title: "วันเวลาเลิกปฏิบัติงาน",
      dataIndex: "eojDateTime",
      key: "eojDateTime",
      width: 150,
      align: "center",
      render: (text) =>
        !_isEmpty(text) &&
        _setYearThai(text,dateFormat),
    },
    {
      title: "Job No.",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 60,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "วันเวลาที่ส่งเงิน",
      dataIndex: "declareDateTime",
      key: "declareDateTime",
      width: 150,
      align: "center",
      render: (text) =>
        !_isEmpty(text) &&
        _setYearThai(text,dateFormat),
    },
    {
      title: "รหัสพนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 130,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "ชื่อพนักงาน",
      dataIndex: "staffNameTh",
      key: "staffNameTh",
      width: 150,
      align: "left",
      render: (text) => _isNull(text)
    },
    {
      title: "ถุงเงิน",
      dataIndex: "moneyBagNo",
      key: "moneyBagNo",
      width: 70,
      align: "center",
      render: (text) =>
        <div className="text-right">{_isNull(text)}</div>
    },
    {
      title: "รหัสหัวหน้าพนักงาน",
      dataIndex: "supStaffId",
      key: "supStaffId",
      width: 130,
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "ชื่อหัวหน้าพนักงาน",
      dataIndex: "supStaffNameTh",
      key: "supStaffNameTh",
      width: 150,
      align: "center",
      render: (text) => <div className="text-left">{_isNull(text)}</div>
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.laneId : "",
    },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,dateFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,dateFormat)
        : "",
    },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.5 List Of Jobs Report"],
  });

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
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

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M030000005(data, props.auth.token);
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
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
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
    };
    getDataInfo(dataOutput);
  };
  const handlePrintFile = () => {
    handlePrint();
  };

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
            fileName: "3.5 List Of Jobs Report",
            header: header35,
            footer: footer35,
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
            // scroll={columns.length > 12 ? scroll : false}
            scroll={scroll}
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
            header={header35}
            footer={footer35}
            propsHeader={{
              headerText,
              TopicText: "3.5 รายการปฏิบัติงานของพนักงาน",
            }}
            columnPerPage={header35.length}
            propsClass="print-border-footer"
            // rowPerPage={10} //จำนวนเเถวในเเต่ละหน้าของข้อมูล เมื่อ ปริ้น PDF default คือ 10 หากไม่ได้ใส่
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

export default connect(mapStateToProps, mapDispatchToProps)(ListOfJobs);
