import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import {
  _timeZoneThai,
  _isEmpty,
  _isNull,
} from "../../../tools/util";
import { Typography, Table, Button, Modal } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { GET_DATA_INFO_M080000017, DOWNLOAD_FILE_M080000017, GET_DOWNLOAD_FILE_INFO_M080000017, GET_CANCEL_FILE_INFO_M080000017 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const ReportSummaryBillingEtc = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [fileList, setFileList] = useState({ list: [] });
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [scroll, setScroll] = useState({});
  const [orderByList, setOrderByList] = useState([]);
  const [statusTypeList, setStatusTypeList] = useState([]);

  useEffect(() => {
    setScroll({ x: 1610, y: 600 });
    setOrderByList(["Operation Date", "Create Date"]);
    setStatusTypeList(["","Active", "Cancel"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
      title: <b>ลำดับ</b>,
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 60,
      fixed: true,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>เรียกเก็บเงินการผ่านทางของวันที่</b>,
      key: "billDateText",
      dataIndex: "billDateText",
      align: 'center',
      width: 120,
      fixed: true,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>M-Pass</b>,
      key: "trxMpass",
      dataIndex: "trxMpass",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>รวมเป็นเงิน</b>,
      key: "amountMpass",
      dataIndex: "amountMpass",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>Easy Pass</b>,
      key: "trxEasypass",
      dataIndex: "trxEasypass",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>รวมเป็นเงิน</b>,
      key: "amountEasypass",
      dataIndex: "amountEasypass",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>รวม</b>,
      key: "trxTotal",
      dataIndex: "trxTotal",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>รวมเป็นเงิน</b>,
      key: "amountTotal",
      dataIndex: "amountTotal",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>วันที่สร้าง</b>,
      key: "createDate",
      dataIndex: "createDate",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 7; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>ผู้สร้าง</b>,
      key: "createBy",
      dataIndex: "createBy",
      align: 'center',
      width: 140,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "left", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "left" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>สถานะ</b>,
      key: "statusText",
      dataIndex: "statusText",
      align: 'center',
      width: 50,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>วันที่ยกเลิก</b>,
      key: "cancelDate",
      dataIndex: "cancelDate",
      align: 'center',
      width: 100,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>ผู้ยกเลิก</b>,
      key: "cancelBy",
      dataIndex: "cancelBy",
      align: 'center',
      width: 140,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "left", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "left" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>ใบเรียกเก็บ</b>,
      key: "disableButton",
      dataIndex: "disableButton",
      align: 'center',
      width: 150,
      render: (text, record) => (
        record.disableButton ? "" : <Button size="small" type="primary" onClick={() => handleGetDownloadFile(record)}>ใบเรียกเก็บ</Button>
      ),
    },
    {
      title: <b>ยกเลิกใบเรียกเก็บ</b>,
      key: "disableButton",
      dataIndex: "disableButton",
      align: 'center',
      width: 150,
      render: (text, record) => (
        record.disableButton ? "" : <Button size="small" type="primary" onClick={() => handleGetCancelFile(record)}>ยกเลิกใบเรียกเก็บ</Button>
      ),
    },
  ];

  const columnsDownloadFile = [
    {
      title: <b>No.</b>,
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>File</b>,
      key: "fileName",
      dataIndex: "fileName",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-left">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>ดาวน์โหลด</b>,
      key: "pathName",
      dataIndex: "pathName",
      align: 'center',
      width: 60,
      render: (text, record) => (
        _isEmpty(record.pathName) ? "" : <Button size="small" onClick={() => handleDownloadFile(record)}>ดาวน์โหลด</Button>
      ),
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
          placeholder: "เลือกวันที่..."
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss").add(-31, 'days')
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
          ? moment("00:00:00", "HH:mm:ss").add(-1, 'days')
          : initialValue.endDate,
      },
    },
    {
      type: "select",
      option: {
        name: "orderById",
        label: "จัดเรียงตาม",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...orderByList],
            keyValue: "orderById",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกจัดเรียงตาม!",
          },
        ],
        initialValue: initialValue.orderById ? initialValue.orderById : "Operation Date",
      },
    },
    {
      type: "select",
      option: {
        name: "statusId",
        label: "สถานะ",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...statusTypeList],
            keyValue: "statusId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกสถานะ!",
          },
        ],
        initialValue: initialValue.statusId ? initialValue.statusId : "",
      },
    }
  ];

  const handleGetDownloadFile = async (item) => {
    if (!item.disableButton) {
      console.log("item.billDateText : ", item.billDateText);
      console.log("item.fileIndex : ", item.fileIndex);
      const sendItem = {
        billDateText: item.billDateText,
        fileIndex: item.fileIndex
      };
      try {
        setLoading(true);
        const res = await GET_DOWNLOAD_FILE_INFO_M080000017(sendItem, props.auth.token);
        console.log("res 8.17", res.fileList);
        if (res.status.code === "S200") {
          setLoading(false);
          setFileList(res.fileList);
          setVisiblePopup(true);
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
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have file",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const handleGetCancelFile = async (item) => {
    if (!item.disableButton) {
      console.log("item.billDateText : ", item.billDateText);
      console.log("item.createDateSearch : ", item.createDateSearch);
      console.log("item.createById : ", item.createById);
      console.log("item.fileIndex : ", item.fileIndex);
      const sendItem = {
        billDateText: item.billDateText,
        createDateSearch: item.createDateSearch,
        createById: item.createById,
        fileIndex: item.fileIndex
      };
      try {
        setLoading(true);
        const res = await GET_CANCEL_FILE_INFO_M080000017(sendItem, props.auth.token);
        console.log("res 8.17", res);
        if (res.status.code === "S200") {
          setLoading(false);
          const dataOutput = {
            startDate: _timeZoneThai(initialValue.startDate),
            endDate: _timeZoneThai(initialValue.endDate),
            orderById: initialValue.orderById === "Create Date" ? 2 : 1,
            statusId: initialValue.statusId === "" ? -1 : (initialValue.statusId === "Active" ? 1 : 0)
          };
          getDataDailyTollCollction(dataOutput);
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
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have file",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const handleDownloadFile = async (item) => {
    if (item.pathName) {
      console.log("item.pathName : ", item.pathName);
      console.log("item.fileName : ", item.fileName);
      const sendItem = {
        fileName: item.fileName,
        pathName: item.pathName,
      };
      try {
        await DOWNLOAD_FILE_M080000017(sendItem, props.auth.token);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have file",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const addIndex = (res) => {

    const totalAll = {
      no: 'รวม',
      billDateText: res.rowCount + ' Row',
      trxMpass: res.trxMpassTotal,
      amountMpass: res.amountMpassTotal,
      trxEasypass: res.trxEasypassTotal,
      amountEasypass: res.amountEasypassTotal,
      trxTotal: res.trxAllTotal,
      amountTotal: res.amountAllTotal,
      createDate: '',
      createBy: '',
      statusText: '',
      cancelDate: '',
      cancelBy: '',
      disableButton: true
    }


    return {
      ...res,
      list: [...res.list, totalAll]
    }
  }

  const action = [
    {
    }
  ];

  const getDataDailyTollCollction = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000017(dataOutput, props.auth.token);
      console.log("res 8.17", res);
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
    setInitialValue(value);

    const start = moment(value.startDate)
    const end = moment(value.endDate)
    const duration = moment.duration(end.diff(start));
    const days = duration.asDays();
    if (days <= 90) {
      const dataOutput = {
        startDate: _timeZoneThai(value.startDate),
        endDate: _timeZoneThai(value.endDate),
        orderById: value.orderById === "Create Date" ? 2 : 1,
        statusId: value.statusId === "" ? -1 : (value.statusId === "Active" ? 1 : 0)
      };
      getDataDailyTollCollction(dataOutput);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch. ",
        text: "Start date and End date out of lenght 90 days",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };


  return (
    <Skeleton loading={loading} active>
      <FormDefault
        fields={fields}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
        onFinish={handleOnFinish}
        action={action}
      />
      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          scroll={scroll}
          rowKey={(row, ind) => ind}
          columns={columnsOne}
          bordered
          dataSource={dataSource.list}
          pagination={{
            showSizeChanger: _isEmpty(dataSource.list) ? false : true,
            position: _isEmpty(dataSource.list) ? [] : ["topRight", "bottomRight"]
          }}
        />
      </div>

      <Modal
        maskClosable={false}
        centered
        footer={false}
        visible={visiblePopup}
        onCancel={() => {
          setVisiblePopup(false);
        }}
        width={600}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className={_isEmpty(fileList) ? "mt-30" : "mt-30"}>
          <Table
            size="small"
            // scroll={scroll}
            rowKey={(row, ind) => ind}
            columns={columnsDownloadFile}
            bordered
            dataSource={fileList}
          />
        </div>

      </Modal>

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
)(ReportSummaryBillingEtc);