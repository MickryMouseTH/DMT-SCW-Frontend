/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Table, Typography } from "antd";
import { _isEmpty,_isNull } from "../../../tools/util";

const { Text } = Typography;
const SummaryData = ({ dataSource, rowsData, record, ...props }) => {
  const [columnList, setColumnList] = useState([]);
  const [column, setColumn] = useState([]);

  useEffect(() => {
    if (!_isEmpty(record)) {
      let columnlistdefault = [
        ...record
          .filter((item, ind) => ind !== 0)
          .map((item) => {
            let data = {};
            data.traffic = 0;
            data.revenue = 0;
            data.title = item.title;
            data.children = [
              ...item.children.map((item) => {
                let datachildren = {};
                datachildren.key = item.key;
                if (item.title === "ปริมาณ") datachildren.type = "traffic";
                if (item.title === "รายได้") datachildren.type = "revenue";
                return datachildren;
              }),
            ];
            return data;
          }),
      ];
      setColumn(columnlistdefault);
      setColumnList(columnlistdefault);
    }
  }, [record]);

  useEffect(() => {
    summaryRowData();
  }, [rowsData]);

  const summaryRowData = () => {
    let datacolumn = rowsData.reduce((accumulator, currentValue) => {
      let newacc = [
        ...accumulator.map((itemAcc) => {
          let newitem = { ...itemAcc };
          itemAcc["children"].forEach((el) => {
            if (el.type === "traffic")
              newitem.traffic = (
                Number(currentValue[el.key]) + Number(newitem.traffic)
              ).toFixed(2);
            if (el.type === "revenue")
              newitem.revenue = (
                Number(currentValue[el.key]) + Number(newitem.revenue)
              ).toFixed(2);
          });
          return newitem;
        }),
      ];
      return newacc;
    }, column);

    setColumnList(datacolumn);
  };

  return (
    <>
      <Table.Summary.Row className="bg_default">
        <Table.Summary.Cell colSpan={2} className="text-center" index={0}>
          รวม
        </Table.Summary.Cell>
        {columnList.map((item, ind) => (
          <React.Fragment key={ind}>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center">
                {_isNull(Number(item["traffic"]))}
              </Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} className="text-center">
              <Text type="secondary" align="center">
                {_isNull(Number(item["revenue"]))}
              </Text>
            </Table.Summary.Cell>
          </React.Fragment>
        ))}
      </Table.Summary.Row>
    </>
  );
};

export default SummaryData;
