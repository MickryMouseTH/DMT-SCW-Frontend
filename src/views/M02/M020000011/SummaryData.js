/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import { Table, Typography } from 'antd'
import { _isEmpty, _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = ({ dataSource, rowsData, record, current, ...props }) => {
  const [columnList, setColumnList] = useState([])
  const [column, setColumn] = useState([])

  useEffect(() => {
    if (!_isEmpty(record)) {
      let columnlistdefault = [...record
        .filter((item, ind) => ind !== 0)
        .map(item => {
          let data = {}
          data.trafficExemMonthly = 0
          data.trafficLeftXMonthly = 0
          data.trafficHpmcMonthly = 0
          data.title = item.title
          data.children = [...item.children.map(item => {
            let datachildren = {}
            datachildren.key = item.key
            if (item.title === 'ยกเว้น') datachildren.type = "trafficExemMonthly"
            if (item.title === 'ออกซ้าย') datachildren.type = "trafficLeftXMonthly"
            if (item.title === 'ขบวน') datachildren.type = "trafficHpmcMonthly"
            return datachildren
          })]
          return data
        })]
      setColumn(columnlistdefault)
      setColumnList(columnlistdefault)
    }

  }, [record])

  useEffect(() => {
    summaryRowData()
  }, [rowsData])

  const summaryRowData = () => {
    let datacolumn = rowsData.reduce((accumulator, currentValue) => {
      let newacc = [...accumulator.map(itemAcc => {
        let newitem = { ...itemAcc }
        itemAcc['children'].forEach(el => {
          if (el.type === 'trafficExemMonthly') newitem.trafficExemMonthly = (Number(currentValue[el.key]) + Number(newitem.trafficExemMonthly)).toFixed(2)
          if (el.type === 'trafficLeftXMonthly') newitem.trafficLeftXMonthly = (Number(currentValue[el.key]) + Number(newitem.trafficLeftXMonthly)).toFixed(2)
          if (el.type === 'trafficHpmcMonthly') newitem.trafficHpmcMonthly = (Number(currentValue[el.key]) + Number(newitem.trafficHpmcMonthly)).toFixed(2)
        });
        return newitem
      })]
      return newacc
    }, column)
    setColumnList(datacolumn)
  }

  return (
    <>
      <Table.Summary.Row className="bg_default">
        <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวม</Table.Summary.Cell>
        {columnList.map((item, ind) => (
          <React.Fragment key={ind}>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center" >{_isNull(Number(item['trafficExemMonthly']))}</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center" >{_isNull(Number(item['trafficLeftXMonthly']))}</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center" >{_isNull(Number(item['trafficHpmcMonthly']))}</Text>
            </Table.Summary.Cell>
          </React.Fragment>
        ))}
      </Table.Summary.Row>
    </>
  );
}

export default SummaryData
