/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Table } from "antd";
import Skeleton from "../../../components/loading/Loading";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000021 } from "../../../service/api/report";
import {_exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const AuditSellingCouponPage1 = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [dataSourceExcel, setDataSourceExcel] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
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
      title: "วันที่ปฏิบัติงาน",
      fixed: true,
      key: "operationDate",
      dataIndex: "operationDate",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ด่าน",
      fixed: true,
      key: "tsbName",
      dataIndex: "tsbName",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.column1) ? dataSource.column1 : "") : "",
      key: "couponQty35",
      dataIndex: "couponQty35",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.column2) ? dataSource.column2 : "") : "",
      dataIndex: "couponAmount35",
      key: "couponAmount35",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.column3) ? dataSource.column3 : "") : "",
      dataIndex: "couponGuardforceAmount35",
      key: "couponGuardforceAmount35",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.column4) ? dataSource.column4 : "") : "",
      dataIndex: "couponQty80",
      key: "couponQty80",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.column5) ? dataSource.column5 : "") : "",
      dataIndex: "couponAmount80",
      key: "couponAmount80",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.column6) ? dataSource.column6 : "") : "",
      dataIndex: "couponGuardforceAmount80",
      key: "couponGuardforceAmount80",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
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
              handlePage2(record);
            }}
          >
            หมายเลขเล่มคูปอง
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
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
      };
      getDataInfo(dataOutput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addDataExcel = (res) => {
    const totalAll = {
      operationDate: '',
      tsbName: 'รวมทั้งหมด',
      couponQty35Excel: res.couponQty35TotalExcel,
      couponAmount35Excel: res.couponAmount35TotalExcel,
      couponGuardforceAmount35Excel: res.couponGuardforceAmount35TotalExcel,
      couponQty80Excel: res.couponQty80TotalExcel,
      couponAmount80Excel: res.couponAmount80TotalExcel,
      couponGuardforceAmount80Excel: res.couponGuardforceAmount80TotalExcel
    }
    return { list: [...res.list, totalAll] }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000021(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
        setDataSourceExcel(addDataExcel(res));
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
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
    };
    getDataInfo(dataOutput);
  };

  const handlePage2 = async (data) => {
    try {
      await props.history.push({
        pathname: `/reports/audit-selling-coupon/page2`,
        data: data,
        value: initialValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const action = [
    {
      name: "ส่งออก",
      props: {
        type: "primary",        
        onClick: () => {
          _exportFileExcel({
            dataSource: { list: dataSource.list },
            fileName: "6.21 ตรวจสอบการขายเล่มคูปอง",
            header: headerExcel,
          });
        },
        // onClick: () =>
        //   exportExcelJs({
        //     reportType: "621",
        //     fileName: "6.21 ตรวจสอบการขายเล่มคูปอง",
        //     data: dataSourceExcel,
        //   })
      },
    },
  ];

  const headerExcel = [
    { name: "วันที่ปฏิบัติงาน", key: "operationDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ด่าน", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: (!_isEmpty(dataSource.column1) ? dataSource.column1 : ""), key: "couponQty35Excel", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.column2) ? dataSource.column2 : ""), key: "couponAmount35Excel", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.column3) ? dataSource.column3 : ""), key: "couponGuardforceAmount35Excel", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.column4) ? dataSource.column4 : ""), key: "couponQty80Excel", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.column5) ? dataSource.column5 : ""), key: "couponAmount80Excel", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.column6) ? dataSource.column6 : ""), key: "couponGuardforceAmount80Excel", type: "nullColumn", align: 'center', className: 'text-right' },
  ]

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
                      <Text>รวมทั้งหมด</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.couponQty35Total)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.couponAmount35Total)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.couponGuardforceAmount35Total)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.couponQty80Total)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.couponAmount80Total)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.couponGuardforceAmount80Total)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
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
                    <Table.Summary.Cell colSpan={5} className="text-left" index={1}>
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
              TopicText: "6.21 ตรวจสอบการขายเล่มคูปอง",
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
)(AuditSellingCouponPage1);
