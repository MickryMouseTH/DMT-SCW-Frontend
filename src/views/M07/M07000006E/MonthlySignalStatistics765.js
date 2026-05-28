/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Table } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000006E } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero } from "../../../tools/util";
import { getYearListAPI } from "../../../service/api/util";
import PrintPDF from "./PrintPDF";

const MonthlySignalStatistics765 = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [yearList, setYearList] = useState([]);
  // ----- Fields search ------ //

  const fields = [
    {
      type: "select",
      option: {
        name: "yearId",
        label: "ปี",
        childrenProps: {
          placeholder: "เลือกปี...",
          optionValue: {
            values: [...yearList],
            keyName: "yearNameTh",
            keyValue: "yearId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกปี!",
          },
        ],
        initialValue: initialValue.yearId ? initialValue.yearId :
          moment().format('YYYY') > 2543 ? moment().format('YYYY') : Number(moment().format('YYYY')) + 543,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "สถิติสัญญาณดัง-รายเดือน",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 110,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : "") : "",
      key: "month01",
      dataIndex: "month01",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : "") : "",
      key: "month02",
      dataIndex: "month02",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : "") : "",
      key: "month03",
      dataIndex: "month03",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : "") : "",
      key: "month04",
      dataIndex: "month04",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : "") : "",
      key: "month05",
      dataIndex: "month05",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : "") : "",
      key: "month06",
      dataIndex: "month06",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : "") : "",
      key: "month07",
      dataIndex: "month07",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : "") : "",
      key: "month08",
      dataIndex: "month08",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : "") : "",
      key: "month09",
      dataIndex: "month09",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : "") : "",
      key: "month10",
      dataIndex: "month10",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : "") : "",
      key: "month11",
      dataIndex: "month11",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : "") : "",
      key: "month12",
      dataIndex: "month12",
      width: 40,
      align: "center",
      hidden: (!_isEmpty(dataSource)) ? (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].hidden : true) : true,
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "Total",
      key: "monthTotal",
      dataIndex: "monthTotal",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
          {_isNull(text)}
        </div>
      ),
    },
  ].filter(item => !item.hidden);

  const getYearList = async () => {
    try {
      setLoading(true);
      const res = await getYearListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setYearList(res.list);
        setLoading(false);
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

  const headerText = [
    { name: "ปี", value: dataToPrint.DataList ? String(dataToPrint.yearId - 543) : "" },
  ];

  useEffect(() => {
    getYearList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const sortData = (value) => {
    return {
      columnList: [...value.columnList],
      list: [...value.list],
      listExport: [...value.list]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000006E(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(sortData(res));
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
    const year = yearList.find((e) => e.yearId === DataList.yearId)
    setDataToPrint(
      {
        DataList,
        yearId: year ? year.yearId : "",
      })

  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      yearId: value.yearId === "" ? null : value.yearId,
    };
    getDataInfo(dataOutput);

  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.6.5 สถิติสัญญาณดังรายปี"],
  });

  const headerExcel = [
    { name: "สถิติสัญญาณดัง-รายเดือน", key: "detail", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[0].columnName : ""), key: "month01", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[1].columnName : ""), key: "month02", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[2].columnName : ""), key: "month03", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[3].columnName : ""), key: "month04", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[4].columnName : ""), key: "month05", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[5].columnName : ""), key: "month06", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[6].columnName : ""), key: "month07", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[7].columnName : ""), key: "month08", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[8].columnName : ""), key: "month09", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[9].columnName : ""), key: "month10", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[10].columnName : ""), key: "month11", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: (!_isEmpty(dataSource.columnList) ? dataSource.columnList[11].columnName : ""), key: "month12", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: ("Total"), key: "monthTotal", type: "nullColumn", align: 'center', className: 'text-right' }
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
            dataSource: { list: dataSource.listExport },
            fileName: "7.6.5 สถิติสัญญาณดังรายปี",
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
            scroll={scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={false}
          />
        </div>

        <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 24,
              TopicText: "7.6.5 สถิติสัญญาณดังรายปี"
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
)(MonthlySignalStatistics765);
