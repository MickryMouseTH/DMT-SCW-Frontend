import React from "react";
import { Table, Typography } from "antd";
import { _isNull } from "../../../tools/util";

const { Text } = Typography;

const SummaryData = (pageData) => {
  let totalAmountSum = 0;
  let totalDeclareAmount = 0;
  let totalDifferentAmount = 0;
  let totalSum = 0;

  pageData.forEach(({ totalAmount, declareAmount,differentAmount,totalofType }) => {
    totalAmountSum += totalAmount;
    totalDeclareAmount += declareAmount;
    totalDifferentAmount += differentAmount;
    totalSum += totalofType;
  });

  return (
    <>
      <Table.Summary.Row>
        <Table.Summary.Cell index={0} colSpan={11}></Table.Summary.Cell>
        <Table.Summary.Cell index={12} colSpan={1} className="text-center secondary bg_default">
         <Text type="secondary">
              รวม
        </Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={13} colSpan={1} className="text-center">
        <Text type="secondary">
             {_isNull(Number(totalAmountSum))}
        </Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={14} colSpan={1} className="text-center">
        <Text type="secondary">
          {_isNull(Number(totalDeclareAmount))}
          </Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={15} colSpan={1} className="text-center">
        <Text type="secondary">
          {_isNull(Number(totalDifferentAmount))}
          </Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={16} colSpan={1} className="text-center">
        <Text type="secondary">
          {_isNull(Number(totalSum))}
          </Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </>
  );
};

export default SummaryData;
