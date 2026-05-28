import React from 'react'
import { Table, Typography } from 'antd'
import { _isNull } from "../../../tools/util";

const { Text } = Typography;

function summaryData(pageData) {
  let totalabnormalExem = 0;
  let totalabnormalLeftExit = 0;
  let totalabnormalTotal = 0;
  let totalabnormalViolation = 0;
  let totalabnormalWrongType = 0;
  let totaldisAvc = 0;
  let totaldisTc = 0;
  let totalexemNonQualify = 0;
  let totalexemQualify = 0;
  let totalnonAdjust = 0;
  let totaluapMoney = 0;
  let totaluapNonMoney = 0;
  let totalleftExitQualify = 0;
  let totalleftExitNonQualify = 0;

  pageData.forEach(({ abnormalWrongType, abnormalViolation
    , abnormalExem,abnormalLeftExit,abnormalTotal
    , disAvc, disTc, uapMoney, uapNonMoney, exemQualify,
    exemNonQualify,leftExitQualify,leftExitNonQualify, nonAdjust }) => {

    totalabnormalWrongType += abnormalWrongType;
    totalabnormalViolation += abnormalViolation;
    totalabnormalExem += abnormalExem;
    totalabnormalLeftExit += abnormalLeftExit;
    totalabnormalTotal += abnormalTotal;
    totaldisAvc += disAvc;
    totaldisTc += disTc;
    totaluapMoney += uapMoney;
    totaluapNonMoney += uapNonMoney;
    totalexemQualify += exemQualify;
    totalexemNonQualify += exemNonQualify;
    totalleftExitQualify += leftExitQualify;
    totalleftExitNonQualify += leftExitNonQualify;
    totalnonAdjust += nonAdjust;
  });

  return (
    <>
      <Table.Summary.Row className="bg_default" >
        <Table.Summary.Cell colSpan={2} className="text-center" index={0} >Total</Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalabnormalWrongType)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalabnormalViolation)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalabnormalExem)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalabnormalLeftExit)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalabnormalTotal)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totaldisAvc)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totaldisTc)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totaluapMoney)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totaluapNonMoney)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalexemQualify)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalexemNonQualify)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalleftExitQualify)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalleftExitNonQualify)}</Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={1} className="text-center">
          <Text type="secondary" align="center" >{_isNull(totalnonAdjust)}</Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </>
  );
}

export default summaryData
