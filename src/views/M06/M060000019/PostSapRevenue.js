/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { Typography, Table, Button } from "antd";
import Skeleton from "../../../components/loading/Loading"
import { getRevenueTypeListAPI } from "../../../service/api/util";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M060000019, POST_M060000019 } from "../../../service/api/report";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header619 } from "../../../tools/excel/header";

const dateFormat = "DD/MM/YYYY";
const { Text } = Typography;

const PostSapRevenue = (props) => {

  const [dataSource, setDataSource] = useState({ list: [] });
  const [revenueTypeList, setRevenueTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postTypeList, setPostTypeList] = useState([]);
  // ----- Fields search ------ //

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกจากวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.startDate,
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
          showTime: false,
        },
        rules: [{ required: true, message: "กรุณาเลือกถึงวันที่!" }],
        initialValue: _isEmpty(initialValue)
          ? moment()
          : initialValue.endDate,
      },
    },
    {
      type: "select",
      option: {
        name: "revenueTypeId",
        label: "ประเภทรายได้",
        childrenProps: {
          placeholder: "เลือกประเภทรายได้...",
          optionValue: {
            values: ["ทั้งหมด", ...revenueTypeList],
            keyName: "revenueTypeNameTh",
            keyValue: "revenueTypeId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกประเภทรายได้!",
          },
        ],
        initialValue: initialValue.revenueTypeId ? initialValue.revenueTypeId : "ทั้งหมด",
      },
    },
    {
      type: "select",
      option: {
        name: "postType",
        label: "สถานะการ Post",
        childrenProps: {
          placeholder: "เลือกสถานะการ Post...",
          optionValue: {
            values: [...postTypeList],
            keyValue: "postType",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกสถานะการ Post!",
          },
        ],
        initialValue: initialValue.postType ? initialValue.postType : "ทั้งหมด",
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ลำดับ",
      fixed: true,
      key: "order",
      dataIndex: "order",
      width: 30,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่รายได้",
      key: "revenueDate",
      dataIndex: "revenueDate",
      width: 60,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ประเภทรายได้",
      dataIndex: "revenueType",
      key: "revenueType",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "รหัสพนักงาน Post",
      dataIndex: "postStaffNo",
      key: "postStaffNo",
      width: 55,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "postStaffName",
      key: "postStaffName",
      width: 100,
      align: "center",
      render: (text, record) => (
        <div className='text-left'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "วันที่ Post",
      key: "postDate",
      dataIndex: "postDate",
      width: 80,
      align: "center",
      render: (text, record) => (
        <div className='text-center'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "AR AMT",
      dataIndex: "arAmt",
      key: "arAmt",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "BASETAX AMT",
      dataIndex: "baseTaxAmt",
      key: "baseTaxAmt",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "VAT AMT",
      dataIndex: "vatAmt",
      key: "vatAmt",
      width: 45,
      align: "center",
      render: (text, record) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      ),
    },
    {
      title: "POST",
      dataIndex: "refNoSap",
      key: "refNoSap",
      width: 100,
      align: "center",
      render: (text, record) => (
        <span>
          {record.postDate !== 'รวมทั้งหมด' ?
            <Button /*disabled={record.postDate}*/ size="small" type="primary" onClick={() => post(record)}>
              Post to SAP
            </Button> : null}
        </span>
      ),
    },
  ];

  const headerText = [
    {
      name: "จากวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.startDate,dateFormat) : "",
    },
    {
      name: "ถึงวันที่", value: dataToPrint.DataList ? _setYearThai(dataToPrint.DataList.endDate,dateFormat) : "",
    },
    { name: "ประเภทรายได้", value: dataToPrint.DataList ? dataToPrint.revenueType : "" },
    { name: "สถานะการ Post", value: dataToPrint.DataList ? dataToPrint.DataList.postType : "" },
  ];

  useEffect(() => {
    getRevenueTypeList();
    setPostTypeList(["ทั้งหมด", "รายการที่ยังไม่ได้ Post", "รายการที่ Post แล้ว"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRevenueTypeList = async () => {
    setScroll({ x: 1500, y: 600 });
    try {
      setLoading(true);
      const res = await getRevenueTypeListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        console.log("tsbList", res);
        setLoading(false);
        setRevenueTypeList(res.list);
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

  const addIndex = (res) => {
    const list = res.list.map((item, index) => {
      return { ...item, index: index + 1 }
    })

    const total = {
      postDate: 'รวมทั้งหมด',
      arAmt: res.totalArAmt,
      baseTaxAmt: res.totalBaseTaxAmt,
      vatAmt: res.totalVatAmt,
    }

    // return { ...res, list: list, prefixText: 'Total', secondText: 'rows', count: list.length }
    return { ...res, list: [...list, total], prefixText: 'Total', secondText: 'rows', count: list.length }
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M060000019(data, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        setDataSource(addIndex(res));
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

  const post = async (data = null) => {
    try {
      const dataOutput = {
        refNoSap: data.refNoSap,
      };
      setLoading(true);
      const res = await POST_M060000019(dataOutput, props.auth.token);
      if (res.status.code === "S200") {
        setLoading(false);
        const dataOutput = {
          startDate: _timeZoneThai(initialValue.startDate),
          endDate: _timeZoneThai(initialValue.endDate),
          revenueType: initialValue.revenueTypeId === "ทั้งหมด" ? null : initialValue.revenueTypeId,
          postType: initialValue.postType === "ทั้งหมด" ? null : initialValue.postType === "รายการที่ยังไม่ได้ Post" ? 1 : 2,
        };
        getDataInfo(dataOutput);
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

  const handleChangeIdToName = (DataList) => {
    const revenueType = revenueTypeList.find((e) => e.revenueTypeId === DataList.revenueTypeId);
    setDataToPrint({
      DataList,
      revenueType: revenueType ? revenueType.revenueTypeNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);
    handleChangeIdToName(value);
    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      revenueType: value.revenueTypeId === "ทั้งหมด" ? null : value.revenueTypeId,
      postType: value.postType === "ทั้งหมด" ? null : value.postType === "รายการที่ยังไม่ได้ Post" ? 1 : 2,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["6.19 ส่งข้อมูลรายได้"],
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
        onClick: () =>
          exportExcelJs({
            reportType: "619",
            fileName: "6.19 ส่งข้อมูลรายได้",
            data: dataSource,
          })
      },
    },
  ];

  return (
    <Skeleton loading={loading} active>
      <div>
        <FormDefault
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          fields={fields}
          onFinish={handleOnFinish}
          action={action}
        />
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            // scroll={scroll}
            scroll={columns.length <= 12 ? false : scroll}
            columns={columns}
            bordered
            dataSource={dataSource.list}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              current: currentPage,
              onChange: (page, pageSize) => setCurrentPage(page),
              position: _isEmpty(dataSource.list) ? false : ["topRight", 'bottomRight']
            }}
            // pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={2} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-center" index={2}>
                      <Text>{_isNull(Number(dataSource.list.length))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-left" index={3}>
                      <Text>rows</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={6} className="text-left" index={4}>
                      <Text></Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
        <div className="d-none">
          <PrintReport
            ref={printReportRef}
            dataSource={{
              ...dataSource,
              rows: "rows",
              count: _isNull(Number(dataSource.list.length)),
            }}
            header={header619}
            footer={[]}
            propsHeader={{
              headerText,
              TopicText: "6.19 ส่งข้อมูลรายได้",
            }}
            columnPerPage={13}
            rowPerPage={25}
            propsClass="print-border-footer"
          />
        </div>
      </div>
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
)(PostSapRevenue);
