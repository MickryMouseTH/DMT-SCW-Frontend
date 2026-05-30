// ---------------------------------------------------------------------------
// FullscreenChartModal (v1.5.19)
//
// In-app fullscreen popup used by the Dashboard. When the user clicks a plaza
// line on a main "24h traffic by plaza" chart, this modal opens and shows that
// single plaza's 24-hour hourly traffic broken down by payment method.
//
// Payment colours and ordering are LOCKED by paymentName (PAYMENT_ORDER /
// PAYMENT_COLORS below) so the same payment is always the same colour:
//   เงินสด = เขียวอ่อน · คูปอง = ม่วง · EMV = ฟ้า ·
//   QRCode(KBANK) = เขียวเข้ม · Easy Pass = น้ำเงิน · M-PASS = ส้ม
//
// Legend is pinned to the right; the chart adapts to dark mode via useTheme().
//
// Usage:
//   const [drillPlaza, setDrillPlaza] = useState(null);
//   <FullscreenChartModal plaza={drillPlaza} hours={hours}
//     onClose={() => setDrillPlaza(null)} />
// ---------------------------------------------------------------------------

import React from "react";
import { Modal } from "antd";
import { Chart } from "react-google-charts";
import useTheme from "../../theme/useTheme";
import "./FullscreenChartModal.scss";

// Fixed display order of payment methods (left → right in the legend / series).
export const PAYMENT_ORDER = [
  "เงินสด",
  "คูปอง",
  "EMV",
  "QRCode(KBANK)",
  "Easy Pass",
  "M-PASS",
];

// Locked colour per payment method.
export const PAYMENT_COLORS = {
  "เงินสด": "#8BC34A", // เขียวอ่อน  (light green)
  "คูปอง": "#9C27B0", // ม่วง       (purple)
  EMV: "#29B6F6", // ฟ้า        (sky blue)
  "QRCode(KBANK)": "#1B7A3D", // เขียวเข้ม   (dark green)
  "Easy Pass": "#1565C0", // น้ำเงิน     (blue)
  "M-PASS": "#FB8C00", // ส้ม        (orange)
};

const FALLBACK_COLOR = "#9e9e9e"; // any unexpected payment key

// Order the plaza's payment keys: known ones in PAYMENT_ORDER first, any
// unknown keys appended in their natural order so nothing is dropped.
const orderPaymentKeys = (byPayment) => {
  const keys = Object.keys(byPayment || {});
  const known = PAYMENT_ORDER.filter((k) => keys.includes(k));
  const unknown = keys.filter((k) => !PAYMENT_ORDER.includes(k));
  return [...known, ...unknown];
};

// Build google-charts data (one column per payment) + the matching colours
// array (aligned to the series order), so colours stay locked per payment.
const buildPaymentChart = (plaza, hours) => {
  const byPayment = plaza.byPayment || {};
  const keys = orderPaymentKeys(byPayment);
  const data = [
    ["ชั่วโมง", ...keys],
    ...hours.map((h, i) => [h, ...keys.map((k) => byPayment[k][i])]),
  ];
  const colors = keys.map((k) => PAYMENT_COLORS[k] || FALLBACK_COLOR);
  return { data, colors };
};

const FullscreenChartModal = ({ plaza, hours = [], onClose }) => {
  const { isDark } = useTheme();
  const hasData =
    !!plaza && Array.isArray(hours) && hours.length > 0 && !!plaza.byPayment;

  const text = isDark ? "#e6e6e6" : "#333333";
  const grid = isDark ? "#3a4051" : "#e0e0e0";

  const chart = hasData ? buildPaymentChart(plaza, hours) : null;

  return (
    <Modal
      visible={!!plaza}
      onCancel={onClose}
      footer={null}
      centered
      closable
      maskClosable
      destroyOnClose
      className="fullscreen-chart-modal"
      width="96vw"
      title={
        plaza
          ? `ปริมาณจราจรรายชั่วโมง — ${plaza.plazaNameTh} (แยกตามช่องทางชำระ)`
          : ""
      }
      bodyStyle={{
        padding: 16,
        height: "calc(100vh - 140px)",
      }}
      wrapClassName="fullscreen-chart-modal-wrap"
    >
      {hasData && (
        <Chart
          chartType="LineChart"
          width="100%"
          height="100%"
          data={chart.data}
          options={{
            backgroundColor: "transparent",
            colors: chart.colors,
            legend: { position: "right", textStyle: { color: text } },
            pointSize: 4,
            // Wider left margin so the Y-axis values (thousands) + axis title
            // are not clipped at the left edge.
            chartArea: { left: 90, top: 24, width: "80%", height: "82%" },
            hAxis: {
              title: "ชั่วโมง",
              slantedText: true,
              slantedTextAngle: 45,
              textStyle: { color: text },
              titleTextStyle: { color: text, italic: false },
              gridlines: { color: grid },
              baselineColor: grid,
            },
            vAxis: {
              title: "ปริมาณจราจร (เที่ยว)",
              minValue: 0,
              textStyle: { color: text },
              titleTextStyle: { color: text, italic: false },
              gridlines: { color: grid },
              baselineColor: grid,
            },
          }}
        />
      )}
    </Modal>
  );
};

export default FullscreenChartModal;
