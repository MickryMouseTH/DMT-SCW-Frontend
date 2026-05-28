/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading"

import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000012 } from "../../../service/api/report";
import { 
  // _exportFileExcel, 
  _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header612 } from "../../../tools/excel/header";
import { footer612 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const SupervisorAdjustment = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
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
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
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
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.endDate,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ด่าน",
      fixed: true,
      key: "plazaName",
      dataIndex: "plazaName",
      width: 60,
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
      title: "วันที่",
      fixed: true,
      key: "operationalDate",
      dataIndex: "operationalDate",
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
      title: "กะ",
      dataIndex: "shiftNo",
      key: "shiftNo",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "รหัส",
      dataIndex: "staffId",
      key: "staffId",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "ชื่อ",
      dataIndex: "staffFirstName",
      key: "staffFirstName",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "นามสกุล",
      dataIndex: "staffLastName",
      key: "staffLastName",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "ถุงเงิน",
      dataIndex: "bagNo",
      key: "bagNo",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "หัวหน้า",
      dataIndex: "supId",
      key: "supId",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "เงินสด",
      dataIndex: "cash",
      key: "cash",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "คูปอง",
      dataIndex: "coupon",
      key: "coupon",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "QRCode",
      dataIndex: "qr",
      key: "qr",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>)
    },
    {
      title: "รวม",
      dataIndex: "total",
      key: "total",
      width: 60,
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>)
    },
  ];

  const headerText = [
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })
    return { ...res, list: list,prefixText:'Total',secondText:'rows',count:list.length }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000012(data, props.auth.token);
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
    setDataToPrint({
      DataList,
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);

    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.12 รายงานส่งเงินขาด"],
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
          reportType: "612",
          fileName: "6.12 รายงานส่งเงินขาด",
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
                    <Table.Summary.Cell colSpan={5} className="text-left" index={3}>
                      <Text></Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.totalCash))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.totalCoupon))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.totalQr))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={4}>
                      <Text>{_isNull(Number(dataSource.totalTotal))}</Text>
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
            header={header612}
            footer={footer612}
            propsHeader={{
              headerText,
              TopicText: "6.12 รายงานส่งเงินขาด",
            }}
            columnPerPage={13}
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
)(SupervisorAdjustment);
