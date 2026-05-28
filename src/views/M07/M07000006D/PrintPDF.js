import React from 'react';
import { Table } from 'antd'
import {
    _isNull,
    _isEmpty
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

    render() {

        const columns1 = [
            {
                title: "สถิติสัญญาณดัง/ วันที่",
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
                key: "day01",
                dataIndex: "day01",
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
                key: "day02",
                dataIndex: "day02",
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
                key: "day03",
                dataIndex: "day03",
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
                key: "day04",
                dataIndex: "day04",
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
                key: "day05",
                dataIndex: "day05",
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
                key: "day06",
                dataIndex: "day06",
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
                key: "day07",
                dataIndex: "day07",
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
                key: "day08",
                dataIndex: "day08",
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
                key: "day09",
                dataIndex: "day09",
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
                key: "day10",
                dataIndex: "day10",
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
                key: "day11",
                dataIndex: "day11",
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
                key: "day12",
                dataIndex: "day12",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[11].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[12].columnName : "") : "",
                key: "day13",
                dataIndex: "day13",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[12].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[13].columnName : "") : "",
                key: "day14",
                dataIndex: "day14",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[13].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[14].columnName : "") : "",
                key: "day15",
                dataIndex: "day15",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[14].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[15].columnName : "") : "",
                key: "day16",
                dataIndex: "day16",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[15].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => !item.hidden);

        const columns2 = [
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[16].columnName : "") : "",
                key: "day17",
                dataIndex: "day17",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[16].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[17].columnName : "") : "",
                key: "day18",
                dataIndex: "day18",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[17].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[18].columnName : "") : "",
                key: "day19",
                dataIndex: "day19",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[18].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[19].columnName : "") : "",
                key: "day20",
                dataIndex: "day20",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[19].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[20].columnName : "") : "",
                key: "day21",
                dataIndex: "day21",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[20].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[21].columnName : "") : "",
                key: "day22",
                dataIndex: "day22",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[21].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[22].columnName : "") : "",
                key: "day23",
                dataIndex: "day23",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[22].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[23].columnName : "") : "",
                key: "day24",
                dataIndex: "day24",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[23].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[24].columnName : "") : "",
                key: "day25",
                dataIndex: "day25",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[24].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[25].columnName : "") : "",
                key: "day26",
                dataIndex: "day26",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[25].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[26].columnName : "") : "",
                key: "day27",
                dataIndex: "day27",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[26].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[27].columnName : "") : "",
                key: "day28",
                dataIndex: "day28",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[27].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[28].columnName : "") : "",
                key: "day29",
                dataIndex: "day29",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[28].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[29].columnName : "") : "",
                key: "day30",
                dataIndex: "day30",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[29].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[30].columnName : "") : "",
                key: "day31",
                dataIndex: "day31",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[30].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "Total",
                key: "dayTotal",
                dataIndex: "dayTotal",
                width: 40,
                align: "center",
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => !item.hidden);

        const columns3 = [
            {
                title: "รายละเอียดการตรวจสอบ/วันที่",
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
                key: "day01",
                dataIndex: "day01",
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
                key: "day02",
                dataIndex: "day02",
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
                key: "day03",
                dataIndex: "day03",
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
                key: "day04",
                dataIndex: "day04",
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
                key: "day05",
                dataIndex: "day05",
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
                key: "day06",
                dataIndex: "day06",
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
                key: "day07",
                dataIndex: "day07",
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
                key: "day08",
                dataIndex: "day08",
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
                key: "day09",
                dataIndex: "day09",
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
                key: "day10",
                dataIndex: "day10",
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
                key: "day11",
                dataIndex: "day11",
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
                key: "day12",
                dataIndex: "day12",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[11].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[12].columnName : "") : "",
                key: "day13",
                dataIndex: "day13",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[12].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[13].columnName : "") : "",
                key: "day14",
                dataIndex: "day14",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[13].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[14].columnName : "") : "",
                key: "day15",
                dataIndex: "day15",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[14].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[15].columnName : "") : "",
                key: "day16",
                dataIndex: "day16",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[15].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => !item.hidden);

        const columns4 = [
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[16].columnName : "") : "",
                key: "day17",
                dataIndex: "day17",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[16].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[17].columnName : "") : "",
                key: "day18",
                dataIndex: "day18",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[17].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[18].columnName : "") : "",
                key: "day19",
                dataIndex: "day19",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[18].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[19].columnName : "") : "",
                key: "day20",
                dataIndex: "day20",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[19].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[20].columnName : "") : "",
                key: "day21",
                dataIndex: "day21",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[20].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[21].columnName : "") : "",
                key: "day22",
                dataIndex: "day22",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[21].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[22].columnName : "") : "",
                key: "day23",
                dataIndex: "day23",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[22].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[23].columnName : "") : "",
                key: "day24",
                dataIndex: "day24",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[23].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[24].columnName : "") : "",
                key: "day25",
                dataIndex: "day25",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[24].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[25].columnName : "") : "",
                key: "day26",
                dataIndex: "day26",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[25].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[26].columnName : "") : "",
                key: "day27",
                dataIndex: "day27",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[26].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[27].columnName : "") : "",
                key: "day28",
                dataIndex: "day28",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[27].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[28].columnName : "") : "",
                key: "day29",
                dataIndex: "day29",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[28].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[29].columnName : "") : "",
                key: "day30",
                dataIndex: "day30",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[29].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[30].columnName : "") : "",
                key: "day31",
                dataIndex: "day31",
                width: 40,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.columnList) ? this.props.dataSource.columnList[30].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "Total",
                key: "dayTotal",
                dataIndex: "dayTotal",
                width: 40,
                align: "center",
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
                    dataSource={this.props.dataSource.list1}
                    bordered
                    size="small"
                    className={`print-size print-border`}
                    pagination={false}
                    columns={columns1}
                    summary={null}
                />
                <br/>
                <br/>
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.list1}
                    bordered
                    size="small"
                    className={`print-size print-border`}
                    pagination={false}
                    columns={columns2}
                    summary={null}
                />
                <div className="page-break"></div>
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.list2}
                    bordered
                    size="small"
                    className={`print-size print-border`}
                    pagination={false}
                    columns={columns3}
                    summary={null}
                />
                <br/>
                <br/>
                <Table
                    rowKey={(record, index) => index}
                    dataSource={this.props.dataSource.list2}
                    bordered
                    size="small"
                    className={`print-size print-border`}
                    pagination={false}
                    columns={columns4}
                    summary={null}
                />

            </div>
        );
    }
}


export default ComponentToPrint;