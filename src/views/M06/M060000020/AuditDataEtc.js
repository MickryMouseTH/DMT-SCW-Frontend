/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Table } from "antd";
import Skeleton from "../../../components/loading/Loading";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000020 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header620 } from "../../../tools/excel/header";
import { footer620 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const AuditDataEtc = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [dataSourceReport, setDataSourceReport] = useState({ list: [] });
  const [dateTypeIdList, setDateTypeIdList] = useState([]);
  const [indexNoList, setIndexNoList] = useState([]);
  const [payTypeIdList, setPayTypeIdList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
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
        initialValue: initialValue.dateTypeId ? initialValue.dateTypeId : "เรียกเก็บ",
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
      type: "select",
      option: {
        name: "indexNo",
        label: "ประเภทใบเรียกเก็บ",
        childrenProps: {
          placeholder: "เลือกประเภทใบเรียกเก็บ...",
          optionValue: {
            values: [...indexNoList],
            keyValue: "indexNo",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทใบเรียกเก็บ!",
          },
        ],
        initialValue: initialValue.indexNo ? initialValue.indexNo : "ทั้งหมด",
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
    {
      type: "select",
      option: {
        name: "payTypeId",
        label: "ประเภทชำระ",
        childrenProps: {
          placeholder: "เลือกประเภทชำระ...",
          optionValue: {
            values: [...payTypeIdList],
            keyValue: "payTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทชำระ!",
          },
        ],
        initialValue: initialValue.payTypeId ? initialValue.payTypeId : "ทั้งหมด",
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
      title: "วันที่เรียกเก็บ",
      key: "saveDate",
      dataIndex: "saveDate",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ผ่านทาง",
      dataIndex: "trxDate",
      key: "trxDate",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ประเภทใบเรียกเก็บ",
      dataIndex: "typeText",
      key: "typeText",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Easypass",
      align: "center",
      children: [
        {
          title: "จำนวน",
          dataIndex: "trxEasypass",
          key: "trxEasypass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "จำนวนเงิน",
          dataIndex: "amountEasypass",
          key: "amountEasypass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "จำนวนค้างชำระ",
          dataIndex: "trxOverdueEasypass",
          key: "trxOverdueEasypass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "จำนวนเงินค้างชำระ",
          dataIndex: "amountOverdueEasypass",
          key: "amountOverdueEasypass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "Mpass",
      align: "center",
      children: [
        {
          title: "จำนวน",
          dataIndex: "trxMpass",
          key: "trxMpass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "จำนวนเงิน",
          dataIndex: "amountMpass",
          key: "amountMpass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "จำนวนค้างชำระ",
          dataIndex: "trxOverdueMpass",
          key: "trxOverdueMpass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "จำนวนเงินค้างชำระ",
          dataIndex: "amountOverdueMpass",
          key: "amountOverdueMpass",
          width: 50,
          align: "center",
          render: (text, record) => (
            <div
              style={{ textAlign: "right" }}
            >
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "รายการค้างชำระ",
      dataIndex: "",
      key: "",
      width: 60,
      align: "center",
      render: (text, record) => (
        <span>
          <Button
            size="small"
            type="primary"
            onClick={() => listOverdue(record)}
          >
            แสดงรายการ
          </Button>
        </span>
      ),
    },
  ];

  const headerText = [
    { name: "ประเภทวันที่", value: dataToPrint.DataList ? dataToPrint.DataList.dateTypeId : "" },
    { name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,dateFormat) : "", },
    { name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,dateFormat) : "", },
    { name: "ประเภทใบเรียกเก็บ", value: dataToPrint.DataList ? dataToPrint.DataList.indexNo : "" },
    { name: "ประเภทชำระ", value: dataToPrint.DataList ? dataToPrint.DataList.payTypeId : "" },
  ];

  useEffect(() => {
    setScroll({ x: 1500, y: 600 });
    setDateTypeIdList(["เรียกเก็บ", "ผ่านทาง"]);
    setIndexNoList(["ทั้งหมด", "ใบเรียกเก็บ", "ใบเรียกเก็บเพิ่ม"]);
    setPayTypeIdList(["ทั้งหมด", "ชำระครบ", "ค้างขำระ"]);

    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        dateTypeId: props.location.value.dateTypeId === "เรียกเก็บ" ? 1 : 2,
        indexNo: props.location.value.indexNo === "ทั้งหมด" ? null : (props.location.value.indexNo === "ใบเรียกเก็บ" ? 1 : 2),
        payTypeId: props.location.value.payTypeId === "ทั้งหมด" ? null : (props.location.value.payTypeId === "ชำระครบ" ? 1 : 2),
      };
      getDataInfo(dataOutput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTotalPdf = (res) => {
    return {
      ...res, list: res.list,
      typeText: "รวมทั้งหมด",
      trxEasypass: `${res.trxEasypassTotal}`,
      amountEasypass: `${res.amountEasypassTotal}`,
      trxOverdueEasypass: `${res.trxOverdueEasypassTotal}`,
      amountOverdueEasypass: `${res.amountOverdueEasypassTotal}`,
      trxMpass: `${res.trxMpassTotal}`,
      amountMpass: `${res.amountMpassTotal}`,
      trxOverdueMpass: `${res.trxOverdueMpassTotal}`,
      amountOverdueMpass: `${res.amountOverdueMpassTotal}`,
    }
  }

  const listOverdue = async (data) => {
    try {
      await props.history.push({
        pathname: `/reports/audit-data-etc/page2`,
        data: data,
        value: initialValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000020(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(res);
        setDataSourceReport(addTotalPdf(res));
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
      dateTypeId: value.dateTypeId === "เรียกเก็บ" ? 1 : 2,
      indexNo: value.indexNo === "ทั้งหมด" ? null : (value.indexNo === "ใบเรียกเก็บ" ? 1 : 2),
      payTypeId: value.payTypeId === "ทั้งหมด" ? null : (value.payTypeId === "ชำระครบ" ? 1 : 2),
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.20 ตรวจสอบข้อมูล ETC"],
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
            reportType: "620",
            fileName: "6.20 ตรวจสอบข้อมูล ETC",
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
                    <Table.Summary.Cell colSpan={4} className="text-right" index={1}>
                      <Text>รวมทั้งหมด</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.trxEasypassTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.amountEasypassTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.trxOverdueEasypassTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.amountOverdueEasypassTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.trxMpassTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.amountMpassTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.trxOverdueMpassTotal)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(dataSource.amountOverdueMpassTotal)}</Text>
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
                    <Table.Summary.Cell colSpan={9} className="text-left" index={1}>
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
              ...dataSourceReport,
              rows: "rows",
              count: _isNull(Number(dataSourceReport.list.length)),
            }}
            header={header620}
            footer={footer620}
            propsHeader={{
              headerText,
              TopicText: "6.20 ตรวจสอบข้อมูล ETC",
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
)(AuditDataEtc);
