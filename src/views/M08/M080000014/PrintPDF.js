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
              if (row.no === "Total") { obj.props.colSpan = 4; obj.props.rowSpan = 1; }
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
          title: <b>รหัสด่าน</b>,
          key: "plazaCode",
          dataIndex: "plazaCode",
          align: 'center',
          width: 90,
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
          title: <b>Lane</b>,
          key: "lane",
          dataIndex: "lane",
          align: 'center',
          width: 90,
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
          title: <b>จำนวนรายการรถผ่านทาง</b>,
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
                  title: <b>ไม่ทราบ</b>,
                  key: "unknown1",
                  dataIndex: "unknown1",
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
                  title: <b>รวม</b>,
                  key: "sum1",
                  dataIndex: "sum1",
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
          title: <b>จำนวนรายการส่งตัดเงิน</b>,
          align: 'center',
          children: [
              {
                  title: <b>M-Pass</b>,
                  key: "mpass2",
                  dataIndex: "mpass2",
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
                  key: "epass2",
                  dataIndex: "epass2",
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
                  title: <b>รวม</b>,
                  key: "sum2",
                  dataIndex: "sum2",
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
          title: <b>จำนวนรายการที่ได้รับการชำระเงิน</b>,
          align: 'center',
          children: [
              {
                  title: <b>M-Pass</b>,
                  key: "mpass3",
                  dataIndex: "mpass3",
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
                  key: "epass3",
                  dataIndex: "epass3",
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
                  title: <b>รวม</b>,
                  key: "sum3",
                  dataIndex: "sum3",
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
          title: <b>ผลต่างรถผ่านทาง / ส่งตัดเงิน</b>,
          align: 'center',
          children: [
              {
                  title: <b>M-Pass</b>,
                  key: "diffM1",
                  dataIndex: "diffM1",
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
                  key: "diffE1",
                  dataIndex: "diffE1",
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
                  title: <b>รวม</b>,
                  key: "diffSum1",
                  dataIndex: "diffSum1",
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
          title: <b>ผลต่างส่งตัดเงิน / รายการที่ได้รับการชำระเงิน</b>,
          align: 'center',
          children: [
              {
                  title: <b>M-Pass</b>,
                  key: "diffM2",
                  dataIndex: "diffM2",
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
                  key: "diffE2",
                  dataIndex: "diffE2",
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
                  title: <b>รวม</b>,
                  key: "diffSum2",
                  dataIndex: "diffSum2",
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