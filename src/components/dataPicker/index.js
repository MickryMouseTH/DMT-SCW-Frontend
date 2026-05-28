// const {
//   default: generatePicker,
// } = require("antd/lib/date-picker/generatePicker");
// const {
//   default: momentGenerateConfig,
// } = require("rc-picker/lib/generate/moment");
import generatePicker from "antd/lib/date-picker/generatePicker";
import momentGenerateConfig from "rc-picker/lib/generate/moment";

const tobuddhistYear = (moment, format) => {
  let chYear = moment.format("YYYY");
  let buddYear = (parseInt(chYear) + 543).toString();
  return moment
    .format(
      format.replace("YYYY", buddYear).replace("YY", buddYear.substring(2, 4))
    )
    .replace(chYear, buddYear);
};

momentGenerateConfig.locale.format = function format(locale, date, _format) {
  var clone = date.clone();
  var result = clone.locale(locale);
  return tobuddhistYear(result, _format);
};

const DatePicker = generatePicker(momentGenerateConfig);

export default DatePicker;
