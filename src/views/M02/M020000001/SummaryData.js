import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalAverageTraffic = 0;
    let totalAverageRevenue = 0;

    pageData.forEach(({ averageTraffic, averageRevenue }) => {
        totalAverageTraffic += averageTraffic;
        totalAverageRevenue += averageRevenue;
    });
    
    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={1} className="text-center" index={0}></Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center" index={1}>รวม</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center" index={2}></Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalAverageTraffic))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAverageRevenue))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
