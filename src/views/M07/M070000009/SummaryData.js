import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalTodCash = 0;
    let totalTodCoupon = 0;
    let totalSodCash = 0;
    let totalSodCoupon = 0;
    let totalSodEMV = 0;
    let totalSodQRCash = 0;

    pageData.forEach(({ todCash
        , todCoupon
        , sodCash
        , sodCoupon
        , sodEMV
        , sodQRCash }) => {
        totalTodCash += todCash;
        totalTodCoupon += todCoupon;
        totalSodCash += sodCash;
        totalSodCoupon += sodCoupon;
        totalSodEMV += sodEMV;
        totalSodQRCash += sodQRCash;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={6} className="text-center" index={0}>ผลรวม</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalTodCash.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalTodCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalSodCash.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalSodCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalSodEMV.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalSodQRCash.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center"></Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}

export default SummaryData