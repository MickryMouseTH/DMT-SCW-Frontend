/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import PrintReport from "../../../components/print/PrintReport";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography, Table } from "antd";
import Skeleton from "../../../components/loading/Loading";
import moment from "moment";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import { GET_DATA_INFO_M050000007 } from "../../../service/api/report";
import { getPlazaListAPI } from "../../../service/api/util";
import { _timeZoneThai, _isEmpty, _isNull, _isZero, _setYearThai } from "../../../tools/util";
import { exportExcelJs } from "../../../tools/exceljs";
import { header57 } from "../../../tools/excel/header";
import { footer57 } from "../../../tools/excel/footer";

const dateFormat = "DD/MM/YYYY HH:mm:ss";
const { Text } = Typography;

const ReportAvcErrorSummary = (props) => {
  const { t } = useTranslation("menus");

  const [dataSource, setDataSource] = useState({ list: [] });
  const [plazaList, setsPlazaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({});
  const [scroll, setScroll] = useState({});
  // ----- Fields search ------ //

  const fields = [
    {
      type: "select",
      option: {
        name: "plaza",
        label: "ด่าน",
        childrenProps: {
          placeholder: "เลือกด่าน...",
          optionValue: {
            values: ["ทั้งหมด", ...plazaList],
            keyName: "plazaNameTh",
            keyValue: "plazaId",
          },
        },
        rules: [
          {
            required: false,
            message: "กรุณาเลือกด่าน!",
          },
        ],
        initialValue: _isEmpty(initialValue) && initialValue !== 0 ? "ทั้งหมด" : initialValue.plaza
        // initialValue.plaza ? initialValue.plaza : "ทั้งหมด",
      },
    },
    {
      type: "input",
      option: {
        name: "lane",
        label: "หมายเลขช่องทาง",
        childrenProps: { placeholder: "ป้อนหมายเลขช่องทาง..." },
        rules: [{ required: false, message: "กรุณาป้อนหมายเลขช่องทาง!" }],
        initialValue: initialValue.lane,
      },
    },
    {
      type: "datePicker",
      option: {
        name: "startDate",
        label: "จากวันที่",
        childrenProps: {
          format: dateFormat,
          placeholder: "เลือกวันที่...",
          showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่เริ่ม!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("00:00:00", "HH:mm:ss")
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
          showTime: { defaultValue: moment('23:59:59', 'HH:mm:ss') },
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }],
        initialValue: _isEmpty(initialValue)
          ? moment("23:59:59", "HH:mm:ss")
          : initialValue.endDate,
      },
    },
  ];

  // ----- columns Table ------ //
  const columns = [
    {
      title: "ด่าน",
      fixed: true,
      key: "plazaAbbreviation",
      dataIndex: "plazaAbbreviation",
      width: 200,
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className='text-left'>
                {_isNull(text)}
              </div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ช่องทาง",
      fixed: true,
      key: "laneAbbreviation",
      dataIndex: "laneAbbreviation",
      align: "center",
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: (
            <Text type="secondary">
              <div className='text-left'>
                {_isNull(text)}
              </div>
            </Text>
          ),
        };
      },
    },
    {
      title: "ผ่านทางรวม",
      dataIndex: "tollTotal",
      key: "tollTotal",
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "Class 1 ( 4 ล้อ )",
      align: "center",
      children: [
        {
          title: "Diss 0",
          dataIndex: "class1Diss0",
          key: "class1Diss0",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "Diss 2",
          dataIndex: "class1Diss2",
          key: "class1Diss2",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "Diss 5",
          dataIndex: "class1Diss5",
          key: "class1Diss5",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "Diss 255",
          dataIndex: "class1Diss255",
          key: "class1Diss255",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "Class 2 ( มากกว่า 4 ล้อ )",
      align: "center",
      children: [
        {
          title: "Diss 0",
          dataIndex: "class2Diss0",
          key: "class2Diss0",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "Diss 2",
          dataIndex: "class2Diss2",
          key: "class2Diss2",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "Diss 5",
          dataIndex: "class2Diss5",
          key: "class2Diss5",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
        {
          title: "Diss 255",
          dataIndex: "class2Diss255",
          key: "class2Diss255",
          align: "center",
          render: (text, record) => (
            <div className='text-right'>
              {_isNull(text)}
            </div>
          ),
        },
      ],
    },
    {
      title: "SUM Error",
      dataIndex: "summaryError",
      key: "summaryError",
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      align: "center",
      render: (text) => (
        <div className='text-right'>
          {_isNull(text)}
        </div>
      )
    },
  ];

  const headerText = [
    { name: "ด่าน", value: dataToPrint.DataList ? dataToPrint.plazaName : "" },
    {
      name: "ช่องทาง",
      value: dataToPrint.DataList ? dataToPrint.DataList.lane : "",
    },
    {
      name: "จากวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.startDate,dateFormat)
        : "",
    },
    {
      name: "ถึงวันที่",
      value: dataToPrint.DataList
        ? _setYearThai(dataToPrint.DataList.endDate,dateFormat)
        : "",
    },
  ];

  useEffect(() => {
    getPlazaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlazaList = async () => {
    setScroll({ x: 1300 });
    try {
      setLoading(true);
      const res = await getPlazaListAPI(null, props.auth.token);
      if (res.status.code === "S200") {
        setsPlazaList(res.list);
        setLoading(false);
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
    return { ...res, list: list
      , prefixText: 'Total'
      , tollTotalTotal: res.tollTotalTotal
      , class1Diss0Total: res.class1Diss0Total
      , class1Diss2Total: res.class1Diss2Total
      , class1Diss5Total: res.class1Diss5Total
      , class1Diss255Total: res.class1Diss255Total
      , class2Diss0Total: res.class2Diss0Total
      , class2Diss2Total: res.class2Diss2Total
      , class2Diss5Total: res.class2Diss5Total
      , class2Diss255Total: res.class2Diss255Total
      , summaryErrorTotal: res.summaryErrorTotal
      , percentAverage: res.percentAverage}
  }

  const getDataInfo = async (data = null) => {
    try {
      setLoading(true);
      const res = await GET_DATA_INFO_M050000007(data, props.auth.token);
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

  const handleChangeIdToName = (DataList) => {
    const plaza = plazaList.find((e) => e.plazaId === DataList.plaza);
    setDataToPrint({
      DataList,
      plazaName: plaza ? plaza.plazaNameTh : "ทั้งหมด",
    });
  };

  const handleOnFinish = (value) => {
    setInitialValue(value);

    handleChangeIdToName(value);

    const dataOutput = {
      startDate: _timeZoneThai(value.startDate),
      endDate: _timeZoneThai(value.endDate),
      plazaId: value.plaza === "ทั้งหมด" ? null : value.plaza,
      laneId: value.lane ? value.lane : null,
    };
    getDataInfo(dataOutput);
  };

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["5.7 รายงานนับรถผิดประเภท AVC Error"],
  });

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        // disabled: dataSource.list.length < 1,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          exportExcelJs({
            reportType: "57",
            fileName: "5.7 รายงานนับรถผิดประเภท AVC Error",
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
            pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row className="bg_default">
                    <Table.Summary.Cell colSpan={2} className="text-center" index={0}>
                      Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.tollTotalTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class1Diss0Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class1Diss2Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class1Diss5Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class1Diss255Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class2Diss0Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class2Diss2Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class2Diss5Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.class2Diss255Total))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.summaryErrorTotal))}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} className="text-right" index={1}>
                      <Text>{_isNull(Number(dataSource.percentAverage))}</Text>
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
            header={header57}
            footer={footer57}
            propsHeader={{
              headerText,
              TopicText: "5.7 รายงานนับรถผิดประเภท AVC Error",
            }}
            columnPerPage={13}
            rowPerPage={20}
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
)(ReportAvcErrorSummary);
