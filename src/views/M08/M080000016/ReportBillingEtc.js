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

import { GET_DATA_INFO_M080000016, DOWNLOAD_FILE_M080000016, CREATE_FILE_M080000016 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const ReportPassingPaymentOverdue = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [fileList, setFileList] = useState({ list: [] });
  const [visiblePopup, setVisiblePopup] = useState(false);

  useEffect(() => {
    // setScroll({ x: 1300 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
      title: <b>ลำดับ</b>,
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 60,
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
      width: 140,
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
      width: 60,
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
      width: 80,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>Easy Pass</b>,
      key: "trxEasypass",
      dataIndex: "trxEasypass",
      align: 'center',
      width: 140,
      render: (value, row) => {
        const obj = {
          children: row.no === "รวม" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
          props: {}
        };
        if (row.no === "รวม") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
        return obj;
      }
    },
    {
      title: <b>รวมเป็นเงิน</b>,
      key: "amountEasypass",
      dataIndex: "amountEasypass",
      align: 'center',
      width: 80,
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
      width: 180,
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
      title: <b>ใบเรียกเก็บ</b>,
      key: "disableButton",
      dataIndex: "disableButton",
      align: 'center',
      width: 360,
      render: (text, record) => (
        record.disableButton ? "" : <Button size="small" type="primary" onClick={() => handleCreateFile(record)}>สร้างใบเรียกเก็บ</Button>
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
          ? moment("00:00:00", "HH:mm:ss").add(-30, 'days')
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
    }
  ];

  const handleCreateFile = async (item) => {
    if (!item.disableButton) {
      console.log("item.billDate : ", item.billDate);
      console.log("item.billDateText : ", item.billDateText);
      const sendItem = {
        billDateText: item.billDateText
      };
      try {
        setLoading(true);
        const res = await CREATE_FILE_M080000016(sendItem, props.auth.token);
        console.log("res 8.16", res);
        if (res.status.code === "S200") {
          setLoading(false);
          setFileList(res.fileList);
          const dataOutput = {
            startDate: _timeZoneThai(initialValue.startDate),
            endDate: _timeZoneThai(initialValue.endDate)
          };
          getDataDailyTollCollction(dataOutput);
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

  const handleDownloadFile = async (item) => {
    if (item.pathName) {
      const sendItem = {
        fileName: item.fileName,
        pathName: item.pathName,
      };
      try {
        await DOWNLOAD_FILE_M080000016(sendItem, props.auth.token);
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
      const res = await GET_DATA_INFO_M080000016(dataOutput, props.auth.token);
      console.log("res 8.16", res);
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
        endDate: _timeZoneThai(value.endDate)
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
          // scroll={scroll}
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
        <div className={_isEmpty(fileList) ? "mt-10" : "mt-0"}>
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
)(ReportPassingPaymentOverdue);