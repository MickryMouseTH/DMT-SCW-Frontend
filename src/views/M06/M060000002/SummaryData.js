import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from '../../../tools/util'

const { Text } = Typography;

const SummaryData = (pageData) => {

    let totalAmountFromShipping = 0;
    let totalAmountFromSystem = 0;
    let totalAmountDiff = 0;
    let totalAmountFromShippingCoupon = 0;
    let totalAmountFromSystemCoupon = 0;
    let totalAmountNoVatCoupon = 0;
    let totalAmountDiffCoupon = 0;

    let totalAmountQrKbankBank = 0;
    let totalAmountQrKbankSod = 0;
    let totalAmountQrKbankDiff = 0;

    let totalAmountQrKtbBank = 0;
    let totalAmountQrKtbSod = 0;
    let totalAmountQrKtbDiff = 0;

    let totalAmountEmvKtbBank = 0;
    let totalAmountEmvKtbSod = 0;
    let totalAmountEmvKtbDiff = 0;

    pageData.forEach(({ amountFromShipping
        , amountFromSystem
        , amountDiff
        , amountFromShippingCoupon
        , amountFromSystemCoupon
        , amountNoVatCoupon
        , amountDiffCoupon
        , amountQrKbankBank
        , amountQrKbankSod
        , amountQrKbankDiff 
        , amountQrKtbBank
        , amountQrKtbSod
        , amountQrKtbDiff 
        , amountEmvKtbBank
        , amountEmvKtbSod
        , amountEmvKtbDiff }) => {
        totalAmountFromShipping += amountFromShipping;
        totalAmountFromSystem += amountFromSystem;
        totalAmountDiff += amountDiff;
        totalAmountFromShippingCoupon += amountFromShippingCoupon;
        totalAmountFromSystemCoupon += amountFromSystemCoupon;
        totalAmountNoVatCoupon += amountNoVatCoupon;
        totalAmountDiffCoupon += amountDiffCoupon;
        totalAmountQrKbankBank += amountQrKbankBank;
        totalAmountQrKbankSod += amountQrKbankSod;
        totalAmountQrKbankDiff += amountQrKbankDiff;
        totalAmountQrKtbBank += amountQrKtbBank;
        totalAmountQrKtbSod += amountQrKtbSod;
        totalAmountQrKtbDiff += amountQrKtbDiff;
        totalAmountEmvKtbBank += amountEmvKtbBank;
        totalAmountEmvKtbSod += amountEmvKtbSod;
        totalAmountEmvKtbDiff += amountEmvKtbDiff;
    });

    return (
        <>
            <Table.Summary.Row className="bg_default">
                <Table.Summary.Cell colSpan={2} className="text-center" index={0}>รวมทั้งหมด</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalAmountFromShipping.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center">{_isNull(Number(totalAmountFromSystem.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountFromShippingCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountFromSystemCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountDiffCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountNoVatCoupon.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrKbankBank.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrKbankSod.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrKbankDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrKtbBank.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrKtbSod.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountQrKtbDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountEmvKtbBank.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountEmvKtbSod.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text type="secondary" align="center" >{_isNull(Number(totalAmountEmvKtbDiff.toFixed(2)))}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center"></Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} className="text-center"></Table.Summary.Cell>
            </Table.Summary.Row>
        </>
    );
}



export default SummaryData
