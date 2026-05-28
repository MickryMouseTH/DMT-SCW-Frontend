import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalAmountEasyPassBank = 0;
    let totalAmountEasyPassSod = 0;
    let totalAmountEasyPassDiff = 0;

    pageData.forEach(({ 
        amountEasyPassBank
        , amountEasyPassSod
        , amountEasyPassDiff 
    }) => {
        totalAmountEasyPassBank += amountEasyPassBank;
        totalAmountEasyPassSod += amountEasyPassSod;
        totalAmountEasyPassDiff += amountEasyPassDiff;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวมทั้งหมด</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountEasyPassBank.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountEasyPassSod.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountEasyPassDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
