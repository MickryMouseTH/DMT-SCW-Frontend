import React from 'react';
import { Typography, Table } from 'antd'
import {
    _isNull,
    _isEmpty,
    _isZero,
    _setYearThai,
} from '../../../tools/util'
import PrintHeader from "../../../tools/print/printHeader";
const { Text } = Typography;

class ComponentToPrint extends React.Component {

    render() {
        const columns = [
            {
              title: "ลำดับ",
              dataIndex: "index",
              key: "index",
              width: 50,
              align: "center",
              fixed: true,
              render(text, record) {
                return {
                  props: {
                    className: "secondary bg_default",
                  },
                  children: (
                    <Text type="secondary">
                      <div className="text-center">{text}</div>
                    </Text>
                  ),
                };
              },
            },
            {
              title: "ด่าน",
              fixed: true,
              key: "plazaAbbreviation",
              dataIndex: "plazaAbbreviation",
              width: 60,
              align: "center",
              render(text, record) {
                return {
                  props: {
                    className: "secondary bg_default",
                  },
                  children: (
                    <Text type="secondary" align="center">
                      <div className="text-left">{_isNull(text)}</div>
                    </Text>
                  ),
                };
              },
            },
            {
              title: "ช่องทาง",
              fixed: true,
              key: "laneAbbreviation",
              dataIndex: "laneAbbreviation",
              width: 70,
              align: "center",
              render(text, record) {
                return {
                  props: {
                    className: "secondary bg_default",
                  },
                  children: (
                    <Text type="secondary" align="center">
                      <div className="text-left">{_isNull(text)}</div>
                    </Text>
                  ),
                };
              },
            },
            {
              title: "Job No.",
              dataIndex: "jobNo",
              key: "jobNo",
              width: 60,
              align: "center",
              render: (text) => (
                <Text align="center">
                  <div className="text-right">{_isNull(text)}</div>
                </Text>
              )
            },
            {
              title: "Ntrx",
              dataIndex: "nTrx",
              key: "nTrx",
              width: 60,
              align: "center",
              render: (text) => (
                <div className='text-right'>
                  {_isNull(text)}
                </div>
              )
            },
            {
              title: "วันที่ผ่านด่าน",
              dataIndex: "trxDateTime",
              key: "trxDateTime",
              width: 200,
              align: "center",
              // render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
              render: (text) =>
                <div className='text-center'>
                  {!_isEmpty(text) && (_setYearThai(text,"DD/MM/YYYY HH:mm:ss"))}
                </div>
            },
            {
              title: "พนักงาน",
              dataIndex: "staffId",
              key: "staffId",
              width: 60,
              align: "center",
              render: (text) =>
                <div className='text-left'>
                  {_isNull(text)}
                </div>
            },
            {
              title: "TC/OBU",
              dataIndex: "tcObuClass",
              key: "tcObuClass",
              width: 60,
              align: "center",
              render(text) {
                return {
                  children: (
                    <div className='text-right'>
                      {_isZero(text)}
                    </div>
                  ),
                };
              },
            },
            {
              title: "AVC",
              dataIndex: "avcClass",
              key: "avcClass",
              width: 40,
              align: "center",
              render(text) {
                return {
                  children: (
                    <div className='text-right'>
                      {_isZero(text)}
                    </div>
                  ),
                };
              },
            },
            {
              title: "ค่าผ่านทาง",
              dataIndex: "toll",
              key: "toll",
              width: 70,
              align: "center",
              render: (text) => (
                <div className='text-right'>
                  {_isNull(text)}
                </div>
              )
            },
            {
              title: "ประเภทการชำระ",
              dataIndex: "paymentTypeName",
              key: "paymentTypeName",
              width: 120,
              align: "center",
              render: (text) =>
                _isNull(text)
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
                    dataSource={this.props.dataSource.list}
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