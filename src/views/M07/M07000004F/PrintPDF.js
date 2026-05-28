import React from 'react';
import { Table } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

    render() {

        const columns = [
            {
                title: "Month",
                fixed: true,
                key: "month",
                dataIndex: "month",
                width: 100,
                align: "center",
                render: (text) => (
                    <div style={{ textAlign: "left" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "Toll Revenue (Original & Northern Extension Tollway)",
                align: "center",
                children: [
                    {
                        title: "Total (Baht)",
                        dataIndex: "revenueTotal",
                        key: "revenueTotal",
                        width: 60,
                        align: "center",
                        render: (text) => (
                            <div style={{ textAlign: "right" }}>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Average (Baht/Day)",
                        dataIndex: "revenueAverage",
                        key: "revenueAverage",
                        width: 60,
                        align: "center",
                        render: (text) => (
                            <div style={{ textAlign: "right" }}>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ],
            },
            {
                title: "Traffic of the Original Tollway",
                align: 'center',
                children: [
                    {
                        title: "Northbound",
                        align: 'center',
                        children: [
                            {
                                title: "Total (Vpm.)",
                                key: "trafficOriginalNorthboundTotal",
                                dataIndex: "trafficOriginalNorthboundTotal",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Avg. (Vpd.)",
                                key: "trafficOriginalNorthboundAvg",
                                dataIndex: "trafficOriginalNorthboundAvg",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                        ],
                    },
                    {
                        title: "Southbound",
                        align: 'center',
                        children: [
                            {
                                title: "Total (Vpm.)",
                                key: "trafficOriginalSouthboundTotal",
                                dataIndex: "trafficOriginalSouthboundTotal",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Avg. (Vpd.)",
                                key: "trafficOriginalSouthboundAvg",
                                dataIndex: "trafficOriginalSouthboundAvg",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                        ],
                    },
                ],
            },
            {
                title: "Traffic of the Northern Extension Tollway",
                align: 'center',
                children: [
                    {
                        title: "Northbound",
                        align: 'center',
                        children: [
                            {
                                title: "Total (Vpm.)",
                                key: "trafficNorthernNorthboundTotal",
                                dataIndex: "trafficNorthernNorthboundTotal",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Avg. (Vpd.)",
                                key: "trafficNorthernNorthboundAvg",
                                dataIndex: "trafficNorthernNorthboundAvg",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                        ],
                    },
                    {
                        title: "Southbound",
                        align: 'center',
                        children: [
                            {
                                title: "Total (Vpm.)",
                                key: "trafficNorthernSouthboundTotal",
                                dataIndex: "trafficNorthernSouthboundTotal",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Avg. (Vpd.)",
                                key: "trafficNorthernSouthboundAvg",
                                dataIndex: "trafficNorthernSouthboundAvg",
                                align: 'center',
                                width: 80,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                        ],
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