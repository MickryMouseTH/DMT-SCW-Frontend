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
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "1",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day01TrxClass1",
                        dataIndex: "day01TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day01TrxClass2",
                        dataIndex: "day01TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "2",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day02TrxClass1",
                        dataIndex: "day02TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day02TrxClass2",
                        dataIndex: "day02TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "3",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day03TrxClass1",
                        dataIndex: "day03TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day03TrxClass2",
                        dataIndex: "day03TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "4",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day04TrxClass1",
                        dataIndex: "day04TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day04TrxClass2",
                        dataIndex: "day04TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "5",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day05TrxClass1",
                        dataIndex: "day05TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day05TrxClass2",
                        dataIndex: "day05TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "6",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day06TrxClass1",
                        dataIndex: "day06TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day06TrxClass2",
                        dataIndex: "day06TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "7",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day07TrxClass1",
                        dataIndex: "day07TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day07TrxClass2",
                        dataIndex: "day07TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "8",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day08TrxClass1",
                        dataIndex: "day08TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day08TrxClass2",
                        dataIndex: "day08TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "9",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day09TrxClass1",
                        dataIndex: "day09TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day09TrxClass2",
                        dataIndex: "day09TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
        ].filter(item => item.show);

        
        const column02 = [
            {
                title: "PLAZA",
                show: true,
                fixed: true,
                key: "tsbName",
                dataIndex: "tsbName",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "10",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day10TrxClass1",
                        dataIndex: "day10TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day10TrxClass2",
                        dataIndex: "day10TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "11",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day11TrxClass1",
                        dataIndex: "day11TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day11TrxClass2",
                        dataIndex: "day11TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "12",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day12TrxClass1",
                        dataIndex: "day12TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day12TrxClass2",
                        dataIndex: "day12TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "13",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day13TrxClass1",
                        dataIndex: "day13TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day13TrxClass2",
                        dataIndex: "day13TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "14",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day14TrxClass1",
                        dataIndex: "day14TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day14TrxClass2",
                        dataIndex: "day14TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "15",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day15TrxClass1",
                        dataIndex: "day15TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day15TrxClass2",
                        dataIndex: "day15TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "16",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day16TrxClass1",
                        dataIndex: "day16TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day16TrxClass2",
                        dataIndex: "day16TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "17",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day17TrxClass1",
                        dataIndex: "day17TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day17TrxClass2",
                        dataIndex: "day17TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "18",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day18TrxClass1",
                        dataIndex: "day18TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day18TrxClass2",
                        dataIndex: "day18TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
        ].filter(item => item.show);

        
        const column03 = [
            {
                title: "PLAZA",
                show: true,
                fixed: true,
                key: "tsbName",
                dataIndex: "tsbName",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "19",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day19TrxClass1",
                        dataIndex: "day19TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day19TrxClass2",
                        dataIndex: "day19TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "20",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day20TrxClass1",
                        dataIndex: "day20TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day20TrxClass2",
                        dataIndex: "day20TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "21",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day21TrxClass1",
                        dataIndex: "day21TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day21TrxClass2",
                        dataIndex: "day21TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "22",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day22TrxClass1",
                        dataIndex: "day22TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day22TrxClass2",
                        dataIndex: "day22TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "23",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day23TrxClass1",
                        dataIndex: "day23TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day23TrxClass2",
                        dataIndex: "day23TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "24",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day24TrxClass1",
                        dataIndex: "day24TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day24TrxClass2",
                        dataIndex: "day24TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "25",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day25TrxClass1",
                        dataIndex: "day25TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day25TrxClass2",
                        dataIndex: "day25TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "26",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day26TrxClass1",
                        dataIndex: "day26TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day26TrxClass2",
                        dataIndex: "day26TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "27",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day27TrxClass1",
                        dataIndex: "day27TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day27TrxClass2",
                        dataIndex: "day27TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
        ].filter(item => item.show);
        
        const column04 = [
            {
                title: "PLAZA",
                show: true,
                fixed: true,
                key: "tsbName",
                dataIndex: "tsbName",
                width: 100,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: "28",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "day28TrxClass1",
                        dataIndex: "day28TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "day28TrxClass2",
                        dataIndex: "day28TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "29",
                show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay29 : true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay29 : true,
                        key: "day29TrxClass1",
                        dataIndex: "day29TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay29 : true,
                        key: "day29TrxClass2",
                        dataIndex: "day29TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "30",
                show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay30 : true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay30 : true,
                        key: "day30TrxClass1",
                        dataIndex: "day30TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay30 : true,
                        key: "day30TrxClass2",
                        dataIndex: "day30TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "31",
                show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay31 : true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay31 : true,
                        key: "day31TrxClass1",
                        dataIndex: "day31TrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: (!_isEmpty(this.props.dataSource)) ? !this.props.dataSource.hiddenDay31 : true,
                        key: "day31TrxClass2",
                        dataIndex: "day31TrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
            },
            {
                title: "Total",
                show: true,
                align: 'center',
                children: [
                    {
                        title: "class 1",
                        show: true,
                        key: "summaryTrxClass1",
                        dataIndex: "summaryTrxClass1",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 2",
                        show: true,
                        key: "summaryTrxClass2",
                        dataIndex: "summaryTrxClass2",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                    {
                        title: "class 1+2",
                        show: true,
                        key: "summaryTrxClassTotal",
                        dataIndex: "summaryTrxClassTotal",
                        align: 'center',
                        width: 40,
                        render: (text, record) => <div style={{ textAlign: "right", fontWeight: record.bold === false ? "" : "bold" }}>{record.header ? "" : _isNull(text)}</div>
                    },
                ],
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