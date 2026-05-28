import React from 'react'
import { Table, Typography } from 'antd'
import {_isNull } from "../../../tools/util";

const { Text } = Typography;

function SummaryData(pageData) {
  let totalTotalTraffic = 0;
  let totalTotalRevenue = 0;

  pageData.forEach(({ traffic, revenue }) => {
    totalTotalTraffic += traffic;
    totalTotalRevenue += revenue;
  });

  return (
    <>
      <Table.Summary.Row className="bg_default">
        <Table.Summary.Cell colSpan={2} className="text-center secondary bg_default">รวม</Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center secondary bg_default">
          <Text type="secondary" align="center" >{_isNull(Number(totalTotalTraffic.toFixed(2)))}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center secondary bg_default">
          <Text type="secondary" align="center" >{_isNull(Number(totalTotalRevenue.toFixed(2)))}</Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </>
  );
}

export default SummaryData
