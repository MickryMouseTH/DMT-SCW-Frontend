import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    // let totalAverageTraffic = 0;
    let totaltrafficApril = 0;
    let totaltrafficAugust = 0;
    let totaltrafficDecember = 0;
    let totaltrafficFebruary = 0;
    let totaltrafficJanuary = 0;
    let totaltrafficJuly = 0;
    let totaltrafficJune = 0;
    let totaltrafficMarch = 0;
    let totaltrafficMay = 0;
    let totaltrafficNovember = 0;
    let totaltrafficOctober = 0;
    let totaltrafficSeptember = 0;
    let totaltrafficTotal = 0;

    pageData.forEach(({ trafficApril, trafficAugust, trafficDecember
        , trafficFebruary, trafficJanuary, trafficJuly, trafficJune
        , trafficMarch, trafficMay, trafficNovember, trafficOctober
        , trafficSeptember, trafficTotal }) => {
        totaltrafficApril += trafficApril;
        totaltrafficAugust += trafficAugust;
        totaltrafficDecember += trafficDecember;
        totaltrafficFebruary += trafficFebruary;
        totaltrafficJanuary += trafficJanuary;
        totaltrafficJuly += trafficJuly;
        totaltrafficJune += trafficJune;
        totaltrafficMarch += trafficMarch;
        totaltrafficMay += trafficMay;
        totaltrafficNovember += trafficNovember;
        totaltrafficOctober += trafficOctober;
        totaltrafficSeptember += trafficSeptember;
        totaltrafficTotal += trafficTotal;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวม</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficJanuary.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficFebruary.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficMarch.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficApril.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficMay.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficJune.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficJuly.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficAugust.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficSeptember.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficOctober.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficNovember.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficDecember.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center">
                    <Text type="secondary" align="center" >{_isNull(Number(totaltrafficTotal.toFixed(2)))}</Text>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
