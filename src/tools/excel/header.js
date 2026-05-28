
export const header11 = [

  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "วันเวลาเริ่ม", key: "startDate", type: "date", align: 'center' },
  { name: "วันเวลาสิ้นสุด", key: "endDate", type: "date", align: 'center' },
  { name: "ชม.เปิด", key: "hourOpen", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ชม.ทำงาน", key: "hourOperate", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ชม.ปิด", key: "hourClose", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "% เปิด", key: "percentOpen", type: "customColumn", align: 'center', className: 'text-right' },
  { name: "% ทำงาน", key: "percentOperate", type: "customColumn", align: 'center', className: 'text-right' },
  { name: "% ปิด", key: "percentClose", type: "customColumn", align: 'center', className: 'text-right' },
]

export const header12 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "วันเวลาเริ่ม", key: "startDate", type: "date", align: 'center' },
  { name: "วันเวลาสิ้นสุด", key: "endDate", type: "date", align: 'center' },
  { name: "ชม.เสียหายหนัก", key: "hourHeavilyDamaged", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ชม.เสียหายน้อย", key: "hourLittleDamage", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ชม.ปกติ", key: "hourNormal", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "% เสียหายหนัก", key: "percentHeavilyDamaged", type: "customColumn", align: 'center', className: 'text-right' },
  { name: "% เสียหายน้อย	", key: "percentLittleDamage", type: "customColumn", align: 'center', className: 'text-right' },
  { name: "% ปกติ", key: "percentNormal", type: "customColumn", align: 'center', className: 'text-right' },
]
export const header11_Detail = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "วันเวลาเริ่ม", key: "startDate", type: "date", align: 'center' },
  { name: "วันเวลาสิ้นสุด", key: "endDate", type: "date", align: 'center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อพนักงาน", key: "staffNameTh", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "รหัสหัวหน้าพนักงาน	", key: "supStaffId", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อหัวหน้าพนักงาน", key: "supStaffNameTh", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "เหตุการ", key: "event", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ระยะเวลา", key: "duration", type: "customColumn", align: 'center', className: 'text-right' },
]

export const header21 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: '60px' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: '60px' },
  { name: "จำนวนวัน", key: "numberDays", type: "customColumn", align: 'center', className: 'text-center', width: '70px' },
  { name: "ปริมาณจราจรเฉลี่ย", key: "averageTraffic", type: "nullColumn", align: 'center', className: 'text-right', width: '400px' },
  { name: "รายได้เฉลี่ย", key: "averageRevenue", type: "nullColumn", align: 'center', className: 'text-right', width: '400px' },
]

