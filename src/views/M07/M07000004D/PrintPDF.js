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
                title: "PLAZA",
                fixed: true,
                key: "plazaName",
                dataIndex: "plazaName",
                width: 50,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[0].columnName : "") : "",
                key: "revenueTxt1",
                dataIndex: "revenueTxt1",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[0].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[1].columnName : "") : "",
                key: "revenueTxt2",
                dataIndex: "revenueTxt2",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[1].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[2].columnName : "") : "",
                key: "revenueTxt3",
                dataIndex: "revenueTxt3",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[2].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[3].columnName : "") : "",
                key: "revenueTxt4",
                dataIndex: "revenueTxt4",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[3].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[4].columnName : "") : "",
                key: "revenueTxt5",
                dataIndex: "revenueTxt5",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[4].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[5].columnName : "") : "",
                key: "revenueTxt6",
                dataIndex: "revenueTxt6",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[5].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[6].columnName : "") : "",
                key: "revenueTxt7",
                dataIndex: "revenueTxt7",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[6].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[7].columnName : "") : "",
                key: "revenueTxt8",
                dataIndex: "revenueTxt8",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[7].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[8].columnName : "") : "",
                key: "revenueTxt9",
                dataIndex: "revenueTxt9",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[8].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[9].columnName : "") : "",
                key: "revenueTxt10",
                dataIndex: "revenueTxt10",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[9].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[10].columnName : "") : "",
                key: "revenueTxt11",
                dataIndex: "revenueTxt11",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[10].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[11].columnName : "") : "",
                key: "revenueTxt12",
                dataIndex: "revenueTxt12",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[11].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[12].columnName : "") : "",
                key: "revenueTxt13",
                dataIndex: "revenueTxt13",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList1) ? this.props.dataSource.pdfColumnList1[12].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => !item.hidden);

        const columns2 = [
            {
                title: "PLAZA",
                fixed: true,
                key: "plazaName",
                dataIndex: "plazaName",
                width: 50,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[0].columnName : "") : "",
                key: "revenueTxt1",
                dataIndex: "revenueTxt1",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[0].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[1].columnName : "") : "",
                key: "revenueTxt2",
                dataIndex: "revenueTxt2",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[1].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[2].columnName : "") : "",
                key: "revenueTxt3",
                dataIndex: "revenueTxt3",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[2].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[3].columnName : "") : "",
                key: "revenueTxt4",
                dataIndex: "revenueTxt4",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[3].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[4].columnName : "") : "",
                key: "revenueTxt5",
                dataIndex: "revenueTxt5",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[4].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[5].columnName : "") : "",
                key: "revenueTxt6",
                dataIndex: "revenueTxt6",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[5].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[6].columnName : "") : "",
                key: "revenueTxt7",
                dataIndex: "revenueTxt7",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[6].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[7].columnName : "") : "",
                key: "revenueTxt8",
                dataIndex: "revenueTxt8",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[7].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[8].columnName : "") : "",
                key: "revenueTxt9",
                dataIndex: "revenueTxt9",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[8].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[9].columnName : "") : "",
                key: "revenueTxt10",
                dataIndex: "revenueTxt10",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[9].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[10].columnName : "") : "",
                key: "revenueTxt11",
                dataIndex: "revenueTxt11",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[10].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[11].columnName : "") : "",
                key: "revenueTxt12",
                dataIndex: "revenueTxt12",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[11].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[12].columnName : "") : "",
                key: "revenueTxt13",
                dataIndex: "revenueTxt13",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList2) ? this.props.dataSource.pdfColumnList2[12].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
        ].filter(item => !item.hidden);


        const columns3 = [
            {
                title: "PLAZA",
                fixed: true,
                key: "plazaName",
                dataIndex: "plazaName",
                width: 50,
                align: "center",
                render: (text, record) => (
                    <div style={{ textAlign: record.textAlign, fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[0].columnName : "") : "",
                key: "revenueTxt1",
                dataIndex: "revenueTxt1",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[0].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[1].columnName : "") : "",
                key: "revenueTxt2",
                dataIndex: "revenueTxt2",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[1].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[2].columnName : "") : "",
                key: "revenueTxt3",
                dataIndex: "revenueTxt3",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[2].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[3].columnName : "") : "",
                key: "revenueTxt4",
                dataIndex: "revenueTxt4",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[3].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[4].columnName : "") : "",
                key: "revenueTxt5",
                dataIndex: "revenueTxt5",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[4].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[5].columnName : "") : "",
                key: "revenueTxt6",
                dataIndex: "revenueTxt6",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[5].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[6].columnName : "") : "",
                key: "revenueTxt7",
                dataIndex: "revenueTxt7",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[6].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[7].columnName : "") : "",
                key: "revenueTxt8",
                dataIndex: "revenueTxt8",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[7].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[8].columnName : "") : "",
                key: "revenueTxt9",
                dataIndex: "revenueTxt9",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[8].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[9].columnName : "") : "",
                key: "revenueTxt10",
                dataIndex: "revenueTxt10",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[9].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[10].columnName : "") : "",
                key: "revenueTxt11",
                dataIndex: "revenueTxt11",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[10].hidden : true) : true,
                render: (text, record) => (
                    <div className='text-right' style={{ fontWeight: record.bold === false ? "" : "bold" }}>
                        {_isNull(text)}
                    </div>
                ),
            },
            {
                title: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[11].columnName : "") : "",
                key: "revenueTxt12",
                dataIndex: "revenueTxt12",
                width: 60,
                align: "center",
                hidden: (!_isEmpty(this.props.dataSource)) ? (!_isEmpty(this.props.dataSource.pdfColumnList3) ? this.props.dataSource.pdfColumnList3[11].hidden : true) : true,
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
                    dataSource={this.props.dataSource.pdfList1}
                    bordered
                    size="small"
                    className={`print-size print-border`}
                    pagination={false}
                    columns={columns1}
                    summary={null}
                />
                <div className="page-break"></div>
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
                <div className="page-break"></div>
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
            </div>
        );
    }
}


export default ComponentToPrint;