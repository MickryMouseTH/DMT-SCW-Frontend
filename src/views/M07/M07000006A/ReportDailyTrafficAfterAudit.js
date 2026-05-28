/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000006A } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import PrintPDF from "./PrintPDF";

const dateFormat = "DD/MM/YYYY";

const ReportDailyTrafficAfterAudit = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
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
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        // initialValue: initialValue.startDate,
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
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        // initialValue: initialValue.endDate,
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : // ? moment('00:00:00','HH:mm:ss')
          initialValue.endDate,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "PLAZA",
      fixed: true,
      key: "plaza",
      dataIndex: "plaza",
      width: 120,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: dataSource.headerDay1,
      key: "trafficDay1Txt",
      dataIndex: "trafficDay1Txt",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: dataSource.headerDay2,
      key: "trafficDay2Txt",
      dataIndex: "trafficDay2Txt",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: dataSource.headerDay3,
      key: "trafficDay3Txt",
      dataIndex: "trafficDay3Txt",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: dataSource.headerDay4,
      key: "trafficDay4Txt",
      dataIndex: "trafficDay4Txt",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: dataSource.headerDay5,
      key: "trafficDay5Txt",
      dataIndex: "trafficDay5Txt",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: dataSource.headerDay6,
      key: "trafficDay6Txt",
      dataIndex: "trafficDay6Txt",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: dataSource.headerDay7,
      key: "trafficDay7Txt",
      dataIndex: "trafficDay7Txt",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const headerText = [
    {
      name: "จากวันที่", value: dataToPrint.DataList ?
      _setYearThai(dataToPrint.DataList.startDate,dateFormat) : "",
    },
    {
      name: "ถึงวันที่", value: dataToPrint.DataList ?
      _setYearThai(dataToPrint.DataList.endDate,dateFormat) : "",
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000006A(data, props.auth.token);
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

  const handleChangeIdToName = (DataList) => {
    setDataToPrint({
      DataList,
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 7) {
      const dataOutput = {
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
      };
      getDataInfo(dataOutput);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch. ",
        text: "Start date and End date out of lenght 7 days",
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
    documentTitle: ["7.6.1 รายงานปริมาณจราจรทั้งหมดรายวันหลังตรวจสอบ"],
  });

  const headerExcel = [
    { name: "PLAZA", key: "plaza", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: dataSource.headerDay1, key: "trafficDay1Txt", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: dataSource.headerDay2, key: "trafficDay2Txt", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: dataSource.headerDay3, key: "trafficDay3Txt", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: dataSource.headerDay4, key: "trafficDay4Txt", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: dataSource.headerDay5, key: "trafficDay5Txt", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: dataSource.headerDay6, key: "trafficDay6Txt", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: dataSource.headerDay7, key: "trafficDay7Txt", type: "nullColumn", align: 'center', className: 'text-right' }
  ]

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
        onClick: () => {
          _exportFileExcel({
            dataSource: { list: dataSource.list },
            fileName: "7.6.1 รายงานปริมาณจราจรทั้งหมดรายวันหลังตรวจสอบ",
            header: headerExcel,
          });
        },
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
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
          />
        </div>
        <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 6,
              TopicText: "7.6.1 รายงานปริมาณจราจรทั้งหมดรายวันหลังตรวจสอบ"
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
)(ReportDailyTrafficAfterAudit);
