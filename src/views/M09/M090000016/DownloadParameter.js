/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Button, Row, Col } from "antd";
import Skeleton from "../../../components/loading/Loading"

import {
    DOWNLOAD_FILE_STAFF_M090000016
    , DOWNLOAD_FILE_PROMOTION_M090000016
    , DOWNLOAD_FILE_TFI_M090000016
    , DOWNLOAD_FILE_DMT_CARD_M090000016
    , DOWNLOAD_FILE_TARIFF_MTC_M090000016
    , DOWNLOAD_FILE_TARIFF_ETC_M090000016
    , DOWNLOAD_FILE_STATUSLIST_M090000016
    , DOWNLOAD_FILE_BLACKLIST_M090000016
} from "../../../service/api/report";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _isZero, _PlusZero } from "../../../tools/util";

const { Text } = Typography;

const DownloadParameter = (props) => {
    const [loading, setLoading] = useState(false);

    const handleStaff = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "parameter-staff.json"
            };
            await DOWNLOAD_FILE_STAFF_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };
    const handlePromotion = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "parameter-promotion.json"
            };
            await DOWNLOAD_FILE_PROMOTION_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };
    const handleTfi = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "parameter-tfi.json"
            };
            await DOWNLOAD_FILE_TFI_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };
    const handleDmtCard = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "parameter-dmt-card.json"
            };
            await DOWNLOAD_FILE_DMT_CARD_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };
    const handleTariffMtc = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "parameter-tariff-mtc.json"
            };
            await DOWNLOAD_FILE_TARIFF_MTC_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };
    const handleTariffEtc = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "tarifftable.dat"
            };
            await DOWNLOAD_FILE_TARIFF_ETC_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };
    const handleStatuslist = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "obustatuslist.dat.gz"
            };
            await DOWNLOAD_FILE_STATUSLIST_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };
    const handleBlacklist = async () => {
        try {
            setLoading(true);
            const data = {
                networkId: 10,
                fileName: "obublacklist.dat.gz"
            };
            await DOWNLOAD_FILE_BLACKLIST_M090000016(data, props.auth.token);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    };

    const buttonWrapper = { md: 24, lg: 3, xl: 3 };
    const actionStaff =
    {
        key: "DownloadStaff",
        name: "Download",
        props: {
            type: "primary",
            onClick: handleStaff,
        }
    };
    const actionPromotion =
    {
        key: "DownloadPromotion",
        name: "Download",
        props: {
            type: "primary",
            onClick: handlePromotion,
        }
    };
    const actionTfi =
    {
        key: "DownloadTfi",
        name: "Download",
        props: {
            type: "primary",
            onClick: handleTfi,
        }
    };
    const actionDmtCard =
    {
        key: "DownloadDmtCard",
        name: "Download",
        props: {
            type: "primary",
            onClick: handleDmtCard,
        }
    };
    const actionTariffMtc =
    {
        key: "DownloadTariffMtc",
        name: "Download",
        props: {
            type: "primary",
            onClick: handleTariffMtc,
        }
    };
    const actionTariffEtc =
    {
        key: "DownloadTariffEtc",
        name: "Download",
        props: {
            type: "primary",
            onClick: handleTariffEtc,
        }
    };
    const actionStatuslist =
    {
        key: "DownloadStatuslist",
        name: "Download",
        props: {
            type: "primary",
            onClick: handleStatuslist,
        }
    };
    const actionBlacklist =
    {
        key: "DownloadBlacklist",
        name: "Download",
        props: {
            type: "primary",
            onClick: handleBlacklist,
        }
    };

    return (
        <Skeleton loading={loading} active>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>Staff</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionStaff.props} key={actionStaff.key} className="m-5 mt-0">
                        {actionStaff.name}
                    </Button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>Promotion</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionPromotion.props} key={actionPromotion.key} className="m-5 mt-0">
                        {actionPromotion.name}
                    </Button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>TFI</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionTfi.props} key={actionTfi.key} className="m-5 mt-0">
                        {actionTfi.name}
                    </Button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>DMT Card</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionDmtCard.props} key={actionDmtCard.key} className="m-5 mt-0">
                        {actionDmtCard.name}
                    </Button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>Tariff MTC</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionTariffMtc.props} key={actionTariffMtc.key} className="m-5 mt-0">
                        {actionTariffMtc.name}
                    </Button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>Tariff ETC</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionTariffEtc.props} key={actionTariffEtc.key} className="m-5 mt-0">
                        {actionTariffEtc.name}
                    </Button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>Statuslist</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionStatuslist.props} key={actionStatuslist.key} className="m-5 mt-0">
                        {actionStatuslist.name}
                    </Button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-left mt-10'>
                <Col {...buttonWrapper} className="text-left">
                    <Text className="mt-10" style={{ fontSize: '20px', fontWeight: 'bold', }}>Blacklist</Text>
                </Col>
                <Col {...buttonWrapper} className="text-right">
                    <Button {...actionBlacklist.props} key={actionBlacklist.key} className="m-5 mt-0">
                        {actionBlacklist.name}
                    </Button>
                </Col>
            </Row>

        </Skeleton >
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadParameter);
