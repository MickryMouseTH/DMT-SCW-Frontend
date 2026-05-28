/* eslint-disable no-useless-escape */
import {
  _exportFileExcel,
  _exportFileExcelWithComma,
  _exportFileExcel_Menu411,
  _exportFileExcelWithComma814,
  _exportFileExcelWithComma102,
  refacterHeader,
  refacterDataSource,
  refacterFooterDataSource,
  refacterFooter,
  _exportFileExcel25,
  createHeader,
  createData,
  createFooter,
  createMergeCell,
} from "./excel";
import React from "react";
import momentTZ from "moment-timezone";
import moment from "moment";
import { Typography } from "antd";

const { Text } = Typography;

export const _isEmpty = (data) => {
  const obj =
    data === null ||
      data === "null" ||
      data === "undefined" ||
      data === undefined
      ? []
      : data;
  return Object.entries(obj).length === 0;
};

export {
  _exportFileExcel,
  _exportFileExcelWithComma,
  _exportFileExcel_Menu411,
  _exportFileExcelWithComma814,
  _exportFileExcelWithComma102,
  refacterHeader,
  refacterDataSource,
  refacterFooterDataSource,
  refacterFooter,
  _exportFileExcel25,
  createHeader,
  createData,
  createFooter,
  createMergeCell,
};

export const regexLanguage = (language = "") => {
  const en = RegExp(/[ก-๙_\*\&\%\$\#\!\+\{\}\^\[\];]/);
  const th = RegExp(/[A-Za-z_\*\&\%\$\#\!\+\{\}\^\[\];]/);
  const regex = { en, th };
  return regex[language.toLowerCase()];
};

export const nameLanguage = (language = "") => {
  const en = RegExp(/[0-9ก-๙_\-\*\&\%\$\#\!\+\{\}\^\[\];]/);
  const th = RegExp(/[0-9A-Za-z_\-\*\&\%\$\#\!\+\{\}\^\[\];]/);
  const regex = { en, th };
  return regex[language.toLowerCase()];
};
export const regexMix = (language = "") => {
  const en = RegExp(/[ก-๙\*\&\%\$\#\!\+\{\}\^\[\];]/);
  const th = RegExp(/[\*\&\%\$\#\!\+\{\}\^\[\];]/);
  const regex = { en, th };
  return regex[language.toLowerCase()];
};

export const _timeZoneThai = (dateTime, format) => {
  // return momentTZ.tz(dateTime, "Asia/Bangkok").format()
  if (format === "day") {
    // _timeZoneThai(moment(`${moment(value.date).format("DD/MM/YYYY")} 00:00:00`, 'DD/MM/YYYY HH:mm:ss'))
    return momentTZ
      .tz(moment(`${moment(dateTime).format("DD/MM/YYYY")} 00:00:00`, 'DD/MM/YYYY HH:mm:ss'), "Asia/Bangkok")
      .format("YYYY-MM-DD[T]HH:mm:ss.SSS[+07]");
  } else {
    return momentTZ
      .tz(dateTime, "Asia/Bangkok")
      .format("YYYY-MM-DD[T]HH:mm:ss.SSS[+07]");
  }
};


export const _timeZoneThai2 = (dateTime, format) => {
  if (format === "day") {
    return momentTZ
      .tz(moment(`${moment(dateTime).format("DD/MM/YYYY")} 00:00:00`, 'DD/MM/YYYY HH:mm:ss'), "Asia/Bangkok")
      .format("YYYY-MM-DD[T]HH:mm:ss[+07]");
  } else {
    return momentTZ
      .tz(dateTime, "Asia/Bangkok")
      .format("YYYY-MM-DD[T]HH:mm:ss[+07]");
  }
};

export function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number),
    zerosToFill = targetLength - absNumber.length,
    sign = number >= 0;
  return (
    (sign ? (forceSign ? "+" : "") : "-") +
    Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
    absNumber
  );
}

export const _isNull = (data) => {
  if (
    data === "null" ||
    data === null ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      if (isNaN(data)) {
        return 0
      } else {
        return new Intl.NumberFormat().format(data);
        // return Number(data)
      }
    } else {
      return data;
    }
  }
};

export const _isZero = (data) => {
  if (
    data === 0 ||
    data === "0" ||
    data === "null" ||
    data === null ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      return new Intl.NumberFormat().format(data);
      // return Number(data)
    } else {
      return data;
    }
  }
};

export const _PlusZero = (data) => {
  if (data <= 9 && data !== "") {
    return "0" + data;
  } else if (
    data === "" ||
    data === null ||
    data === "null" ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      return data.toString();
      // return Number(data)
    } else {
      return data;
    }
  }
};

export const _isSeperate = (data) => {
  if (data === 0 && data !== "") {
    return data;
  } else if (
    data === "" ||
    data === null ||
    data === "null" ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      return  <Text style={{color:'red'}}>{new Intl.NumberFormat().format(data)}</Text> 
      // return  <Text style={{color:'red'}}>{Number(data)}</Text> 
    } else {
      return <Text style={{color:'red'}}>{new Intl.NumberFormat().format(data)}</Text>
      // return <Text style={{color:'red'}}>{Number(data)}</Text>
    }
  }
};

/////////////////////////////////////Excel Format Number /////////////////////////////////////
export const _isNullExport = (data) => {
  if (
    data === "null" ||
    data === null ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      if (isNaN(data)) {
        return 0
      } else {
        return Number(data)
      }
    } else {
      return data;
    }
  }
};

export const _isTypeTrueExport = (data,type) => {
  if (
    data === "null" ||
    data === null ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      if (isNaN(data)) {
        return 0
      } else {
        return Number(data)
      }
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (moment(data).format("DD/MM/YYYY HH:mm:ss") !== "Invalid date") {
        return type === "date" ? _setYearThai(data,"DD/MM/YYYY HH:mm:ss")
        : _setYearThai(data,"DD/MM/YYYY")
      } else {
        return data.toString()
      }
    }
  }
};

export const _isZeroExport = (data) => {
  if (
    data === 0 ||
    data === "0" ||
    data === "null" ||
    data === null ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      return Number(data)
    } else {
      return data;
    }
  }
};

export const _isSeperateExport = (data) => {
  if (data === 0 && data !== "") {
    return data;
  } else if (
    data === "" ||
    data === null ||
    data === "null" ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      return  <Text style={{color:'red'}}>{Number(data)}</Text> 
    } else {
      return <Text style={{color:'red'}}>{Number(data)}</Text>
    }
  }
};


export const _PlusZeroExport = (data) => {
  if (data <= 9 && data !== "") {
    return "0" + data;
  } else if (
    data === "" ||
    data === null ||
    data === "null" ||
    data === undefined ||
    data === "undefined"
  ) {
    return "";
  } else {
    if (typeof data === "number") {
      // return data.toString();
      return Number(data)
    } else {
      return data;
    }
  }
};

export const _setYearThai = (dateTime, dateFormat) => {
  return moment(dateTime).format(dateFormat).replace(moment(dateTime).format('YYYY'),parseInt(moment(dateTime).format('YYYY'))+543)
};