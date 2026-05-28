/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import { Table, Typography } from 'antd'
import { _isEmpty, _isNull } from '../../../tools/util'

const { Text } = Typography;
const SummaryData = ({ dataSource = { totalColumnList: [] }, rowsData, record, ...props }) => {
  const [columnList, setColumnList] = useState([])
  const [column, setColumn] = useState([])

  useEffect(() => {
    if (!_isEmpty(record)) {
      let columnlistdefault = [...record
        .filter((item, ind) => ind !== 0 && item.title !== "ออกจดหมายแจ้ง")
        .map(item => {
          let data = {}
          data.title = item.title
          data.diff = 0
          data.charge = 0
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
        currentValue.columnList.forEach(el => {
          if (newitem.title === el.columnName) {
            newitem.diff = (Number(el.diff) + Number(newitem.diff)).toFixed(2)
            newitem.charge = (Number(el.charge) + Number(newitem.charge)).toFixed(2)
          }
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
        <Table.Summary.Cell colSpan={1} className="text-center" index={0}>รวม</Table.Summary.Cell>
        {columnList.map((item, ind) => (
          <React.Fragment key={ind}>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center" >{_isNull(Number(item['diff']))}</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center" >{_isNull(Number(item['charge']))}</Text>
            </Table.Summary.Cell>
          </React.Fragment>
        ))}
      </Table.Summary.Row>
    </>
  );
}

export default SummaryData
