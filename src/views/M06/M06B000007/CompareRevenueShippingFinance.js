/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table,  Button, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import summaryData from "./SummaryData";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M06B000007, GET_DATA_EXPORT_M06B000007 } from "../../../service/api/report";
import { getTSBList_API } from "../../../service/api/util";
import moment from "moment";
import { header67B } from "../../../tools/excel/header";
import { footer67B } from "../../../tools/excel/footer";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY";

const CompareRevenueShipping = (props) => {
    const [dataSource, setDataSource] = useState({ list: [] });
    const [plazaList, setPlazaList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialValue, setInitialValue] = useState({});
    const [dataToPrint, setDataToPrint] = useState({});
    // const [scrollX, setScrollX] = useState({});
    const [checkDriff, setCheckDriff] = useState(false);
    const [dateExport, setDate] = useState(moment("00:00:00", "HH:mm:ss"));
    const [disabledButton, setDisabledButton] = useState(true);
    const [statusAudit, setStatusAudit] = useState("");

    const fields = [
        {
            type: "select",
            option: {
                name: "tsbId",
                label: "ด่าน",
                childrenProps: {
                    placeholder: "เลือกด่าน...",
                    optionValue: {
                        values: ["ทั้งหมด", ...plazaList],
                        keyName: "tsbNameTh",
                        keyValue: "tsbId",
                    },
                },
                rules: [
                    {
                        required: false,
                        message: "กรุณาเลือกด่าน!",
                    },
                ],
                initialValue: initialValue.tsbId ? initialValue.tsbId : "ทั้งหมด",
            },
        },
        {
            type: "datePicker",
            option: {
                name: "date",
                label: "วันที่",
                childrenProps: {
                    format: dateFormat,
                    placeholder: "เลือกวันที่...",
                    showTime: false
                },
                rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
                initialValue: _isEmpty(initialValue) ? moment() : initialValue.date,
            },
        },
        // {
        //     type: "input",
        //     option: {
        //         name: "staffId",
        //         label: "พนักงาน",
        //         childrenProps: { placeholder: "ป้อนรหัสพนักงาน..." },
        //         initialValue: initialValue.staffId,
        //     },
        // },
        // {
        //     type: "input",
        //     option: {
        //         name: "bagNo",
        //         label: "เลขถุงเงิน",
        //         childrenProps: { placeholder: "ป้อนเลขถุงเงิน..." },
        //         initialValue: initialValue.bagNo,
        //     },
        // },
        {
            type: "checkbox",
            option: {
                name: "checkbox",
                label: "เฉพาะที่มียอดแตกต่าง",
                onChange: (e) => onChange(e),
                checked: checkDriff
            },
        },

    ];

    const columns = [
        {
            title: "ลำดับ",
            dataIndex: "index",
            key: "index",
            width: 30,
            align: "center",
            fixed: true,
            render(text, record) {
                return {
                    props: {
                        className: "secondary bg_default",
                    },
                    children: (
                        <Text type="secondary" >
                            <div className="text-center">{(text)}</div>
                        </Text>
                    ),
                };
            },
        },

        {
            title: "ด่าน",
            fixed: "left",
            key: "tsbAbbreviation",
            dataIndex: "tsbAbbreviation",
            width: 30,
            align: "center",
            render(text, record) {
                return {
                    props: {
                        className: "bg_default",
                    },
                    children: (
                        <Text type="secondary"  >
                            {text}
                        </Text>
                    ),

                };
            },
        },
        {
            title: "QR CODE KTB",
            align: "center",
            children: [
                {
                    title: "BANK",
                    dataIndex: "amountQrBank",
                    key: "amountQrBank",
                    width: 60,
                    align: "center",
                    render: (text, record) => (
                        <div
                            style={{ textAlign: "right", cursor: "pointer" }}
                            onClick={() => handleDetail(record)}
                        >
                            {_isNull(text)}
                        </div>
                    ),
                },
                {
                    title: "SOD",
                    dataIndex: "amountQrSod",
                    key: "amountQrSod",
                    width: 60,
                    align: "center",
                    render: (text, record) => (
                        <div
                            style={{ textAlign: "right", cursor: "pointer" }}
                            onClick={() => handleDetail(record)}
                        >
                            {_isNull(text)}
                        </div>
                    ),
                },
                {
                    title: "ต่าง",
                    dataIndex: "amountQrDiff",
                    key: "amountQrDiff",
                    width: 40,
                    align: "center",
                    render: (text, record) => (
                        <div
                            style={{ textAlign: "right", cursor: "pointer" }}
                            onClick={() => handleDetail(record)}
                        >
                            {_isNull(text)}
                        </div>
                    ),
                },
            ],
        },
    ];

    const headerText = [
        { name: "กลุ่มด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
        { name: "วันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.date,'DD/MM/YYYY') : "" }
    ];

    useEffect(() => {
        if (props.location.value) {
            setInitialValue(props.location.value);
            const dataOutput = {
                date: _timeZoneThai(props.location.value.date),
                tsbId:
                    props.location.value.tsbId === "ทั้งหมด"
                        ? null
                        : props.location.value.tsbId,
            };
            setDate(props.location.value.date)
            getDataInfo(dataOutput);
        }
        getPlazaList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDetail = async (item) => {
        if (item.seckey) {
            try {
                await props.history.push({
                    pathname: `/reports/compare-revenue-shipping-companies-with-system-finance-qr-code/tod-detail/${item.seckey}`,
                    value: initialValue,
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

    const getPlazaList = async () => {
        // setScrollX({ x: 1600 })
        try {
            // setLoading(true);
            const res = await getTSBList_API(null, props.auth.token);
            if (res.status.code === "S200") {
                // setLoading(false);
                setPlazaList(res.list);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to fetch. ",
                    text: res.status.message,
                }).then(async (result) => {
                    if (result.value) {
                        // setLoading(false);
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
            const res = await GET_DATA_INFO_M06B000007(data, props.auth.token);
            if (res.status.code === "S200") {
                setLoading(false);
                setDataSource(res);
                setDisabledButton(res.sendToSap);
                setStatusAudit(res.statusAudit);
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
            tsbId: value.tsbId === "ทั้งหมด" ? null : value.tsbId,
            staffId: value.staffId ? value.staffId : null,
            bagNo: value.bagNo ? value.bagNo : null,
            checkDiff: checkDriff
        };
        setDate(value.date)
        getDataInfo(dataOutput);
    };

    const handleChangeIdToName = (DataList) => {

        const tsbPlaza = plazaList.find((e) => e.tsbId === DataList.tsbId)

        setDataToPrint(
            {
                DataList,
                plazaName: tsbPlaza ? tsbPlaza.tsbNameTh : "ทั้งหมด",
            })
    }


    const handlePrintFile = () => {
        handlePrint();
    };
    const printReportRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printReportRef.current,
        documentTitle: ["6.7.2 Compare Revenue Shipping Companies With System (QR code)"],
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
                        fileName: "6.7.2 Compare Revenue Shipping Companies With System (QR code)",
                        header: header67B,
                        footer: footer67B,
                    }),
                // disabled: dataSource.list.length < 1,
            },
        },
    ];

    const onChange = (e) => {
        setCheckDriff(e.target.checked)
    }

    const ExportToSap = async () => {
        const datainfo = {
            date: _timeZoneThai(dateExport)
        }
        setLoading(true);
        try {
            const res = await GET_DATA_EXPORT_M06B000007(datainfo, props.auth.token)
            if (res.status.code === "S200") {
                Swal.fire({
                    icon: "success",
                    title: "สำเร็จ",
                    text: "ส่งข้อมูลสำเร็จ",
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(async (result) => {
                    if (result.value) {
                        setLoading(false);
                        setStatusAudit(res.statusAudit);
                    }
                });
                setDisabledButton(true);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ผิดพลาด",
                    text: res.status.message,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(async (result) => {
                    if (result.value) {
                        setLoading(false);
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Skeleton loading={loading} active>
            <FormDefault fields={fields}
                onFinish={handleOnFinish}
                action={action}
                buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
                formWrapper={{ md: 24, lg: 19, xl: 21 }}
                typeButton="primary"
                submitText="ค้นหา"
            />
            <div className="mt-10">
                <Table
                    size="small"
                    rowKey={(row, ind) => ind}
                    // scroll={scrollX}
                    columns={columns}
                    bordered
                    dataSource={dataSource.list}
                    summary={summaryData}
                    pagination={false}
                />
            </div>
            <div className="d-none">
                <PrintReport
                    ref={printReportRef}
                    dataSource={dataSource}
                    header={header67B}
                    footer={footer67B}
                    columnPerPage={header67B.length}
                    propsHeader={{
                        headerText,
                        position: "d-flex justify-content-start",
                        colSpan: 12,
                        TopicText: "6.7.2 เปรียบเทียบรายได้ บริษัทขนส่ง กับ ข้อมูลจจากระบบ (QR Code) "
                    }}
                    oneColumnfooter={true}
                    columnTotalChange={{
                        tsbAbbreviation: "รวมทั้งหมด"
                    }}
                />
            </div>
            <Row justify='end' className='pt-20'>
                {/* <Col className="ant-col ant-col-md-24 ant-col-lg-14 ant-col-xl-14">
                    <Row xs={18} md={18} lg={18} style={{ marginLeft: 30 }}>
                        <Col className="ant-col ant-col-md-24 ant-col-lg-3 ant-col-xl-3">
                            <h3>{`V.30`}</h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalCountMccCoupon30 ? dataSource.totalCountMccCoupon30 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.rateCoupon30 ? dataSource.rateCoupon30 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalAmountCoupon30 ? (_isNull(Number(dataSource.totalAmountCoupon30.toFixed(2)))) : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-6 ant-col-xl-6" />
                    </Row>
                    <Row xs={18} md={18} lg={18} style={{ marginLeft: 30 }}>
                        <Col className="ant-col ant-col-md-24 ant-col-lg-3 ant-col-xl-3">
                            <h3>{`V.70`}</h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalCountMccCoupon70 ? dataSource.totalCountMccCoupon70 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.rateCoupon70 ? dataSource.rateCoupon70 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalAmountCoupon70 ? (_isNull(Number(dataSource.totalAmountCoupon70.toFixed(2)))) : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-6 ant-col-xl-6" />
                    </Row>
                    <Row xs={18} md={18} lg={18} style={{ marginLeft: 30 }}>
                        <Col className="ant-col ant-col-md-24 ant-col-lg-3 ant-col-xl-3">
                            <h3>{`V.35`}</h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalCountMccCoupon35 ? dataSource.totalCountMccCoupon35 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.rateCoupon35 ? dataSource.rateCoupon35 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalAmountCoupon35 ? (_isNull(Number(dataSource.totalAmountCoupon35.toFixed(2)))) : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-6 ant-col-xl-6" />
                    </Row>
                    <Row xs={18} md={18} lg={18} style={{ marginLeft: 30 }}>
                        <Col className="ant-col ant-col-md-24 ant-col-lg-3 ant-col-xl-3">
                            <h3>{`V.80`}</h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalCountMccCoupon80 ? dataSource.totalCountMccCoupon80 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.rateCoupon80 ? dataSource.rateCoupon80 : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalAmountCoupon80 ? (_isNull(Number(dataSource.totalAmountCoupon80.toFixed(2)))) : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-6 ant-col-xl-6" />
                    </Row>
                    <Row xs={18} md={18} lg={18} style={{ marginLeft: 30 }}>
                        <Col className="ant-col ant-col-md-24 ant-col-lg-3 ant-col-xl-3" />
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5" />
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5" />
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-5 ant-col-xl-5">
                            <h3>
                                {`${dataSource.totalAmountCouponAll ? (_isNull(Number(dataSource.totalAmountCouponAll.toFixed(2)))) : ""}`}{" "}
                            </h3>
                        </Col>
                        <Col className="ant-col text-right ant-col-md-24 ant-col-lg-6 ant-col-xl-6" />
                    </Row>
                </Col> */}

                <Col className="ant-col text-right ant-col-md-24 ant-col-lg-10 ant-col-xl-10">
                    <Row xs={18} md={18} lg={18} style={{ marginRight: 30 }} className="text-right">
                        <h3>{`สถานะ : `}</h3>
                        <div>&nbsp;&nbsp;</div>
                        <h3>
                            {" "}
                            {`${statusAudit ? statusAudit : ""}`}{" "}
                        </h3>
                        <div>&nbsp;&nbsp;</div>
                        <Button type="primary" disabled={disabledButton} onClick={ExportToSap}>Export to SAP</Button>
                    </Row>
                </Col>
            </Row>
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
)(CompareRevenueShipping);
