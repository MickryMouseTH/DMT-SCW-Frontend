# API — Dashboard: ปริมาณจราจร 24 ชม. ย้อนหลัง รายชั่วโมง (แยกตามด่าน)

Used by the Dashboard page (`src/views/Dashboard/Dashboard.js`, v1.5.19).
One API call powers both main charts and the drill-down popup.

The Dashboard renders **two** charts (one line per plaza, legend on the right),
splitting the returned plazas by `plazaId`:

| Chart | Direction       | plazaId                          |
| ----- | --------------- | -------------------------------- |
| 1     | ด่านขาเข้า (inbound)  | 1, 2, 6, 12, 15, 16, 21, 31, 41, 42 |
| 2     | ด่านขาออก (outbound)  | 36, 37, 31, 26, 27, 11           |

Clicking a plaza line opens a fullscreen popup with that plaza's hourly
traffic broken down by payment method (colours locked per payment — see below).
The backend should return **every** plaza referenced above; the frontend
filters them into the two charts.

## Endpoint

```
POST {apiV1}/report/dashboardHourlyTraffic/search
```

Frontend function: `GET_DASHBOARD_HOURLY_TRAFFIC` in `src/service/api/report.js`.

## Request body

```json
{
  "endDateTime": "2026-05-30 14:00:00",
  "networkId": 10
}
```

| field         | type                          | required | description                                                                 |
| ------------- | ----------------------------- | -------- | --------------------------------------------------------------------------- |
| `endDateTime` | string `YYYY-MM-DD HH:mm:ss`  | no       | End of the window. Backend rolls back 24 h from this. Defaults to "now".     |
| `networkId`   | number                        | per impl | DMT network id (same convention as other report APIs; default used = `10`). |

> The frontend currently sends `endDateTime` only. Add `networkId` server-side
> default if required.

## Response body

```json
{
  "status": { "code": "S200", "message": "success" },

  "hours": ["15:00", "16:00", "17:00", "...", "14:00"],

  "plazas": [
    {
      "plazaId": 1,
      "plazaNameTh": "ด่านดินแดง",
      "total": [1200, 1500, 1100, "...", 980],
      "byPayment": {
        "เงินสด":         [700, 800, 600, "...", 500],
        "คูปอง":          [50, 60, 40, "...", 30],
        "EMV":            [120, 150, 130, "...", 90],
        "QRCode(KBANK)":  [80, 110, 95, "...", 70],
        "Easy Pass":      [300, 400, 250, "...", 300],
        "M-PASS":         [200, 300, 250, "...", 180]
      }
    },
    {
      "plazaId": 2,
      "plazaNameTh": "ด่านลาดพร้าว",
      "total": [800, 900, "..."],
      "byPayment": {
        "เงินสด":         ["..."],
        "คูปอง":          ["..."],
        "EMV":            ["..."],
        "QRCode(KBANK)":  ["..."],
        "Easy Pass":      ["..."],
        "M-PASS":         ["..."]
      }
    }
  ]
}
```

### Field definitions

| field                   | type       | description                                                              |
| ----------------------- | ---------- | ------------------------------------------------------------------------ |
| `status.code`           | string     | `"S200"` = success (project-standard).                                   |
| `status.message`        | string     | Result message.                                                          |
| `hours`                 | string[]   | **Shared X axis, length 24**, oldest → newest (label `"HH:00"`).         |
| `plazas`                | object[]   | 1 element = 1 plaza = 1 line on the main chart.                          |
| `plazas[].plazaId`      | number     | Plaza identifier.                                                        |
| `plazas[].plazaNameTh`  | string     | Plaza name — used as the **line label / legend**.                        |
| `plazas[].total`        | number[]   | Hourly total traffic, **length 24**, index-aligned with `hours`.         |
| `plazas[].byPayment`    | object     | Map: payment name → number[24] (used by the drill-down popup).           |

## Query rules (must hold)

1. **Every array is length 24 and index-aligned with `hours`.** Hours with no
   traffic must return `0`, never a skipped row (otherwise the line shifts).
2. **Sorted by time on the backend** (oldest → newest). Frontend does not sort.
3. **`byPayment` keys are identical across all plazas.** Use these exact
   payment names (the frontend locks a colour + display order per name):
   `เงินสด`, `คูปอง`, `EMV`, `QRCode(KBANK)`, `Easy Pass`, `M-PASS`. If a plaza
   lacks a payment type, return an array of `0`, do not omit the key. (Unknown
   keys still render, in grey, after the known ones.)

   Locked colours / order in the popup:

   | order | payment        | colour              |
   | ----- | -------------- | ------------------- |
   | 1     | เงินสด          | เขียวอ่อน `#8BC34A`   |
   | 2     | คูปอง           | ม่วง `#9C27B0`        |
   | 3     | EMV            | ฟ้า `#29B6F6`         |
   | 4     | QRCode(KBANK)  | เขียวเข้ม `#1B7A3D`    |
   | 5     | Easy Pass      | น้ำเงิน `#1565C0`      |
   | 6     | M-PASS         | ส้ม `#FB8C00`         |
4. **`total[i]` should equal the sum of all `byPayment[*][i]`.** If extra types
   exist (cash / exempt), include them in `total` and add their key to
   `byPayment`.
5. All values are **numbers** (not strings) so google-charts can plot directly.
