import React, { useState } from "react";
import { connect } from "react-redux";
import { Calendar, ConfigProvider, Badge, Row, Col, Button } from "antd";
import locale from "antd/lib/locale/th_TH";
import { _isEmpty } from "../../../tools/util";
import moment from "moment";

const HolidayForGeneral = () => {
  const [selectDate,
    // setSelectDate
  ] = useState(moment('2017-01-25'))

  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [{ type: "warning", content: "This is warning event." }];
        break;
      case 10:
        listData = [{ type: "warning", content: "This is warning event." }];
        break;
      case 15:
        listData = [
          { type: "success", content: "This is very long usual event。。...." },
        ];
        break;
      case 20:
        listData = [{ type: "error", content: "This is error event 4." }];
        break;
      default:
    }
    return listData || [];
  };

  const GetOnClick = (value) => {
  }

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <Row align='bottom' style={{ height: '80px' }}>
        {!_isEmpty(listData) ? (
          listData.map((item, idx) => (
            <Col key={idx}>
              <Badge status={item.type} text={item.content} />
              <Button
                type="primary"
                className="btn-calendar-custom"
                size="small"
                onClick={() => GetOnClick(item)}
              >
                Edit
              </Button>
            </Col>
          ))
        ) : (
            <Col>
              <Button type="danger" className="btn-calendar-custom" size="small" onClick={() => GetOnClick(value.date())}>
                Add
            </Button>
            </Col>
          )}
      </Row>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
    <div>
      <ConfigProvider locale={locale}>
        <Calendar
          value={selectDate}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
      </ConfigProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HolidayForGeneral);
