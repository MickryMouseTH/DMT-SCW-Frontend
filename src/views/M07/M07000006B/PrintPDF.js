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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt1",
                        dataIndex: "trafficTxt1",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt2",
                        dataIndex: "trafficTxt2",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt3",
                dataIndex: "trafficTxt3",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[2].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt4",
                        dataIndex: "trafficTxt4",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt5",
                        dataIndex: "trafficTxt5",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt6",
                dataIndex: "trafficTxt6",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[5].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt7",
                        dataIndex: "trafficTxt7",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt8",
                        dataIndex: "trafficTxt8",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt9",
                dataIndex: "trafficTxt9",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[8].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt10",
                        dataIndex: "trafficTxt10",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt11",
                        dataIndex: "trafficTxt11",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt12",
                dataIndex: "trafficTxt12",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[11].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt13",
                        dataIndex: "trafficTxt13",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt14",
                        dataIndex: "trafficTxt14",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt15",
                dataIndex: "trafficTxt15",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[14].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt1",
                        dataIndex: "trafficTxt1",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt2",
                        dataIndex: "trafficTxt2",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt3",
                dataIndex: "trafficTxt3",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[2].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt4",
                        dataIndex: "trafficTxt4",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt5",
                        dataIndex: "trafficTxt5",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt6",
                dataIndex: "trafficTxt6",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[5].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt7",
                        dataIndex: "trafficTxt7",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt8",
                        dataIndex: "trafficTxt8",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt9",
                dataIndex: "trafficTxt9",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[8].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt10",
                        dataIndex: "trafficTxt10",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt11",
                        dataIndex: "trafficTxt11",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt12",
                dataIndex: "trafficTxt12",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[11].show : false) : false,
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
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt13",
                        dataIndex: "trafficTxt13",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt14",
                        dataIndex: "trafficTxt14",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt15",
                dataIndex: "trafficTxt15",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[14].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => item.show);


        const columns3 = [
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
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[0].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[0].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt1",
                        dataIndex: "trafficTxt1",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt2",
                        dataIndex: "trafficTxt2",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt3",
                dataIndex: "trafficTxt3",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[2].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[3].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[3].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt4",
                        dataIndex: "trafficTxt4",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt5",
                        dataIndex: "trafficTxt5",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt6",
                dataIndex: "trafficTxt6",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[5].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[6].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[6].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt7",
                        dataIndex: "trafficTxt7",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt8",
                        dataIndex: "trafficTxt8",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt9",
                dataIndex: "trafficTxt9",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[8].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[9].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[9].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt10",
                        dataIndex: "trafficTxt10",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt11",
                        dataIndex: "trafficTxt11",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt12",
                dataIndex: "trafficTxt12",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[11].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[12].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[12].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt13",
                        dataIndex: "trafficTxt13",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt14",
                        dataIndex: "trafficTxt14",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt15",
                dataIndex: "trafficTxt15",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[14].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => item.show);

        const columns4 = [
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
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[0].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[0].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt1",
                        dataIndex: "trafficTxt1",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt2",
                        dataIndex: "trafficTxt2",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt3",
                dataIndex: "trafficTxt3",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[2].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[3].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[3].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt4",
                        dataIndex: "trafficTxt4",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt5",
                        dataIndex: "trafficTxt5",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt6",
                dataIndex: "trafficTxt6",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[5].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[6].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[6].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt7",
                        dataIndex: "trafficTxt7",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt8",
                        dataIndex: "trafficTxt8",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt9",
                dataIndex: "trafficTxt9",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[8].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[9].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[9].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt10",
                        dataIndex: "trafficTxt10",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt11",
                        dataIndex: "trafficTxt11",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt12",
                dataIndex: "trafficTxt12",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[11].show : false) : false,
                render: (text, record) => (
                    <div className='text-right'>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[12].columnName : "") : "",
                align: 'center',
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[12].show : false) : false,
                children: [
                    {
                        title: "Class 1",
                        key: "trafficTxt13",
                        dataIndex: "trafficTxt13",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                    {
                        title: "Class 2",
                        key: "trafficTxt14",
                        dataIndex: "trafficTxt14",
                        width: 60,
                        align: "center",
                        render: (text, record) => (
                            <div className='text-right'>
                                {_isNull(text)}
                            </div>
                        ),
                    },
                ]
            },
            {
                title: "รวม",
                key: "trafficTxt15",
                dataIndex: "trafficTxt15",
                width: 60,
                align: "center",
                show: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList4) ? this.props.dataSource.pdfColumnList4[14].show : false) : false,
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
                <br />
                {!_isEmpty(this.props.dataSource.pdfList3) ?
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={this.props.dataSource.pdfList3}
                        bordered
                        size="small"
                        className={`print-size print-border`}
                        pagination={false}
                        columns={columns3}
                        summary={null}
                    />
                    : null}
                <br />
                {!_isEmpty(this.props.dataSource.pdfList4) ?
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={this.props.dataSource.pdfList4}
                        bordered
                        size="small"
                        className={`print-size print-border`}
                        pagination={false}
                        columns={columns4}
                        summary={null}
                    />
                    : null}
            </div>
        );
    }
}


export default ComponentToPrint;