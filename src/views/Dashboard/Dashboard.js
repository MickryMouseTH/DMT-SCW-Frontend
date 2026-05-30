// ---------------------------------------------------------------------------
// Dashboard (v1.5.19)
//
// Two side-by-side line charts of the last-24-hours hourly traffic volume:
//   • Chart 1 — ด่านขาเข้า (inbound)  : plazaId 1,2,6,12,15,16,21,31,41,42
//   • Chart 2 — ด่านขาออก (outbound)  : plazaId 36,37,31,26,27,11
// Each chart draws ONE coloured line per plaza (legend pinned to the RIGHT).
// Clicking a plaza's line opens a fullscreen popup (FullscreenChartModal)
// showing that plaza's 24h traffic broken down by payment method, with each
// payment's colour locked (see FullscreenChartModal).
//
// Charts adapt to dark mode via useTheme() (axis/legend/grid colours).
// The view auto-reloads the data every 30 seconds.
//
// Data: GET_DASHBOARD_HOURLY_TRAFFIC -> { hours, plazas:[{ plazaId,
//   plazaNameTh, total[24], byPayment{ [pay]: number[24] } }] }
// Until the backend endpoint is live, an API failure falls back to MOCK_DATA.
// ---------------------------------------------------------------------------

import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import { Row, Col } from "antd";
import moment from "moment";

import { GET_DASHBOARD_HOURLY_TRAFFIC } from "../../service/api/report";
import FullscreenChartModal from "../../components/chart/FullscreenChartModal";
import useTheme from "../../theme/useTheme";

const AUTO_RELOAD_MS = 30 * 1000; // auto reload every 30 s

// Plaza groups -> two charts.
const INBOUND_PLAZA_IDS = [1, 2, 6, 12, 15, 16, 21, 31, 41, 42];
const OUTBOUND_PLAZA_IDS = [36, 37, 31, 26, 27, 11];

// --- Mock data (fallback before the backend endpoint exists) --------------
const PAYMENTS = ["เงินสด", "คูปอง", "EMV", "QRCode(KBANK)", "Easy Pass", "M-PASS"];
const MOCK_PLAZA_IDS = Array.from(
  new Set([...INBOUND_PLAZA_IDS, ...OUTBOUND_PLAZA_IDS])
).sort((a, b) => a - b);

const buildMockData = () => {
  const now = moment().startOf("hour");
  // 24 hourly buckets, oldest -> newest, ending at the current hour.
  const hours = Array.from({ length: 24 }, (_, i) =>
    now.clone().subtract(23 - i, "hours").format("HH:00")
  );

  const plazas = MOCK_PLAZA_IDS.map((id, idx) => {
    const byPayment = {};
    PAYMENTS.forEach((pay, payIdx) => {
      byPayment[pay] = hours.map((_, i) => {
        // smooth rush-hour-ish curve, deterministic per plaza/payment/hour
        const wave = Math.round(
          300 + 220 * Math.sin((i / 24) * Math.PI * 2 - 1.5)
        );
        return Math.max(0, wave - payIdx * 35 - (idx % 5) * 25);
      });
    });
    const total = hours.map((_, i) =>
      PAYMENTS.reduce((sum, pay) => sum + byPayment[pay][i], 0)
    );
    return { plazaId: id, plazaNameTh: `ด่าน ${id}`, total, byPayment };
  });

  return { hours, plazas };
};

// Build google-charts data for a main chart: one column per plaza.
//   [["ชั่วโมง", "ด่าน A", "ด่าน B"], ["15:00", 1200, 800], ...]
const buildMainData = (hours, groupPlazas) => [
  ["ชั่วโมง", ...groupPlazas.map((p) => p.plazaNameTh)],
  ...hours.map((h, i) => [h, ...groupPlazas.map((p) => p.total[i])]),
];

