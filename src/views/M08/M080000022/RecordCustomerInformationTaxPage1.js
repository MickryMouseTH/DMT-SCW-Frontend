/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Table } from "antd";
import Skeleton from "../../../components/loading/Loading";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M080000022, CANCEL_CUSTOMER_M080000022, DOWNLOAD_FILE_CONSENT_FORM_M080000022 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";

const { Text } = Typography;

const RecordCustomerInformationTaxPage1 = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  // ----- Fields search ------ //

  const fields = [
    {
      type: "input",
      option: {
        name: "icPassport",
        label: "IC PASSPORT",
        childrenProps: { placeholder: "IC PASSPORT..." },
        rules: [{ required: false, message: "กรุณาป้อน IC PASSPORT!" }],
        initialValue: initialValue.icPassport,
      },
    },
    {
      type: "input",
      option: {
        name: "sapId",
        label: "รหัสลูกค้า SAP",
        childrenProps: { placeholder: "รหัสลูกค้า SAP..." },
        rules: [{ required: false, message: "กรุณาป้อน รหัสลูกค้า SAP!" }],
        initialValue: initialValue.sapId,
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
      title: "CUSTOMER TYPE",
      key: "customerType",
      dataIndex: "customerType",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "IC PASSPORT",
      key: "icPassport",
      dataIndex: "icPassport",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รหัสลูกค้า SAP",
      key: "sapId",
      dataIndex: "sapId",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ผู้บันทึก",
      key: "saveStaffName",
      dataIndex: "saveStaffName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันเวลาบันทึก",
      dataIndex: "saveDatetime",
      key: "saveDatetime",
      width: 120,
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
              Swal.fire({
                title: 'ยืนยันยกเลิก',
                text: "ยืนยันยกเลิกข้อมูลลูกค้าที่ขอใบกำกับภาษี ใช่หรือไม่",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#91098f',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ยืนยัน'
              }).then((result) => {
                if (result.isConfirmed) {
                  calcelCustomer(record);
                }
              })
            }}
          >
            ยกเลิก
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    setScroll({ x: 1500, y: 600 });
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        sapId: props.location.value.sapId === "" ? null : props.location.value.sapId,
        icPassport: props.location.value.icPassport === "" ? null : props.location.value.icPassport,
      };
      getDataInfo(dataOutput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calcelCustomer = async (data = null) => {
    try {
      const dataOutput1 = {
        icPassport: data.icPassport,
      };
      setLoading(true);
      const res = await CANCEL_CUSTOMER_M080000022(dataOutput1, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        const dataOutput2 = {
          sapId: initialValue.sapId,
          icPassport: initialValue.icPassport,
        };
        getDataInfo(dataOutput2);
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "ยกเลิกข้อมูลลูกค้าที่ขอใบกำกับภาษีสำเร็จ",
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
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

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M080000022(data, props.auth.token);
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

  const handleOnFinish = (value) => {
    setInitialValue(value);
    const dataOutput = {
      sapId: value.sapId,
      icPassport: value.icPassport,
    };
    getDataInfo(dataOutput);
  };

  const handlePringConsentForm = async () => {
    try {
      const sendItem = {
      };
      await DOWNLOAD_FILE_CONSENT_FORM_M080000022(sendItem, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage2 = async () => {
    try {
      await props.history.push({
        pathname: `/reports/record-customer-information-tax/page2`,
        value: initialValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const action = [
    {
      name: "พิมพ์ CONSENT",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePringConsentForm,
      },
    },
    {
      name: "เพิ่มลูกค้า",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePage2,
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
                    <Table.Summary.Cell colSpan={2} className="text-center" index={1}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={1}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={3} className="text-left" index={1}>
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
)(RecordCustomerInformationTaxPage1);
