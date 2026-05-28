import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {
    let totalHour0 = 0;
    let totalHour1 = 0;
    let totalHour2 = 0;
    let totalHour3 = 0;
    let totalHour4 = 0;
    let totalHour5 = 0;
    let totalHour6 = 0;
    let totalHour7 = 0;
    let totalHour8 = 0;
    let totalHour9 = 0;
    let totalHour10 = 0;
    let totalHour11 = 0;
    let totalHour12 = 0;
    let totalHour13 = 0;
    let totalHour14 = 0;
    let totalHour15 = 0;
    let totalHour16 = 0;
    let totalHour17 = 0;
    let totalHour18 = 0;
    let totalHour19 = 0;
    let totalHour20 = 0;
    let totalHour21 = 0;
    let totalHour22 = 0;
    let totalHour23 = 0;
    let totalClass1 = 0;
    let totalClass2 = 0;
    let class1AndClass2Total =0;

    pageData.forEach((
        { 
            hour0Total, 
            hour1Total,
            hour2Total, 
            hour3Total, 
            hour4Total, 
            hour5Total, 
            hour6Total, 
            hour7Total, 
            hour8Total, 
            hour9Total, 
            hour10Total, 
            hour11Total, 
            hour12Total, 
            hour13Total, 
            hour14Total, 
            hour15Total, 
            hour16Total, 
            hour17Total, 
            hour18Total, 
            hour19Total,
            hour20Total,
            hour21Total,
            hour22Total,
            hour23Total, 
            class1TsbTotal, 
            class2TsbTotal,
            class1and2TsbTotal
        }
    ) => {
        totalHour0 += hour0Total;
        totalHour1 += hour1Total;
        totalHour2 += hour2Total;
        totalHour3 += hour3Total;
        totalHour4 += hour4Total;
        totalHour5 += hour5Total;
        totalHour6 += hour6Total;
        totalHour7 += hour7Total;
        totalHour8 += hour8Total;
        totalHour9 += hour9Total;
        totalHour10 += hour10Total;
        totalHour11 += hour11Total;
        totalHour12 += hour12Total;
        totalHour13 += hour13Total;
        totalHour14 += hour14Total;
        totalHour15 += hour15Total;
        totalHour16 += hour16Total;
        totalHour17 += hour17Total;
        totalHour18 += hour18Total;
        totalHour19 += hour19Total;
        totalHour20 += hour20Total;
        totalHour21 += hour21Total;
        totalHour22 += hour22Total;
        totalHour23 += hour23Total;
        totalClass1 += class1TsbTotal;
        totalClass2 += class2TsbTotal;
        class1AndClass2Total += class1and2TsbTotal;
    });

    return (
        <>
            {/* Total by Class */}
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={1} className="text-center" index={0}>Total</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour0.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour1.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour2.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour3.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour4.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour5.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour6.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour7.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour8.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour9.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour10.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour11.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour12.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour13.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour14.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour15.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour16.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour17.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour18.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour19.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour20.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour21.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour22.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalHour23.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass1.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(totalClass2.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center">{_isNull(Number(class1AndClass2Total.toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}

export default SummaryData