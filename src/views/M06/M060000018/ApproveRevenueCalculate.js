/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { getRevenueTypeListAPI } from "../../../service/api/util";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000018, APPROVE_M060000018, CALCULATE_DATA_M060000018 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header618 } from "../../../tools/excel/header";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const ApproveRevenueCalculate = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [dataSourcePdf, setDataSourcePdf] = useState({ list: [] });
  const [dataSourceExcel, setDataSourceExcel] = useState({ list: [] });
  const [revenueTypeList, setRevenueTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  // ----- Fields search ------ //


  const fieldsApprove = [
    {
      type: "datePicker",
      option: {
        name: "revenueDate",
        label: "รายได้วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกรายได้วันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกรายได้วันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? null
          : initialValue.revenueDate,
      },
    },
    {
      type: "select",
      option: {
        name: "approveRevenueTypeId",
        label: "ประเภทรายได้",
        childrenProps: {
          placeholder: "เลือกประเภทรายได้...",
          optionValue: {
            values: [...revenueTypeList],
            keyName: "revenueTypeNameTh",
            keyValue: "revenueTypeId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกประเภทรายได้!",
          },
        ],
        initialValue: initialValue.approveRevenueTypeId ? initialValue.approveRevenueTypeId : "",
      },
    },
  ];
  
  const fieldsCalculateData = [
    {
      type: "datePicker",
      option: {
        name: "calculateDataDate",
        label: "ข้อมูลวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกข้อมูลวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกข้อมูลวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? null
          : initialValue.calculateDataDate,
      },
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
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกจากวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
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
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกถึงวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.endDate,
      },
    },
    {
      type: "select",
      option: {
        name: "revenueTypeId",
        label: "ประเภทรายได้",
        childrenProps: {
          placeholder: "เลือกประเภทรายได้...",
          optionValue: {
            values: ["ทั้งหมด", ...revenueTypeList],
            keyName: "revenueTypeNameTh",
            keyValue: "revenueTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทรายได้!",
          },
        ],
        initialValue: initialValue.revenueTypeId ? initialValue.revenueTypeId : "ทั้งหมด",
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ลำดับ",
      fixed: true,
      key: "order",
      dataIndex: "order",
      width: 30,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่รายได้",
      key: "revenueDate",
      dataIndex: "revenueDate",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ประเภทรายได้",
      dataIndex: "revenueType",
      key: "revenueType",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รหัสพนักงานอนุมัติ",
      dataIndex: "approveStaffNo",
      key: "approveStaffNo",
      width: 55,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "approveStaffName",
      key: "approveStaffName",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่อนุมัติ",
      key: "approveDate",
      dataIndex: "approveDate",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "AR AMT",
      dataIndex: "arAmt",
      key: "arAmt",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "BASETAX AMT",
      dataIndex: "baseTaxAmt",
      key: "baseTaxAmt",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "VAT AMT",
      dataIndex: "vatAmt",
      key: "vatAmt",
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
      name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate, dateFormat) : "",
    },
    {
      name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate, dateFormat) : "",
    },
    { name: "ประเภทรายได้", value: dataToPrint.DataList ? dataToPrint.revenueType : "" },
  ];

  useEffect(() => {
    getRevenueTypeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getRevenueTypeList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getRevenueTypeListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
        setLoading(false);
        setRevenueTypeList(res.list);
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

  const addIndexPdf = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })

    const totalAll = {
      order: '',
      approveDate: 'รวมรายได้ที่อนุมัติ',
      arAmt: res.arAmtTotal,
      baseTaxAmt: res.baseTaxAmtTotal,
      vatAmt: res.vatAmtTotal,
    }
    return { list: [...list, totalAll] }
  }

  const addIndexExcel = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })

    const totalAll = {
      order: '',
      approveDate: 'รวมรายได้ที่อนุมัติ',
      arAmtExcel: res.arAmtTotalExcel,
      baseTaxAmtExcel: res.baseTaxAmtTotalExcel,
      vatAmtExcel: res.vatAmtTotalExcel,
    }
    return { list: [...list, totalAll] }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000018(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
        setDataSourcePdf(addIndexPdf(res));
        setDataSourceExcel(addIndexExcel(res));
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

  const approve = async (data = null) => {
    try {
      setLoading(true);
      const res = await APPROVE_M060000018(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ! ",
        });
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
  
  const calculateData = async (data = null) => {
    try {
      setLoading(true);
      const res = await CALCULATE_DATA_M060000018(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "คำนวนข้อมูลสำเร็จ! ",
        });
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
    const revenueType = revenueTypeList.find((e) => e.revenueTypeId === DataList.revenueTypeId);
    setDataToPrint({
      DataList,
      revenueType: revenueType ? revenueType.revenueTypeNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      revenueType: value.revenueTypeId === "ทั้งหมด" ? null : value.revenueTypeId,
    };
    getDataInfo(dataOutput);
  };

  const handleOnApprove = (value) => {
    setInitialValue(value);
    const dataOutput = {
      revenueDate: _timeZoneThai(value.revenueDate),
      revenueType: value.approveRevenueTypeId === "ทั้งหมด" ? null : value.approveRevenueTypeId,
    };
    approve(dataOutput);
  };

  const handleOnCalculateData = (value) => {
    setInitialValue(value);
    const dataOutput = {
      calculateDataDate: _timeZoneThai(value.calculateDataDate)
    };
    calculateData(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.18 อนุมัติรายได้"],
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
            reportType: "618",
            fileName: "6.18 อนุมัติรายได้",
            data: dataSourceExcel,
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
          submitText="อนุมัติรายได้"
          fields={fieldsApprove}
          onFinish={handleOnApprove}
          action={[{}]}
        />
        <div style={{ height: 0, overflow: "hidden", border: "1px solid #e9ecef" }}></div>
        <br />
        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="คำนวนข้อมูล"
          fields={fieldsCalculateData}
          onFinish={handleOnCalculateData}
          action={[{}]}
        />
        <div style={{ height: 0, overflow: "hidden", border: "1px solid #e9ecef" }}></div>
        <br />
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
                    <Table.Summary.Cell colSpan={6} className="text-right" index={0}>
                      รวมรายได้ที่อนุมัติ
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={2}>
                      <Text>{_isNull(dataSource.arAmtTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={3}>
                      <Text>{_isNull(dataSource.baseTaxAmtTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(dataSource.vatAmtTotal)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
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
                    <Table.Summary.Cell colSpan={5} className="text-left" index={4}>
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
              ...dataSourcePdf,
              rows: "rows",
              count: _isNull(Number(dataSourcePdf.list.length)),
            }}
            header={header618}
            footer={[]}
            propsHeader={{
              headerText,
              TopicText: "6.18 อนุมัติรายได้",
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
)(ApproveRevenueCalculate);
