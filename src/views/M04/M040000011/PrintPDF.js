import React from 'react';
import { Table } from 'antd'
import {
  _isNull,
  // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {

    const columnsOne = [
        {
            title: <b>ลำดับ</b>,
            key: "no",
            dataIndex: "no",
            align: 'center',
            width: 60,
            fixed: true,
            render: (value, row) => {
                const obj = {
                  children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                  props: {}
                };
                if (row.no === "Total") { obj.props.colSpan = 2; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>ด่าน</b>,
            key: "plazaAbbreviation",
            dataIndex: "plazaAbbreviation",
            align: 'center',
            width: 180,
            fixed: true,
            render: (value, row) => {
                const obj = {
                  children: row.no === "Total" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                  props: {}
                };
                if (row.no === "Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
            title: <b>Class 1 ( 4 ล้อ )</b>,
            align: 'center',
            children: [
                {
                    title: <b>MTC</b>,
                    align: 'center',
                    children: [
                        {
                            title: <b>เงินสด</b>,
                            key: "cash1",
                            dataIndex: "cash1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>คูปอง</b>,
                            key: "coupon1",
                            dataIndex: "coupon1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>EMV</b>,
                            key: "emv1",
                            dataIndex: "emv1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>QR</b>,
                            key: "qrcode1",
                            dataIndex: "qrcode1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>รวม MTC</b>,
                            key: "sumMTC1",
                            dataIndex: "sumMTC1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                    ],
                },
                {
                    title: <b>ETC</b>,
                    align: 'center',
                    children: [
                        {
                            title: <b>M-Pass</b>,
                            key: "mpass1",
                            dataIndex: "mpass1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>EasyPass</b>,
                            key: "epass1",
                            dataIndex: "epass1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>รวม ETC</b>,
                            key: "sumETC1",
                            dataIndex: "sumETC1",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                    ],
                },
                {
                    title: <b>รวม MTC-ETC</b>,
                    key: "sumMTCETC",
                    dataIndex: "sumMTCETC",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>% MTC</b>,
                    key: "percentMTC",
                    dataIndex: "percentMTC",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value.toFixed(2))}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value.toFixed(2))}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
                {
                    title: <b>% ETC</b>,
                    key: "percentETC",
                    dataIndex: "percentETC",
                    align: 'center',
                    width: 100,
                    render: (value, row) => {
                        const obj = {
                        children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value.toFixed(2))}</div>
                            : <div style={{ textAlign: "right" }}>{_isNull(value.toFixed(2))}</div>,
                        props: {}
                        };
                        if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                        return obj;
                    }
                },
            ],
        },
        {
            title: <b>Class 2 ( มากกว่า 4 ล้อ )</b>,
            align: 'center',
            children: [
                {
                    title: <b>MTC</b>,
                    align: 'center',
                    children: [
                        {
                            title: <b>เงินสด</b>,
                            key: "cash2",
                            dataIndex: "cash2",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>คูปอง</b>,
                            key: "coupon2",
                            dataIndex: "coupon2",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>EMV</b>,
                            key: "emv2",
                            dataIndex: "emv2",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>QR</b>,
                            key: "qrcode2",
                            dataIndex: "qrcode2",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                        {
                            title: <b>รวม MTC</b>,
                            key: "sumMTC2",
                            dataIndex: "sumMTC2",
                            align: 'center',
                            width: 100,
                            render: (value, row) => {
                                const obj = {
                                children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
                                props: {}
                                };
                                if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                                return obj;
                            }
                        },
                    ],
                },
            ]
        },
        {
          title: <b>รวมทั้งหมด</b>,
          key: "sumAll",
          dataIndex: "sumAll",
          align: 'center',
          width: 100,
          render: (value, row) => {
              const obj = {
              children: row.no === "Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
              };
              if (row.no === '') { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
              return obj;
          }
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