import React, { useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { _exportFileExcel, _isEmpty, _isNull, _timeZoneThai, _setYearThai } from "../../../tools/util";
import { header214 } from "../../../tools/excel/header";
import { footer214 } from "../../../tools/excel/footer";
import summaryData from "./SummaryData";
import { Table, Typography } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M020000014 } from "../../../service/api/report";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const ShiftTrafficVolume = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [scrollX, setScrollX] = useState({})
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({})

  // ----- Fields search ------ //
  const fields = [
    {
      type: "datePicker",
      option: {
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ด่าน",
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      align: "center",
      fixed: true,
      width: 10,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary" align="center">
              {text}
            </Text>
          ),
        };
      },
    },
    {
      title: "กะเช้า",
      dataIndex: "trxShiftA",
      key: "trxShiftA",
      width: 70,
      align: "center",
    },
    {
      title: "กะบ่าย",
      dataIndex: "trxShiftB",
      key: "trxShiftB",
      width: 70,
      align: "center",
    },
    {
      title: "กะดึก",
      dataIndex: "trxShiftC",
      key: "trxShiftC",
      width: 70,
      align: "center",
    },
    {
      title: "รวม",
      dataIndex: "trxTotal",
      width: 70,
      key: "trxTotal",
      align: "center",
      render: (text) => _isNull(text)
    },
  ];

  const headerText = [
    { name: "วันที่", value: dataToPrint ? _setYearThai(dataToPrint.date,dateFormat) : "" },
  ];

  const getDataInfo = async (data = null) => {
    setScrollX({ x: 1300 })
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M020000014(data, props.auth.token);
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
    setDataToPrint(value)
    setInitialValue(value);
    const date = _timeZoneThai(value.date)
    const dataOutput = {
      date: date,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };
  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["2.14 Traffic By Shift Report"]
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
          _exportFileExcel({
            dataSource: dataSource,
            fileName: "2.14 Traffic By Shift Report",
            header: header214,
            footer: footer214,
            columnOneCell: true
          }),
        // disabled: dataSource.list.length < 1,
      },
    },
  ];
  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          fields={fields}
          onFinish={handleOnFinish}
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
            summary={summaryData}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            rowPerPage={20}
            dataSource={dataSource}
            header={header214}
            footer={footer214}
            columnPerPage={header214.length}
            propsClass="text-right"
            propsHeader={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 8,
              TopicText: "2.14 ปริมาณจราจร รายกะ",
            }}
            oneColumnfooter={true}
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
)(ShiftTrafficVolume);
