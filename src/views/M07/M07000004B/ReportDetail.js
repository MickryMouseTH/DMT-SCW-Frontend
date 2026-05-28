/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useReactToPrint } from "react-to-print";
import { Button, Row } from 'antd'
import Skeleton from "../../../components/loading/Loading"
import FormDefault from "../../../components/form/FormDefault";
import PrintPDF2 from "./PrintPDF2"

const ReportDetail = (props) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [])

  const goBack = () => {
    props.history.push({
      pathname: `/daily-completely-revenue-report2`,
      value: props.location.value,
      dataSource: props.location.dataSource,
      dataCharts: props.location.dataCharts,
      optionsCharts: props.location.options,
      dataToPrint: props.location.dataToPrint
    });
  }

  const handlePrintFile = () => {
    handlePrint();
  };

  const action = [
    {
      name: "พิมพ์",
      props: {
        type: "primary",
        ghost: false,
        onClick: handlePrintFile,
        // disabled: dataDetail.list.length < 1,
      },
    },
  ];
  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: ["7.4.2 Daily Toll Collection Report"],
  });

  return (
    <Skeleton loading={loading} active>
      <Row className="d-flex  justify-content-between">
        <Button onClick={goBack} className="m-15 ml-0 back-button-custom">
          Back
        </Button>
        <FormDefault
          className="text-right button-detail-mt-0"
          submitButton={false}
          actionBoutton={action}
        />
      </Row>

      <div>
        <PrintPDF2 className="BillPDF"
          ref={componentRef}
          operationalDateFormat1={props.location.dataSource.operationalDateFormat1}
          operationalDateFormat2={props.location.dataSource.operationalDateFormat2}
          footerReport={props.location.dataSource.footerReport}
          dataFisrtTable={props.location.dataSource.listPdf}
          dataSecondTable={props.location.dataSource.dualPlazasList}
          dataThirdTable={props.location.dataSource.recapList}
          dataCharts={props.location.dataCharts}
          optionsCharts={props.location.optionsCharts}
          HeaderBar={props.location.HeaderBar} />
      </div>
      
    </Skeleton>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)
