import React, { Component } from "react";
import Print from "./print";
import {_isEmpty} from "../../../tools/util";
// import './lanscape.css'

export class PrintReport extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: "", endDate: "" };
  }
  render() {
    return (
      <Print
        header={this.props.header}
        dataSource={this.props.dataSource}
        propsClass={this.props.propsClass}
        typeChild={this.props.typeChild}
        // columnPerPage={this.props.columnPerPage ? this.props.columnPerPage : this.props.header.length}
        columnPerPage={this.props.columnPerPage ? this.props.columnPerPage : 7}
        footer={this.props.footer}
        columnTotalChange={this.props.columnTotalChange}
        // pagelength={this.props.pagelength ? this.props.pagelength : 15}
        propsHeader={this.props.propsHeader}
        oneColumnfooter={this.props.oneColumnfooter}
        rowPerPage={this.props.rowPerPage ? this.props.rowPerPage : 10} //จำนวนเเถวในเเต่ละหน้าของข้อมูล เมื่อ ปริ้น PDF default คือ 10
        dataSecondTable={!_isEmpty(this.props.dataSecondTable) ? this.props.dataSecondTable : null}
        columnSecondTable={!_isEmpty(this.props.columnSecondTable) ? this.props.columnSecondTable : null}
      />
    );
  }
}

export default PrintReport;
