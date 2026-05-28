import React from 'react';
import { Typography, Table } from 'antd'
import {
    _isNull,
    // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
const { Text } = Typography;

class ComponentToPrint extends React.Component {

    render() {

        const columns = [
            {
                title: <b>ลำดับ</b>,
                fixed: true,
                key: "order",
                dataIndex: "order",
                width: 30,
                align: "center",
                render(text) {
                    return {
                        props: {
                            className: "secondary bg_default",
                        },
                        children: (
                            <Text type="secondary" align="center">
                                <div className="text-center"
                                >{_isNull(text)}</div>
                            </Text>
                        ),
                    };
                },
            },
            {
                title: <b>ด่าน</b>,
                fixed: true,
                key: "plazaName",
                dataIndex: "plazaName",
                width: 70,
                align: "center",
                render(text) {
                    return {
                        props: {
                            className: "secondary bg_default",
                        },
                        children: (
                            <Text type="secondary" align="center">
                                <div className="text-center"
                                >{_isNull(text)}</div>
                            </Text>
                        ),
                    };
                },
            },
            {
                title: <b>จำนวนรายการ (เที่ยว)</b>,
                key: "",
                align: 'center',
                children: [
                    {
                        title: <b>MTC</b>,
                        key: "trafficMtc",
                        dataIndex: "trafficMtc",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div>
                    },
                    {
                        title: <b>Easy Pass</b>,
                        key: "trafficEasypass",
                        dataIndex: "trafficEasypass",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                    {
                        title: <b>M-Pass</b>,
                        key: "trafficMpass",
                        dataIndex: "trafficMpass",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                    {
                        title: <b>ฝ่าด่าน</b>,
                        key: "trafficVio",
                        dataIndex: "trafficVio",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                    {
                        title: <b>รวม ETC</b>,
                        key: "trafficTotalEtc",
                        dataIndex: "trafficTotalEtc",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                    {
                        title: <b>รวม M&E</b>,
                        key: "trafficTotalMtcEtc",
                        dataIndex: "trafficTotalMtcEtc",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                ],
            },
            {
                title: <b>ETC ผ่านไม่ได้</b>,
                key: "",
                align: 'center',
                children: [
                    {
                        title: <b>ไม่พบบัตร</b>,
                        key: "trafficAbnormalNotFound",
                        dataIndex: "trafficAbnormalNotFound",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div>
                    },
                    {
                        title: <b>เงินไม่พอ</b>,
                        key: "trafficAbnormalNotEnoughMoney",
                        dataIndex: "trafficAbnormalNotEnoughMoney",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                    {
                        title: <b>รวม</b>,
                        key: "trafficAbnormalTotal",
                        dataIndex: "trafficAbnormalTotal",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                ],
            },
            {
                title: <b>% การใช้</b>,
                key: "",
                align: 'center',
                children: [
                    {
                        title: <b>MTC</b>,
                        key: "percentMtc",
                        dataIndex: "percentMtc",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div>
                    },
                    {
                        title: <b>ETC</b>,
                        key: "percentEtc",
                        dataIndex: "percentEtc",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
                    },
                ],
            },
            {
                title: <b>% ETC ผ่านไม่ได้</b>,
                key: "",
                align: 'center',
                children: [
                    {
                        title: <b>ผ่านได้</b>,
                        key: "percentEtcNormal",
                        dataIndex: "percentEtcNormal",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div>
                    },
                    {
                        title: <b>ผ่านไม่ได้</b>,
                        key: "percentEtcAbnormal",
                        dataIndex: "percentEtcAbnormal",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}
                        >{_isNull(text)}</div >
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
                    columns={columns}
                    summary={null}
                />

            </div>
        );
    }
}


export default ComponentToPrint;