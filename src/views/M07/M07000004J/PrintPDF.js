import React from 'react';
import { Table } from 'antd'
import { _isNull, _isEmpty } from '../../../tools/util'
import PrintHeader from "./printHeader";

class ComponentToPrint extends React.Component {

    render() {

        const column01 = [
            {
                title: "PLAZA",
                show: true,
                fixed: true,
                key: "tsbName",
                dataIndex: "tsbName",
                width: 200,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[0].columnName : "") : "",
                show: true,
                key: "day01",
                dataIndex: "day01",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[1].columnName : "") : "",
                show: true,
                key: "day02",
                dataIndex: "day02",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[2].columnName : "") : "",
                show: true,
                key: "day03",
                dataIndex: "day03",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[3].columnName : "") : "",
                show: true,
                key: "day04",
                dataIndex: "day04",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[4].columnName : "") : "",
                show: true,
                key: "day05",
                dataIndex: "day05",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[5].columnName : "") : "",
                show: true,
                key: "day06",
                dataIndex: "day06",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[6].columnName : "") : "",
                show: true,
                key: "day07",
                dataIndex: "day07",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[7].columnName : "") : "",
                show: true,
                key: "day08",
                dataIndex: "day08",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[8].columnName : "") : "",
                show: true,
                key: "day09",
                dataIndex: "day09",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[9].columnName : "") : "",
                show: true,
                key: "day10",
                dataIndex: "day10",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[10].columnName : "") : "",
                show: true,
                key: "day11",
                dataIndex: "day11",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[11].columnName : "") : "",
                show: true,
                key: "day12",
                dataIndex: "day12",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[12].columnName : "") : "",
                show: true,
                key: "day13",
                dataIndex: "day13",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[13].columnName : "") : "",
                show: true,
                key: "day14",
                dataIndex: "day14",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
        ].filter(item => item.show);

        
        const column02 = [
            {
                title: "PLAZA",
                show: true,
                fixed: true,
                key: "tsbName",
                dataIndex: "tsbName",
                width: 200,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[14].columnName : "") : "",
                show: true,
                key: "day15",
                dataIndex: "day15",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[15].columnName : "") : "",
                show: true,
                key: "day16",
                dataIndex: "day16",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[16].columnName : "") : "",
                show: true,
                key: "day17",
                dataIndex: "day17",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[17].columnName : "") : "",
                show: true,
                key: "day18",
                dataIndex: "day18",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[18].columnName : "") : "",
                show: true,
                key: "day19",
                dataIndex: "day19",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[19].columnName : "") : "",
                show: true,
                key: "day20",
                dataIndex: "day20",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[20].columnName : "") : "",
                show: true,
                key: "day21",
                dataIndex: "day21",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[21].columnName : "") : "",
                show: true,
                key: "day22",
                dataIndex: "day22",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[22].columnName : "") : "",
                show: true,
                key: "day23",
                dataIndex: "day23",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[23].columnName : "") : "",
                show: true,
                key: "day24",
                dataIndex: "day24",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[24].columnName : "") : "",
                show: true,
                key: "day25",
                dataIndex: "day25",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[25].columnName : "") : "",
                show: true,
                key: "day26",
                dataIndex: "day26",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[26].columnName : "") : "",
                show: true,
                key: "day27",
                dataIndex: "day27",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[27].columnName : "") : "",
                show: true,
                key: "day28",
                dataIndex: "day28",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
        ].filter(item => item.show);

        
        const column03 = [
            {
                title: "PLAZA",
                show: true,
                fixed: true,
                key: "tsbName",
                dataIndex: "tsbName",
                width: 200,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[28].columnName : "") : "",
                show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay29 : true,
                key: "day29",
                dataIndex: "day29",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[29].columnName : "") : "",
                show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay30 : true,
                key: "day30",
                dataIndex: "day30",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[30].columnName : "") : "",
                show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay31 : true,
                key: "day31",
                dataIndex: "day31",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "SUM",
                show: true,
                key: "summary",
                dataIndex: "summary",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "AVERAGE",
                show: true,
                key: "averageTrx",
                dataIndex: "averageTrx",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "NOS. OF VEHICLE",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "CLASS 1",
                        show: true,
                        key: "class1",
                        dataIndex: "class1",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "CLASS 2",
                        show: true,
                        key: "class2",
                        dataIndex: "class2",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                ],
            },
            {
                title: "REVENUES COLLECTED",
                show: true,
                key: "revenues",
                dataIndex: "revenues",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "AVERAGE",
                show: true,
                key: "averageRevenue",
                dataIndex: "averageRevenue",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
        ].filter(item => item.show);

        
        const column04 = [
            {
                title: "PLAZA",
                show: true,
                fixed: true,
                key: "tsbName",
                dataIndex: "tsbName",
                width: 200,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "SUM",
                show: true,
                key: "summaryHoliday",
                dataIndex: "summaryHoliday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "AVERAGE",
                show: true,
                key: "averageTrxHoliday",
                dataIndex: "averageTrxHoliday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "NOS. OF VEHICLE",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "CLASS 1",
                        show: true,
                        key: "class1Holiday",
                        dataIndex: "class1Holiday",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "CLASS 2",
                        show: true,
                        key: "class2Holiday",
                        dataIndex: "class2Holiday",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                ],
            },
            {
                title: "REVENUES COLLECTED",
                show: true,
                key: "revenuesHoliday",
                dataIndex: "revenuesHoliday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "AVERAGE",
                show: true,
                key: "averageRevenueHoliday",
                dataIndex: "averageRevenueHoliday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "SUM",
                show: true,
                key: "summaryWorkday",
                dataIndex: "summaryWorkday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "AVERAGE",
                show: true,
                key: "averageTrxWorkday",
                dataIndex: "averageTrxWorkday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "NOS. OF VEHICLE",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "CLASS 1",
                        show: true,
                        key: "class1Workday",
                        dataIndex: "class1Workday",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                    {
                        title: "CLASS 2",
                        show: true,
                        key: "class2Workday",
                        dataIndex: "class2Workday",
                        align: 'center',
                        width: 60,
                        render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                    },
                ],
            },
            {
                title: "REVENUES COLLECTED",
                show: true,
                key: "revenuesWorkday",
                dataIndex: "revenuesWorkday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
            {
                title: "AVERAGE",
                show: true,
                key: "averageRevenueWorkday",
                dataIndex: "averageRevenueWorkday",
                align: 'center',
                width: 60,
                render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
            },
        ].filter(item => item.show);

        return (
            <div style={{ margin: '0px 10px' }}>
                <PrintHeader
                    {...this.props.HeaderBar}
                    page={1}
                    pageTotal={4}
                />
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.listExport}
                    bordered
                    size="small"
                    className={`print-size7 print-border`}
                    pagination={false}
                    columns={column01}
                    summary={null}
                />
                <div className="page-break"></div>
                <PrintHeader
                    {...this.props.HeaderBar}
                    page={2}
                    pageTotal={4}
                />
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.listExport}
                    bordered
                    size="small"
                    className={`print-size7 print-border`}
                    pagination={false}
                    columns={column02}
                    summary={null}
                />
                <div className="page-break"></div>
                <PrintHeader
                    {...this.props.HeaderBar}
                    page={3}
                    pageTotal={4}
                />
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.listExport}
                    bordered
                    size="small"
                    className={`print-size7 print-border`}
                    pagination={false}
                    columns={column03}
                    summary={null}
                />
                <div className="page-break"></div>
                <PrintHeader
                    {...this.props.HeaderBar}
                    page={4}
                    pageTotal={4}
                />
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.listExport}
                    bordered
                    size="small"
                    className={`print-size7 print-border`}
                    pagination={false}
                    columns={column04}
                    summary={null}
                />
            </div>
        );
    }
}


export default ComponentToPrint;