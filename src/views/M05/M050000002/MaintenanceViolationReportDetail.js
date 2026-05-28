import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";

import { Typography, Table,Button, Row } from "antd";
import Skeleton from "../../../components/loading/Loading"

import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_DETAIL_M030000003 } from "../../../service/api/report";
import { _isNull, _exportFileExcel, _isEmpty,_isZero, _setYearThai } from "../../../tools/util";
import { header33_Detail } from "../../../tools/excel/header";
import { footer33_sub } from "../../../tools/excel/footer";
const { Text } = Typography;
const dataFormat = "DD/MM/YYYY HH:mm:ss"
const DailyViolationReports = (props) => {
  const [dataDetail, setDataDetail] = useState({ list: [] });
  const [loading, setLoading] = useState(false);
  const [dataToPrint, setDataToPrint] = useState({});
  // const [initialValue, setInitialValue] = useState({});

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      fixed: "left",
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
      title: "ช่องทาง",
      fixed: "left",
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
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
      title: "Job No.",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 70,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "Ntrx",
      dataIndex: "ntrx",
      key: "ntrx",
      width: 50,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "วันที่เวลาผ่านทาง",
      dataIndex: "trxDateTime",
      key: "trxDateTime",
      width: 150,
      align: "center",
      render: (text) =>
        !_isEmpty(text) &&
        _setYearThai(text,dataFormat),
    },
    {
      title: "รหัสพนักงาน",
      dataIndex: "staffId",
      key: "staffId",
      width: 100,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "TC/OBU",
      dataIndex: "tcClass",
      key: "tcClass",
      width: 90,
      align: "center",
      render(text) {
        return {
          children: (
            <Text align="center">
              {_isZero(text)}
            </Text>
          ),
        };
      }
    },
    {
      title: "AVC",
      dataIndex: "avcClass",
      key: "avcClass",
      width: 90,
      align: "center",
      render(text) {
        return {
          children: (
            <Text align="center">
              {_isZero(text)}
            </Text>
          ),
        };
      }
    },
    {
      title: "ค่าผ่านทาง",
      dataIndex: "amount",
      key: "amount",
      width: 90,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "ประเภทการชำระ",
      dataIndex: "paymentTypeName",
      key: "paymentTypeName",
      width: 110,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "เหตุผิดปรกติ",
      dataIndex: "abnormality",
      key: "abnormality",
      width: 130,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "ประเภทการผ่านด่าน",
      dataIndex: "passingType",
      key: "passingType",
      width: 150,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "ประเภทย่อย",
      dataIndex: "subType",
      key: "subType",
      width: 100,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "ทะเบียน",
      dataIndex: "plateNo",
      key: "plateNo",
      width: 120,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: 130,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "ยี่ห้อ-รุ่น",
      dataIndex: "brandModel",
      key: "brandModel",
      width: 80,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "สี",
      dataIndex: "brandModelColor",
      key: "brandModelColor",
      width: 100,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "สังกัด",
      dataIndex: "under",
      key: "under",
      width: 90,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "ศูนย์-ผู้รับแจ้ง",
      dataIndex: "centerRecipient",
      key: "centerRecipient",
      width: 110,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "ตำรวจ-ผู้รับแจ้ง",
      dataIndex: "policeRecipients",
      key: "policeRecipients",
      width: 110,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
    {
      title: "Supervisor",
      dataIndex: "supStaffId",
      key: "supStaffId",
      width: 90,
      align: "center",
      render: (text) =>
      _isNull(text)
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,dataFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,dataFormat)
        : "",
    },
  ];

  useEffect(() => {
    _isEmpty(props.location.state)
      ? goBack()
      : getDataInfo(props.location.state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    props.history.push({
      pathname: `/reports/violation-summary-reports`,
      value: props.location.value,
      dataToPrint: dataToPrint,
      currentPage: props.location.currentPage,
    });
  };

  const addIndex = (res) => {
    const list = res.list.map((item,index) => {
      return {...item,index:index + 1}
    })
    return {...res,list:list}
  }

  const getDataInfo = async (data = null) => {
    setDataToPrint(props.location.dataToPrint);
    try {
      setLoading(true);
      const detail = await GET_DATA_DETAIL_M030000003(data, props.auth.token);
      if (detail.status.code === "S200") {
        setDataDetail(addIndex(detail));
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: detail.status.message,
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

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["3.3 Violation Summary Detail Report"]
  });

  // const sumFooter = (dataSourceList) => {
  //   return { ...dataDetail, count: dataSourceList.length, rows: "rows" };
  // };

  const mergeArrayObject = (arr1 = [], arr2 = []) => {
    return arr1.map((item, index) => {
      return { ...arr2[index], ...item };
    });
  };

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        disabled: dataDetail.list.length < 1,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel({
            dataSource: {
              list: mergeArrayObject(dataDetail.list),
              rows: "rows",
              count: _isNull(Number(dataDetail.list.length)),
            },
            fileName: "3.3 Violation Summary Detail Report",
            header: header33_Detail,
            footer: footer33_sub,
          }),
        disabled: dataDetail.list.length < 1,
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
      <Row className="d-flex  justify-content-between">
            <Button onClick={goBack} className="m-15 ml-0 back-button-custom">
          Back
        </Button>
          <FormDefault
          className="text-right button-detail-mt-0"
          submitButton={false}
          actionBoutton={action}
        />
        </Row>
        <div className={_isEmpty(dataDetail.list) ? "mt-10" : "mt-table-native-15"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={{ x: 1300 }}
            columns={columns}
            bordered
            dataSource={dataDetail.list}
            pagination={_isEmpty(dataDetail.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center">
                      <Text>{_isNull(Number(dataDetail.list.length))}</Text>
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
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              list: mergeArrayObject(dataDetail.list),
              rows: "rows",
              count: _isNull(Number(dataDetail.list.length)),
            }}
            header={header33_Detail}
            footer={footer33_sub}
            propsClass="text-right"
            typeChild="nullColumn"
            propsHeader={{
              colSpan: 12,
              position:"d-flex justify-content-start",
              headerText,
              TopicText: "3.3 รายงานสรุปการการฝ่าฝืนรายวัน",
            }}
            columnPerPage={22}
            dataPerpage={7}
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
)(DailyViolationReports);
