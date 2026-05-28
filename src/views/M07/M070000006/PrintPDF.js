import React from 'react';
import { Table } from 'antd'
import {
    _isNull,
    // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

    render() {
        const columns = [
            {
                title: "PLAZA",
                fixed: true,
                key: "plaza",
                dataIndex: "plaza",
                width: 120,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: this.props.dataSource.headerDay1,
                key: "revenueDay1Txt",
                dataIndex: "revenueDay1Txt",
                width: 80,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: this.props.dataSource.headerDay2,
                key: "revenueDay2Txt",
                dataIndex: "revenueDay2Txt",
                width: 80,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: this.props.dataSource.headerDay3,
                key: "revenueDay3Txt",
                dataIndex: "revenueDay3Txt",
                width: 80,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: this.props.dataSource.headerDay4,
                key: "revenueDay4Txt",
                dataIndex: "revenueDay4Txt",
                width: 80,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: this.props.dataSource.headerDay5,
                key: "revenueDay5Txt",
                dataIndex: "revenueDay5Txt",
                width: 80,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: this.props.dataSource.headerDay6,
                key: "revenueDay6Txt",
                dataIndex: "revenueDay6Txt",
                width: 80,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: this.props.dataSource.headerDay7,
                key: "revenueDay7Txt",
                dataIndex: "revenueDay7Txt",
                width: 80,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
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
                    dataSource={this.props.dataSource.list}
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