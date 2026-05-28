import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalAmountFromShipping = 0;
    let totalAmountCashSap = 0;
    let totalAmountFromSystem = 0;
    let totalAmountDiff = 0;
    let totalCountMccCoupon30 = 0;
    let totalCountMccCoupon70 = 0;
    let totalCountMccCoupon35 = 0;
    let totalCountMccCoupon80 = 0;
    let totalAmountMccCouponValue = 0;
    let totalAmountFromSystemCoupon = 0;
    let totalAmountDiffCoupon = 0;
    let totalAmountQrBank = 0;
    let totalAmountQrSod = 0;
    let totalAmountQrDiff = 0;

    pageData.forEach(({ amountFromShipping
        , amountCashSap
        , amountFromSystem
        , amountDiff
        , countMccCoupon30
        , countMccCoupon70
        , countMccCoupon35
        , countMccCoupon80
        , amountMccCouponValue
        , amountFromSystemCoupon
        , amountDiffCoupon
        , amountQrBank
        , amountQrSod
        , amountQrDiff }) => {
        totalAmountFromShipping += amountFromShipping;
        totalAmountCashSap += amountCashSap;
        totalAmountFromSystem += amountFromSystem;
        totalAmountDiff += amountDiff;
        totalCountMccCoupon30 += countMccCoupon30;
        totalCountMccCoupon70 += countMccCoupon70;
        totalCountMccCoupon35 += countMccCoupon35;
        totalCountMccCoupon80 += countMccCoupon80;
        totalAmountMccCouponValue += amountMccCouponValue;
        totalAmountFromSystemCoupon += amountFromSystemCoupon;
        totalAmountDiffCoupon += amountDiffCoupon;
        totalAmountQrBank += amountQrBank;
        totalAmountQrSod += amountQrSod;
        totalAmountQrDiff += amountQrDiff;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวมทั้งหมด</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalAmountFromShipping.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalAmountCashSap.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalAmountFromSystem.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalCountMccCoupon30.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalCountMccCoupon70.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalCountMccCoupon35.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalCountMccCoupon80.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountMccCouponValue.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountFromSystemCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountDiffCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrBank.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrSod.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center"></Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center"></Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
