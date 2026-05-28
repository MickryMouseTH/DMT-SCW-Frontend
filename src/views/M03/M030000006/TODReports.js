/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Table, Typography, Button } from "antd";
import Skeleton from "../../../components/loading/Loading"

import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault";
import { GET_DATA_INFO_M030000006 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import moment from "moment";
import { header36 } from "../../../tools/excel/header";
import { footer36 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const TODReports = (props) => {
  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scroll, setScroll] = useState({});

  const fields = [
    {
      type: "select",
      option: {
        name: "plaza",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
            keyName: "plazaNameTh",
            keyValue: "plazaId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "staffId",
        label: "รหัสพนักงาน",
        childrenProps: { placeholder: "ป้อนรหัสพนักงาน...", maxLength: "" },
        rules: [
          { required: false, message: "กรุณาป้อนรหัสพนักงาน!" },
          { pattern: /^-?\d*(\.\d*)?$/, message: "ป้อนข้อมูลเฉพาะตัวเลข" },
        ],
        initialValue: initialValue.staffId,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        // initialValue: initialValue.startDate,
        initialValue: _isEmpty(initialValue)
          ? moment('00:00:00', 'HH:mm:ss')
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
          // showTime: true,
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        // initialValue: initialValue.endDate,
        initialValue: _isEmpty(initialValue)
          ? moment('23:59:59', 'HH:mm:ss')
          // ? moment('00:00:00','HH:mm:ss')
          : initialValue.endDate,
      },
    },
  ];

  const columns = [
    {
      title: "ด่าน",
      fixed: "left",
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
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
      title: "วันที่ของรายได้",
      key: "operationalDate",
      dataIndex: "operationalDate",
      width: 100,
      align: "center",
      render: (text) => _isEmpty(text) ? "" : _setYearThai(text,"DD/MM/YYYY"),
    },
    {
      title: "กะ",
      key: "shiftTypeName",
      dataIndex: "shiftTypeName",
      width: 50,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "นำส่งครั้งที่",
      key: "declareNo",
      dataIndex: "declareNo",
      width: 90,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "วันเวลาเริ่มปฏิบัติงาน",
      key: "bojDateTime",
      dataIndex: "bojDateTime",
      width: 150,
      align: "center",
      render: (date) => _isEmpty(date) ? "" : _setYearThai(date,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "วันเวลาเลิกปฏิบัติงาน",
      key: "eojDateTime",
      dataIndex: "eojDateTime",
      width: 150,
      align: "center",
      render: (date) => _isEmpty(date) ? "" : _setYearThai(date,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Job no.",
      key: "jobNo",
      dataIndex: "jobNo",
      width: 150,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "วันเวลาที่ส่งเงิน",
      key: "declareDateTime",
      dataIndex: "declareDateTime",
      width: 150,
      align: "center",
      render: (date) => _isEmpty(date) ? "" : _setYearThai(date,"DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "รหัสพนักงาน",
      key: "staffId",
      dataIndex: "staffId",
      width: 100,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ชื่อพนักงาน",
      key: "staffNameTh",
      dataIndex: "staffNameTh",
      width: 150,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ถุงเงิน",
      key: "moneyBagNo",
      dataIndex: "moneyBagNo",
      width: 70,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ประเภทการนำส่ง",
      key: "declareType",
      dataIndex: "declareType",
      width: 120,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ยอดคำนวณได้",
      key: "totalAmount ",
      dataIndex: "totalAmount",
      width: 100,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ยอดนำส่ง",
      key: "declareAmount",
      dataIndex: "declareAmount",
      width: 90,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "ส่งขาด/ส่งเกิน",
      key: " differentAmount",
      dataIndex: "differentAmount",
      width: 120,
      align: "center",
      render: (text) => _isNull(text),
    },
    {
      title: "รายละเอียด",
      fixed: "right",
      key: "descript",
      dataIndex: "descript",
      width: 150,
      align: "center",
      render: (text, record) => (
        _isEmpty(record.seckey) ? "" : <Button size="small" onClick={() => handleDetail(record)}>รายละเอียด</Button>
      ),
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "รหัสพนักงาน",
      value: dataToPrint.DataList ? dataToPrint.DataList.staffId : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,"DD/MM/YYYY")
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,"DD/MM/YYYY")
        : "",
    },
  ];



  useEffect(() => {
    if (props.location.value) {
      setInitialValue(props.location.value);
      const dataOutput = {
        startDate: _timeZoneThai(props.location.value.startDate),
        endDate: _timeZoneThai(props.location.value.endDate),
        plazaId:
          props.location.value.plaza === "ทั้งหมด"
            ? null
            : props.location.value.plaza,
        staffId: _isEmpty(props.location.value.staffId)
          ? null
          : props.location.value.staffId,
      };
      setCurrentPage(props.location.currentPage);
      getDataInfo(dataOutput);
      setDataToPrint(props.location.dataToPrint);
    }

    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetail = async (item) => {
    if (item.seckey) {
      const sendItem = {
        item: item.seckey,
        auth: props.auth,
      };
      try {
        await props.history.push({
          // pathname: `/reports/tod-reports/reportdetail/${item.index}`,
          pathname: `/reports/tod-reports/reportdetail`,
          state: { ...sendItem },
          value: initialValue,
          currentPage: currentPage,
          dataToPrint: dataToPrint,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data",
        text: "Don't have seckey",
      }).then(async (result) => {
        if (result.value) {
          setLoading(false);
        }
      });
    }
  };

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      // return {...item,index:index + 1,differentAmount: item.declareAmount - item.totalAmount
      return {
        ...item, index: index + 1, differentAmount: item.declareType === "ขายคูปอง" ? 0 : item.declareAmount - (item.declareType === "ขายคูปอง" ? 0 : item.totalAmount)
        
      }
    })
    return { ...res, list: list }
  }

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setPlazaList(res.list);
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
      const res = await GET_DATA_INFO_M030000006(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        // setDataSource(res);
        setDataSource(addIndex(res))
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
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      staffId: _isEmpty(value.staffId) ? null : value.staffId,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.6 Tod Report"],
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
            dataSource: {
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            },
            fileName: "3.6 Tod Report",
            header: header36,
            footer: footer36,
          }),
        // disabled: dataSource.list.length < 1,
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
            scroll={columns.length > 12 ? scroll : false}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            pagination={{
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      <Text type="secondary" align="center">
                        {dataSource.list.length}
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left">
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
      <div className="d-none">
        <PrintReport
          ref={printReportRef}
          dataSource={{
            ...dataSource,
            rows: "rows",
            count: _isNull(Number(dataSource.list.length)),
          }}
          header={header36}
          footer={footer36}
          propsHeader={{
            position: "d-flex justify-content-center",
            colSpan: 12,
            headerText,
            TopicText: "3.6 รายงานการนำส่งเงิน",
          }}
          propsClass="print-border-footer"
          columnPerPage={header36.length}
          columnTotalChange={{
            operationalDate: "รวม"
          }}
        />
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TODReports);
