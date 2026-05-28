/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const columndefault = {
  revenueHourly00: null,
  revenueHourly01: null,
  revenueHourly02: null,
  revenueHourly03: null,
  revenueHourly04: null,
  revenueHourly05: null,
  revenueHourly06: null,
  revenueHourly07: null,
  revenueHourly08: null,
  revenueHourly09: null,
  revenueHourly10: null,
  revenueHourly11: null,
  revenueHourly12: null,
  revenueHourly13: null,
  revenueHourly14: null,
  revenueHourly15: null,
  revenueHourly16: null,
  revenueHourly17: null,
  revenueHourly18: null,
  revenueHourly19: null,
  revenueHourly20: null,
  revenueHourly21: null,
  revenueHourly22: null,
  revenueHourly23: null,
  revenueHourlyTotal: null,
  trafficHourly00: null,
  trafficHourly01: null,
  trafficHourly02: null,
  trafficHourly03: null,
  trafficHourly04: null,
  trafficHourly05: null,
  trafficHourly06: null,
  trafficHourly07: null,
  trafficHourly08: null,
  trafficHourly09: null,
  trafficHourly10: null,
  trafficHourly11: null,
  trafficHourly12: null,
  trafficHourly13: null,
  trafficHourly14: null,
  trafficHourly15: null,
  trafficHourly16: null,
  trafficHourly17: null,
  trafficHourly18: null,
  trafficHourly19: null,
  trafficHourly20: null,
  trafficHourly21: null,
  trafficHourly22: null,
  trafficHourly23: null,
  trafficHourlyTotal: null
}
const SummaryData = ({ dataSource, rowsData = [], ...props }) => {
  const [columnList, setColumnList] = useState(columndefault)
  const [column] = useState(columndefault)

  useEffect(() => {
    summaryRowData()
  }, [rowsData])

  const summaryRowData = () => {
    const sumdata = rowsData.reduce((accumulator, currentValue) => {
      let newacc = { ...accumulator }
      Object.entries(newacc).forEach(item => {
        let keycol = item[0]
        newacc[keycol] = (Number(currentValue[keycol]) + Number(newacc[keycol])).toFixed(2)
      });
      return newacc
    }, column)
    setColumnList(sumdata)
  }

  return (
    <>
      <Table.Summary.Row className="bg_default">
        <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวม</Table.Summary.Cell>
        {props.record.filter((item, ind) => ind !== 0).map((item, ind) => (
          <React.Fragment key={ind}>
            <Table.Summary.Cell colSpan={1} className="text-center">
              {/* <Text type="secondary" align="center" >{renderTotalTrafficHourly(item, 0)}</Text> */}
              <Text type="secondary" align="center" >{_isNull(Number(columnList[item['children'][0]['key']]))}</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} className="text-center">
              {/* <Text type="secondary" align="center" >{renderTotalTrafficHourly(item, 1)}</Text> */}
              <Text type="secondary" align="center" >{_isNull(Number(columnList[item['children'][1]['key']]))}</Text>
            </Table.Summary.Cell>
          </React.Fragment>
        ))}
      </Table.Summary.Row>
    </>
  );
}

export default SummaryData
