import React from 'react';
import { Table } from 'antd'
import { _isNull, 
    // _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

    render() {
        // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const Column = [
          {
            title: <b>Plaza</b>,
            key: "tsbName",
            dataIndex: "tsbName",
            align: "center",
            width: 80,
            render(text) {
              return {
                props: {
                  className: "secondary bg_default",
                },
                children: (
                  <div style={{
                    textAlign: text === "Total" || text === "Percent" ? 'right' : 'left', color: text === "NorthBound" || text === "Sounthbound"
                      || text === "Total" || text === "Percent" ? '#000000A6' : ''
                  }}>
                    {text === "NorthBound" || text === "Sounthbound"
                      || text === "Total" || text === "Percent" ? <b>{text}</b>
                      : text}
                  </div>
                ),
              };
            },
          },
          {
            title: <b>Cash</b>,
            key: "",
            align: "center",
            children: [
              {
                title: <b>Class 1</b>,
                key: "cashClass1",
                dataIndex: "cashClass1",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
              {
                title: <b>Class 2</b>,
                key: "cashClass2",
                dataIndex: "cashClass2",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
            ]
          },
          {
            title: <b>Coupon</b>,
            key: "",
            align: "center",
            children: [
              {
                title: <b>Class 1</b>,
                key: "couponClass1",
                dataIndex: "couponClass1",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
              {
                title: <b>Class 2</b>,
                key: "couponClass2",
                dataIndex: "couponClass2",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
            ]
          },
          {
            title: <b>EMV</b>,
            key: "",
            align: "center",
            children: [
              {
                title: <b>Class 1</b>,
                key: "emvClass1",
                dataIndex: "emvClass1",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
              {
                title: <b>Class 2</b>,
                key: "emvClass2",
                dataIndex: "emvClass2",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
            ]
          },
          {
            title: <b>QR-Code</b>,
            key: "",
            align: "center",
            children: [
              {
                title: <b>Class 1</b>,
                key: "qrClass1",
                dataIndex: "qrClass1",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
              {
                title: <b>Class 2</b>,
                key: "qrClass2",
                dataIndex: "qrClass2",
                align: 'center',
                width: 50,
                render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
              },
            ]
          },
          {
            title: <b>M-Pass</b>,
            key: "mpass",
            dataIndex: "mpass",
            align: 'center',
            width: 50,
            render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
          },
          {
            title: <b>EasyPass</b>,
            key: "easypass",
            dataIndex: "easypass",
            align: 'center',
            width: 50,
            render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
          },
          {
            title: <b>Sub Total</b>,
            key: "supTotal",
            dataIndex: "supTotal",
            align: 'center',
            width: 50,
            render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
          },
          {
            title: <b>Exempt</b>,
            key: "exempt",
            dataIndex: "exempt",
            align: 'center',
            width: 50,
            render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
          },
          {
            title: <b>Vio</b>,
            key: "vio",
            dataIndex: "vio",
            align: 'center',
            width: 50,
            render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
          },
          {
            title: <b>Total</b>,
            key: "total",
            dataIndex: "total",
            align: 'center',
            width: 50,
            render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text)}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text)}</div>,
                  };
                },
          },
          {
            title: <b>Percent</b>,
            key: "percent",
            dataIndex: "percent",
            align: 'center',
            width: 50,
            render: (text, row, index) => {
                  return {
                    children: row.tsbName === "Total" || row.tsbName === "Percent" 
                    ? <div style={{ textAlign: "right" }}><b><i>{_isNull(text) !== "" ? Number(text).toFixed(2) : text}</i></b></div>
                    : <div style={{ textAlign: "right" }}>{_isNull(text) !== "" ? Number(text).toFixed(2) : text}</div>,
                  };
                },
          },
        ]
        // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        return (
            <div className="m-10">
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
                    columns={Column}
                    summary={null}
                />
                <div className="page-break"></div>
            </div>
        );
    }
}


export default ComponentToPrint;