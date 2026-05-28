import React from 'react';
import { Table } from 'antd'
import {
    _isNull,
    _setYearThai
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

    render() {

        const columnsOne = [
            {
                title: <b>ด่าน</b>,
                key: "plazaAbbreviation",
                dataIndex: "plazaAbbreviation",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                        children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                    };
                    if (row.plazaAbbreviation === "Total") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>ช่องทาง</b>,
                key: "laneAbbreviation",
                dataIndex: "laneAbbreviation",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                        children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                    };
                    if (row.laneAbbreviation === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>ประเภทการชำระ</b>,
                key: "paymentNameTH",
                dataIndex: "paymentNameTH",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                        children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                    };
                    if (row.paymentNameTH === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>หมายเลข OBU</b>,
                key: "panString",
                dataIndex: "panString",
                align: 'center',
                width: 60,
                render: (value, row, index) => {
                    const obj = {
                        children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                        props: {}
                    };
                    if (row.panString === '0xNull') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
                title: <b>DMT</b>,
                align: 'center',
                children: [
                    {
                        title: <b>ราคาค่าผ่านทาง</b>,
                        key: "dmtFare",
                        dataIndex: "dmtFare",
                        align: 'center',
                        width: 60,
                        render: (value, row, index) => {
                            const obj = {
                                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                            };
                            if (row.dmtFare === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            return obj;
                        }
                    },
                    {
                        title: <b>วันที่เรียกเก็บเงิน</b>,
                        key: "dmtDailyToll",
                        dataIndex: "dmtDailyToll",
                        align: 'center',
                        width: 100,
                        render: (value, row, index) => {
                            const obj = {
                                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value), "DD/MM/YYYY")}</div>,
                                props: {}
                            };
                            if (row.dmtDailyToll === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            return obj;
                        }
                    },
                    {
                        title: <b>วันเวลาผ่านทาง</b>,
                        key: "dmtTrxDate",
                        dataIndex: "dmtTrxDate",
                        align: 'center',
                        width: 140,
                        render: (value, row, index) => {
                            const obj = {
                                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value), "DD/MM/YYYY HH:mm:ss")}</div>,
                                props: {}
                            };
                            if (row.dmtTrxDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            return obj;
                        }
                    },
                ],
            },
            {
                title: <b>CS</b>,
                align: 'center',
                children: [
                    {
                        title: <b>วันเวลาผ่านทาง</b>,
                        key: "csTrxDate",
                        dataIndex: "csTrxDate",
                        align: 'center',
                        width: 140,
                        render: (value, row, index) => {
                            const obj = {
                                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value), "DD/MM/YYYY HH:mm:ss")}</div>,
                                props: {}
                            };
                            if (row.csTrxDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            return obj;
                        }
                    },
                    {
                        title: <b>วันเวลาตัดเงิน</b>,
                        key: "csDateTime",
                        dataIndex: "csDateTime",
                        align: 'center',
                        width: 140,
                        render: (value, row, index) => {
                            const obj = {
                                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value), "DD/MM/YYYY HH:mm:ss")}</div>,
                                props: {}
                            };
                            if (row.csDateTime === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            return obj;
                        }
                    },
                    {
                        title: <b>วันที่ Payment</b>,
                        key: "csPayDate",
                        dataIndex: "csPayDate",
                        align: 'center',
                        width: 100,
                        render: (value, row, index) => {
                            const obj = {
                                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "center" }}>{_setYearThai(_isNull(value), "DD/MM/YYYY")}</div>,
                                props: {}
                            };
                            if (row.csPayDate === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            return obj;
                        }
                    },
                    {
                        title: <b>ราคาค่าผ่านทาง</b>,
                        key: "csFare",
                        dataIndex: "csFare",
                        align: 'center',
                        width: 60,
                        render: (value, row, index) => {
                            const obj = {
                                children: row.plazaAbbreviation === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                            };
                            if (row.csFare === '') { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                            return obj;
                        }
                    },
                ],
            },
        ];


        return (
            <div style={{ margin: '0px 10px' }}>
                <PrintHeader
                    {...this.props.HeaderBar}
                    page={1}
                    pageTotal={1}
                />
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource}
                    bordered
                    size="small"
                    className={`print-size print-border`}
                    pagination={false}
                    columns={columnsOne}
                    summary={null}
                />
            </div>
        );
    }
}


export default ComponentToPrint;