/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { getTSBList_API, getShiftList_API } from "../../../service/api/util";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000015 } from "../../../service/api/report";
import {
  _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai
} from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header615 } from "../../../tools/excel/header";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const ReportComparMtcAndMoneyCountingCompany = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [tsbList, setTsbList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  // ----- Fields search ------ //

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "operatorDate",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.operatorDate,
      },
    },
    {
      type: "select",
      option: {
        name: "tsbId",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: [...tsbList],
            keyName: "tsbNameTh",
            keyValue: "tsbId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.tsbId ? initialValue.tsbId : 1,
      },
    },
    {
      type: "select",
      option: {
        name: "shiftNo",
        label: "ผลัด",
        childrenProps: {
          placeholder: "เลือกผลัด...",
          optionValue: {
            values: ["ทั้งหมด", ...shiftList],
            keyName: "abbreviation",
            keyValue: "shiftNo",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกผลัด!",
          },
        ],
        initialValue: initialValue.shiftNo ? initialValue.shiftNo : "ทั้งหมด",
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

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ด่าน",
      fixed: true,
      key: "tsbName",
      dataIndex: "tsbName",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ของรายได้",
      key: "revenueDate",
      dataIndex: "revenueDate",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ผลัด",
      dataIndex: "shiftName",
      key: "shiftName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รหัสพนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 55,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ชื่อพนักงาน",
      dataIndex: "staffName",
      key: "staffName",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ประเภทการนำส่ง",
      dataIndex: "declareTypeName",
      key: "declareTypeName",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "SOD",
      dataIndex: "sod",
      key: "sod",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Sup",
      dataIndex: "sup",
      key: "sup",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Audit",
      dataIndex: "audit",
      key: "audit",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "SOD Adj",
      dataIndex: "sodAdj",
      key: "sodAdj",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "SOD Audit",
      dataIndex: "sodAudit",
      key: "sodAudit",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "SOD Adj +- SOD Audit",
      dataIndex: "sodAdjAudit",
      key: "sodAdjAudit",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "MCC",
      dataIndex: "mcc",
      key: "mcc",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "MCC Audit",
      dataIndex: "mccAudit",
      key: "mccAudit",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "MCC +- MCC Audit",
      dataIndex: "mccMccAudit",
      key: "mccMccAudit",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "MCC +- SOD",
      dataIndex: "mccSod",
      key: "mccSod",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const headerText = [
    {
      name: "วันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.operatorDate,dateFormat) : "",
    },
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.tsbName : "" },
    { name: "รหัสพนักงาน", value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "" },
    { name: "ผลัด", value: dataToPrint.DataList ? dataToPrint.DataList.shiftNo : "" },
  ];

  useEffect(() => {
    getTSBList();
    getShiftList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getTSBList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getTSBList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
        setLoading(false);
        setTsbList(res.list);
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

  const getShiftList = async () => {
    setScroll({ x: 1500 });
    try {
      setLoading(true);
      const res = await getShiftList_API(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setShiftList(res.list);
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
    return { ...res, list: list, prefixText: 'Total', secondText: 'rows', count: list.length }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000015(data, props.auth.token);
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
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);

    const dataOutput = {
      operatorDate: _timeZoneThai(value.operatorDate),
      tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
      shiftNo: value.shiftNo === "ทั้งหมด" ? null : value.shiftNo,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.15 รายงานเปรียบเทียบรายได้ MTC กับบริษัทนับเงิน แยกตามพนักงาน หลังตรวจสอบ"],
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
          exportExcelJs({
            reportType: "615",
            fileName: "6.15 รายงานเปรียบเทียบรายได้ MTC กับบริษัทนับเงิน แยกตามพนักงาน หลังตรวจสอบ",
            data: dataSource,
          })
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
            // scroll={scroll}
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            // pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={2} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={2}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={3}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={12} className="text-left" index={4}>
                      <Text></Text>
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
            header={header615}
            footer={[]}
            propsHeader={{
              headerText,
              TopicText: "6.15 รายงานเปรียบเทียบรายได้ MTC กับบริษัทนับเงิน แยกตามพนักงาน หลังตรวจสอบ",
            }}
            columnPerPage={13}
            rowPerPage={25}
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
)(ReportComparMtcAndMoneyCountingCompany);
