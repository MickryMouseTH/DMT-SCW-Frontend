import React from 'react'
import { Table, Typography } from 'antd'
import { _isEmpty,_isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = ({ dataSource, ...props }) => {
  const toLowerCaseKeys = (obj) => {
    return Object.keys(obj).reduce(function (accum, key) {
      accum[key.toLowerCase()] = obj[key];
      return accum;
    }, {});
  }

  const renderTotalTrafficHourly = (item, indkey) => {
    const data = toLowerCaseKeys(dataSource)
    return data[`total${_isEmpty(item) || item.children[indkey].dataIndex.toLowerCase()}`]
  }

  return (
    <>
      <Table.Summary.Row className="bg_default">
        <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวม</Table.Summary.Cell>
        {props.record.filter((item, ind) => ind !== 0).map((item, ind) => (
          <React.Fragment key={ind}>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center" >{_isNull(renderTotalTrafficHourly(item, 0))}</Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} className="text-right">
              <Text type="secondary" align="right" >{_isNull(renderTotalTrafficHourly(item, 1))}</Text>
            </Table.Summary.Cell>
          </React.Fragment>
        ))}
      </Table.Summary.Row>
    </>
  );
}

export default SummaryData
