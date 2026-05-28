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
                title: "Toll Revenue",
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
                        title: "Total (Vpm.)",
                        key: "trafficOriginalTotal",
                        dataIndex: "trafficOriginalTotal",
                        align: 'center',
                        width: 80,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "Avg. (Vpd.)",
                        key: "trafficOriginalAvg",
                        dataIndex: "trafficOriginalAvg",
                        align: 'center',
                        width: 80,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                ],
            },
            {
                title: "Traffic of the Northern Extension Tollway",
                align: 'center',
                children: [
                    {
                        title: "Total (Vpm.)",
                        key: "trafficNorthernTotal",
                        dataIndex: "trafficNorthernTotal",
                        align: 'center',
                        width: 80,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "Avg. (Vpd.)",
                        key: "trafficNorthernAvg",
                        dataIndex: "trafficNorthernAvg",
                        align: 'center',
                        width: 80,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                ],
            },
            {
                title: "Traffic of the Laksi (North), LKN",
                align: 'center',
                children: [
                    {
                        title: "Total (Vpm.)",
                        key: "trafficLaksiTotal",
                        dataIndex: "trafficLaksiTotal",
                        align: 'center',
                        width: 80,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "Avg. (Vpd.)",
                        key: "trafficLaksiAvg",
                        dataIndex: "trafficLaksiAvg",
                        align: 'center',
                        width: 80,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
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