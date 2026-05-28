import React, { useState, useCallback, useRef} from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from "moment";
import { _exportFileExcel, _timeZoneThai, _isEmpty, _isNull, _setYearThai } from "../../../tools/util";
import { Table, Row, Col } from "antd";
import { GET_DATA_INFO_M070000004 } from "../../../service/api/report";
import FormDefault from "../../../components/form/FormDefault/FormDefault";
import Skeleton from "../../../components/loading/Loading"
import { useReactToPrint } from "react-to-print";
import {
  header74_Export
} from "../../../tools/excel/header";
import PrintPDF from "./PrintPDF"

const dateFormat = "DD/MM/YYYY";

const MorningRevenueReport = (props) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({ list: [] });
  const [initialValue, setInitialValue] = useState({});
  const [dataToPrint, setDataToPrint] = useState({})
  const [scrollTable, setScrollTable] = useState(false)

  const columnsTimePeriod = [
    {
      title: <b>Plaza</b>,
      key: "plazaName",
      dataIndex: "plazaName",
      align: "center",
      width: 60,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: text === "Total" || text === "Percent" ? (
            <div style={{ textAlign: 'right' }}>
              <b>{_isNull(text)}</b>
            </div>
          ) : (
            <div style={{ textAlign: 'left', color: 'rgba(0, 0, 0, 0.45)' }}>
              {_isNull(text)}
            </div>
          ),
        };
      }
    },
    {
      title: <b>AM</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>CASH</b>,
          key: "amCach",
          dataIndex: "amCach",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>Coupon</b>,
          key: "amCoupon",
          dataIndex: "amCoupon",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>EMV</b>,
          key: "amEmv",
          dataIndex: "amEmv",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>QRCode</b>,
          key: "amQr",
          dataIndex: "amQr",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>Mpass</b>,
          key: "amMpass",
          dataIndex: "amMpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>EasyPass</b>,
          key: "amEpass",
          dataIndex: "amEpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
      ],
    },
    {
      title: <b>PM</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>CASH</b>,
          key: "pmCach",
          dataIndex: "pmCach",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>Coupon</b>,
          key: "pmCoupon",
          dataIndex: "pmCoupon",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>EMV</b>,
          key: "pmEmv",
          dataIndex: "pmEmv",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>QRCode</b>,
          key: "pmQr",
          dataIndex: "pmQr",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>Mpass</b>,
          key: "pmMpass",
          dataIndex: "pmMpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>EasyPass</b>,
          key: "pmEpass",
          dataIndex: "pmEpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
      ],
    },
    {
      title: <b>Night</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>CASH</b>,
          key: "nightCach",
          dataIndex: "nightCach",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>Coupon</b>,
          key: "nightCoupon",
          dataIndex: "nightCoupon",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>EMV</b>,
          key: "nightEmv",
          dataIndex: "nightEmv",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>QRCode</b>,
          key: "nightQr",
          dataIndex: "nightQr",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>Mpass</b>,
          key: "nightMpass",
          dataIndex: "nightMpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
        {
          title: <b>EasyPass</b>,
          key: "nightEpass",
          dataIndex: "nightEpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            return obj;
          }
        },
      ],
    },
  ];

  const columnsTotal = [
    {
      title: <b>Plaza</b>,
      key: "plazaName",
      dataIndex: "plazaName",
      align: "center",
      width: 130,
      ellipsis: true,
      render(text, record) {
        return {
          props: {
            className: "secondary bg_default",
          },
          children: text === "Total" || text === "Grand Total" || text === "Percent" ? (
            <div style={{ textAlign: 'right' }}>
              <b>{_isNull(text)}</b>
            </div>
          ) : (
            <div style={{ textAlign: 'left', color: 'rgba(0, 0, 0, 0.45)' }}>
              {_isNull(text)}
            </div>
          ),
        };
      }
    },
    {
      title: <b>Total</b>,
      key: "",
      align: "center",
      children: [
        {
          title: <b>CASH</b>,
          key: "totalCach",
          dataIndex: "totalCach",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Grand Total" ? <div style={{ textAlign: "right", color: 'black', fontWeight: 'bold' }}><i>{_isNull(row.totalSum)}</i></div>
                : row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                  : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                    : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.plazaName === "Grand Total") { obj.props.colSpan = 7; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>Coupon</b>,
          key: "totalCoupon",
          dataIndex: "totalCoupon",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>EMV</b>,
          key: "totalEmv",
          dataIndex: "totalEmv",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>QRCode</b>,
          key: "totalQr",
          dataIndex: "totalQr",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>Mpass</b>,
          key: "totalMpass",
          dataIndex: "totalMpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>EasyPass</b>,
          key: "totalEpass",
          dataIndex: "totalEpass",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(value)}</i></b></div>
                : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(value)).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(value)}</div>,
              props: {}
            };
            if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
        {
          title: <b>Total</b>,
          key: "",
          dataIndex: "",
          align: "center",
          width: 60,
          render: (value, row, index) => {
            const obj = {
              children: row.plazaName === "Total" ? <div style={{ textAlign: "right" }}><b><i>{_isNull(SumValueColumn(value))}</i></b></div>
                : row.plazaName === "Percent" ? <div style={{ textAlign: "right" }}>{Number(_isNull(SumValueColumn(value))).toFixed(2)}</div>
                  : <div style={{ textAlign: "right" }}>{_isNull(SumValueColumn(value))}</div>,
              props: {}
            };
            if (row.plazaName === "Grand Total") { obj.props.colSpan = 0; obj.props.rowSpan = 1; }
            else { obj.props.colSpan = 1; obj.props.rowSpan = 1; }
            return obj;
          }
        },
      ],
    },
  ];

  const SumValueColumn = (obj) => {
    let sum = 0;
    sum = obj.totalCach + obj.totalCoupon + obj.totalEmv + obj.totalEpass + obj.totalMpass + obj.totalQr

    return sum
  }

  const columnsTotalTotal = [
    "totalCachTotal",
    "totalCouponTotal",
    "totalEmvTotal",
    "totalQrTotal",
    "totalMpassTotal",
    "totalEpassTotal",
  ];

  const fields = [
    {
      type: "datePicker",
      option: {
        name: "date",
        label: "วันที่",
        childrenProps: {
          format: dateFormat,
          picker: "date",
          placeholder: "เลือกวันที่...",
        },
        rules: [{ required: true, message: "กรุณาเลือกวันที่!" }],
        initialValue: _isEmpty(initialValue) ? moment().add(-1,'day') : initialValue.date,
      },
    },
  ];

  const SortData = (value) => {

    let grandTotal = 0;
    columnsTotalTotal.forEach((element) => {
      grandTotal += value[element];
    });

    const listFooterTotal = {
      amCach: value.amCachTotal,
      amCoupon: value.amCouponTotal,
      amEmv: value.amEmvTotal,
      amEpass: value.amEpassTotal,
      amMpass: value.amMpassTotal,
      amQr: value.amQrTotal,
      nightCach: value.nightCachTotal,
      nightCoupon: value.nightCouponTotal,
      nightEmv: value.nightEmvTotal,
      nightEpass: value.nightEpassTotal,
      nightMpass: value.nightMpassTotal,
      nightQr: value.nightQrTotal,
      plazaName: "Total",
      pmCach: value.pmCachTotal,
      pmCoupon: value.pmCouponTotal,
      pmEmv: value.pmEmvTotal,
      pmEpass: value.pmEpassTotal,
      pmMpass: value.pmMpassTotal,
      pmQr: value.pmQrTotal,
    }

    const listGrand = {
      plazaName: "Grand Total",
      totalEpass: grandTotal,
      totalSum: value.totalCachTotal + value.totalCouponTotal + value.totalEmvTotal
        + value.totalEpassTotal + value.totalMpassTotal + value.totalQrTotal
    }

    const listFooterPercent = {
      amCach: Number(value.amCachPercent).toFixed(2),
      amCoupon: Number(value.amCouponPercent).toFixed(2),
      amEmv: Number(value.amEmvPercent).toFixed(2),
      amEpass: Number(value.amEpassPercent).toFixed(2),
      amMpass: Number(value.amMpassPercent).toFixed(2),
      amQr: Number(value.amQrPercent).toFixed(2),
      nightCach: Number(value.nightCachPercent).toFixed(2),
      nightCoupon: Number(value.nightCouponPercent).toFixed(2),
      nightEmv: Number(value.nightEmvPercent).toFixed(2),
      nightEpass: Number(value.nightEpassPercent).toFixed(2),
      nightMpass: Number(value.nightMpassPercent).toFixed(2),
      nightQr: Number(value.nightQrPercent).toFixed(2),
      plazaName: "Percent",
      pmCach: Number(value.pmCachPercent).toFixed(2),
      pmCoupon: Number(value.pmCouponPercent).toFixed(2),
      pmEmv: Number(value.pmEmvPercent).toFixed(2),
      pmEpass: Number(value.pmEpassPercent).toFixed(2),
      pmMpass: Number(value.pmMpassPercent).toFixed(2),
      pmQr: Number(value.pmQrPercent).toFixed(2),
    }

    const totalListTotal = {
      plazaName: "Total",
      totalCach: value.totalCachTotal,
      totalCoupon: value.totalCouponTotal,
      totalEmv: value.totalEmvTotal,
      totalEpass: value.totalEpassTotal,
      totalMpass: value.totalMpassTotal,
      totalQr: value.totalQrTotal,
    }

    const totalListPercent = {
      plazaName: "Percent",
      totalCach: value.totalCachPercent,
      totalCoupon: value.totalCouponPercent,
      totalEmv: value.totalEmvPercent,
      totalEpass: value.totalEpassPercent,
      totalMpass: value.totalMpassPercent,
      totalQr: value.totalQrPercent,
    }

    const listFooterTotalExport = {
      plazaName: totalListTotal.plazaName,
      amCach: totalListTotal.totalCach,
      amCoupon: totalListTotal.totalCoupon,
      amEmv: totalListTotal.totalEmv,
      amEpass: totalListTotal.totalEpass,
      amMpass: totalListTotal.totalMpass,
      amQr: totalListTotal.totalQr,
      pmCach: value.totalCachTotal + value.totalCouponTotal + value.totalEmvTotal
        + value.totalEpassTotal + value.totalMpassTotal + value.totalQrTotal
    }

    const listFooterPercentExport = {
      plazaName: totalListPercent.plazaName,
      amCach: Number(totalListPercent.totalCach).toFixed(2),
      amCoupon: Number(totalListPercent.totalCoupon).toFixed(2),
      amEmv: Number(totalListPercent.totalEmv).toFixed(2),
      amEpass: Number(totalListPercent.totalEpass).toFixed(2),
      amMpass: Number(totalListPercent.totalMpass).toFixed(2),
      amQr: Number(totalListPercent.totalQr).toFixed(2),
      pmCach: Number(value.totalCachPercent + value.totalCouponPercent + value.totalEmvPercent
        + value.totalEpassPercent + value.totalMpassPercent + value.totalQrPercent).toFixed(2)
    }

    const sum = (obj) => {
      let arr = []
      for (const [key, value] of Object.entries(obj)) {
        if (key !== 'plazaName') {
          arr.push(value)
        }
      }
      return arr.reduce((a, b) => a + b, 0)
    }

    const resultSum = value.listTotal.map((item) => {
      const total = sum(item)
      return {
        ...item,
        toTalSum: total
      }
    })

    const refacterResult = value.listTotal.map((item) => {
      const resultNew = resultSum.find((child) => item.plazaName === child.plazaName)
      return {
        // ...item,
        plazaName: item.plazaName,
        amCach: item.totalCach,
        amCoupon: item.totalCoupon,
        amEmv: item.totalEmv,
        amEpass: item.totalEpass,
        amMpass: item.totalMpass,
        amQr: item.totalQr,
        pmCach: resultNew.toTalSum,
        // ...resultNew
      }
    })

    const HeaderExport = {
      plazaName: 'Plaza',
      amCach: 'CASH',
      amCoupon: 'Coupon',
      amEmv: 'EMV',
      amEpass: 'EasyPass',
      amMpass: 'Mpass',
      amQr: 'QRCode',
      pmCach: 'Total',
    }

    return {
      ...value,
      list: [...value.list, listFooterTotal, listFooterPercent],
      listTotal: [...value.listTotal, totalListTotal, listGrand, totalListPercent],
      listExport: [...value.list, listFooterTotal, listFooterPercent, {}, {}, { amCach: 'Total' },
        HeaderExport, ...refacterResult, listFooterTotalExport, { ...listGrand, pmCach: listGrand.totalSum }, listFooterPercentExport]
    }
  }

  const getDataDailyTollCollction = useCallback(
    async (
      data = {
        date: moment("00:00:00", "HH:mm:ss").format(
          "YYYY-MM-DD[T]HH:mm:ss.SSS[+07]"
        ),
      }
    ) => {
      try {
        setLoading(true);
        const res = await GET_DATA_INFO_M070000004(
          { date: data.date },
          props.auth.token
        );
        setScrollTable(true)
        if (res.status.code === "S200") {
          console.log(res);
          setLoading(false);
          setDataSource(SortData(res));
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  const handleOnFinish = (value) => {
    console.log("value", value)
    setDataToPrint(value)
    setInitialValue(value);
    const dataOutput = {
      date: moment(_timeZoneThai(value.date)).format(
        "YYYY-MM-DD[T]00:00:00.000[+07]"
      ),
    };
    getDataDailyTollCollction(dataOutput);
  };

  // useEffect(() => {
    // getDataDailyTollCollction();
  // }, [getDataDailyTollCollction]);

  const headerText = [
    { name: "วันที่", value: dataToPrint.date ? _setYearThai(dataToPrint.date,dateFormat) : _setYearThai(moment(),dateFormat) },
  ];

  const handlePrintFile = () => {
    handlePrint();
  };

  const printReportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printReportRef.current,
    documentTitle: ["7.4 Morning Revenue Report"]
  });

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile
        // handlePrintFile,
      },
    },
    {
      name: "ส่งออก",
      props: {
        type: "primary",
        onClick: () =>
          _exportFileExcel({
            dataSource: { list: dataSource.listExport },
            fileName: "7.4 Morning Revenue Report",
            header: header74_Export,
          }),
      },
    },
  ];


  return (
    <>
      <Skeleton loading={loading} >
        <FormDefault
          fields={fields}
          buttonWrapper={{ md: 24, lg: 5, xl: 3 }}
          formWrapper={{ md: 24, lg: 19, xl: 21 }}
          typeButton="primary"
          submitText="ค้นหา"
          onFinish={handleOnFinish}
          action={action}
        />
        <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
          <Table
            size="small"
            rowKey={(row, ind) => ind}
            scroll={scrollTable && { x: 1300 }}
            columns={columnsTimePeriod}
            bordered
            dataSource={dataSource.list}
            pagination={false}
          />
        </div>
        <Row gutter={24}>
          <Col lg={14}>
            <div className={_isEmpty(dataSource.list) ? "mt-10" : "mt-0"}>
              <Table
                style={{ marginTop: 30 }}
                scroll={scrollTable && { x: 500 }}
                size="small"
                rowKey={(row, ind) => ind}
                columns={columnsTotal}
                bordered
                dataSource={dataSource.listTotal}
                pagination={false}
              />
            </div>
            <div className="d-none">
              <PrintPDF ref={printReportRef}
                dataFisrtTable={dataSource.list}
                dataSecondTable={dataSource.listTotal}
                rowPerPage={dataSource.listTotal && dataSource.listTotal.length}
                HeaderBar={{
                  headerText,
                  position: "d-flex justify-content-start",
                  colSpan: 5,
                  TopicText: "7.4 รายงานรายได้ภาคเช้า"
                }}
              />
            </div>
          </Col>
        </Row>
      </Skeleton>
      {/* </Loading> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MorningRevenueReport);