export const header62 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "tsbAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  {
    name: "เงินสด",
    key: "",
    children: [
      { name: "MCC", key: "amountFromShipping", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountFromSystem", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "คูปอง",
    key: "",
    children: [
      { name: "MCC", key: "amountFromShippingCoupon", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountFromSystemCoupon", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountDiffCoupon", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ก่อน Vat", key: "amountNoVatCoupon", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "QR KBANK",
    key: "",
    children: [
      { name: "BANK", key: "amountQrKbankBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountQrKbankSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountQrKbankDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "QR KTB",
    key: "",
    children: [
      { name: "BANK", key: "amountQrKtbBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountQrKtbSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountQrKtbDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "EMV KTB",
    key: "",
    children: [
      { name: "BANK", key: "amountEmvKtbBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountEmvKtbSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountEmvKtbDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "ผลหมายเหตุ บ.ขนส่งเงิน", key: "remarkShipping", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "หมายเหตุจากระบบ", key: "remarkSystem", type: "customColumn", align: 'center', className: 'text-center' },
]

export const header62Detail = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  { name: "วันที่ของรายได้", key: "operationalDateText", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "กะ", key: "shiftTypeName", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อพนักงาน", key: "staffNameTh", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ถุงเงิน", key: "moneyBagNo", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "ประเภทการนำส่ง", key: "declareType", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "SOD", key: "sod", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Sup.", key: "sup", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Audit", key: "audit", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "SOD.Adj", key: "sodAdj", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "MCC", key: "mcc", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "MCC-SOD.Adj", key: "mccDeleteSodAdj", type: "customColumn", align: 'center', className: 'text-center' },
]

export const header67 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "tsbAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  {
    name: "เงินสด",
    key: "",
    children: [
      { name: "MCC", key: "amountFromShipping", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SAP", key: "amountCashSap", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountFromSystem", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "คูปอง",
    key: "",
    children: [
      {
        name: "MCC",
        key: "",
        children: [
          { name: "V.30", key: "countMccCoupon30", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "V.70", key: "countMccCoupon70", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "V.35", key: "countMccCoupon35", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "V.80", key: "countMccCoupon80", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "Value", key: "amountMccCouponValue", type: "customColumn", align: 'center', className: 'text-right' },
        ],
      },
      { name: "SOD", key: "amountFromSystemCoupon", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountDiffCoupon", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "QR CODE",
    key: "",
    children: [
      { name: "BANK", key: "amountQrBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountQrSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountQrDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "ผลหมายเหตุ บ.ขนส่งเงิน", key: "remarkShipping", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "หมายเหตุจากระบบ", key: "remarkSystem", type: "customColumn", align: 'center', className: 'text-center' },
]

export const header67A = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "tsbAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  {
    name: "เงินสด",
    key: "",
    children: [
      { name: "MCC", key: "amountFromShipping", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SAP", key: "amountCashSap", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountFromSystem", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "คูปอง",
    key: "",
    children: [
      {
        name: "MCC",
        key: "",
        children: [
          { name: "V.30", key: "countMccCoupon30", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "V.70", key: "countMccCoupon70", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "V.35", key: "countMccCoupon35", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "V.80", key: "countMccCoupon80", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "Value", key: "amountMccCouponValue", type: "customColumn", align: 'center', className: 'text-right' },
        ],
      },
      { name: "SOD", key: "amountFromSystemCoupon", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountDiffCoupon", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  // {
  //   name: "QR CODE",
  //   key: "",
  //   children: [
  //     { name: "BANK", key: "amountQrBank", type: "customColumn", align: 'center', className: 'text-right' },
  //     { name: "SOD", key: "amountQrSod", type: "customColumn", align: 'center', className: 'text-right' },
  //     { name: "ต่าง", key: "amountQrDiff", type: "customColumn", align: 'center', className: 'text-right' },
  //   ],
  // },
  { name: "ผลหมายเหตุ บ.ขนส่งเงิน", key: "remarkShipping", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "หมายเหตุจากระบบ", key: "remarkSystem", type: "customColumn", align: 'center', className: 'text-center' },
]

export const header67B = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "tsbAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  // {
  //   name: "เงินสด",
  //   key: "",
  //   children: [
  //     { name: "MCC", key: "amountFromShipping", type: "customColumn", align: 'center', className: 'text-right' },
  //     { name: "SAP", key: "amountCashSap", type: "customColumn", align: 'center', className: 'text-right' },
  //     { name: "SOD", key: "amountFromSystem", type: "customColumn", align: 'center', className: 'text-right' },
  //     { name: "ต่าง", key: "amountDiff", type: "customColumn", align: 'center', className: 'text-right' },
  //   ],
  // },
  // {
  //   name: "คูปอง",
  //   key: "",
  //   children: [
  //     {
  //       name: "MCC",
  //       key: "",
  //       children: [
  //         { name: "V.30", key: "countMccCoupon30", type: "customColumn", align: 'center', className: 'text-right' },
  //         { name: "V.70", key: "countMccCoupon70", type: "customColumn", align: 'center', className: 'text-right' },
  //         { name: "V.35", key: "countMccCoupon35", type: "customColumn", align: 'center', className: 'text-right' },
  //         { name: "V.80", key: "countMccCoupon80", type: "customColumn", align: 'center', className: 'text-right' },
  //         { name: "Value", key: "amountMccCouponValue", type: "customColumn", align: 'center', className: 'text-right' },
  //       ],
  //     },
  //     { name: "SOD", key: "amountFromSystemCoupon", type: "customColumn", align: 'center', className: 'text-right' },
  //     { name: "ต่าง", key: "amountDiffCoupon", type: "customColumn", align: 'center', className: 'text-right' },
  //   ],
  // },
  {
    name: "QR CODE KTB",
    key: "",
    children: [
      { name: "BANK", key: "amountQrBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountQrSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountQrDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "ผลหมายเหตุ บ.ขนส่งเงิน", key: "remarkShipping", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "หมายเหตุจากระบบ", key: "remarkSystem", type: "customColumn", align: 'center', className: 'text-center' },
]

export const header67C = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "tsbAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  {
    name: "EMV",
    key: "",
    children: [
      { name: "BANK", key: "amountEmvBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountEmvSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountEmvDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const header67D = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "tsbAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  {
    name: "MPASS",
    key: "",
    children: [
      { name: "DOH", key: "amountMpassBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountMpassSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountMpassDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const header67E = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "tsbAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  {
    name: "EasyPass",
    key: "",
    children: [
      { name: "DOH", key: "amountEasyPassBank", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "SOD", key: "amountEasyPassSod", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "ต่าง", key: "amountEasyPassDiff", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const createHeader25 = () => {
  let result = [
    {
      name: '',
      key: '',
      children: [
        { name: 'ด่าน', key: 'plazaAbbreviation', type: "customColumn", align: 'center', className: 'text-left' },
        { name: 'ช่องทาง', key: 'laneAbbreviation', align: 'center', className: 'text-center' },
      ],
    },
  ];
  for (let i = 0; i < 24; i++) {
    result = [
      ...result,
      {
        name: `ชั่วโมงที่-${i}`,
        key: '',
        children: [
          { name: '00', key: `${i}minute00`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '05', key: `${i}minute05`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '10', key: `${i}minute10`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '15', key: `${i}minute15`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '20', key: `${i}minute20`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '25', key: `${i}minute25`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '30', key: `${i}minute30`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '35', key: `${i}minute35`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '40', key: `${i}minute40`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '45', key: `${i}minute45`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '50', key: `${i}minute50`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: '55', key: `${i}minute55`, type: "nullColumn", align: 'center', className: 'text-right' },
          { name: 'รวม', key: `${i}minuteTotal`, type: "nullColumn", align: 'center', className: 'text-right' },
        ],
      },
    ];
  }
  return result;
};

export const header26 = [
  {
    name: "ชั่วโมง",
    key: "",
    children: [
      { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
      { name: "ช่องทาง", key: "laneAbbreviation", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "00",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly00", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "01",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly01", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "02",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly02", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "03",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly03", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "04",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly04", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "05",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly05", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "06",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly06", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "07",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly07", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "08",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly08", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "09",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly09", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "10",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly10", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "11",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly11", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "12",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly12", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "13",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly13", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "14",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly14", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "15",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly15", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "16",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly16", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "17",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly17", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "18",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly18", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "19",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly19", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "20",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly20", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "21",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly21", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "22",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly22", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "23",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourly23", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "รวม",
    key: "",
    align: 'center',
    children: [
      { name: "ปริมาณ", key: "trafficHourlyTotal", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
]

export const header28 = (header) => {
  let result = [
    {
      name: header ? "เดือน-" + header : "เดือน",
      key: "",
      children: [
        { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left', width: '100px' },
        { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
      ],
    },
    {
      name: "มกราคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กุมภาพันธ์",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มีนาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "เมษายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤษภาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มิถุนายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กรกฏาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "สิงหาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กันยายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ตุลาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤศจิกายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ธันวาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "รวม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    }]
  return result;
};

export const header211 = (header) => {
  let result = [
    {
      name: "เดือน-" + header,
      key: "",
      children: [
        { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left' },
        { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
      ],
    },
    {
      name: "มกราคม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กุมภาพันธ์",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มีนาคม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "เมษายน",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤษภาคม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มิถุนายน",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กรกฏาคม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "สิงหาคม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กันยายน",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ตุลาคม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤศจิกายน",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ธันวาคม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "รวม",
      key: "",
      children: [
        { name: "ยกเว้น", key: "trafficExemMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ออกซ้าย", key: "trafficLeftXMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "ขบวน", key: "trafficHpmcMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    }
  ]
  return result
}

export const header213 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "มกราคม", key: "trafficJanuary", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "กุมภาพันธ์", key: "trafficFebruary", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "มีนาคม", key: "trafficMarch", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "เมษายน", key: "trafficApril", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "พฤษภาคม", key: "trafficMay", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "มิถุนายน", key: "trafficJune", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "กรกฏาคม", key: "trafficJuly", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "สิงหาคม", key: "trafficAugust", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "กันยายน", key: "trafficSeptember", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "ตุลาคม", key: "trafficOctober", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "พฤศจิกายน", key: "trafficNovember", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "ธันวาคม", key: "trafficDecember", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "รวม", key: "trafficTotal", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
]

export const header214 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: '40px' },
  { name: "กะเช้า", key: "trxShiftA", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "กะบ่าย", key: "trxShiftB", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "กะดึก", key: "trxShiftC", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "รวม", key: "trxTotal", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
]

export const header215 = [
  { name: "ประเภทการจ่าย", key: "payment", type: "customColumn", align: 'center', className: 'text-left', width: '100px' },
  { name: "ปริมาณจราจร", key: "traffic", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
  { name: "ปริมาณร้อยละ", key: "percent", type: "customColumn", align: 'center', className: 'text-center', width: '100px' },
]


export const header31 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
  { name: "Ntrx", key: "nTrx", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "วันที่ผ่านด่าน", key: "trxDateTime", type: "date", align: 'center', className: 'text-center', width: 70 },
  { name: "พนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "TC/OBU", key: "tcClass", type: 'zeroColumn', width: '120', align: "center" },
  { name: "AVC", key: "avcClass", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ค่าผ่านทาง	", key: "amount", type: "nullColumn", align: 'center', className: 'text-right', width: 50 },
  { name: "ประเภทการชำระ", key: "paymentTypeName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "sup.Class", key: "supClass", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "sup.Fare", key: "supFare", type: "nullColumn", align: 'center', className: 'text-center' },
  {
    name: "เหตุผิดปรกติ", key: "abnormality", type: "nullColumn", align: 'center', className: 'text-center JobNoColum',
    //  width: 200 
  },
  { name: "ประเภทการผ่านด่าน", key: "passingType", type: "nullColumn", align: 'center', className: 'text-center', width: 90 },
  { name: "ประเภทย่อย", key: "subType", type: "nullColumn", align: 'center', className: 'text-center', width: 100 },
  { name: "ทะเบียน", key: "plateNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "จังหวัด", key: "province", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "ยี่ห้อ-รุ่น", key: "brandModel", type: "nullColumn", align: 'center', className: 'text-center', width: 100 },
  { name: "สี", key: "brandModelColor", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "สังกัด", key: "under", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
  { name: "ศูนย์-ผู้รับแจ้ง", key: "centerRecipient", type: "nullColumn", align: 'center', className: 'text-right', width: 130 },
  { name: "ตำรวจ-ผู้รับแจ้ง", key: "policeRecipients", type: "nullColumn", align: 'center', className: 'text-right', width: 130 },
  { name: "supervisor", key: "supStaffId", type: "nullColumn", align: 'center', className: 'text-right', width: 90 },
]

export const header32 = [
  /*1*/{ name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right', width: 70 },
  /*2*/{ name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center', width: 70 },
  /*1*/{ name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center', width: 70 },
  /*3*/{ name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
  /*4*/{ name: "Ntrx", key: "ntrx", type: "nullColumn", align: 'center', className: 'text-right', width: 70 },
  /*5*/{ name: "วันที่ผ่านด่าน", key: "trxDateTime", type: "date", align: 'center', className: 'text-center', width: 90 },
  /*6*/{ name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', width: 90 },
  { name: "TC/OBU", key: "tcClass", type: 'zeroColumn', width: '120', align: "center" },
  /*8*/{ name: "AVC", key: "avcClass", type: "nullColumn", align: 'center', width: 90 },
  /*9*/{ name: "ค่าผ่านทาง	", key: "amount", type: "nullColumn", align: 'center', className: 'text-right', width: 70 },
  /*10*/{ name: "ประเภทการชำระ", key: "paymentTypeName", type: "nullColumn", align: 'center', width: 90 },
  /*11*/{ name: "เหตุผิดปรกติ", key: "abnormality", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 130 },
  /*12*/{ name: "ประเภทการผ่านด่าน", key: "passingType", type: "nullColumn", align: 'center', className: 'text-center', width: 130 },
  /*13*/{ name: "ประเภทย่อย", key: "subType", type: "nullColumn", align: 'center', width: 100 },
  /*14*/{ name: "ทะเบียน", key: "plateNo", type: "nullColumn", align: 'center', width: 90 },
  /*15*/{ name: "จังหวัด", key: "province", type: "nullColumn", align: 'center' },
  /*15*/{ name: "ยี่ห้อ-รุ่น", key: "brandModel", type: "nullColumn", align: 'center', width: 90 },
  /*15*/{ name: "สี", key: "brandModelColor", type: "nullColumn", align: 'center', width: 90 },
  { name: "สังกัด", key: "under", type: "nullColumn", align: 'center', className: 'text-right', width: 90 },
  /*17*/{ name: "ศูนย์-ผู้รับแจ้ง", key: "centerRecipient", type: "nullColumn", align: 'center', width: 120 },
  /*18*/{ name: "ตำรวจ-ผู้รับแจ้ง", key: "policeRecipients", type: "nullColumn", align: 'center', className: 'text-center', width: 130 },
  /*19*/{ name: "supervisor", key: "supStaffId", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header33 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
  {
    name: "เหตุผิดปรกติ",
    key: "",
    children: [
      { name: "ผิดประเภท", key: "abnormalWrongType", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "ฝ่าด่าน", key: "abnormalViolation", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "ยกเว้น", key: "abnormalExem", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รถออกซ้าย", key: "abnormalLeftExit", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รวม", key: "abnormalTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "DIS-รถผิดประเภท",
    key: "",
    children: [
      { name: "กดผิด", key: "disTc", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "วัดผิด", key: "disAvc", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "UAP-รถฝ่านด่าน",
    key: "",
    children: [
      { name: "เก็บเงินได้", key: "uapMoney", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "เก็บเงินไม่ได้", key: "uapNonMoney", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "EXEM-รถยกเว้น",
    key: "",
    children: [
      { name: "เข้าเกณฑ์", key: "exemQualify", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "ไม่เข้าเกณฑ์", key: "exemNonQualify", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "LEFTX-รถออกซ้าย",
    key: "",
    children: [
      { name: "เข้าเกณฑ์", key: "leftExitQualify", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "ไม่เข้าเกณฑ์", key: "leftExitNonQualify", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "ไม่ยืนยัน NonAdj.", key: "nonAdjust", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header33_Detail = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
  { name: "Ntrx", key: "ntrx", type: "nullColumn", align: 'center' },
  { name: "วันที่เวลาผ่านทาง", key: "trxDateTime", type: "date", align: 'center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center' },
  { name: "TC/OBU", key: "tcClass", type: 'zeroColumn', width: '120', align: "center" },
  { name: "AVC", key: "avcClass", type: "nullColumn", align: 'center' },
  { name: "ค่าผ่านทาง	", key: "amount", type: 'nullColumn', align: 'center' },
  { name: "ประเภทการชำระ", key: "paymentTypeName", type: 'nullColumn', align: 'center' },
  { name: "เหตุผิดปรกติ", key: "abnormality", type: 'nullColumn', align: 'center', className: 'text-center JobNoColum' },
  { name: "ประเภทการผ่านด่าน", key: "passingType", width: '120', type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ประเภทย่อย", key: "subType", type: 'nullColumn', align: 'center' },
  { name: "ทะเบียน", key: "plateNo", type: 'nullColumn', align: 'center' },
  { name: "จังหวัด", key: "province", type: 'nullColumn', align: 'center' },
  { name: "ยี่ห้อ-รุ่น", key: "brandModel", type: 'nullColumn', align: 'center' },
  { name: "สี", key: "brandModelColor", type: 'nullColumn', align: 'center' },
  { name: "สังกัด", key: "under", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ศูนย์-ผู้รับแจ้ง", key: "centerRecipient", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ตำรวจ-ผู้รับแจ้ง", key: "policeRecipients", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "Supervisor", key: "supStaffId", type: "nullColumn", align: 'center', className: 'text-left' },
]

export const header34 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center', width: 52, },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: "center", className: 'text-center JobNoColum', width: 60 },
  { name: "Ntrx", key: "nTrx", type: "nullColumn", align: "center", className: 'text-right', width: 40 },
  { name: "วันที่ผ่านด่าน", key: "trxDateTime", type: "date", align: "center", width: 160 },
  { name: "พนักงาน", key: "staffId", type: "nullColumn", align: "center", width: 60 },
  { name: "TC/OBU", key: "tcObuClass", type: 'zeroColumn', align: "center", width: 40 },
  { name: "AVC", key: "avcClass", type: "nullColumn", align: "center", width: 40 },
  { name: "ล้อ", key: "wheel", type: "nullColumn", align: "center", width: 40 },
  { name: "เพลา", key: "shaft", type: "nullColumn", align: "center", width: 40 },
  { name: "ล้อคู่", key: "twinWheels", type: "nullColumn", align: "center", width: 40, },
  { name: "ค่าผ่านทาง	", key: "toll", type: "nullColumn", align: "center", width: 60, className: 'text-right' },
  { name: "ประเภทการชำระ", key: "paymentTypeName", type: "signal", align: 'center', className: 'text-center', width: 100 },
  { name: "PAN/CardNo/CustName", key: "ref1Pan", type: "signal", align: 'center', className: 'text-center', width: 200 },
  { name: "สัญญาณการผ่านทาง", key: "signalCode", type: "signal", align: 'center', className: 'text-left JobNoColum', width: 170 },
]

export const header35 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right', width: 60 },
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left', width: 60 },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-left', width: 60 },
  { name: "วันเวลาเริ่มปฏิบัติงาน", key: "bojDateTime", type: "date", align: 'center', className: 'text-center', width: 130 },
  { name: "วันเวลาเลิกปฏิบัติงาน", key: "eojDateTime", type: "date", align: 'center', className: 'text-center', width: 130 },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
  { name: "วันเวลาที่ส่งเงิน", key: "declareDateTime", type: "date", align: 'center', className: 'text-center', width: 130 },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อพนักงาน", key: "staffNameTh", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ถุงเงิน", key: "moneyBagNo", type: "nullColumn", align: 'center', className: 'text-right', width: 60 },
  { name: "รหัสหัวหน้าพนักงาน", key: "supStaffId", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ชื่อหัวหน้าพนักงาน", key: "supStaffNameTh", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header36 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่ของรายได้", key: "operationalDate", type: "dateDay", align: "center", className: 'text-left', },
  { name: "กะ", key: "shiftTypeName", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "นำส่งครั้งที่", key: "declareNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "วันเวลาเริ่มปฏิบัติงาน", key: "bojDateTime", type: "date", align: 'center', className: 'text-center' },
  { name: "วันเวลาเลิกปฏิบัติงาน", key: "eojDateTime", type: "date", align: 'center', className: 'text-center' },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
  { name: "วันเวลาที่ส่งเงิน", key: "declareDateTime", type: "date", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ชื่อพนักงาน", key: "staffNameTh", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ถุงเงิน", key: "moneyBagNo", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ประเภทการนำส่ง", key: "declareType", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ยอดคำนวณได้	", key: "totalAmount", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ยอดนำส่ง", key: "declareAmount", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ส่งขาด/ส่งเกิน", key: "differentAmount", type: "nullColumn", align: 'center', className: 'text-center', },
]

export const header37 = [
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่-เวลา", key: "trxDateTime", type: "date", align: "center", className: 'text-left', },
  { name: "กะ", key: "shift", type: "nullColumn", align: 'center', className: 'text-center', },
  {
    name: "จำนวนเหตุการณ์",
    key: "",
    children: [
      { name: "รถยกเว้น-เข้าเกณท์", key: "trxExceptQualify", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รถยกเว้น-ไม่เข้าเกณท์", key: "trxExceptNotQualify", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "ฝ่าด่าน-เก็บเงินได้", key: "trxVioPayment", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "ฝ่าด่าน-เก็บเงินไม่ได้", key: "trxVioNotPayment", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รถออกซ้าย-เข้าเกณท์", key: "trxExiteLeftQualify", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รถออกซ้าย-ไม่เข้าเกณท์", key: "trxExiteLeftNotQualify", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  { name: "รวม", key: "trxTotal", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ชื่อพนักงาน", key: "staffName", type: "nullColumn", align: 'center', className: 'text-center' },
]

export const header38 = [
  { name: "Location", key: "location", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "Device", key: "device", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "Description", key: "description", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "Occurred", key: "occurred", type: "date", align: "center", className: 'text-center', },
  { name: "Recovered", key: "recovered", type: "date", align: "center", className: 'text-center', },
  { name: "Remark", key: "remark", type: "nullColumn", align: 'center', className: 'text-center', },
]

export const header311 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right'},
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: "center", className: 'text-center JobNoColum' },
  { name: "Ntrx", key: "nTrx", type: "nullColumn", align: "center", className: 'text-right'},
  { name: "วันที่ผ่านด่าน", key: "trxDateTime", type: "date", align: "center"},
  { name: "พนักงาน", key: "staffId", type: "nullColumn", align: "center"},
  { name: "TC/OBU", key: "tcObuClass", type: 'nullColumn', align: "center"},
  { name: "AVC", key: "avcClass", type: "nullColumn", align: "center"},
  { name: "หมายเลขข้างรถ	", key: "carNo", type: "signal", align: "center", className: 'text-right' },
  { name: "ทะเบียนรถ", key: "licensePlate", type: "signal", align: 'center', className: 'text-center'}
]

export const header314 = [
  { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-right'},
  { name: "วันที่", key: "date", type: "nullColumn", align: "center", className: 'text-center' },
  { name: "ด่าน", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ช่องทาง", key: "laneName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "จำนวนรถผ่านทาง", key: "scwTraffic", type: "nullColumn", align: "center", className: 'text-right'},
  { name: "BIS นับ", key: "bisTraffic", type: "nullColumn", align: "center", className: 'text-right'},
  { name: "ผลต่าง", key: "diff", type: "nullColumn", align: "center", className: 'text-right'},
]

export const header64 = [
  { name: "ด่าน", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ช่องทาง", key: "laneAbbr", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "CardNo", key: "cardNo", type: "nullColumn", align: 'center', className: 'text-center' },
  {
    name: "DMT",
    key: "",
    children: [
      { name: "StaffNo", key: "staffNo", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "JobNo", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center', width: '40px' },
      { name: "NtrxNo", key: "ntrx", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "วันเวลาผ่านทาง", key: "trxDateTime", type: "date", align: 'center', className: 'text-center', width: '60px' },
      { name: "ประเภทรถ", key: "tcClass", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "AVC", key: "avcClass", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "ค่าผ่านทาง", key: "amount", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "BANK",
    key: "",
    children: [
      { name: "ประเภทการชำระ", key: "trxType", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "JobNo", key: "bankJobNo", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "NtrxNo", key: "bankNtrx", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "TerminalId", key: "bankTerminalId", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "EDC Approv", key: "bankApproveAmount", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EDC Time", key: "bankEdcTime", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "EDC Approve Time", key: "bankApproveTime", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
]

export const header41 = [
  {
    name: "ชั่วโมง",
    key: "",
    children: [
      { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
      { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "00",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly00", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รายได้", key: "revenueHourly00", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "01",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly01", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รายได้", key: "revenueHourly01", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "02",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly02", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รายได้", key: "revenueHourly02", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "03",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly03", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รายได้", key: "revenueHourly03", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "04",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly04", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รายได้", key: "revenueHourly04", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "05",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly05", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รายได้", key: "revenueHourly05", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "06",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly06", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "รายได้", key: "revenueHourly06", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "07",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly07", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly07", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "08",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly08", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly08", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "09",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly09", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly09", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "10",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly10", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly10", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "11",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly11", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly11", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "12",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly12", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly12", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "13",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly13", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly13", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "14",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly14", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly14", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "15",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly15", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly15", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "16",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly16", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly16", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "17",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly17", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly17", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "18",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly18", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly18", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "19",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly19", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly19", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "20",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly20", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly20", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "21",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly21", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly21", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "22",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly22", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly22", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "23",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly23", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly23", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวม",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
];

export const header43 = (header) => {
  let result = [
    {
      name: "เดือน-" + header,
      key: "",
      children: [
        { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left' },
        { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
      ],
    },
    {
      name: "มกราคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กุมภาพันธ์",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มีนาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "เมษายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤษภาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มิถุนายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กรกฏาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "สิงหาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กันยายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ตุลาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤศจิกายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ธันวาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "รวม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    }
  ]
  return result
};

export const header44 = [
  {
    name: "ชั่วโมง",
    key: "",
    children: [
      { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left' },
      { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
    ],
  },
  {
    name: "00",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly00", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly00", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "01",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly01", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly01", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "02",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly02", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly02", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "03",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly03", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly03", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "04",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly04", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly04", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "05",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly05", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly05", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "06",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly06", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly06", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "07",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly07", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly07", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "08",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly08", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly08", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "09",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly09", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly09", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "10",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly10", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly10", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "11",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly11", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly11", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "12",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly12", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly12", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "13",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly13", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly13", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "14",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly14", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly14", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "15",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly15", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly15", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "16",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly16", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly16", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "17",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly17", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly17", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "18",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly18", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly18", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "19",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly19", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly19", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "20",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly20", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly20", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "21",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly21", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly21", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "22",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly22", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly22", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "23",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourly23", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourly23", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวม",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficHourlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueHourlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
];

export const header45 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left', width: '200px' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center', width: '200px' },
  { name: "ปริมาณ", key: "traffic", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "รายได้", key: "revenue", type: "nullColumn", align: 'center', className: 'text-right' },
];

export const header46 = (header) => {
  let result = [
    {
      name: "เดือน-" + header,
      key: "",
      children: [
        { name: "ด่าน", key: "plazaAbbreviation", type: "customColumn", align: 'center', className: 'text-left' },
        { name: "ช่องทาง", key: "laneAbbreviation", type: "customColumn", align: 'center', className: 'text-center' },
      ],
    },
    {
      name: "มกราคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly01", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กุมภาพันธ์",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly02", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มีนาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly03", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "เมษายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly04", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤษภาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly05", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "มิถุนายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly06", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กรกฏาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly07", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "สิงหาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly08", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "กันยายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly09", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ตุลาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly10", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "พฤศจิกายน",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly11", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "ธันวาคม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthly12", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    },
    {
      name: "รวม",
      key: "",
      children: [
        { name: "ปริมาณ", key: "trafficMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
        { name: "รายได้", key: "revenueMonthlyTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      ],
    }]
  return result
};

export const header48 = [
  { name: "ลำดับ", key: "no", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "plazaName", type: "customColumn", align: 'center', className: 'text-center', width: 60 },
  {
    name: "MTC",
    key: "",
    children: [
      {
        name: "เงินสด",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficCash", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueCash", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "คูปอง",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficCoupon", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueCoupon", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "EMV",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficEmv", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueEmv", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "QRCode",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficQr", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueQr", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      }
    ],
  },
  {
    name: "ETC",
    key: "",
    children: [
      {
        name: "Easy Pass",
        key: "",
        children: [
          { name: "ปริมาณ", key: "easypassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "easypassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "M-PASS",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mpassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mpassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      }
    ],
  },
  {
    name: "รวม",
    key: "",
    children: [
      {
        name: "MTC",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "ETC",
        key: "",
        children: [
          { name: "ปริมาณ", key: "etcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "etcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      }
    ],
  },
  {
    name: "รวมทั้งหมด",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
]

export const header48Excel = [
  { name: "ลำดับ", key: "no", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "plazaName", type: "customColumn", align: 'center', className: 'text-center' },
  {
    name: "MTC เงินสด",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficCash", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueCash", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "MTC คูปอง",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficCoupon", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueCoupon", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "MTC EMV",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficEmv", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueEmv", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "MTC QRCode",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficQr", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueQr", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "ETC Easy Pass",
    key: "",
    children: [
      { name: "ปริมาณ", key: "easypassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "easypassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "ETC M-PASS",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mpassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mpassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "รวม MTC",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "รวม ETC",
    key: "",
    children: [
      { name: "ปริมาณ", key: "etcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "etcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "รวมทั้งหมด",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  }
]

export const header49 = [
  { name: "วันที่", key: "day", type: "nullColumn", align: 'center', className: 'text-right' },
  {
    name: "MTC",
    key: "",
    children: [
      {
        name: "เงินสด",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficCash", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueCash", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "คูปอง",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficCoupon", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueCoupon", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "EMV",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficEmv", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueEmv", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "QRCode",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficQr", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueQr", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      }
    ],
  },
  {
    name: "ETC",
    key: "",
    children: [
      {
        name: "Easy Pass",
        key: "",
        children: [
          { name: "ปริมาณ", key: "easypassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "easypassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "M-PASS",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mpassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mpassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      }
    ],
  },
  {
    name: "รวม",
    key: "",
    children: [
      {
        name: "MTC",
        key: "",
        children: [
          { name: "ปริมาณ", key: "mtcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "mtcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      },
      {
        name: "ETC",
        key: "",
        children: [
          { name: "ปริมาณ", key: "etcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
          { name: "รายได้", key: "etcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
        ],
      }
    ],
  },
  {
    name: "รวมทั้งหมด",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
]

export const header49Excel = [
  { name: "วันที่", key: "day", type: "customColumn", align: 'center', className: 'text-right' },
  {
    name: "MTC เงินสด",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficCash", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueCash", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "MTC คูปอง",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficCoupon", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueCoupon", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "MTC EMV",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficEmv", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueEmv", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "MTC QRCode",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficQr", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueQr", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "ETC Easy Pass",
    key: "",
    children: [
      { name: "ปริมาณ", key: "easypassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "easypassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "ETC M-PASS",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mpassTraffic", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mpassRevenue", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "รวม MTC",
    key: "",
    children: [
      { name: "ปริมาณ", key: "mtcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "mtcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "รวม ETC",
    key: "",
    children: [
      { name: "ปริมาณ", key: "etcTrafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "etcRevenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  },
  {
    name: "รวมทั้งหมด",
    key: "",
    children: [
      { name: "ปริมาณ", key: "trafficTotal", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "รายได้", key: "revenueTotal", type: "customColumn", align: 'center', className: 'text-right' }
    ],
  }
]


export const header57 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ผ่านทางรวม	", key: "tollTotal", type: "nullColumn", align: 'center', className: 'text-right', width: 50 },
  {
    name: "Class 1 ( 4 ล้อ )",
    key: "",
    children: [
      { name: "Diss 0", key: "class1Diss0", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "Diss 2", key: "class1Diss2", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "Diss 5", key: "class1Diss5", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "Diss 255", key: "class1Diss255", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "Class 2 ( มากกว่า 4 ล้อ )",
    key: "",
    children: [
      { name: "Diss 0", key: "class2Diss0", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "Diss 2", key: "class2Diss2", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "Diss 5", key: "class2Diss5", type: "customColumn", align: 'center', className: 'text-right' },
      { name: "Diss 255", key: "class2Diss255", type: "customColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "SUM Error	", key: "summaryError", type: "nullColumn", align: 'center', className: 'text-right', width: 50 },
  { name: "Percent	", key: "percent", type: "nullColumn", align: 'center', className: 'text-right', width: 50 },
]

export const header610 = [
  { name: 'ส่งเงินขาด', key: 'diff', type: "nullColumn", align: 'center', className: 'text-right' },
  { name: 'เรียกเก็บเพิ่ม', key: 'charge', type: "nullColumn", align: 'center', className: 'text-right' },
]

export const Totalheader610 = [
  { name: 'ส่งเงินขาด', key: 'diffTotal', type: "nullColumn", align: 'center', className: 'text-right' },
  { name: 'เรียกเก็บเพิ่ม', key: 'chargeTotal', type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header611 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
  { name: "Ntrx", key: "nTrx", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "วันที่ผ่านด่าน", key: "trxDateTime", type: "date", align: 'center', className: 'text-center', width: 70 },
  { name: "พนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "TC/OBU", key: "tcClass", type: 'zeroColumn', width: '120', align: "center" },
  { name: "AVC", key: "avcClass", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ค่าผ่านทาง	", key: "amount", type: "nullColumn", align: 'center', className: 'text-right', width: 50 },
  { name: "ประเภทการชำระ", key: "paymentTypeName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "sup.Class", key: "supClass", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "sup.Fare", key: "supFare", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "audit.Class", key: "auditClass", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "audit.Payment", key: "auditPayment", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "audit.Event", key: "auditEvent", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "audit.Fare", key: "auditFare", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "audit.Remark", key: "auditRemark", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "เหตุผิดปรกติ", key: "abnormality", type: "nullColumn", align: 'center', className: 'text-center JobNoColum' },
  { name: "ประเภทการผ่านด่าน", key: "passingType", type: "nullColumn", align: 'center', className: 'text-center', width: 90 },
  { name: "ประเภทย่อย", key: "subType", type: "nullColumn", align: 'center', className: 'text-center', width: 100 },
  { name: "ทะเบียน", key: "plateNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "จังหวัด", key: "province", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "ยี่ห้อ-รุ่น", key: "brandModel", type: "nullColumn", align: 'center', className: 'text-center', width: 100 },
  { name: "สี", key: "brandModelColor", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "สังกัด", key: "under", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
  { name: "ศูนย์-ผู้รับแจ้ง", key: "centerRecipient", type: "nullColumn", align: 'center', className: 'text-right', width: 130 },
  { name: "ตำรวจ-ผู้รับแจ้ง", key: "policeRecipients", type: "nullColumn", align: 'center', className: 'text-right', width: 130 },
  { name: "Supervisor", key: "supStaffId", type: "nullColumn", align: 'center', className: 'text-right', width: 90 },
  { name: "Audit", key: "auditStaffId", type: "nullColumn", align: 'center', className: 'text-right', width: 90 },
]

export const header612 = [
  { name: "ด่าน", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่", key: "operationalDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "กะ", key: "shiftNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "รหัส", key: "staffId", type: "date", align: 'center', className: 'text-center' },
  { name: "ชื่อ", key: "staffFirstName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "นามสกุล", key: "staffLastName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ถุงเงิน", key: "bagNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "หัวหน้า	", key: "supId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "เงินสด", key: "cash", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "คูปอง", key: "coupon", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "QRCode", key: "qr", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "รวม", key: "total", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header613 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ด่าน", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อพนักงาน", key: "staffName", type: "date", align: 'center', className: 'text-center' },
  { name: "ถุงเงิน", key: "bagNo", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "ผลัด", key: "shiftName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "JOB", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "NTRX", key: "ntrx", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "วันเวลาผ่านทาง", key: "trxDate", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "TC Class", key: "tcClass", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "AVC", key: "avcClass", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Transation Remark", key: "transationRemark", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Sup Remark", key: "supRemark", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Sup_By", key: "supBy", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Audit Remake", key: "auditRemark", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Audit By", key: "auditBy", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "TC_Fare", key: "tcFare", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Sup_Fare", key: "supFare", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Audit_Fare", key: "auditFare", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Total_Fare", key: "totalFare", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Audit_Status", key: "auditStatus", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header614 = [
  { name: "ด่าน", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่ของรายได้", key: "revenueDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ผลัด", key: "shiftName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อพนักงาน", key: "staffName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ถุงเงิน", key: "bagNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ประเภทการนำส่ง", key: "declareTypeName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "SOD", key: "sod", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Sup", key: "sup", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Audit", key: "audit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "SOD Adj", key: "sodAdj", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "MCC", key: "mcc", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "MCC-SOD Adj", key: "mccSodAdj", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header615 = [
  { name: "ด่าน", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่ของรายได้", key: "revenueDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ผลัด", key: "shiftName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อพนักงาน", key: "staffName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ประเภทการนำส่ง", key: "declareTypeName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "SOD", key: "sod", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Sup", key: "sup", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Audit", key: "audit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "SOD Adj", key: "sodAdj", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "SOD Audit", key: "sodAudit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "SOD Adj +- SOD Audit", key: "sodAdjAudit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "MCC", key: "mcc", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "MCC Audit", key: "mccAudit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "MCC +- MCC Audit", key: "mccMccAudit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "MCC +- SOD", key: "mccSod", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header616 = [
  { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่ของรายได้", key: "revenueDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ด่าน", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "เลขที่ถุงเงิน", key: "bagNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "กะทำงาน", key: "shiftName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อ-นามสกุล", key: "staffName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ยอดเงินการใช้ QR", key: "mccQr", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ยอดเงินการนับ Coupon จาก GF", key: "mccCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ผลต่างคูปอง", key: "difCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ยอดเงิน Sup.Adj", key: "supPrice", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Sup.Adj QR KTB", key: "supAdjustQrKtb", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "เงินอื่นๆ (ผชท ให้เงินเกิน)", key: "fareOther", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "เงินรับฝาก", key: "nonRevenue", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ยอดเงิน Audit.Adj", key: "auditPrice", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ยอดเงินสดจาก Guardforce", key: "mccMccAudit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ยอดเงินสดจาก SOD หลัง ตรวจสอบ", key: "sodAdjAudit", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ผลตรวจสอบจากระบบ", key: "mccSod", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ยอดเงินยกเว้น", key: "auditExcept", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "สรุปผลตรวจสอบโดย Audit", key: "auditSummary", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header617 = [
  { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่", key: "operationDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ด่าน", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อ-นามสกุล", key: "staffName", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "กะเช้า", key: "shift1", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "กะบ่าย", key: "shift2", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "กะดึก", key: "shift3", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "กะกลางวัน", key: "shift4", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "กะกลางคืน", key: "shift5", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "รวม", key: "shiftTotal", type: "nullColumn", align: 'center', className: 'text-right' },
  // { name: "MCC +- SOD", key: "mccSod", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header618 = [
  { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่รายได้", key: "revenueDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ประเภทรายได้", key: "revenueType", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "รหัสพนักงานอนุมัติ", key: "approveStaffNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อ-นามสกุล", key: "approveStaffName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่อนุมัติ", key: "approveDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "AR AMT", key: "arAmt", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "BASETAX AMT", key: "baseTaxAmt", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "VAT AMT", key: "vatAmt", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header619 = [
  { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่รายได้", key: "revenueDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ประเภทรายได้", key: "revenueType", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "รหัสพนักงาน Post", key: "postStaffNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ชื่อ-นามสกุล", key: "postStaffName", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่ Post", key: "postDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "AR AMT", key: "arAmt", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "BASETAX AMT", key: "baseTaxAmt", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "VAT AMT", key: "vatAmt", type: "nullColumn", align: 'center', className: 'text-right' },
]


export const header620 = [
  { name: "ลำดับ", key: "order", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "วันที่เรียกเก็บ", key: "saveDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "วันที่ผ่านทาง", key: "trxDate", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ประเภทใบเรียกเก็บ", key: "typeText", type: "nullColumn", align: 'center', className: 'text-left' },
  {
    name: "Easypass",
    key: "",
    children: [
      { name: "จำนวน", key: "trxEasypass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "จำนวนเงิน", key: "amountEasypass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "จำนวนค้างชำระ", key: "trxOverdueEasypass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "จำนวนเงินค้างชำระ", key: "amountOverdueEasypass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "Mpass",
    key: "",
    children: [
      { name: "จำนวน", key: "trxMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "จำนวนเงิน", key: "amountMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "จำนวนค้างชำระ", key: "trxOverdueMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "จำนวนเงินค้างชำระ", key: "amountOverdueMpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const customColumn = [
  { name: 'ยกเว้น', key: 'trafficExem', type: "nullColumn", align: 'center', className: 'text-right' },
  { name: 'ออกซ้าย', key: 'trafficLeftX', type: "nullColumn", align: 'center', className: 'text-right' },
  { name: 'ขบวน', key: 'trafficHpmc', type: "nullColumn", align: 'center', className: 'text-right' },
]

export const customTotal = [
  { name: 'ยกเว้น', key: 'trafficExemTotal', type: "nullColumn", align: 'center', className: 'text-right' },
  { name: 'ออกซ้าย', key: 'trafficLeftXTotal', type: "nullColumn", align: 'center', className: 'text-right' },
  { name: 'ขบวน', key: 'trafficHpmcTotal', type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header66 = [
  { name: 'ด่าน', key: "plazaAbbreviation", type: "customColumn", align: "center", className: 'text-center' },
  { name: 'วันที่', key: "date", type: "customColumn", align: 'right', className: 'text-right', },
  { name: 'Sup.Adjust', key: "supAdjust", type: "customColumn", align: "right", className: 'text-right', },
  { name: 'TOD-SOD', key: "todSod", type: "customColumn", align: "right", className: 'text-right' },
  { name: 'MCC-TOD', key: "mccTod", type: "customColumn", align: "right", className: 'text-right' },
  { name: 'MCC-SOD', key: "mccSod", type: "customColumn", align: "right", className: 'text-right' },
  { name: 'จำนวนการนำส่ง', key: "numberTod", type: "customColumn", align: "right", className: 'text-right', },
  { name: '% ตรวจสอบแล้ว', key: "percentAudit", type: "customColumn", align: "right", className: 'text-right', },
]

export const header71 = [
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-left' },
  { name: "วันที่ของรายได้", key: "operationalDate", type: "dateDay", align: "center", className: 'text-left', },
  { name: "กะ", key: "shiftTypeName", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "นำส่งครั้งที่", key: "declareNo", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "วันเวลาเริ่มปฏิบัติงาน", key: "bojDateTime", type: "date", align: 'center', className: 'text-center' },
  { name: "วันเวลาเลิกปฏิบัติงาน", key: "eojDateTime", type: "date", align: 'center', className: 'text-center' },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
  { name: "วันเวลาที่ส่งเงิน", key: "declareDateTime", type: "date", align: 'center', className: 'text-center' },
  { name: "รหัสพนักงาน", key: "staffId", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ชื่อพนักงาน", key: "staffNameTh", type: "nullColumn", align: 'center', className: 'text-center' },
  { name: "ถุงเงิน", key: "moneyBagNo", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ประเภทการนำส่ง", key: "declareType", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ยอดคำนวณได้	", key: "totalAmount", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ยอดนำส่ง", key: "declareAmount", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "ส่งขาด/ส่งเกิน", key: "differentAmount", type: "nullColumn", align: 'center', className: 'text-center', },
  { name: "รวม", key: "totalofType", type: "nullColumn", align: 'center', className: 'text-center', },
]

export const header72 = [
  {
    name: "ด่าน",
    key: "plazaAbbreviation",
    type: "customColumn",
    align: 'center',
    className: 'text-left'
  },
  { name: "วันที่ของรายได้", key: "operationalDate", type: "dateDay", align: 'center', className: 'text-left' },
  { name: "กะ", key: "shiftTypeName", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "นำส่งครั้งที่", key: "declareNo", type: "nullColumn", align: 'center', className: 'text-left' },
  {
    name: "วันเวลาเริ่มปฏิบัติงาน",
    key: "bojDateTime",
    type: "date", align: 'center', className: 'text-left'
  },
  {
    name: "วันเวลาเลิกปฏิบัติงาน",
    key: "eojDateTime",
    type: "date", align: 'center', className: 'text-left'
  },
  { name: "Job no.", key: "jobNo", type: "customColumn", align: 'center', className: 'text-left' },
  {
    name: "วันเวลาที่ส่งเงิน",
    key: "declareDateTime",
    type: "date", align: 'center', className: 'text-left'
  },
  { name: "รหัสพนักงาน", key: "staffId", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "ชื่อพนักงาน", key: "staffNameTh", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "ถุงเงิน", key: "moneyBagNo", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "ประเภทการนำส่ง", key: "declareType", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "ยอดคำนวณได้", key: "totalAmount", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ยอดนำส่ง", key: "declareAmount", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "ส่งขาด/ส่งเกิน", key: "differentAmount", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "รวม", key: "totalofType", type: "nullColumn", align: 'center', className: 'text-right' },
];

export const header73 = [
  { name: "Plaza", key: "plazaName", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Lane", key: "lane", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Numbers of Data	", key: "number", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Comment", key: "comment", type: "nullColumn", align: 'center', className: 'text-center' },
]

export const header74_Export = [
  {
    name: "Plaza", key: "plazaName", type: "nullColumn", align: 'center', width: 100, className: 'text-left',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "AM",
    key: "",
    children: [
      { name: "CASH", key: "amCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "amCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "amEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "amQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "amMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "amEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "PM",
    key: "",
    children: [
      { name: "CASH", key: "pmCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "pmCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "pmEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "pmQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "pmMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "pmEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "Night",
    key: "",
    children: [
      { name: "CASH", key: "nightCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "nightCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "nightEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "nightQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "nightMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "nightEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const header74A_Export = [
  {
    name: "Plaza", key: "plazaName", type: "nullColumn", align: 'center', width: 100, className: 'text-left',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "AM",
    key: "",
    children: [
      { name: "CASH", key: "amCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "amCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "amEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "amQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "amMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "amEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะเช้า", key: "amTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "PM",
    key: "",
    children: [
      { name: "CASH", key: "pmCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "pmCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "pmEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "pmQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "pmMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "pmEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะบ่าย", key: "pmTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "Night",
    key: "",
    children: [
      { name: "CASH", key: "nightCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "nightCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "nightEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "nightQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "nightMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "nightEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะดึก", key: "nightTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "Day Shift",
    key: "",
    children: [
      { name: "CASH", key: "dayShiftCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "dayShiftCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "dayShiftEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "dayShiftQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "dayShiftMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "dayShiftEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะกลางวัน", key: "dayShiftTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "Night Shift",
    key: "",
    children: [
      { name: "CASH", key: "nightShiftCach", type: "nullColumn", align: 'center', className: 'text-right' }, 
      { name: "Coupon", key: "nightShiftCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "nightShiftEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "nightShiftQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "nightShiftMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "nightShiftEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะกลางคืน", key: "nightShiftTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
]


export const header74A_Export_1 = [
  {
    name: "Plaza", key: "plazaName", type: "nullColumn", align: 'center', width: 100, className: 'text-left',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "AM",
    key: "",
    children: [
      { name: "CASH", key: "amCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "amCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "amEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "amQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "amMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "amEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะเช้า", key: "amTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "PM",
    key: "",
    children: [
      { name: "CASH", key: "pmCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "pmCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "pmEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "pmQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "pmMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "pmEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะบ่าย", key: "pmTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "Night",
    key: "",
    children: [
      { name: "CASH", key: "nightCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "nightCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "nightEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "nightQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "nightMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "nightEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะดึก", key: "nightTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
]

export const header74A_Export_2 = [
  {
    name: "Plaza", key: "plazaName", type: "nullColumn", align: 'center', width: 100, className: 'text-left',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "AM",
    key: "",
    children: [
      { name: "CASH", key: "amCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "amCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "amEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "amQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "amMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "amEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะกลางวัน", key: "amTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "PM",
    key: "",
    children: [
      { name: "CASH", key: "pmCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "pmCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "pmEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "pmQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "pmMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "pmEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะกลางคืน", key: "pmTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
]

export const header74C_Export = [
  {
    name: "Plaza", key: "plazaName", type: "nullColumn", align: 'center', width: 100, className: 'text-left',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "AM",
    key: "",
    children: [
      { name: "CASH", key: "amCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "amCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "amEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "amQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "amMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "amEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "PM",
    key: "",
    children: [
      { name: "CASH", key: "pmCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "pmCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "pmEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "pmQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "pmMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "pmEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "Night",
    key: "",
    children: [
      { name: "CASH", key: "nightCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "nightCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "nightEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "nightQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "nightMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "nightEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const header75 = [
  {
    name: "Plaza", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-left',
    textCustom: [{ name: 'NorthBound', class: 'fontBoldPDF' }, { name: 'Sounthbound', class: 'fontBoldPDF' },
    { name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "Cash",
    key: "",
    children: [
      { name: "Class 1", key: "cashClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "cashClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "Coupon",
    key: "",
    children: [
      { name: "Class 1", key: "couponClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "couponClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "EMV",
    key: "",
    children: [
      { name: "Class 1", key: "emvClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "emvClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "QR-Code",
    key: "",
    children: [
      { name: "Class 1", key: "qrClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "qrClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "M-Pass", key: "mpass", type: "nullColumn", align: 'center', className: 'text-right', },
  { name: "EasyPass", key: "easypass", type: "nullColumn", align: "center", className: 'text-right', },
  { name: "Sup Total", key: "supTotal", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Exempt", key: "exempt", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Vio", key: "vio", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Total", key: "total", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Percent", key: "percent", type: "percentColumn", align: 'center', className: 'text-center JobNoColum', width: 43 },
]

export const header75A = [
  {
    name: "Plaza", key: "tsbName", type: "nullColumn", align: 'center', className: 'text-left',
    textCustom: [{ name: 'NorthBound', class: 'fontBoldPDF' }, { name: 'Sounthbound', class: 'fontBoldPDF' },
    { name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "Cash",
    key: "",
    children: [
      { name: "Class 1", key: "cashClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "cashClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "Coupon",
    key: "",
    children: [
      { name: "Class 1", key: "couponClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "couponClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "EMV",
    key: "",
    children: [
      { name: "Class 1", key: "emvClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "emvClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "QR-Code",
    key: "",
    children: [
      { name: "Class 1", key: "qrClass1", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Class 2", key: "qrClass2", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "M-Pass", key: "mpass", type: "nullColumn", align: 'center', className: 'text-right', },
  { name: "EasyPass", key: "easypass", type: "nullColumn", align: "center", className: 'text-right', },
  { name: "Sup Total", key: "supTotal", type: "nullColumn", align: 'center', className: 'text-right' },
]

export const header75B_Export = [
  {
    name: "Plaza", key: "plazaName", type: "nullColumn", align: 'center', width: 100, className: 'text-left',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "AM",
    key: "",
    children: [
      { name: "CASH", key: "amCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "amCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "amEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "amQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "amMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "amEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะเช้า", key: "amTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "PM",
    key: "",
    children: [
      { name: "CASH", key: "pmCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "pmCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "pmEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "pmQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "pmMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "pmEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะบ่าย", key: "pmTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  {
    name: "Night",
    key: "",
    children: [
      { name: "CASH", key: "nightCach", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "nightCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "nightEmv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "nightQr", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Mpass", key: "nightMpass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EasyPass", key: "nightEpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "รวมกะดึก", key: "nightTotal", type: "nullColumn", align: 'center', width: 100, className: 'text-right',
    textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Grand Total', class: 'fontBoldPDFRight' }
      , { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
]

export const header76 = [
  {
    name: "Time", key: "time", type: "nullColumn", align: 'center', className: 'text-center'
    , textCustom: [{ name: 'Total', class: 'fontBoldPDFRight' }, { name: 'Percent', class: 'fontBoldPDFRight' }]
  },
  { name: "Cls 1", key: "cls1", type: "nullColumn", align: "center", className: 'text-right', },
  { name: "Cls 2", key: "cls2", type: "nullColumn", align: 'center', className: 'text-right', },
  { name: "Cls 3", key: "cls3", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Cls 4", key: "cls4", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Cls 5", key: "cls5", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Sub Total", key: "subTotal", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Exempt", key: "exempt", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Violation", key: "violation", type: "nullColumn", align: 'center', className: 'text-right', },
  { name: "Total", key: "total", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "Percent", key: "percent", type: "nullColumn", align: 'center', className: 'text-right', },
]


export const header77 = [
  { name: "PLAZA", key: "plaza", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "A.M.", key: "am", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "P.M.", key: "pm", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "NIGHT", key: "night", type: "nullColumn", align: 'center', className: 'text-right' },
  {
    name: "TOLL",
    key: "",
    align: 'center',
    children: [
      { name: "TOTAL", key: "tollTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "%", key: "tollPercent", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const header742_1 = [
  { name: "PLAZA", key: "plaza", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "A.M.", key: "am", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "P.M.", key: "pm", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "NIGHT", key: "night", type: "nullColumn", align: 'center', className: 'text-right' },
  {
    name: "TOLL",
    key: "",
    align: 'center',
    children: [
      { name: "TOTAL", key: "tollTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "%", key: "tollPercent", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
]
export const header742_2 = [
  { name: "PLAZA", key: "plaza", type: "customColumn", align: 'center', className: 'text-left' },
  { name: "A.M.", key: "am", type: "nullColumn", align: 'center', className: 'text-right' },
  { name: "P.M.", key: "pm", type: "nullColumn", align: 'center', className: 'text-right' },
  {
    name: "TOLL",
    key: "",
    align: 'center',
    children: [
      { name: "TOTAL", key: "tollTotal", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "%", key: "tollPercent", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
]

export const header79 = [
  { name: "Plaza", key: "plazaDescription", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Shift No.", key: "shiftTypeId", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Staff No", key: "staffNo", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Staff Name", key: "staffName", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Bag No.", key: "bagNo", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Serial No.", key: "serialNo", type: "customColumn", align: 'center', className: 'text-center' },
  {
    name: "TOD Count",
    key: "",
    align: 'center',
    children: [
      { name: "Cash", key: "todCash", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "todCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "SOD Count",
    key: "",
    align: 'center',
    children: [
      { name: "Cash", key: "sodCash", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "sodCoupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "sodEMV", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "sodQRCode", type: "nullColumn", align: 'center', className: 'text-right' }
      // { name: "Easy Pass", key: "sod_easypass", type: "nullColumn", align: 'center', className: 'text-right' },
      // { name: "M-Pass", key: "sod_mpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "Collection Discrepancy", key: "collectionDiscrepancy", type: "nullColumn", align: 'center', className: 'text-center' },
]

export const header710 = [
  { name: "Plaza", key: "plaza", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Shift No.", key: "shiftno", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Staff No", key: "staffno", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Staff Name", key: "staffname", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Bag No.", key: "bagno", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "Serial No.", key: "serial", type: "customColumn", align: 'center', className: 'text-center' },
  {
    name: "TOD Count",
    key: "",
    align: 'center',
    children: [
      { name: "Cash", key: "tod_cash", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "tod_coupon", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  {
    name: "SOD Count",
    key: "",
    align: 'center',
    children: [
      { name: "Cash", key: "sod_cash", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Coupon", key: "sod_coupon", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "EMV", key: "sod_emv", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "QRCode", key: "sod_qrcode", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "Easy Pass", key: "sod_easypass", type: "nullColumn", align: 'center', className: 'text-right' },
      { name: "M-Pass", key: "sod_mpass", type: "nullColumn", align: 'center', className: 'text-right' },
    ],
  },
  { name: "Colllection Discrepacy", key: "Colllection", type: "nullColumn", align: 'center', className: 'text-center' },
]

export const header84 = [
  { name: "ลำดับ", key: "index", type: "nullColumn", align: 'center', className: 'text-right', width: 40 },
  { name: "ด่าน", key: "plazaAbbreviation", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "ช่องทาง", key: "laneAbbreviation", type: "nullColumn", align: 'center', className: 'text-center', width: 52, },
  { name: "Job No.", key: "jobNo", type: "nullColumn", align: "center", className: 'text-center JobNoColum', width: 60 },
  { name: "Ntrx", key: "nTrx", type: "nullColumn", align: "center", className: 'text-right', width: 40 },
  { name: "วันที่ผ่านด่าน", key: "trxDateTime", type: "date", align: "center", width: 160 },
  { name: "พนักงาน", key: "staffId", type: "nullColumn", align: "center", width: 60 },
  { name: "TC/OBU", key: "tcObuClass", type: 'zeroColumn', align: "center", width: 40 },
  { name: "AVC", key: "avcClass", type: "nullColumn", align: "center", width: 40 },
  { name: "ล้อ", key: "wheel", type: "nullColumn", align: "center", width: 40 },
  { name: "เพลา", key: "shaft", type: "nullColumn", align: "center", width: 40 },
  { name: "ล้อคู่", key: "twinWheels", type: "nullColumn", align: "center", width: 40, },
  { name: "ค่าผ่านทาง	", key: "toll", type: "nullColumn", align: "center", width: 60, className: 'text-right' },
  { name: "ประเภทการชำระ", key: "paymentTypeName", type: "signal", align: 'center', className: 'text-center', width: 100 },
  { name: "PAN/CardNo/CustName", key: "ref1Pan", type: "signal", align: 'center', className: 'text-center', width: 200 },
  { name: "สัญญาณการผ่านทาง", key: "signalCode", type: "signal", align: 'center', className: 'text-left JobNoColum', width: 170 },
]

export const header93 = [
  { name: "ด่าน", key: "plazaName", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "Valid From Date", key: "validFromDate", type: "nullColumn", align: 'center', className: 'text-center', width: 60 },
  { name: "Valid From Time", key: "validFromTime", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "Valid To Date", key: "validToDate", type: "nullColumn", align: 'center', className: 'text-center', width: 60 },
  { name: "Valid To Time", key: "validToTime", type: "nullColumn", align: 'center', className: 'text-center', width: 50 },
  { name: "class 1", key: "fareClass1", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 2", key: "fareClass2", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 3", key: "fareClass3", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 4", key: "fareClass4", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 5", key: "fareClass5", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 6", key: "fareClass6", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 7", key: "fareClass7", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 8", key: "fareClass8", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 9", key: "fareClass9", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
  { name: "class 0", key: "fareClass0", type: "nullColumn", align: 'center', className: 'text-center', width: 30 },
]

export const header101 = [
  { name: "ลำดับ", key: "indexRow", type: "customColumn", align: 'center', className: 'text-center' },
  {
    name: "ใบกำกับ",
    key: "",
    align: 'center',
    children: [
      { name: "วันเวลาที่ตัดเงิน", key: "csDate", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "เลขที่", key: "receiptNo", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  { name: "ผู้ซื้อสินค้า/ผู้รับบริการ", key: "cusName", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "เลขที่ใบสำคัญ เล่มที่/เลขที่", key: "numberNo", type: "customColumn", align: 'center', className: 'text-center' },
  { name: "เลขประจำจำตัวผู้เสียภาษี", key: "taxId", type: "customColumn", align: 'center', className: 'text-center' },
  {
    name: "สถานประกอบการ",
    key: "",
    align: 'center',
    children: [
      { name: "สำนักงานใหญ่", key: "hqId", type: "nullColumn", align: 'center', className: 'text-center' },
      { name: "สาขาที่", key: "branchId", type: "nullColumn", align: 'center', className: 'text-center' },
    ],
  },
  { name: "มูลค่าสินค้าหรือบริการ", key: "baseFare", type: "customColumn", align: 'center', className: 'text-right' },
  { name: "จำนวนเงินภาษีมูลค่าเพิ่ม", key: "vat", type: "customColumn", align: 'center', className: 'text-right' },
  { name: "รวม", key: "fare", type: "customColumn", align: 'center', className: 'text-right' },
]
