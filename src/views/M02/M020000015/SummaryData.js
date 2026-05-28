import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totaltraffic = 0;
    let totalpercent = 0;


    pageData.forEach(({ traffic, percent }) => {
        totaltraffic += traffic;
        totalpercent += percent;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={1} className="text-center">รวม</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totaltraffic))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totalpercent.toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
