import React from 'react';
import { Typography,Table } from 'antd'
import {
    _isNull,
    // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
const { Text } = Typography;

class ComponentToPrint extends React.Component {

    render() {

        const columnsOne = [
            {
                title: "ช่องทาง",
                fixed: true,
                key: "laneName",
                dataIndex: "laneName",
                width: 70,
                align: "center",
                render(text, record) {
                    return {
                        props: {
                            className: "secondary bg_default",
                        },
                        children: (
                            <Text type="secondary" align="left">
                                <div className="text-left">{_isNull(text)}</div>
                            </Text>
                        ),
                    };
                },
            },
            {
                title: "1",
                key: "hour01",
                dataIndex: "hour01",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "2",
                key: "hour02",
                dataIndex: "hour02",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "3",
                key: "hour03",
                dataIndex: "hour03",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "4",
                key: "hour04",
                dataIndex: "hour04",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "5",
                key: "hour05",
                dataIndex: "hour05",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "6",
                key: "hour06",
                dataIndex: "hour06",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "7",
                key: "hour07",
                dataIndex: "hour07",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "8",
                key: "hour08",
                dataIndex: "hour08",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "9",
                key: "hour09",
                dataIndex: "hour09",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "10",
                key: "hour10",
                dataIndex: "hour10",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "11",
                key: "hour11",
                dataIndex: "hour11",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "12",
                key: "hour12",
                dataIndex: "hour12",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "13",
                key: "hour13",
                dataIndex: "hour13",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "14",
                key: "hour14",
                dataIndex: "hour14",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "15",
                key: "hour15",
                dataIndex: "hour15",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "16",
                key: "hour16",
                dataIndex: "hour16",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "17",
                key: "hour17",
                dataIndex: "hour17",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "18",
                key: "hour18",
                dataIndex: "hour18",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "19",
                key: "hour19",
                dataIndex: "hour19",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "20",
                key: "hour20",
                dataIndex: "hour20",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "21",
                key: "hour21",
                dataIndex: "hour21",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "22",
                key: "hour22",
                dataIndex: "hour22",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "23",
                key: "hour23",
                dataIndex: "hour23",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "24",
                key: "hour24",
                dataIndex: "hour24",
                width: 30,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-right">{_isNull(text)}</div>
                    </Text>
                )
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