import React from 'react';
import { Table } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "./printHeader";

class ComponentToPrint extends React.Component {

    render() {

        const columns = [
            {
                title: "Period",
                fixed: true,
                key: "period",
                dataIndex: "period",
                width: 70,
                align: "center",
                render: (text) => (
                    <div style={{ textAlign: "center" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "Class of Traffic",
                fixed: true,
                key: "classOfTraffic",
                dataIndex: "classOfTraffic",
                align: 'center',
                width: 40,
                render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
            },
            {
                title: "Toll Plaza",
                align: 'center',
                children: [
                    {
                        title: "Original Tollway Northbound",
                        align: 'center',
                        children: [
                            {
                                title: "Din Daeng",
                                key: "nbDinDaeng",
                                dataIndex: "nbDinDaeng",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Sutthisan",
                                key: "nbSutthisan",
                                dataIndex: "nbSutthisan",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "LP (N)",
                                key: "nbLpn",
                                dataIndex: "nbLpn",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Ratchada Pisek",
                                key: "nbRatchadaPisek",
                                dataIndex: "nbRatchadaPisek",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Bangkhen",
                                key: "nbBangkhen",
                                dataIndex: "nbBangkhen",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                        ],
                    },
                    {
                        title: "Total NB",
                        key: "nbTotal",
                        dataIndex: "nbTotal",
                        align: 'center',
                        width: 40,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "Original Tollway Southbound",
                        align: 'center',
                        children: [
                            {
                                title: "Don Muang",
                                key: "sbDonMuang",
                                dataIndex: "sbDonMuang",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Laksi",
                                key: "sbLaksi",
                                dataIndex: "sbLaksi",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "CW",
                                key: "sbCw",
                                dataIndex: "sbCw",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "LP (S)",
                                key: "sbLps",
                                dataIndex: "sbLps",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                        ],
                    },
                    {
                        title: "Total SB",
                        key: "sbTotal",
                        dataIndex: "sbTotal",
                        align: 'center',
                        width: 40,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "Total NB & SB",
                        key: "nbSbTotal",
                        dataIndex: "nbSbTotal",
                        align: 'center',
                        width: 40,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    }, {
                        title: "Northern Extension",
                        align: 'center',
                        children: [
                            {
                                title: "Anusorn Sathan NB",
                                key: "neAnusornSathan",
                                dataIndex: "neAnusornSathan",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Don Muang SB",
                                key: "neDonMuang",
                                dataIndex: "neDonMuang",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Total NB&SB TN + TS",
                                key: "neTotal",
                                dataIndex: "neTotal",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Laksi NB",
                                key: "neLaksi",
                                dataIndex: "neLaksi",
                                align: 'center',
                                width: 40,
                                render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                            },
                            {
                                title: "Total Revenue",
                                key: "totalRevenue",
                                dataIndex: "totalRevenue",
                                align: 'center',
                                width: 40,
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
                    pageTotal={2}
                />
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource}
                    bordered
                    size="small"
                    className={`print-size7 print-border`}
                    pagination={false}
                    columns={columns}
                    summary={null}
                />
            </div>
        );
    }
}


export default ComponentToPrint;