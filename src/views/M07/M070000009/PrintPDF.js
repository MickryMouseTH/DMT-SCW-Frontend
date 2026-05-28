import React from 'react';
import { Table } from 'antd'
import {
  _isNull,
  _isEmpty 
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";

class ComponentToPrint extends React.Component {

  render() {
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const columns = [
        {
          title: <b>Plaza</b>,
          key: "plazaDescription",
          dataIndex: "plazaDescription",
          fixed: true,
          align: "center",
          width: 140,
        //   render: (text) => <div style={{ textAlign: "center" }}>{_isNull(text)}</div>
            render: (value, row, index) => {
                const obj = {
                children: row.plazaDescription === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.plazaDescription === "ผลรวม") { obj.props.colSpan = 6; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
          title: <b>Shift No.</b>,
          key: "shiftTypeId",
          dataIndex: "shiftTypeId",
          align: 'center',
          width: 60,
        //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            render: (value, row, index) => {
                const obj = {
                children: row.shiftTypeId === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.shiftTypeId === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
          title: <b>Staff No</b>,
          key: "staffNo",
          dataIndex: "staffNo",
          align: 'center',
          width: 60,
        //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            render: (value, row, index) => {
                const obj = {
                children: row.staffNo === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.staffNo === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
          title: <b>Staff Name</b>,
          key: "staffName",
          dataIndex: "staffName",
          align: 'center',
          width: 160,
        //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            render: (value, row, index) => {
                const obj = {
                children: row.staffName === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.staffName === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
          title: <b>Bag No.</b>,
          key: "bagNo",
          dataIndex: "bagNo",
          align: 'center',
          width: 60,
        //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            render: (value, row, index) => {
                const obj = {
                children: row.bagNo === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.bagNo === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
          title: <b>Serial No.</b>,
          key: "serialNo",
          dataIndex: "serialNo",
          align: 'center',
          width: 60,
        //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            render: (value, row, index) => {
                const obj = {
                children: row.serialNo === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.serialNo === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
        {
          title: <b>TOD Count</b>,
          align: 'center',
          children: [
            {
              title: <b>Cash</b>,
              key: "todCash",
              dataIndex: "todCash",
              align: 'center',
              width: 60,
            //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                render: (value, row, index) => {
                    const obj = {
                    children: row.todCash === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.todCash === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
              title: <b>Coupon</b>,
              key: "todCoupon",
              dataIndex: "todCoupon",
              align: 'center',
              width: 60,
            //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                render: (value, row, index) => {
                    const obj = {
                    children: row.todCoupon === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.todCoupon === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
          ],
        },
        {
          title: <b>SOD Count</b>,
          align: 'center',
          children: [
            {
              title: <b>Cash</b>,
              key: "sodCash",
              dataIndex: "sodCash",
              align: 'center',
              width: 60,
            //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                render: (value, row, index) => {
                    const obj = {
                    children: row.sodCash === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.sodCash === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
              title: <b>Coupon</b>,
              key: "sodCoupon",
              dataIndex: "sodCoupon",
              align: 'center',
              width: 60,
            //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                render: (value, row, index) => {
                    const obj = {
                    children: row.sodCoupon === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.sodCoupon === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
              title: <b>EMV</b>,
              key: "sodEMV",
              dataIndex: "sodEMV",
              align: 'center',
              width: 60,
            //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                render: (value, row, index) => {
                    const obj = {
                    children: row.sodEMV === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.sodEMV === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            },
            {
              title: <b>QRCode</b>,
              key: "sodQRCode",
              dataIndex: "sodQRCode",
              align: 'center',
              width: 60,
            //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
                render: (value, row, index) => {
                    const obj = {
                    children: row.sodQRCode === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                        : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                    props: {}
                    };
                    if (row.sodQRCode === "") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
                    else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                    return obj;
                }
            }
          ],
        },
        {
          title: <b>Collection Discrepancy</b>,
          key: "collectionDiscrepancy",
          dataIndex: "collectionDiscrepancy",
          align: 'center',
          width: 60,
        //   render: (text) => <div style={{ textAlign: "right" }}>{_isNull(text)}</div>
            render: (value, row, index) => {
                const obj = {
                children: row.collectionDiscrepancy === "ผลรวม" ? <div style={{ textAlign: "center", color: 'black', fontWeight: 'bold' }}>{_isNull(value)}</div>
                    : <div style={{ textAlign: "center" }}>{_isNull(value)}</div>,
                props: {}
                };
                if (row.collectionDiscrepancy === "") { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
                return obj;
            }
        },
    ]
    // MOCK DATA FOR EMPTY DATA IN TABLE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div style={{ margin: '0px 10px' }}>
        <PrintHeader
          {...this.props.HeaderBar}
          page={1}
          pageTotal={1}
        />
        <div className={_isEmpty(this.props.dataFisrtTable) ? "d-none" : "mt-10"}>
            <Table
                rowKey={(record, index) => index}
                dataSource={this.props.dataFisrtTable}
                bordered
                size="small"
                className={`print-size print-border`}
                pagination={false}
                columns={columns}
                summary={null}
            />
        </div> 
      </div>
    );
  }
}


export default ComponentToPrint;