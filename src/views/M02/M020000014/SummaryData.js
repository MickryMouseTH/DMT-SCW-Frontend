import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totaltrxShiftA = 0;
    let totaltrxShiftB = 0;
    let totaltrxShiftC = 0;
    let TrxTotal = 0;

    pageData.forEach(({ trxShiftA, trxShiftB, trxShiftC, trxTotal }) => {
        totaltrxShiftA += trxShiftA;
        totaltrxShiftB += trxShiftB;
        totaltrxShiftC += trxShiftC;
        TrxTotal += trxTotal;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={1} className="text-center">รวม</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totaltrxShiftA))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrxShiftB.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrxShiftC.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(TrxTotal.toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
