/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { getTSBList_API, getSecurityMenuActionAPI } from "../../../service/api/util";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000016, CALCULATE_DATA_M060000016 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header616 } from "../../../tools/excel/header";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const ReportSummaryMoneyDificitMtc2 = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [tsbList, setTsbList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCalculate, setActiveCalculate] = useState(false);
  // ----- Fields search ------ //

  const fields = [
    // {
    //   type: "datePicker",
    //   option: {
    //     name: "operatorDate",
    //     label: "วันที่",
    //     childrenProps: {
    //       format: dateFormat,
    //       placeholder: "เลือกวันที่...",
    //       showTime: false,
    //     },
    //     rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
    //     initialValue: _isEmpty(initialValue)
    //       ? moment()
    //       : initialValue.operatorDate,
    //   },
    // },
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่..."
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
          placeholder: "เลือกวันที่..."
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
          : initialValue.endDate,
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
            values: ["ทั้งหมด", ...tsbList],
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
        initialValue: initialValue.tsbId ? initialValue.tsbId : "ทั้งหมด",
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
    {
      type: "select",
      option: {
        name: "calculateDataTsbId",
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
        initialValue: initialValue.calculateDataTsbId ? initialValue.calculateDataTsbId : "",
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
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ของรายได้",
      key: "revenueDate",
      dataIndex: "revenueDate",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ด่าน",
      key: "tsbName",
      dataIndex: "tsbName",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "เลขที่ถุงเงิน",
      key: "bagNo",
      dataIndex: "bagNo",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
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
      title: "กะทำงาน",
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
      title: "ชื่อ-นามสกุล",
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
      title: "ยอดเงินการใช้ QR",
      dataIndex: "mccQr",
      key: "mccQr",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ยอดเงินการนับ Coupon จาก GF",
      dataIndex: "mccCoupon",
      key: "mccCoupon",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ผลต่างคูปอง",
      dataIndex: "difCoupon",
      key: "difCoupon",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ยอดเงิน Sup.Adj",
      dataIndex: "supPrice",
      key: "supPrice",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Sup.Adj QR KTB",
      dataIndex: "supAdjustQrKtb",
      key: "supAdjustQrKtb",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "เงินอื่นๆ (ผชท ให้เงินเกิน)",
      dataIndex: "fareOther",
      key: "fareOther",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "เงินรับฝาก",
      dataIndex: "nonRevenue",
      key: "nonRevenue",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ยอดเงิน Audit.Adj",
      dataIndex: "auditPrice",
      key: "auditPrice",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ยอดเงินสดจาก Guardforce",
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
      title: "ยอดเงินสดจาก SOD หลัง ตรวจสอบ",
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
      title: "ผลตรวจสอบจากระบบ",
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
    {
      title: "ยอดเงินยกเว้น",
      dataIndex: "auditExcept",
      key: "auditExcept",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "สรุปผลตรวจสอบโดย Audit",
      dataIndex: "auditSummary",
      key: "auditSummary",
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
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.tsbName : "" },
  ];

  useEffect(() => {
    getTSBList();
    getSecurityMenuActionSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSecurityMenuActionSave = async () => {
    try {
      const dataOutput = {
        networkId: 10,
        menuId: 'M060000016',
        actionId: 'M060000016-CALCULATE',
      };
      setLoading(true);
      const res = await getSecurityMenuActionAPI(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setActiveCalculate(res.active);
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

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list, prefixText: 'Total', secondText: 'rows', count: list.length }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000016(data, props.auth.token);
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


  const calculateData = async (data = null) => {
    try {
      setLoading(true);
      const res = await CALCULATE_DATA_M060000016(data, props.auth.token);
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
    const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 31) {
      const dataOutput = {
        // operatorDate: _timeZoneThai(value.operatorDate),
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
        tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
      };
      getDataInfo(dataOutput);
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

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.16 สรุปรายงานเงินขาด(เกิน) (MTC)"],
  });

  const handleOnCalculateData = (value) => {
    setInitialValue(value);
    const dataOutput = {
      calculateDataDate: _timeZoneThai(value.calculateDataDate),
      calculateDataTsbId: value.calculateDataTsbId === "" ? null : value.calculateDataTsbId,
    };
    calculateData(dataOutput);
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
          exportExcelJs({
            reportType: "616",
            fileName: "6.16 สรุปรายงานเงินขาด(เกิน) (MTC)",
            data: dataSource,
          })
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          disabledButton={!activeCalculate}
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
                    <Table.Summary.Cell colSpan={3} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={2}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={3}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={14} className="text-left" index={4}>
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
            header={header616}
            footer={[]}
            propsHeader={{
              headerText,
              TopicText: "6.16 สรุปรายงานเงินขาด(เกิน) (MTC)",
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
)(ReportSummaryMoneyDificitMtc2);
