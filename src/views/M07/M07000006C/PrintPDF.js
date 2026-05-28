import React from 'react';
import { Table, Typography } from 'antd'
import {
    _isNull,
    _isEmpty
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
const { Text } = Typography;

class ComponentToPrint extends React.Component {

    render() {
        const columns1 = [
            {
                title: "ช่วงเวลา",
                fixed: true,
                key: "time",
                dataIndex: "time",
                width: 50,
                align: "center",
                show: true,
                render(text, record) {
                    return {
                        props: {
                            className: "secondary bg_default",
                        },
                        children: (
                            <Text type="secondary">
                                <div className="text-center">{text}</div>
                            </Text>
                        ),
                    };
                },
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[0].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[0].show : false) : false,
                key: "trafficTxt1",
                dataIndex: "trafficTxt1",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[1].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[1].show : false) : false,
                key: "trafficTxt2",
                dataIndex: "trafficTxt2",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[2].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[2].show : false) : false,
                key: "trafficTxt3",
                dataIndex: "trafficTxt3",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[3].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[3].show : false) : false,
                key: "trafficTxt4",
                dataIndex: "trafficTxt4",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[4].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[4].show : false) : false,
                key: "trafficTxt5",
                dataIndex: "trafficTxt5",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[5].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[5].show : false) : false,
                key: "trafficTxt6",
                dataIndex: "trafficTxt6",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[6].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[6].show : false) : false,
                key: "trafficTxt7",
                dataIndex: "trafficTxt7",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[7].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[7].show : false) : false,
                key: "trafficTxt8",
                dataIndex: "trafficTxt8",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[8].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[8].show : false) : false,
                key: "trafficTxt9",
                dataIndex: "trafficTxt9",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[9].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[9].show : false) : false,
                key: "trafficTxt10",
                dataIndex: "trafficTxt10",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[10].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[10].show : false) : false,
                key: "trafficTxt11",
                dataIndex: "trafficTxt11",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[11].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[11].show : false) : false,
                key: "trafficTxt12",
                dataIndex: "trafficTxt12",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[12].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[12].show : false) : false,
                key: "trafficTxt13",
                dataIndex: "trafficTxt13",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[13].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[13].show : false) : false,
                key: "trafficTxt14",
                dataIndex: "trafficTxt14",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[14].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[14].show : false) : false,
                key: "trafficTxt15",
                dataIndex: "trafficTxt15",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => item.show);

        const columns2 = [
            {
                title: "ช่วงเวลา",
                fixed: true,
                key: "time",
                dataIndex: "time",
                width: 50,
                align: "center",
                show: true,
                render(text, record) {
                    return {
                        props: {
                            className: "secondary bg_default",
                        },
                        children: (
                            <Text type="secondary">
                                <div className="text-center">{text}</div>
                            </Text>
                        ),
                    };
                },
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[0].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[0].show : false) : false,
                key: "trafficTxt1",
                dataIndex: "trafficTxt1",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[1].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[1].show : false) : false,
                key: "trafficTxt2",
                dataIndex: "trafficTxt2",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[2].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[2].show : false) : false,
                key: "trafficTxt3",
                dataIndex: "trafficTxt3",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[3].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[3].show : false) : false,
                key: "trafficTxt4",
                dataIndex: "trafficTxt4",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[4].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[4].show : false) : false,
                key: "trafficTxt5",
                dataIndex: "trafficTxt5",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[5].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[5].show : false) : false,
                key: "trafficTxt6",
                dataIndex: "trafficTxt6",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[6].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[6].show : false) : false,
                key: "trafficTxt7",
                dataIndex: "trafficTxt7",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[7].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[7].show : false) : false,
                key: "trafficTxt8",
                dataIndex: "trafficTxt8",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[8].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[8].show : false) : false,
                key: "trafficTxt9",
                dataIndex: "trafficTxt9",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[9].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[9].show : false) : false,
                key: "trafficTxt10",
                dataIndex: "trafficTxt10",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[10].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[10].show : false) : false,
                key: "trafficTxt11",
                dataIndex: "trafficTxt11",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[11].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[11].show : false) : false,
                key: "trafficTxt12",
                dataIndex: "trafficTxt12",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[12].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[12].show : false) : false,
                key: "trafficTxt13",
                dataIndex: "trafficTxt13",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[13].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[13].show : false) : false,
                key: "trafficTxt14",
                dataIndex: "trafficTxt14",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[14].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[14].show : false) : false,
                key: "trafficTxt15",
                dataIndex: "trafficTxt15",
                width: 60,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => item.show);

        return (
            <div style={{ margin: '0px 10px' }}>
                <PrintHeader
                    {...this.props.HeaderBar}
                    page={1}
                    pageTotal={1}
                />
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.pdfList1}
                    bordered
                    size="small"
                    className={`print-size print-border`}
                    pagination={false}
                    columns={columns1}
                    summary={null}
                />
                <br />
                {!_isEmpty(this.props.dataSource.pdfList2) ?
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={this.props.dataSource.pdfList2}
                        bordered
                        size="small"
                        className={`print-size print-border`}
                        pagination={false}
                        columns={columns2}
                        summary={null}
                    />
                    : null}
            </div>
        );
    }
}


export default ComponentToPrint;