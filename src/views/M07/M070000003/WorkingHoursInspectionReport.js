import React, { useEffect, useState, useRef } from "react";

import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";

import Swal from "sweetalert2";
import { connect } from "react-redux";
import {
  _exportFileExcel,
   _timeZoneThai,
  _isEmpty, _isNull, _setYearThai
} from "../../../tools/util";
import { Table} from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M070000003 } from "../../../service/api/report";
// import { getPlazaListAPI } from "../../../service/api/util";
import { header73 } from "../../../tools/excel/header";
import moment from "moment";
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const WorkingHoursInspectionReport = (props) => {
  const [dataSource,
    setDataSource
  ] = useState({ list: [] });
  const [loading,
    setLoading
  ] = useState(false);
  const [initialValue,
    setInitialValue
  ] = useState({});
  const [dataToPrint,
    setDataToPrint
  ] = useState({})
  const [scrollX,
    setScrollX
  ] = useState({})
  const [Listlength,setListlength] = useState({ list: [] })

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "date",
        label: "Operational Date",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: true
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เปิดดำเนินการ!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.date,
      },
    },
  ];

  const columns = [
    {
      title: "Plaza",
      fixed: true,
      key: "plazaName",
      dataIndex: "plazaName",
      align: "center",
      render: (value, row, index) => {
        const obj = {
          children:value,
          props:{}
        };
        if(value !== "") {obj.props.colSpan = 1;obj.props.rowSpan = FindListLength(value);}
        // if(value !== "") {obj.props.colSpan = 1;obj.props.rowSpan = 5;}
        else {obj.props.colSpan = 1;obj.props.rowSpan = 0;}
        return obj;
      }
    },
    {
      title: "Lane",
      fixed: true,
      key: "lane",
      dataIndex: "lane",
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Numbers of Data",
      dataIndex: "number",
      key: "number",
      align: "center",
      render: (text) => _isNull(text)
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      align: "center",
      render: (text) => _isNull(text)
    },
  ];

  const FindListLength = (data) =>{
    const result = Listlength&&Listlength.list.filter((item)=>item.plazaname===data)
    return !_isEmpty(result[0]) ? !_isEmpty(result[0].list) ? result[0].list.length : 1 : 1
  }

  const headerText = [
    { name: "Operational Date", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.date,dateFormat) : "" },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortData = (data) => {
    const resultList = data.list.map((item, idx) => {
      return item.list.map((children, indx) => {
        return { ...children, plazaName: indx === 0 ? item.plazaname : "" };
      })
    }).flat(Infinity);
    console.log({ ...data, list: resultList })
    return { ...data, list: resultList };
  }

  const getDataInfo = async (data = null) => {
    setScrollX({ x: 1300 })
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M070000003(data, props.auth.token);
      console.log("res 7.3", res)
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(sortData(res));
        setListlength(res)
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
    handleChangeIdToName(value)
    setInitialValue(value);
    const dataOutput = {
      date: _timeZoneThai(value.date),
    };

    getDataInfo(dataOutput);
  };

  const handleChangeIdToName = (DataList) => {

    // const plaza = plazaList.find((e) => e.plazaId === DataList.plaza)
    setDataToPrint(
      {
        DataList,
        // plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
      })
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.3 Working Hours Inspection Report"]
  });

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile
        // handlePrintFile,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel({
            dataSource: dataSource,
            fileName: "7.3 Working Hours Inspection Report",
            header: header73,
          }),
      },
    },
  ];
  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          fields={fields}
          onFinish={handleOnFinish}
          // onFinish={{}}
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          action={action}
        />
        <div className="mt-10">
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={columns.length <= 12 ? false : scrollX}
            columns={columns}
            bordered
            dataSource={dataSource.list}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={dataSource}
            header={header73}
            columnPerPage={header73.length}
            propsClass="text-right"
            colSumSpan={3}
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 12,
              TopicText: "7.3 รายงานการตรวจสอบชั่วโมงการทำงาน"
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
)(WorkingHoursInspectionReport);
