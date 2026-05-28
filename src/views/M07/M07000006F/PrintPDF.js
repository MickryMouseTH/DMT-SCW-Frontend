import React from 'react';
import { Table, Card, Row, Col } from 'antd'
import { _isNull } from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
import "./portrait.css";

class ComponentToPrint extends React.Component {

    render() {

        const columns1 = [
            {
                title: "",
                key: "detail",
                dataIndex: "detail",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'left' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "รถประเภท 1",
                key: "class1",
                dataIndex: "class1",
                width: 40,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'right' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "รถประเภท 2",
                key: "class2",
                dataIndex: "class2",
                width: 40,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'right' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "รวม",
                key: "classTotal",
                dataIndex: "classTotal",
                width: 40,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'right' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ];

        const columns2 = [
            {
                title: "ประเภทรถยกเว้นสัญญาณดัง",
                fixed: true,
                key: "detail",
                dataIndex: "detail",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'left' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "รวมรถประเภท 1 และ ประเภท 2",
                key: "classTotal",
                dataIndex: "classTotal",
                width: 40,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'right' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ];

        const columns3 = [
            {
                title: "รถสัญญาณดังประเภทต่างๆ",
                fixed: true,
                key: "detail",
                dataIndex: "detail",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'left' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "รวมรถประเภท 1 และ ประเภท 2",
                key: "classTotal",
                dataIndex: "classTotal",
                width: 40,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'right' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ];

        const columns4 = [
            {
                title: "หมายเหตุ",
                fixed: true,
                key: "detail",
                dataIndex: "detail",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'left' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "รวมรถประเภท 1 และ ประเภท 2",
                key: "classTotal",
                dataIndex: "classTotal",
                width: 40,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: 'right' }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ];

        return (
            <div className=" d-flex justify-content-center">
                <Card className="w-100 font-10">
                    <Row>
                        <Col span={24} className="text-center" style={{ marginTop: '-10px' }}>
                            <PrintHeader
                                {...this.props.HeaderBar}
                                page={1}
                                pageTotal={1}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="text-center mb-10">
                            <Table
                                rowKey={(record, index) => index}
                                dataSource={this.props.dataSource.listExportPdf1}
                                bordered
                                size="small"
                                className={`print-size print-border`}
                                pagination={false}
                                columns={columns1}
                                summary={null}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="text-center mb-10">
                            <Table
                                rowKey={(record, index) => index}
                                dataSource={this.props.dataSource.listExportPdf2}
                                bordered
                                size="small"
                                className={`print-size print-border`}
                                pagination={false}
                                columns={columns2}
                                summary={null}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="text-center mb-10">
                            <Table
                                rowKey={(record, index) => index}
                                dataSource={this.props.dataSource.listExportPdf3}
                                bordered
                                size="small"
                                className={`print-size print-border`}
                                pagination={false}
                                columns={columns3}
                                summary={null}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="text-center mb-10">
                            <Table
                                rowKey={(record, index) => index}
                                dataSource={this.props.dataSource.listExportPdf4}
                                bordered
                                size="small"
                                className={`print-size print-border`}
                                pagination={false}
                                columns={columns4}
                                summary={null}
                            />
                        </Col>
                    </Row>
                </Card>

            </div>
        );
    }
}


export default ComponentToPrint;