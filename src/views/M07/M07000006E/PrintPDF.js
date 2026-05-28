import React from 'react';
import { Table } from 'antd'
import {
    _isNull,
    _isEmpty
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

    render() {

        const columns = [
            {
                title: "สถิติสัญญาณดัง-รายเดือน",
                fixed: true,
                key: "detail",
                dataIndex: "detail",
                width: 110,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[0].columnName : "") : "",
                key: "month01",
                dataIndex: "month01",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[0].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[1].columnName : "") : "",
                key: "month02",
                dataIndex: "month02",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[1].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[2].columnName : "") : "",
                key: "month03",
                dataIndex: "month03",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[2].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[3].columnName : "") : "",
                key: "month04",
                dataIndex: "month04",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[3].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[4].columnName : "") : "",
                key: "month05",
                dataIndex: "month05",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[4].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[5].columnName : "") : "",
                key: "month06",
                dataIndex: "month06",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[5].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[6].columnName : "") : "",
                key: "month07",
                dataIndex: "month07",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[6].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[7].columnName : "") : "",
                key: "month08",
                dataIndex: "month08",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[7].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[8].columnName : "") : "",
                key: "month09",
                dataIndex: "month09",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[8].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[9].columnName : "") : "",
                key: "month10",
                dataIndex: "month10",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[9].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[10].columnName : "") : "",
                key: "month11",
                dataIndex: "month11",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[10].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[11].columnName : "") : "",
                key: "month12",
                dataIndex: "month12",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[11].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => !item.hidden);

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