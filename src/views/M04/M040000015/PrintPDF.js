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
                title: "ลำดับ",
                fixed: true,
                key: "order",
                dataIndex: "order",
                width: 40,
                align: "center",
                render(text) {
                    return {
                        props: {
                            className: "secondary bg_default",
                        },
                        children: (
                            <Text type="secondary" align="left">
                                <div className="text-center">{_isNull(text)}</div>
                            </Text>
                        ),
                    };
                },
            },
            {
                title: "ด่าน",
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
                            <Text type="secondary" align="left">
                                <div className="text-left">{_isNull(text)}</div>
                            </Text>
                        ),
                    };
                },
            },
            {
                title: "ช่องทาง",
                key: "laneName",
                dataIndex: "laneName",
                width: 40,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-center">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "ชั่วโมงที่",
                key: "hour",
                dataIndex: "hour",
                width: 40,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-center">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "นาที",
                key: "minute",
                dataIndex: "minute",
                width: 40,
                align: "center",
                render: (text) => (
                    <Text align="center">
                        <div className="text-center">{_isNull(text)}</div>
                    </Text>
                )
            },
            {
                title: "จำนวน(คัน)",
                key: "traffic",
                dataIndex: "traffic",
                width: 40,
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
                    columns={columns}
                    summary={null}
                />

            </div>
        );
    }
}


export default ComponentToPrint;