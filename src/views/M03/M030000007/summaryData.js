/* eslint-disable no-unused-vars */
import React from 'react'
import { Table, Typography } from 'antd'

const { Text } = Typography;

function summaryData(pageData)  {
    let totalplazaId = 0;
    let totalAverageIncome = 0;

    pageData.forEach(({ plazaId, averageIncome }) => {
      totalplazaId += plazaId;
      totalAverageIncome += averageIncome;
    });

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={1} className="text-center">Total</Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} className="text-center">
            <Text >{totalplazaId}</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell colSpan={1} className="text-center">
            <Text >Row</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  }

export default summaryData
