/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table, Card, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M07000006F } from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import PrintPDF from "./PrintPDF";
const { Text } = Typography;

const dateFormat = "DD/MM/YYYY";

const ReportDailyBellSignalStatistics = (props) => {
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
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment().add(-1, 'day') : initialValue.date,
      },
    },
  ];

  const columns1 = [
    {
      title: "",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'left' }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รถประเภท 1",
      key: "class1",
      dataIndex: "class1",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'right' }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รถประเภท 2",
      key: "class2",
      dataIndex: "class2",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'right' }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รวม",
      key: "classTotal",
      dataIndex: "classTotal",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'right' }}>
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      title: "ประเภทรถยกเว้นสัญญาณดัง",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'left' }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รวมรถประเภท 1 และ ประเภท 2",
      key: "classTotal",
      dataIndex: "classTotal",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'right' }}>
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const columns3 = [
    {
      title: "รถสัญญาณดังประเภทต่างๆ",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'left' }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รวมรถประเภท 1 และ ประเภท 2",
      key: "classTotal",
      dataIndex: "classTotal",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'right' }}>
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const columns4 = [
    {
      title: "หมายเหตุ",
      fixed: true,
      key: "detail",
      dataIndex: "detail",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'left' }}>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รวมรถประเภท 1 และ ประเภท 2",
      key: "classTotal",
      dataIndex: "classTotal",
      width: 40,
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: 'right' }}>
          {_isNull(text)}
        </div>
      ),
    },
  ];

  const headerText = [
    { name: "วันที่", value: dataToPrint.date ? _setYearThai(dataToPrint.date,dateFormat) : _setYearThai(moment(),dateFormat) },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const sortData = (value) => {

    const list1FooterTotal = {
      detail: "รวมทั้งสิ้น",
      class1: value.list1Class1Total,
      class2: value.list1Class2Total,
      classTotal: value.list1ClassTotal,
    }

    const list2FooterTotal = {
      detail: "รวมรถยกเว้น สัญญาณดัง",
      classTotal: value.list2ClassTotal,
    }

    const list3FooterTotal_1 = {
      detail: "รวมรถสัญญาณดังประเภทต่างๆ",
      classTotal: value.list3ClassTotal,
    }

    const list3FooterTotal_2 = {
      detail: "รวมรถยกเว้นสัญญาณดังและรวมรถสัญญาณดังประเภทต่างๆ",
      classTotal: value.list23ClassTotal,
    }

    const list4FooterTotal = {
      detail: "รวม	",
      classTotal: value.list4ClassTotal,
    }

    return {
      list1Class1Total: [value.list1Class1Total],
      list1Class2Total: [value.list1Class2Total],
      list1ClassTotal: [value.list1ClassTotal],
      list2ClassTotal: [value.list2ClassTotal],
      list3ClassTotal: [value.list3ClassTotal],
      list4ClassTotal: [value.list4ClassTotal],
      list23ClassTotal: [value.list23ClassTotal],
      list1: [...value.list1],
      list2: [...value.list2],
      list3: [...value.list3],
      list4: [...value.list4],
      listExportPdf1: [...value.list1, list1FooterTotal],
      listExportPdf2: [...value.list2, list2FooterTotal],
      listExportPdf3: [...value.list3, list3FooterTotal_1, list3FooterTotal_2],
      listExportPdf4: [...value.list4, list4FooterTotal],
      listExportExcel: [...value.list1, list1FooterTotal, {}, {}
        , { detail: 'ประเภทรถยกเว้นสัญญาณดัง', classTotal: 'รวมรถประเภท 1 และ ประเภท 2' }, ...value.list2, list2FooterTotal, {}, {}
        , { detail: 'รถสัญญาณดังประเภทต่างๆ', classTotal: 'รวมรถประเภท 1 และ ประเภท 2' }, ...value.list3, list3FooterTotal_1, list3FooterTotal_2, {}, {}
        , { detail: 'หมายเหตุ', classTotal: 'รวมรถประเภท 1 และ ประเภท 2' }, ...value.list4, list4FooterTotal, {}, {}]
    }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M07000006F(data, props.auth.token);
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
    setDataToPrint(
      {
        DataList,
      })
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      operationalDate: moment(_timeZoneThai(value.date)).format(
        "YYYY-MM-DD[T]00:00:00.000[+07]"
      ),
    };
    getDataInfo(dataOutput);

  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.6.6 สถิติสัญญาณดังรายละเอียดรายวัน"],
  });

  const headerExcel = [
    { name: "", key: "detail", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: ("รถประเภท 1"), key: "class1", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: ("รถประเภท 2"), key: "class2", type: "nullColumn", align: 'center', className: 'text-right' },
    { name: ("รวม"), key: "classTotal", type: "nullColumn", align: 'center', className: 'text-right' }
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
            dataSource: { list: dataSource.listExportExcel },
            fileName: "7.6.6 สถิติสัญญาณดังรายละเอียดรายวัน",
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
        <Card className="w-100 font-10">
          <Row>
            <Col span={12} className="text-center mb-10 pr-20">
              <Table
                size="small"
                rowKey={(row, ind) => ind}
                scroll={scroll}
                columns={columns1}
                bordered
                dataSource={dataSource.list1}
                loading={loading}
                pagination={false}
                summary={() => {
                  return (
                    <>
                      <Table.Summary.Row className="bg_default">
                        <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                          <Text>รวมทั้งสิ้น</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                          <Text>{_isNull(dataSource.list1Class1Total)}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                          <Text>{_isNull(dataSource.list1Class2Total)}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                          <Text>{_isNull(dataSource.list1ClassTotal)}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </Col>
            <Col span={12} className="text-center mb-10">
              <Row>
                <Col span={24} className="text-center mb-10">
                  <Table
                    size="small"
                    rowKey={(row, ind) => ind}
                    scroll={scroll}
                    columns={columns2}
                    bordered
                    dataSource={dataSource.list2}
                    loading={loading}
                    pagination={false}
                    summary={() => {
                      return (
                        <>
                          <Table.Summary.Row className="bg_default">
                            <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                              <Text>รวมรถยกเว้น สัญญาณดัง</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                              <Text>{_isNull(dataSource.list2ClassTotal)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} className="text-center mb-10">
                  <Table
                    size="small"
                    rowKey={(row, ind) => ind}
                    scroll={scroll}
                    columns={columns3}
                    bordered
                    dataSource={dataSource.list3}
                    loading={loading}
                    pagination={false}
                    summary={() => {
                      return (
                        <>
                          <Table.Summary.Row className="bg_default">
                            <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                              <Text>รวมรถสัญญาณดังประเภทต่างๆ</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                              <Text>{_isNull(dataSource.list3ClassTotal)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row className="bg_default">
                            <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                              <Text>รวมรถยกเว้นสัญญาณดังและรวมรถสัญญาณดังประเภทต่างๆ</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                              <Text>{_isNull(dataSource.list23ClassTotal)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} className="text-center mb-10">
                  <Table
                    size="small"
                    rowKey={(row, ind) => ind}
                    scroll={scroll}
                    columns={columns4}
                    bordered
                    dataSource={dataSource.list4}
                    loading={loading}
                    pagination={false}
                    summary={() => {
                      return (
                        <>
                          <Table.Summary.Row className="bg_default">
                            <Table.Summary.Cell colSpan={1} className="text-center" index={1}>
                              <Text>รวม</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                              <Text>{_isNull(dataSource.list4ClassTotal)}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <div className="d-none">
          <PrintPDF
            ref={printReportRef}
            dataSource={dataSource}
            HeaderBar={{
              headerText,
              position: "d-flex justify-content-start",
              colSpan: 24,
              TopicText: "7.6.6 สถิติสัญญาณดังรายละเอียดรายวัน"
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
)(ReportDailyBellSignalStatistics);
