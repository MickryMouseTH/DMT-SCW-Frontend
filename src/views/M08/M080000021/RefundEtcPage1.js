/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Table, Modal, Form, Row, Col, ConfigProvider } from "antd";
import Skeleton from "../../../components/loading/Loading";
import moment from "moment";
import DatePicker from "../../../components/dataPicker";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import locale from 'antd/es/date-picker/locale/th_TH';
import { GET_DATA_INFO_M080000021, SAVE_REFUND_DATE_M080000021 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";

const dateFormat = "DD/MM/YYYY";
const dateFormatTrx = "DD/MM/YYYY HH:mm";
const { Text } = Typography;

const RefundEtcPage1 = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [dateTypeIdList, setDateTypeIdList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectRecord, setSelectRecord] = useState(null);
  const [form] = Form.useForm();
  // ----- Fields search ------ //

  const fields = [
    {
      type: "select",
      option: {
        name: "dateTypeId",
        label: "ประเภทวันที่",
        childrenProps: {
          placeholder: "เลือกประเภทวันที่...",
          optionValue: {
            values: [...dateTypeIdList],
            keyValue: "dateTypeId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกประเภทวันที่!",
          },
        ],
        initialValue: initialValue.dateTypeId ? initialValue.dateTypeId : "ผ่านทาง",
      },
    },
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกจากวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกจากวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.startDate,
      },
    },
    {
      type: "input",
      option: {
        name: "pan",
        label: "หมายเลข PAN",
        childrenProps: { placeholder: "PAN..." },
        rules: [{ required: false, message: "กรุณาป้อน PAN!" }],
        initialValue: initialValue.pan,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกถึงวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกถึงวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.endDate,
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
      title: "Plaza",
      key: "plazaName",
      dataIndex: "plazaName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Lane",
      key: "laneName",
      dataIndex: "laneName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ผ่านทาง",
      dataIndex: "trxDate",
      key: "trxDate",
      width: 120,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {!_isEmpty(text) && (_setYearThai(text,dateFormatTrx))}
        </div>
      ),
    },
    {
      title: "PAN",
      dataIndex: "pan",
      key: "pan",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "fareAmount",
      key: "fareAmount",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "เลขที่ใบกำกับ",
      key: "invoiceNumber",
      dataIndex: "invoiceNumber",
      width: 90,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ใบกำกับ",
      key: "invoiceDate",
      dataIndex: "invoiceDate",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รหัสพนักงานบันทึก",
      key: "saveStaffNo",
      dataIndex: "saveStaffNo",
      width: 90,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันเวลาบันทึก",
      key: "saveDatetime",
      dataIndex: "saveDatetime",
      width: 120,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่คืนเงิน",
      key: "refundDate",
      dataIndex: "refundDate",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: 80,
      align: "center",
      render: (text, record) => (
        <span>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setSelectRecord(record);
              setVisiblePopup(true);
            }}
          >
            บันทึกวันที่คืนเงิน
          </Button>
        </span>
      ),
    },
  ];

  const headerText = [
    { name: "ประเภทวันที่", value: dataToPrint.DataList ? dataToPrint.DataList.dateTypeId : "" },
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,dateFormat) : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,dateFormat) : "", },
    { name: "PAN", value: dataToPrint.DataList ? dataToPrint.DataList.pan : "" },
  ];

  useEffect(() => {
    setScroll({ x: 1500, y: 600 });
    setDateTypeIdList(["ผ่านทาง", "บันทึก"]);
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        dateTypeId: props.location.value.dateTypeId === "ผ่านทาง" ? 1 : 2,
        pan: props.location.value.pan === "" ? null : props.location.value.pan,
      };
      getDataInfo(dataOutput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefundDate = async (data) => {
    try {
      console.log("onclick handleRefundDate ");
      form
      .validateFields()
      .then((data) => {
        saveRefundDate(data);
      })
      .catch(() => {
        console.log("validateFields err");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveRefundDate = async (data = null) => {
    try {
      const dataOutput1 = {
        refundDate: _timeZoneThai(data.refundDate),
        key: selectRecord.key,
      };
      setLoading(true);
      const res = await SAVE_REFUND_DATE_M080000021(dataOutput1, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setVisiblePopup(false);
        setSelectRecord(null);
        form.resetFields();
        const dataOutput2 = {
          startDate: _timeZoneThai(initialValue.startDate),
          endDate: _timeZoneThai(initialValue.endDate),
          dateTypeId: initialValue.dateTypeId === "ผ่านทาง" ? 1 : 2,
          pan: initialValue.pan,
        };
        getDataInfo(dataOutput2);
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
      const res = await GET_DATA_INFO_M080000021(data, props.auth.token);
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
    // const tsb = tsbList.find((e) => e.tsbId === DataList.tsbId);
    setDataToPrint({
      DataList,
      // tsbName: tsb ? tsb.tsbNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);

    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      dateTypeId: value.dateTypeId === "ผ่านทาง" ? 1 : 2,
      pan: value.pan,
    };
    getDataInfo(dataOutput);
  };

  const handlePage2 = async () => {
    try {
      await props.history.push({
        pathname: `/reports/refund-etc/page2`,
        value: initialValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const printReportRef = useRef();

  const action = [
    {
      name: "ยกเลิกรายการ",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePage2,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          exportExcelJs({
            reportType: "821",
            fileName: "8.21 คืนเงิน ETC",
            data: dataSource,
          })
      },
    },
  ];

  const optionDatePickerValidRefundDate = {
    name: "refundDate",
    label: "วันที่คืนเงิน",
    childrenProps: {
      format: dateFormat,
      placeholder: "วันที่คืนเงิน",
      showTime: false,
    },
    rules: [{ required: true, message: "กรุณาเลือกวันที่คืนเงิน!" }],
    initialValue: moment(),
  };

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
                    <Table.Summary.Cell colSpan={2} className="text-center" index={1}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={1}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={8} className="text-left" index={1}>
                      <Text></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
        <div className="d-none">
          {/* <PrintReport
            ref={printReportRef}
            dataSource={{
              ...dataSourceReport,
              rows: "rows",
              count: _isNull(Number(dataSourceReport.list.length)),
            }}
            header={header620}
            footer={footer620}
            propsHeader={{
              headerText,
              TopicText: "8.21 คืนเงิน ETC",
            }}
            columnPerPage={13}
            rowPerPage={25}
            propsClass="print-border-footer"
          /> */}
        </div>

        <Modal
          maskClosable={false}
          centered
          footer={false}
          visible={visiblePopup}
          onCancel={() => {
            form.resetFields();
            setVisiblePopup(false);
            setSelectRecord(null);
          }}
          width={600}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Form
            layout="vertical"
            className="custom-ant-form"
            size="large"
            form={form}
          >
            {selectRecord ? (
              <Row>
                <Row gutter={24} justify="start" type="flex" className="w-100">
                  <Col span={12}>
                    <div className="mb-3 ant-form-item-label">
                      <label>ด่าน</label>
                      {` : ${_isNull(selectRecord.plazaName)}`}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="mb-3 ant-form-item-label">
                      <label>ช่องทาง</label>
                      {` : ${_isNull(selectRecord.laneName)}`}
                    </div>
                  </Col>
                </Row>
                <Row gutter={24} justify="start" type="flex" className="w-100">
                  <Col span={12}>
                    <div className="mb-3 ant-form-item-label">
                      <label>วันที่ผ่านทาง</label>
                      {` : ${!_isEmpty(selectRecord.trxDate) &&
                        _setYearThai(selectRecord.trxDate,dateFormat)
                        }`}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="mb-3 ant-form-item-label">
                      <label>PAN</label>
                      {` : ${_isNull(selectRecord.pan)}`}
                    </div>
                  </Col>
                </Row>
              </Row>

            ) : (
              <></>
            )}
            <Row>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={14}>
                  <ConfigProvider locale="th_TH">
                    <Form.Item className="mb-3" label={optionDatePickerValidRefundDate.label} name={optionDatePickerValidRefundDate.name} rules={optionDatePickerValidRefundDate.rules}>
                      <DatePicker size={60} locale={locale} className="rounded-pill max-WS w-100"
                        {...optionDatePickerValidRefundDate.childrenProps}
                        disabledDate={false}
                      />
                    </Form.Item>
                  </ConfigProvider>
                </Col>
                <Col span={10}>
                  <Form.Item label={<div></div>}>
                    <Button
                      style={{ marginTop: -30 }}
                      htmlType="submit"
                      size="middle"
                      type="primary"
                      onClick={handleRefundDate}
                    >
                      บันทึก
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Row>
          </Form>
        </Modal>

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
)(RefundEtcPage1);
