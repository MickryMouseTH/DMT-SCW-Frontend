import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import {
  _exportFileExcel,
  _timeZoneThai,
  _isEmpty,
  _isNull,
  _setYearThai,
} from "../../../tools/util";
import {
  Typography, Table, Button, Row, Pagination
} from "antd";
import Skeleton from "../../../components/loading/Loading"

import {
  GET_DATA_INFO_M100000001
  , GET_DATA_INFO_M100000001_Page_Search
  , DOWNLOAD_FILE_CONSENT_FORM_M100000001
  , DOWNLOAD_FILE_CONSENT_CANCEL_M100000001
  , DOWNLOAD_FILE_RECEIPT_M100000001
  , SAVE_CONSENT_FORM_M100000001
  , CANCLE_CONSENT_FORM_M100000001
  , SAVE_EDIT_CUSTOMER_M100000001
} from "../../../service/api/report";
import { getSearchTypeListAPI } from "../../../service/api/util";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import PrintPDF from "./PrintPDF";

const { Text } = Typography;
const dateFormat = "DD/MM/YYYY HH:mm:ss";

const ReportEtcForTaxInvoice = (props) => {
  const [PagintaionSize, setPaginationSize] = useState({
    pageNumber: 1,
    pageSize: 10
  })
  const [totalPage, setTotalPage] = useState(0)
  const [totalFare, setTotalFare] = useState("");
  const [dataPDF, setDataPDF] = useState({ list: [] })
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [searchTypeList, setSearchTypeList] = useState([]);
  const [highwayList, setHighwayList] = useState([]);
  const [name, setName] = useState("");
  // const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  // const [address3, setAddress3] = useState("");
  const [consentDate, setConsentDate] = useState("");
  const [icPassport, setIcPassport] = useState("");
  const [etcOperator, setEtcOperator] = useState(0);
  const [taxId, setTaxId] = useState("");
  // const [branchId, setBranchId] = useState("");
  const [telephone, setTelephone] = useState("");
  // const [postCode, setPostCode] = useState("");
  // const [email, setEmail] = useState("");
  // const [panNumber, setPanNumber] = useState("");
  const [smartcard, setSmartcard] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [dataOutputTemp, setDataOutputTemp] = useState({});
  const [chkDownload, setChkDownload] = useState(true);

  useEffect(() => {
    getSearchTextList();
    setHighwayList(["กรมทางหลวง (M-Pass)", "การทางพิเศษ (Easy-Pass)"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsOne = [
    {
      title: <b>No.</b>,
      key: "no",
      dataIndex: "no",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>Plaza</b>,
      key: "plazaName",
      dataIndex: "plazaName",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>Lane</b>,
      key: "laneName",
      dataIndex: "laneName",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>Type</b>,
      key: "type",
      dataIndex: "type",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-left">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>Pan</b>,
      key: "pan",
      dataIndex: "pan",
      align: 'center',
      width: 110,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>วันเวลารถผ่านทาง</b>,
      key: "trxDate",
      dataIndex: "trxDate",
      align: 'center',
      width: 100,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>วันเวลาที่ตัดเงินได้</b>,
      key: "csDate",
      dataIndex: "csDate",
      align: 'center',
      width: 100,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>Fare</b>,
      key: "fare",
      dataIndex: "fare",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-right">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>เลขที่ใบกำกับภาษี</b>,
      key: "receiptNo",
      dataIndex: "receiptNo",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>วันที่ใบกำกับภาษี</b>,
      key: "receiptDate",
      dataIndex: "receiptDate",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>วันที่ออกใบกำกับภาษี</b>,
      key: "receiptPrint",
      dataIndex: "receiptPrint",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>ออกใบกำกับภาษีโดย</b>,
      key: "printBy",
      dataIndex: "printBy",
      align: 'center',
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className="text-center">{text}</div>
            </Text>
          ),
        };
      }
    },
    {
      title: <b>แก้ไขข้อมูลลูกค้า</b>,
      key: "editCustomer",
      dataIndex: "editCustomer",
      align: 'center',
      width: 50,
      render: (text, record) => (
        // _isEmpty(record.receiptNo) ? "" : <Button style={{ minWidth: '80px' }} size="small" type="primary" onClick={() => {
        //   setSelectRecord(record);
        //   setVisiblePopup(true);
        //   setReceiptTrxId(record.receiptTrxId);
        //   setReceiptNo(record.receiptNo);
        //   setCustomerName(record.customerName);
        //   setCustomerAddress(record.customerAddress);
        // }}>
        //   แก้ไข
        // </Button>
        (_isEmpty(record.receiptNo) || _isEmpty(consentDate)) ? "" : <Button style={{ minWidth: '80px' }} size="small" type="primary" onClick={() => handleSubmitSaveEditReceipt(record)}>
          แก้ไข
        </Button>
      ),
    },
    {
      title: <b>พิมพ์ซ้ำ</b>,
      key: "print",
      dataIndex: "print",
      align: 'center',
      width: 50,
      render: (text, record) => (
        _isEmpty(consentDate) ? "" : <Button style={{ minWidth: '80px' }} size="small" type="primary" onClick={() => handlePringReceipt(record)}>พิมพ์</Button>
      ),
    },
  ];

  const fields = [

    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue) ? moment("00:00:00", "HH:mm:ss") : initialValue.startDate
      },
    },
    {
      type: "datePicker",
      option: {
        name: "endDate",
        label: "ถึงวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') }
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue) ? moment("23:59:59", "HH:mm:ss") : initialValue.endDate
      },
    },
    {
      type: "select",
      option: {
        name: "highwayId",
        label: "หน่วยงานผู้ออกบัตร",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...highwayList],
            keyValue: "highwayId",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกข้อมูลที่จะค้นหา!",
          },
        ],
        initialValue: initialValue.highwayId,
      },
    },
    {
      type: "select",
      option: {
        name: "searchType",
        label: "ค้นหาโดย",
        childrenProps: {
          placeholder: "เลือกข้อมูลที่จะค้นหา...",
          optionValue: {
            values: [...searchTypeList],
            keyName: "text",
            keyValue: "id",
          },
        },
        rules: [
          {
            required: true,
            message: "กรุณาเลือกข้อมูลที่จะค้นหา!",
          },
        ],
        initialValue: initialValue.searchType,
      },
    },
    {
      type: "input",
      option: {
        name: "searchText",
        label: "ข้อมูล",
        childrenProps: { placeholder: "กรอกข้อมูล" },
        rules: [{ required: true, message: "กรุณากรอกข้อมูล !" }],
        initialValue: initialValue.searchText,
      },
    },
  ];

  const header101 = [
    { name: "No.", key: "no", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Plaza", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Lane", key: "laneName", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Type", key: "type", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Pan", key: "pan", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันเวลาที่ผ่านทาง", key: "trxDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันเวลาที่ตัดเงินได้", key: "csDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "Fare", key: "fare", type: "fare", align: 'center', className: 'text-center' },
    { name: "เลขที่ใบกำกับภาษี", key: "receiptNo", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันที่ใบกำกับภาษี", key: "receiptDate", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "วันที่ออกใบกำกับภาษี", key: "receiptPrint", type: "nullColumn", align: 'center', className: 'text-center' },
    { name: "ออกใบกำกับภาษีโดย", key: "printBy", type: "nullColumn", align: 'center', className: 'text-center' }
  ]

  const getSearchTextList = async () => {
    try {
      setLoading(true);
      const res = await getSearchTypeListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setSearchTypeList(res.list);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePringReceipt = async (item) => {
    try {
      const sendItem = {
        fileName: "TaxInvoice.pdf",
        print: item.print,
        accountNo: accountNo,
        customerType: customerType,
        icPassport: icPassport,
        customerName: name,
        address1: item.address1,
        address2: item.address2,
        address3: item.address3,
        pan: item.pan,
        smartcard: item.smartcard,
        taxId: item.taxId,
        branchId: item.branchId,
        telephone: item.telephone,
        postCode: item.postCode,
        email: item.email,
        plateNo: item.plateNo,
        plateProvince: item.plateProvince
      };
      setChkDownload(true);
      if (sendItem.customerType === "C") {
        if (sendItem.taxId.length !== 13) {
          setChkDownload(false);
        }
      }
      if (chkDownload) {
        await DOWNLOAD_FILE_RECEIPT_M100000001(sendItem, props.auth.token);
        const dataOutput = {
          searchType: dataOutputTemp.searchType,
          searchText: _isEmpty(dataOutputTemp.searchText) ? null : dataOutputTemp.searchText,
          startDate: _timeZoneThai(dataOutputTemp.startDate),
          endDate: _timeZoneThai(dataOutputTemp.endDate),
          highwayId: dataOutputTemp.highwayId,
          pageRequest: {
            maxRowSize: PagintaionSize.pageSize,
            pageIndex: PagintaionSize.pageNumber
          }
        };
        getDataList(dataOutput);
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถพิมพ์ใบเสร็จได้. ",
          text: "ข้อมูล taxId มีความยาวไม่ครบ 13 หลักระกรุณาแก้ไขข้อมูลก่อนทำรายการ.",
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandlePrintPDF = async () => {
    try {
      const dataOutput = {
        searchType: dataOutputTemp.searchType,
        searchText: _isEmpty(dataOutputTemp.searchText) ? null : dataOutputTemp.searchText,
        startDate: _timeZoneThai(dataOutputTemp.startDate),
        endDate: _timeZoneThai(dataOutputTemp.endDate),
        highwayId: dataOutputTemp.highwayId
      };

      const res = await GET_DATA_INFO_M100000001(!_isEmpty(dataOutput) ? dataOutput : null, props.auth.token);
      if (res.status.code === "S200") {
        setDataPDF(addIndex(res, dataOutput));
        console.log("10.1 data => ", res);
        return addIndex(res, dataOutput)
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePringConsentForm = async () => {
    try {
      const sendItem = {
        etcOperator: etcOperator,
        taxId: taxId,
        icPassport: icPassport,
        customerName: name,
        address: address2,
        telephoneNo: telephone,
        smartcard: smartcard
      };
      await DOWNLOAD_FILE_CONSENT_FORM_M100000001(sendItem, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePringConsentCancel = async (taxId, etcOperator) => {
    try {
      const sendItem = {
        fileName: 'ConsentCancel.PDF',
        taxId: taxId,
        etcOperator: etcOperator
      };
      await DOWNLOAD_FILE_CONSENT_CANCEL_M100000001(sendItem, props.auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveConsentForm = async (taxId, etcOperator) => {
    try {
      const sendItem = {
        fileName: 'ConsentForm.PDF',
        taxId: taxId,
        etcOperator: etcOperator
      };
      await SAVE_CONSENT_FORM_M100000001(sendItem, props.auth.token);
      getDataList(dataOutputTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancleConsentForm = async (taxId, etcOperator) => {
    try {
      const sendItem = {
        fileName: 'ConsentForm.PDF',
        taxId: taxId,
        etcOperator: etcOperator
      };
      await CANCLE_CONSENT_FORM_M100000001(sendItem, props.auth.token);
      getDataList(dataOutputTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintFile = async () => {
    await HandlePrintPDF();
    setTimeout(function () { handlePrint(); }, 1000);
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["8.11 Report ETC for Tax invoice"],
  });

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: async () => {
          const resultexcel = await HandlePrintPDF();
          _exportFileExcel({
            dataSource: { list: addIndex(resultexcel).listExport },
            fileName: "10.1 Report ETC for Tax invoice",
            header: header101,
          });
        },
      },
    },
  ];

  const addIndex = (res) => {

    return {
      ...res,
      listExport: [...res.list,]
    }
  }

  const getDataList = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M100000001_Page_Search(dataOutput, props.auth.token);
      console.log("res 10.1", res);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
        setTotalPage(res.pageResponse.totalSize)
        setName(res.name);
        // setAddress1(res.address1);
        setAddress2(res.address2);
        // setAddress3(res.address3);
        setIcPassport(res.icPassport);
        setConsentDate(res.consentDate);
        setTotalFare(res.totalFare);
        setEtcOperator(res.etcOperator);
        setTaxId(res.taxId);
        // setBranchId(res.branchId);
        setTelephone(res.telephone);
        // setPostCode(res.postCode);
        // setEmail(res.email);
        // setPanNumber(res.panNumber);
        setSmartcard(res.smartcard);
        setAccountNo(res.accountNo);
        setCustomerType(res.customerType);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const saveEditCustomer = async (dataOutput) => {
    try {
      setLoading(true);
      const res = await SAVE_EDIT_CUSTOMER_M100000001(dataOutput, props.auth.token);
      console.log("res 10.1", res);
      if (res.status.code === "S200") {
        setLoading(false);
        getDataList(dataOutputTemp);
        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ! ",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to fetch. ",
          text: res.status.message,
        }).then(async (result) => {
          if (result.value) {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitSaveEditReceipt = (record) => {
    // const data = {
    //   receiptTrxId: receiptTrxId,
    //   receiptNo: receiptNo,
    //   customerName: customerName,
    //   customerAddress: customerAddress
    // };
    const data = {
      receiptTrxId: record.receiptTrxId,
      receiptNo: record.receiptNo,
      customerName: record.customerName,
      customerAddress: record.customerAddress,
      pan: record.pan,
      icPassport: record.icPassport
    };
    saveEditCustomer(data);
    // form.resetFields();
    // setVisiblePopup(false);
    // setSelectRecord(null);
  };

  const handleChangeIdToName = (DataList) => {
    setDataToPrint({
      DataList,
    });
  };

  const handleOnFinish = (value) => {
    handleChangeIdToName(value);
    setInitialValue(value);
    setPaginationSize({
      ...PagintaionSize, pageNumber: 1,
    })
    const dataOutput = {
      searchType: value.searchType,
      searchText: _isEmpty(value.searchText) ? null : value.searchText,
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      highwayId: value.highwayId === "ทั้งหมด" ? 0 : value.highwayId === "กรมทางหลวง (M-Pass)" ? 1 : 2,
      pageRequest: {
        maxRowSize: PagintaionSize.pageSize,
        pageIndex: 1
      }
    };
    setDataOutputTemp(dataOutput);
    getDataList(dataOutput);
  };

  const headerText = [
    // { name: "ด่าน", value: dataToPrint.plazaName ? dataToPrint.plazaName : "" },
    {
      name: "วันที่ดำเนินการ",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.date,"DD/MM/YYYY")
        : "",
    }
  ];

  return (
    <Skeleton loading={loading} active>
      <FormDefault
        fields={fields}
        buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
        formWrapper={{ md: 24, lg: 19, xl: 21 }}
        typeButton="primary"
        submitText="ค้นหา"
        onFinish={handleOnFinish}
        action={action}
      />
      <Row className='ant-table-thead d-flex justify-content-left align-items-center mt-5 mb-5' hidden={icPassport === ''}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '10px', fontSize: 20, fontWeight: "bold" }}>เลขประจำตัวผู้เสียภาษี : </Text>
        <Text style={{ fontSize: 18 }}> {icPassport} </Text>
      </Row>
      <Row className='d-flex justify-content-left align-items-center mt-5 mb-5' hidden={icPassport === ''}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '10px', fontSize: 20, fontWeight: "bold" }}>ชื่อ : </Text>
        <Text style={{ fontSize: 18 }}> {name} </Text>
      </Row>
      <Row className='d-flex justify-content-left align-items-center mt-5 mb-5' hidden={icPassport === ''}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '10px', fontSize: 20, fontWeight: "bold" }}>ที่อยู่ : </Text>
        <Text style={{ fontSize: 18 }}> {address2} </Text>
      </Row>
      <Row className='d-flex justify-content-left align-items-center mt-5 mb-5' hidden={consentDate === '' || icPassport === ''}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '10px' }}>ลูกค้าเซ็นต์ consent แล้วเมื่อ : </Text>
        <Text style={{ marginRight: '10px' }}> {consentDate} </Text>
        <Text style={{ marginRight: '10px' }}> <Button type="primary" size="small" onClick={() => handlePringConsentCancel(icPassport, etcOperator)}>พิมพ์ใบยกเลิก Consent</Button> </Text>
        <Text style={{ marginRight: '10px' }}> <Button type="primary" size="small" onClick={() => handleCancleConsentForm(icPassport, etcOperator)}>ยกเลิก Consent</Button> </Text>
      </Row>
      <Row className='d-flex justify-content-left align-items-center mt-5 mb-5' hidden={consentDate !== '' || icPassport === ''}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '10px' }}>ลูกค้ายังไม่เซ็นต์ consent </Text>
        <Text style={{ marginRight: '10px' }}> <Button type="primary" size="small" onClick={() => handlePringConsentForm()}>พิมพ์ Consent</Button> </Text>
        <Text style={{ marginRight: '10px' }}> <Button type="primary" size="small" onClick={() => handleSaveConsentForm(icPassport, etcOperator)}>ยืนยัน Consent</Button> </Text>
      </Row>

      <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
        <Table
          size="small"
          rowKey={(row, ind) => ind}
          columns={columnsOne}
          bordered
          dataSource={dataSource.list}
          pagination={false}
          summary={() => {
            return (
              <>
                <Table.Summary.Row className="bg_default">
                  <Table.Summary.Cell colSpan={5} className="text-center">
                    <Text>รวม</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={2} className="text-center">
                    <Text>{!_isEmpty(dataSource.pageResponse) ? _isNull(Number(dataSource.pageResponse.totalSize)) : dataSource.list.length}  รายการ</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1} className="text-right">
                    <Text>{totalFare}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={6} className="text-left">
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />

        {!_isEmpty(dataSource.list) ?
          <Row justify='end' className="mt-10">
            <Pagination pageSizeOptions={["10", "25", "50", "75", "100"]}
              current={PagintaionSize.pageNumber}
              defaultPageSize={PagintaionSize.pageSize}
              onChange={(page, size) => {
                setPaginationSize({
                  pageNumber: page,
                  pageSize: size
                })
                const dataOutput = {
                  searchType: dataOutputTemp.searchType,
                  searchText: _isEmpty(dataOutputTemp.searchText) ? null : dataOutputTemp.searchText,
                  startDate: _timeZoneThai(dataOutputTemp.startDate),
                  endDate: _timeZoneThai(dataOutputTemp.endDate),
                  highwayId: dataOutputTemp.highwayId,
                  pageRequest: {
                    maxRowSize: size,
                    pageIndex: page
                  }
                };
                getDataList(dataOutput);
              }}
              onShowSizeChange={(current, size) => {
                setPaginationSize({
                  pageNumber: current,
                  pageSize: size
                })
                const dataOutput = {
                  searchType: dataOutputTemp.searchType,
                  searchText: _isEmpty(dataOutputTemp.searchText) ? null : dataOutputTemp.searchText,
                  startDate: _timeZoneThai(dataOutputTemp.startDate),
                  endDate: _timeZoneThai(dataOutputTemp.endDate),
                  highwayId: dataOutputTemp.highwayId,
                  pageRequest: {
                    maxRowSize: size,
                    pageIndex: current
                  }
                };
                getDataList(dataOutput);
              }}
              size="small" total={totalPage} showSizeChanger />
            {/* size="small" total={totalPage} showTotal={total => `Total ${total} items`} showSizeChanger /> */}
          </Row> : null}

      </div>
      <div className="d-none">
        <PrintPDF
          ref={printReportRef}
          dataSource={dataPDF.list}
          HeaderBar={{
            headerText,
            position: "d-flex justify-content-start",
            colSpan: 5,
            TopicText: "10.1 ค้นหารายการผ่านทาง ETC เพื่อออกใบกำกับภาษี"
          }}
        />
      </div>

      {/* <Modal
        maskClosable={false}
        centered
        footer={false}
        visible={visiblePopup}
        onCancel={() => {
          form.resetFields();
          setVisiblePopup(false);
          setSelectRecord(null);
        }}
        width={1000}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          layout="vertical"
          className="custom-ant-form"
          size="large"
          form={form}
        >
          {selectRecord ? (
            <Row>
              <Col span={24}>
                <Form.Item
                  className="mb-3"
                  name={"receiptNo"}
                  rules={[{ required: false }]}
                >
                  <div className="mb-3">
                    <Text style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '10px', fontSize: 14, fontWeight: "bold" }}>{`เลขที่ใบกำกับภาษี : ${_isNull(selectRecord.receiptNo)}`}</Text>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            <></>
          )}
          {selectRecord ? (
            <Row>
              <Row gutter={24} justify="start" type="flex" className="w-100">
                <Col span={8}>
                  <Form.Item
                    className="mb-3"
                    label={"ชื่อ"}
                    name={"customerName"}
                    rules={[{ required: false }]}
                  >
                    <Input onChange={event => setCustomerName(event.target.value)}
                      type="text"
                      size={500}
                      placeholder="ชื่อ..."
                      className="rounded-pill max-WS "
                      defaultValue={selectRecord.customerName}>
                    </Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    className="mb-3"
                    label={"ที่อยู่"}
                    name={"customerAddress"}
                    rules={[{ required: false }]}
                  >
                    <Input onChange={event => setCustomerAddress(event.target.value)}
                      type="text"
                      size={500}
                      placeholder="ที่อยู่..."
                      className="rounded-pill max-WS "
                      defaultValue={selectRecord.customerAddress}>
                    </Input>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={<div></div>}>
                    <Button
                      style={{ marginTop: -30 }}
                      htmlType="submit"
                      size="middle"
                      type="primary"
                      onClick={handleSubmitSaveEditReceipt}
                    >
                      บันทึก
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Row>
          ) : (
            <></>
          )}
        </Form>
      </Modal> */}

    </Skeleton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportEtcForTaxInvoice);
