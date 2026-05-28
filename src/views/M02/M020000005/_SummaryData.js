/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const columndefault = {
  minute00: null,
  minute05: null,
  minute10: null,
  minute15: null,
  minute20: null,
  minute25: null,
  minute30: null,
  minute35: null,
  minute40: null,
  minute45: null,
  minute50: null,
  minute55: null,
  minuteTotal: null
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
        {props.record.filter((item, ind) => ind !== 0 && ind !== 1).map((item, ind) => (
          <React.Fragment key={ind}>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center" >{_isNull(Number(columnList[item.key]))}</Text>
            </Table.Summary.Cell>
          </React.Fragment>
        ))}
      </Table.Summary.Row>
    </>
  );
}

export default SummaryData
