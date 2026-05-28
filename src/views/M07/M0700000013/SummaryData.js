import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalClass1Hour0 = 0;
    let totalClass2Hour0 = 0;
    let totalClass1Hour1 = 0;
    let totalClass2Hour1 = 0;
    let totalClass1Hour2 = 0;
    let totalClass2Hour2 = 0;
    let totalClass1Hour3 = 0;
    let totalClass2Hour3 = 0;
    let totalClass1Hour4 = 0;
    let totalClass2Hour4 = 0;
    let totalClass1Hour5 = 0;
    let totalClass2Hour5 = 0;
    let totalClass1Hour6 = 0;
    let totalClass2Hour6 = 0;
    let totalClass1Hour7 = 0;
    let totalClass2Hour7 = 0;
    let totalClass1Hour8 = 0;
    let totalClass2Hour8 = 0;
    let totalClass1Hour9 = 0;
    let totalClass2Hour9 = 0;
    let totalClass1Hour10 = 0;
    let totalClass2Hour10 = 0;
    let totalClass1Hour11 = 0;
    let totalClass2Hour11 = 0;
    let totalClass1Hour12 = 0;
    let totalClass2Hour12 = 0;
    let totalClass1Hour13 = 0;
    let totalClass2Hour13 = 0;
    let totalClass1Hour14 = 0;
    let totalClass2Hour14 = 0;
    let totalClass1Hour15 = 0;
    let totalClass2Hour15 = 0;
    let totalClass1Hour16 = 0;
    let totalClass2Hour16 = 0;
    let totalClass1Hour17 = 0;
    let totalClass2Hour17 = 0;
    let totalClass1Hour18 = 0;
    let totalClass2Hour18 = 0;
    let totalClass1Hour19 = 0;
    let totalClass2Hour19 = 0;
    let totalClass1Hour20 = 0;
    let totalClass2Hour20 = 0;
    let totalClass1Hour21 = 0;
    let totalClass2Hour21 = 0;
    let totalClass1Hour22 = 0;
    let totalClass2Hour22 = 0;
    let totalClass1Hour23 = 0;
    let totalClass2Hour23 = 0;
    let totalClass1 = 0;
    let totalClass2 = 0;

    pageData.forEach((
        { 
            class1Hour0, 
            class2Hour0,
            class1Hour1, 
            class2Hour1, 
            class1Hour2, 
            class2Hour2, 
            class1Hour3, 
            class2Hour3, 
            class1Hour4, 
            class2Hour4, 
            class1Hour5, 
            class2Hour5, 
            class1Hour6, 
            class2Hour6, 
            class1Hour7, 
            class2Hour7, 
            class1Hour8, 
            class2Hour8, 
            class1Hour9, 
            class2Hour9, 
            class1Hour10, 
            class2Hour10, 
            class1Hour11, 
            class2Hour11, 
            class1Hour12, 
            class2Hour12, 
            class1Hour13, 
            class2Hour13, 
            class1Hour14, 
            class2Hour14, 
            class1Hour15, 
            class2Hour15, 
            class1Hour16, 
            class2Hour16, 
            class1Hour17, 
            class2Hour17, 
            class1Hour18, 
            class2Hour18, 
            class1Hour19, 
            class2Hour19, 
            class1Hour20, 
            class2Hour20, 
            class1Hour21, 
            class2Hour21, 
            class1Hour22, 
            class2Hour22, 
            class1Hour23, 
            class2Hour23, 
            class1Total, 
            class2Total
        }
    ) => {
        totalClass1Hour0 += class1Hour0;
        totalClass2Hour0 += class2Hour0;
        totalClass1Hour1 += class1Hour1;
        totalClass2Hour1 += class2Hour1;
        totalClass1Hour2 += class1Hour2;
        totalClass2Hour2 += class2Hour2;
        totalClass1Hour3 += class1Hour3;
        totalClass2Hour3 += class2Hour3;
        totalClass1Hour4 += class1Hour4;
        totalClass2Hour4 += class2Hour4;
        totalClass1Hour5 += class1Hour5;
        totalClass2Hour5 += class2Hour5;
        totalClass1Hour6 += class1Hour6;
        totalClass2Hour6 += class2Hour6;
        totalClass1Hour7 += class1Hour7;
        totalClass2Hour7 += class2Hour7;
        totalClass1Hour8 += class1Hour8;
        totalClass2Hour8 += class2Hour8;
        totalClass1Hour9 += class1Hour9;
        totalClass2Hour9 += class2Hour9;
        totalClass1Hour10 += class1Hour10;
        totalClass2Hour10 += class2Hour10;
        totalClass1Hour11 += class1Hour11;
        totalClass2Hour11 += class2Hour11;
        totalClass1Hour12 += class1Hour12;
        totalClass2Hour12 += class2Hour12;
        totalClass1Hour13 += class1Hour13;
        totalClass2Hour13 += class2Hour13;
        totalClass1Hour14 += class1Hour14;
        totalClass2Hour14 += class2Hour14;
        totalClass1Hour15 += class1Hour15;
        totalClass2Hour15 += class2Hour15;
        totalClass1Hour16 += class1Hour16;
        totalClass2Hour16 += class2Hour16;
        totalClass1Hour17 += class1Hour17;
        totalClass2Hour17 += class2Hour17;
        totalClass1Hour18 += class1Hour18;
        totalClass2Hour18 += class2Hour18;
        totalClass1Hour19 += class1Hour19;
        totalClass2Hour19 += class2Hour19;
        totalClass1Hour20 += class1Hour20;
        totalClass2Hour20 += class2Hour20;
        totalClass1Hour21 += class1Hour21;
        totalClass2Hour21 += class2Hour21;
        totalClass1Hour22 += class1Hour22;
        totalClass2Hour22 += class2Hour22;
        totalClass1Hour23 += class1Hour23;
        totalClass2Hour23 += class2Hour23;
        totalClass1 += class1Total;
        totalClass2 += class2Total;
    });

    return (
        <>
            {/* Total by Class */}
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>Total by Class</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour0.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour0.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour1.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour1.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour2.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour2.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour3.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour3.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour4.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour4.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour5.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour5.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour6.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour6.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour7.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour7.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour8.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour8.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour9.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour9.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour10.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour10.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour11.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour11.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour12.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour12.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour13.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour13.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour14.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour14.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour15.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour15.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour16.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour16.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour17.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour17.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour18.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour18.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour19.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour19.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour20.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour20.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour21.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour21.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour22.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour22.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1Hour23.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2Hour23.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right"></Table.Summary.Cell>
            </Table.Summary.Row>
            {/* Grand Total */}
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>Grand Total</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour0+totalClass2Hour0).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour1+totalClass2Hour1).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour2+totalClass2Hour2).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour3+totalClass2Hour3).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour4+totalClass2Hour4).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour5+totalClass2Hour5).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour6+totalClass2Hour6).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour7+totalClass2Hour7).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour8+totalClass2Hour8).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour9+totalClass2Hour9).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour10+totalClass2Hour10).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour11+totalClass2Hour11).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour12+totalClass2Hour12).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour13+totalClass2Hour13).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour14+totalClass2Hour14).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour15+totalClass2Hour15).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour16+totalClass2Hour16).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour17+totalClass2Hour17).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour18+totalClass2Hour18).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour19+totalClass2Hour19).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour20+totalClass2Hour20).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour21+totalClass2Hour21).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour22+totalClass2Hour22).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1Hour23+totalClass2Hour23).toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={3} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number((totalClass1+totalClass2).toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}

export default SummaryData