// Theme-aware chart options. Legend is ALWAYS pinned to the right.
const buildOptions = (title, isDark) => {
  const text = isDark ? "#e6e6e6" : "#333333";
  const grid = isDark ? "#3a4051" : "#e0e0e0";
  return {
    title,
    titleTextStyle: { color: text, fontSize: 14 },
    backgroundColor: "transparent",
    legend: { position: "right", textStyle: { color: text, fontSize: 11 } },
    pointSize: 4,
    // Don't fix width — let google-charts auto-size the legend column so the
    // plot fills the space (no big gap) AND the plaza labels aren't clipped.
    // Only pin left (for Y-axis values/title), top and height.
    chartArea: { left: 70, top: 44, height: "80%" },
    hAxis: {
      title: "ชั่วโมง",
      slantedText: true,
      slantedTextAngle: 45,
      textStyle: { color: text, fontSize: 10 },
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
  };
};

const Dashboard = (props) => {
  const { isDark } = useTheme();
  const [hours, setHours] = useState([]);
  const [plazas, setPlazas] = useState([]);
  const [drillPlaza, setDrillPlaza] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  // keep latest plazas in a ref so the chart "select" callback always reads
  // the freshest array even after a background auto-reload.
  const plazasRef = useRef([]);
  plazasRef.current = plazas;

  const loadData = useCallback(async () => {
    const payload = {
      endDateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    try {
      const res = await GET_DASHBOARD_HOURLY_TRAFFIC(payload, props.auth.token);
      if (res && res.status && res.status.code === "S200") {
        setHours(res.hours || []);
        setPlazas(res.plazas || []);
      } else {
        // backend not ready / error -> demo with mock
        const mock = buildMockData();
        setHours(mock.hours);
        setPlazas(mock.plazas);
      }
    } catch (e) {
      const mock = buildMockData();
      setHours(mock.hours);
      setPlazas(mock.plazas);
    }
    setUpdatedAt(moment().format("HH:mm:ss"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.token]);

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, AUTO_RELOAD_MS);
    return () => clearInterval(timer);
  }, [loadData]);

  // idList is a stable module constant, so this closure stays valid; it reads
  // the freshest plazas via plazasRef and re-derives the group on click.
  const makeChartEvents = (idList) => [
    {
      eventName: "select",
      callback: ({ chartWrapper }) => {
        const selection = chartWrapper.getChart().getSelection();
        if (selection.length && selection[0].column != null) {
          // column 0 = hours axis; column 1.. = plazas in this group's order
          const group = plazasRef.current.filter((p) =>
            idList.includes(p.plazaId)
          );
          const plaza = group[selection[0].column - 1];
          if (plaza) setDrillPlaza(plaza);
        }
      },
    },
  ];

  const inboundPlazas = plazas.filter((p) =>
    INBOUND_PLAZA_IDS.includes(p.plazaId)
  );
  const outboundPlazas = plazas.filter((p) =>
    OUTBOUND_PLAZA_IDS.includes(p.plazaId)
  );
  const hasData = hours.length > 0 && plazas.length > 0;

  const renderChart = (titleSuffix, groupPlazas, idList) =>
    groupPlazas.length > 0 ? (
      <Chart
        chartType="LineChart"
        width="100%"
        height="52vh"
        data={buildMainData(hours, groupPlazas)}
        options={buildOptions(
          `ปริมาณจราจรรายชั่วโมง (${titleSuffix})`,
          isDark
        )}
        chartEvents={makeChartEvents(idList)}
      />
    ) : null;

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <h3 style={{ margin: 0 }}>ปริมาณจราจร 24 ชม. ย้อนหลัง</h3>
        <span style={{ fontSize: 12, color: "var(--color-text-muted, #888)" }}>
          {updatedAt
            ? `อัปเดตล่าสุด ${updatedAt} · รีเฟรชอัตโนมัติทุก 30 วินาที`
            : ""}
        </span>
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--color-text-muted, #888)",
          marginBottom: 8,
        }}
      >
        คลิกที่เส้นกราฟของด่านเพื่อดูรายละเอียดแยกตามช่องทางชำระเงินแบบเต็มจอ
      </p>

      {hasData && (
        <Row gutter={16}>
          <Col span={12}>{renderChart("ด่านขาเข้า", inboundPlazas, INBOUND_PLAZA_IDS)}</Col>
          <Col span={12}>{renderChart("ด่านขาออก", outboundPlazas, OUTBOUND_PLAZA_IDS)}</Col>
        </Row>
      )}

      <FullscreenChartModal
        plaza={drillPlaza}
        hours={hours}
        onClose={() => setDrillPlaza(null)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
