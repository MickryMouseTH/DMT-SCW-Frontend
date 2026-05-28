import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalAmountMpassBank = 0;
    let totalAmountMpassSod = 0;
    let totalAmountMpassDiff = 0;

    pageData.forEach(({ 
        amountMpassBank
        , amountMpassSod
        , amountMpassDiff 
    }) => {
        totalAmountMpassBank += amountMpassBank;
        totalAmountMpassSod += amountMpassSod;
        totalAmountMpassDiff += amountMpassDiff;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวมทั้งหมด</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountMpassBank.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountMpassSod.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountMpassDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
