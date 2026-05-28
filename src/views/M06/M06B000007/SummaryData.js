import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalAmountQrBank = 0;
    let totalAmountQrSod = 0;
    let totalAmountQrDiff = 0;

    pageData.forEach(({ 
        amountQrBank
        , amountQrSod
        , amountQrDiff 
    }) => {
        totalAmountQrBank += amountQrBank;
        totalAmountQrSod += amountQrSod;
        totalAmountQrDiff += amountQrDiff;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวมทั้งหมด</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrBank.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrSod.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
