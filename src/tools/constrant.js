export const columnType = Object.freeze({
  DEFAULT: "default",
  DATE: "date",
  NUMBER: "number",
  PERCENT: "percent",
  TIME: "time",
  DATETIME: "datetime",
});

const reportType = Object.freeze({ _31: '31', _34: '34', _311: '311', _57: '57', _611: '611', _612: '612', _613: '613', _614: '614', _615: '615', _616: '616', _617: '617', _618: '618', _619: '619', _620: '620', _621: '621', _72: "72", _76: '76', _77: '77', _84: '84', _821: '821' });

const header31 = [
  { header: "ลำดับ", key: "index", type: columnType.DEFAULT },
  { header: "ด่าน", key: "plazaAbbreviation", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneAbbreviation", type: columnType.DEFAULT },
  { header: "Job No.", key: "jobNo", type: columnType.NUMBER },
  { header: "Ntrx", key: "nTrx", type: columnType.NUMBER },
  { header: "วันที่ผ่านด่าน", key: "trxDateTime", type: columnType.DATETIME },
  { header: "พนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "TC/OBU", key: "tcClass", type: columnType.NUMBER },
  { header: "AVC", key: "avcClass", type: columnType.NUMBER },
  { header: "ค่าผ่านทาง	", key: "amount", type: columnType.NUMBER },
  { header: "ประเภทการชำระ", key: "paymentTypeName", type: columnType.DEFAULT },
  { header: "sup.Class", key: "supClass", type: columnType.NUMBER },
  { header: "sup.Fare", key: "supFare", type: columnType.NUMBER },
  { header: "เหตุผิดปรกติ", key: "abnormality", type: columnType.DEFAULT },
  { header: "ประเภทการผ่านด่าน", key: "passingType", type: columnType.DEFAULT },
  { header: "ประเภทย่อย", key: "subType", type: columnType.DEFAULT },
  { header: "ทะเบียน", key: "plateNo", type: columnType.DEFAULT },
  { header: "จังหวัด", key: "province", type: columnType.DEFAULT },
  { header: "ยี่ห้อ-รุ่น", key: "brandModel", type: columnType.DEFAULT },
  { header: "สี", key: "brandModelColor", type: columnType.DEFAULT },
  { header: "สังกัด", key: "under", type: columnType.DEFAULT },
  { header: "ศูนย์-ผู้รับแจ้ง", key: "centerRecipient", type: columnType.DEFAULT },
  { header: "ตำรวจ-ผู้รับแจ้ง", key: "policeRecipients", type: columnType.DEFAULT },
  { header: "supervisor", key: "supStaffId", type: columnType.DEFAULT },
]

const header34 = [
  { header: "ลำดับ", key: "index", type: columnType.DEFAULT },
  { header: "ด่าน", key: "plazaAbbreviation", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneAbbreviation", type: columnType.DEFAULT },
  { header: "Job No.", key: "jobNo", type: columnType.NUMBER },
  { header: "Ntrx", key: "nTrx", type: columnType.NUMBER },
  { header: "วันที่ผ่านด่าน", key: "trxDateTime", type: columnType.DATETIME },
  { header: "พนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "TC/OBU", key: "tcObuClass", type: columnType.NUMBER },
  { header: "AVC", key: "avcClass", type: columnType.NUMBER },
  { header: "ล้อ", key: "wheel", type: columnType.NUMBER },
  { header: "เพลา", key: "shaft", type: columnType.NUMBER },
  { header: "ล้อคู่", key: "twinWheels", type: columnType.DEFAULT },
  { header: "ค่าผ่านทาง", key: "toll", type: columnType.NUMBER },
  { header: "ประเภทการชำระ", key: "paymentTypeName", type: columnType.DEFAULT },
  { header: "PAN/CardNo/CustName", key: "ref1Pan", type: columnType.DEFAULT },
  { header: "สัญญาณการผ่านทาง", key: "signalCode", type: columnType.DEFAULT },
]

const header311 = [
  { header: "ลำดับ", key: "index", type: columnType.DEFAULT },
  { header: "ด่าน", key: "plazaAbbreviation", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneAbbreviation", type: columnType.DEFAULT },
  { header: "Job No.", key: "jobNo", type: columnType.NUMBER },
  { header: "Ntrx", key: "nTrx", type: columnType.NUMBER },
  { header: "วันที่ผ่านด่าน", key: "trxDateTime", type: columnType.DATETIME },
  { header: "พนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "TC/OBU", key: "tcObuClass", type: columnType.NUMBER },
  { header: "AVC", key: "avcClass", type: columnType.NUMBER },
  { header: "หมายเลขข้างรถ", key: "carNo", type: columnType.DEFAULT },
  { header: "ทะเบียนรถ", key: "licensePlate", type: columnType.DEFAULT },
]

const header57 = [
  { header: "ด่าน", key: "plazaAbbreviation", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneAbbreviation", type: columnType.DEFAULT },
  { header: "ผ่านทางรวม", key: "tollTotal", type: columnType.DEFAULT },
  { header: "4 ล้อ Diss 0", key: "class1Diss0", type: columnType.DEFAULT },
  { header: "4 ล้อ Diss 2", key: "class1Diss2", type: columnType.DEFAULT },
  { header: "4 ล้อ Diss 5", key: "class1Diss5", type: columnType.DEFAULT },
  { header: "4 ล้อ Diss 255", key: "class1Diss255", type: columnType.DEFAULT },
  { header: "มากกว่า 4 ล้อ Diss 0", key: "class2Diss0", type: columnType.DEFAULT },
  { header: "มากกว่า 4 ล้อ Diss 2", key: "class2Diss2", type: columnType.DEFAULT },
  { header: "มากกว่า 4 ล้อ Diss 5", key: "class2Diss5", type: columnType.DEFAULT },
  { header: "มากกว่า 4 ล้อ Diss 255", key: "class2Diss255", type: columnType.DEFAULT },
  { header: "SUM Error", key: "summaryError", type: columnType.DEFAULT },
  { header: "Percent", key: "percent", type: columnType.DEFAULT },
]

const header611 = [
  { header: "ลำดับ", key: "index", type: columnType.DEFAULT },
  { header: "ด่าน", key: "plazaAbbreviation", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneAbbreviation", type: columnType.DEFAULT },
  { header: "Job No.", key: "jobNo", type: columnType.NUMBER },
  { header: "Ntrx", key: "nTrx", type: columnType.NUMBER },
  { header: "วันที่ผ่านด่าน", key: "trxDateTime", type: columnType.DATETIME },
  { header: "พนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "TC/OBU", key: "tcClass", type: columnType.NUMBER },
  { header: "AVC", key: "avcClass", type: columnType.NUMBER },
  { header: "ค่าผ่านทาง	", key: "amount", type: columnType.NUMBER },
  { header: "ประเภทการชำระ", key: "paymentTypeName", type: columnType.DEFAULT },
  { header: "sup.Class", key: "supClass", type: columnType.NUMBER },
  { header: "sup.Fare", key: "supFare", type: columnType.NUMBER },
  { header: "audit.Class", key: "auditClass", type: columnType.NUMBER },
  { header: "audit.Payment", key: "auditPayment", type: columnType.NUMBER },
  { header: "audit.Event", key: "auditEvent", type: columnType.NUMBER },
  { header: "audit.Fare", key: "auditFare", type: columnType.NUMBER },
  { header: "audit.Remark", key: "auditRemark", type: columnType.DEFAULT },
  { header: "เหตุผิดปรกติ", key: "abnormality", type: columnType.DEFAULT },
  { header: "ประเภทการผ่านด่าน", key: "passingType", type: columnType.DEFAULT },
  { header: "ประเภทย่อย", key: "subType", type: columnType.DEFAULT },
  { header: "ทะเบียน", key: "plateNo", type: columnType.DEFAULT },
  { header: "จังหวัด", key: "province", type: columnType.DEFAULT },
  { header: "ยี่ห้อ-รุ่น", key: "brandModel", type: columnType.DEFAULT },
  { header: "สี", key: "brandModelColor", type: columnType.DEFAULT },
  { header: "สังกัด", key: "under", type: columnType.DEFAULT },
  { header: "ศูนย์-ผู้รับแจ้ง", key: "centerRecipient", type: columnType.DEFAULT },
  { header: "ตำรวจ-ผู้รับแจ้ง", key: "policeRecipients", type: columnType.DEFAULT },
  { header: "Supervisor", key: "supStaffId", type: columnType.DEFAULT },
  { header: "Audit", key: "auditStaffId", type: columnType.DEFAULT },
]

const header612 = [
  { header: "ด่าน", key: "plazaName", type: columnType.DEFAULT },
  { header: "วันที่", key: "operationalDate", type: columnType.DEFAULT },
  { header: "กะ", key: "shiftNo", type: columnType.DEFAULT },
  { header: "รหัส", key: "staffId", type: columnType.DEFAULT },
  { header: "ชื่อ", key: "staffFirstName", type: columnType.DEFAULT },
  { header: "นามสกุล", key: "staffLastName", type: columnType.DEFAULT },
  { header: "ถุงเงิน", key: "bagNo", type: columnType.DEFAULT },
  { header: "หัวหน้า", key: "supId", type: columnType.DEFAULT },
  { header: "เงินสด", key: "cash", type: columnType.NUMBER },
  { header: "คูปอง", key: "coupon", type: columnType.NUMBER },
  { header: "QRCode", key: "qr", type: columnType.NUMBER },
  { header: "รวม", key: "total", type: columnType.NUMBER },
]

const header613 = [
  { header: "ลำดับ", key: "index", type: columnType.DEFAULT },
  { header: "ด่าน", key: "tsbName", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneAbbreviation", type: columnType.DEFAULT },
  { header: "รหัสพนักงาน", key: "staffNo", type: columnType.DEFAULT },
  { header: "ชื่อพนักงาน", key: "staffName", type: columnType.DEFAULT },
  { header: "ถุงเงิน", key: "bagNo", type: columnType.DEFAULT },
  { header: "ผลัด", key: "shiftName", type: columnType.DEFAULT },
  { header: "JOB", key: "jobNo", type: columnType.DEFAULT },
  { header: "NTRX", key: "ntrx", type: columnType.DEFAULT },
  { header: "วันเวลาผ่านทาง", key: "trxDate", type: columnType.DEFAULT },
  { header: "TC Class", key: "tcClass", type: columnType.DEFAULT },
  { header: "AVC", key: "avcClass", type: columnType.DEFAULT },
  { header: "Transation Remark", key: "transationRemark", type: columnType.DEFAULT },
  { header: "Sup Remark", key: "supRemark", type: columnType.DEFAULT },
  { header: "Sup_By", key: "supBy", type: columnType.DEFAULT },
  { header: "Audit Remake", key: "auditRemark", type: columnType.DEFAULT },
  { header: "Audit By", key: "auditBy", type: columnType.DEFAULT },
  { header: "TC_Fare", key: "tcFare", type: columnType.NUMBER },
  { header: "Sup_Fare", key: "supFare", type: columnType.NUMBER },
  { header: "Audit_Fare", key: "auditFare", type: columnType.NUMBER },
  { header: "Total_Fare", key: "totalFare", type: columnType.NUMBER },
  { header: "Audit_Status", key: "auditStatus", type: columnType.DEFAULT },
]

const header614 = [
  { header: "ด่าน", key: "tsbName", type: columnType.DEFAULT },
  { header: "วันที่ของรายได้", key: "revenueDate", type: columnType.DEFAULT },
  { header: "ผลัด", key: "shiftName", type: columnType.DEFAULT },
  { header: "รหัสพนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "ชื่อพนักงาน", key: "staffName", type: columnType.DEFAULT },
  { header: "ถุงเงิน", key: "bagNo", type: columnType.DEFAULT },
  { header: "ประเภทการนำส่ง", key: "declareTypeName", type: columnType.DEFAULT },
  { header: "SOD", key: "sod", type: columnType.DEFAULT },
  { header: "Sup", key: "sup", type: columnType.DEFAULT },
  { header: "Audit", key: "audit", type: columnType.DEFAULT },
  { header: "SOD Adj", key: "sodAdj", type: columnType.DEFAULT },
  { header: "MCC", key: "mcc", type: columnType.DEFAULT },
  { header: "MCC-SOD Adj", key: "mccSodAdj", type: columnType.DEFAULT },
]

const header615 = [
  { header: "ด่าน", key: "tsbName", type: columnType.DEFAULT },
  { header: "วันที่ของรายได้", key: "revenueDate", type: columnType.DEFAULT },
  { header: "ผลัด", key: "shiftName", type: columnType.DEFAULT },
  { header: "รหัสพนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "ชื่อพนักงาน", key: "staffName", type: columnType.DEFAULT },
  { header: "ประเภทการนำส่ง", key: "declareTypeName", type: columnType.DEFAULT },
  { header: "SOD", key: "sod", type: columnType.DEFAULT },
  { header: "Sup", key: "sup", type: columnType.DEFAULT },
  { header: "Audit", key: "audit", type: columnType.DEFAULT },
  { header: "SOD Adj", key: "sodAdj", type: columnType.DEFAULT },
  { header: "SOD Audit", key: "sodAudit", type: columnType.DEFAULT },
  { header: "SOD Adj +- SOD Audit", key: "sodAdjAudit", type: columnType.DEFAULT },
  { header: "MCC", key: "mcc", type: columnType.DEFAULT },
  { header: "MCC Audit", key: "mccAudit", type: columnType.DEFAULT },
  { header: "MCC +- MCC Audit", key: "mccMccAudit", type: columnType.DEFAULT },
  { header: "MCC +- SOD", key: "mccSod", type: columnType.DEFAULT },
]

const header616 = [
  { header: "ลำดับ", key: "order", type: columnType.DEFAULT },
  { header: "วันที่ของรายได้", key: "revenueDate", type: columnType.DEFAULT },
  { header: "ด่าน", key: "tsbName", type: columnType.DEFAULT },
  { header: "เลขที่ถุงเงิน", key: "bagNo", type: columnType.DEFAULT },
  { header: "รหัสพนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "กะทำงาน", key: "shiftName", type: columnType.DEFAULT },
  { header: "ชื่อ-นามสกุล", key: "staffName", type: columnType.DEFAULT },
  { header: "ยอดเงินการใช้ QR", key: "mccQr", type: columnType.DEFAULT },
  { header: "ยอดเงินการนับ Coupon จาก GF", key: "mccCoupon", type: columnType.DEFAULT },
  { header: "ผลต่างคูปอง", key: "difCoupon", type: columnType.DEFAULT },
  { header: "ยอดเงิน Sup.Adj", key: "supPrice", type: columnType.DEFAULT },
  { header: "Sup.Adj QR KTB", key: "supAdjustQrKtb", type: columnType.DEFAULT },
  { header: "เงินอื่นๆ (ผชท ให้เงินเกิน)", key: "fareOther", type: columnType.DEFAULT },
  { header: "เงินรับฝาก", key: "nonRevenue", type: columnType.DEFAULT },
  { header: "ยอดเงิน Audit.Adj", key: "auditPrice", type: columnType.DEFAULT },
  { header: "ยอดเงินสดจาก Guardforce", key: "mccMccAudit", type: columnType.DEFAULT },
  { header: "ยอดเงินสดจาก SOD หลัง ตรวจสอบ", key: "sodAdjAudit", type: columnType.DEFAULT },
  { header: "ผลตรวจสอบจากระบบ", key: "mccSod", type: columnType.DEFAULT },
  { header: "ยอดเงินยกเว้น", key: "auditExcept", type: columnType.DEFAULT },
  { header: "สรุปผลตรวจสอบโดย Audit", key: "auditSummary", type: columnType.DEFAULT },
]

const header617 = [
  { header: "ลำดับ", key: "order", type: columnType.DEFAULT },
  { header: "วันที่", key: "operationDate", type: columnType.DEFAULT },
  { header: "ด่าน", key: "tsbName", type: columnType.DEFAULT },
  { header: "รหัสพนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "ชื่อ-นามสกุล", key: "staffName", type: columnType.DEFAULT },
  { header: "กะเช้า", key: "shift1", type: columnType.DEFAULT },
  { header: "กะบ่าย", key: "shift2", type: columnType.DEFAULT },
  { header: "กะดึก", key: "shift3", type: columnType.DEFAULT },
  { header: "กะกลางวัน", key: "shift4", type: columnType.DEFAULT },
  { header: "กะกลางคืน", key: "shift5", type: columnType.DEFAULT },
  { header: "รวม", key: "shiftTotal", type: columnType.DEFAULT },
  // { header: "MCC +- SOD", key: "mccSod", type: columnType.DEFAULT },
]

const header618 = [
  { header: "ลำดับ", key: "order", type: columnType.DEFAULT },
  { header: "วันที่รายได้", key: "revenueDate", type: columnType.DEFAULT },
  { header: "ประเภทรายได้", key: "revenueType", type: columnType.DEFAULT },
  { header: "รหัสพนักงานอนุมัติ", key: "approveStaffNo", type: columnType.DEFAULT },
  { header: "ชื่อ-นามสกุล", key: "approveStaffName", type: columnType.DEFAULT },
  { header: "วันที่อนุมัติ", key: "approveDate", type: columnType.DEFAULT },
  { header: "AR AMT", key: "arAmtExcel", type: columnType.NUMBER },
  { header: "BASETAX AMT", key: "baseTaxAmtExcel", type: columnType.NUMBER },
  { header: "VAT AMT", key: "vatAmtExcel", type: columnType.NUMBER },
]

const header619 = [
  { header: "ลำดับ", key: "order", type: columnType.DEFAULT },
  { header: "วันที่รายได้", key: "revenueDate", type: columnType.DEFAULT },
  { header: "ประเภทรายได้", key: "revenueType", type: columnType.DEFAULT },
  { header: "รหัสพนักงาน Post", key: "postStaffNo", type: columnType.DEFAULT },
  { header: "ชื่อ-นามสกุล", key: "postStaffName", type: columnType.DEFAULT },
  { header: "วันที่ Post", key: "postDate", type: columnType.DEFAULT },
  { header: "AR AMT", key: "arAmt", type: columnType.DEFAULT },
  { header: "BASETAX AMT", key: "baseTaxAmt", type: columnType.DEFAULT },
  { header: "VAT AMT", key: "vatAmt", type: columnType.DEFAULT },
]

const header620 = [
  { header: "ลำดับ", key: "order", type: columnType.DEFAULT },
  { header: "วันที่เรียกเก็บ", key: "saveDate", type: columnType.DEFAULT },
  { header: "วันที่ผ่านทาง", key: "trxDate", type: columnType.DEFAULT },
  { header: "ประเภทใบเรียกเก็บ", key: "typeText", type: columnType.DEFAULT },
  { header: "Easypass จำนวน", key: "trxEasypassExcel", type: columnType.DEFAULT },
  { header: "Easypass จำนวนเงิน", key: "amountEasypassExcel", type: columnType.DEFAULT },
  { header: "Easypass จำนวนค้างชำระ", key: "trxOverdueEasypassExcel", type: columnType.DEFAULT },
  { header: "Easypass จำนวนเงินค้างชำระ", key: "amountOverdueEasypassExcel", type: columnType.DEFAULT },
  { header: "Mpass จำนวน", key: "trxMpassExcel", type: columnType.DEFAULT },
  { header: "Mpass จำนวนเงิน", key: "amountMpassExcel", type: columnType.DEFAULT },
  { header: "Mpass จำนวนค้างชำระ", key: "trxOverdueMpassExcel", type: columnType.DEFAULT },
  { header: "Mpass จำนวนเงินค้างชำระ", key: "amountOverdueMpassExcel", type: columnType.DEFAULT },
]

const header621 = [
  { header: "วันที่ปฏิบัติงาน", key: "operationDate", type: columnType.DEFAULT },
  { header: "ด่าน", key: "tsbName", type: columnType.DEFAULT },
  { header: "จำนวน คูปอง 35", key: "couponQty35Excel", type: columnType.DEFAULT },
  { header: "ยอดเงิน คูปอง 35", key: "couponAmount35Excel", type: columnType.DEFAULT },
  { header: "ยอดเงิน GF 35", key: "couponGuardforceAmount35Excel", type: columnType.DEFAULT },
  { header: "จำนวน คูปอง 80", key: "couponQty80Excel", type: columnType.DEFAULT },
  { header: "ยอดเงิน คูปอง 80", key: "couponAmount80Excel", type: columnType.DEFAULT },
  { header: "ยอดเงิน GF 80", key: "couponGuardforceAmount80Excel", type: columnType.DEFAULT },
]

const header72 = [
  {
    header: "ด่าน",
    key: "plazaAbbreviation",
    type: columnType.DEFAULT,
    prefix: true,
  },
  { header: "วันที่ของรายได้", key: "operationalDate", type: columnType.DATE },
  { header: "กะ", key: "shiftTypeName", type: columnType.DEFAULT },
  { header: "นำส่งครั้งที่", key: "declareNo", type: columnType.DEFAULT },
  {
    header: "วันเวลาเริ่มปฏิบัติงาน",
    key: "bojDateTime",
    type: columnType.DATETIME,
  },
  {
    header: "วันเวลาเลิกปฏิบัติงาน",
    key: "eojDateTime",
    type: columnType.DATETIME,
  },
  { header: "Job no.", key: "jobNo", type: columnType.DEFAULT },
  {
    header: "วันเวลาที่ส่งเงิน",
    key: "declareDateTime",
    type: columnType.DATETIME,
  },
  { header: "รหัสพนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "ชื่อพนักงาน", key: "staffNameTh", type: columnType.DEFAULT },
  { header: "ถุงเงิน", key: "moneyBagNo", type: columnType.DEFAULT },
  { header: "ประเภทการนำส่ง", key: "declareType", type: columnType.DEFAULT },
  { header: "ยอดคำนวณได้", key: "totalAmount", type: columnType.NUMBER },
  { header: "ยอดนำส่ง", key: "declareAmount", type: columnType.NUMBER },
  { header: "ส่งขาด/ส่งเกิน", key: "differentAmount", type: columnType.NUMBER },
  { header: "รวม", key: "totalofType", type: columnType.NUMBER },
];

const header76 = [
  // { header: "Plaza Name", key: "plazaName", type: columnType.DEFAULT },
  { header: "Time", key: "time", type: columnType.DEFAULT },
  { header: "Cls 1", key: "cls1", type: columnType.NUMBER },
  { header: "Cls 2", key: "cls2", type: columnType.NUMBER },
  { header: "Cls 3", key: "cls3", type: columnType.NUMBER },
  { header: "Cls 4", key: "cls4", type: columnType.NUMBER },
  { header: "Cls 5", key: "cls5", type: columnType.NUMBER },
  { header: "Sub Total", key: "subTotal", type: columnType.NUMBER },
  { header: "Exempt", key: "exempt", type: columnType.NUMBER },
  { header: "Violation", key: "violation", type: columnType.NUMBER },
  { header: "Total", key: "total", type: columnType.NUMBER },
  { header: "Percent", key: "percent", type: columnType.PERCENT },
]

const header77 = [
  { header: "PLAZA", key: "plaza", type: columnType.DEFAULT },
  { header: "A.M.", key: "am", type: columnType.NUMBER },
  { header: "P.M.", key: "pm", type: columnType.NUMBER },
  { header: "NIGHT", key: "night", type: columnType.NUMBER },
  { header: "TOLL TOTAL", key: "tollTotal", type: columnType.NUMBER },
  { header: "TOLL %", key: "tollPercent", type: columnType.PERCENT },
]

const header84 = [
  { header: "ลำดับ", key: "index", type: columnType.DEFAULT },
  { header: "ด่าน", key: "plazaAbbreviation", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneAbbreviation", type: columnType.DEFAULT },
  { header: "Job No.", key: "jobNo", type: columnType.NUMBER },
  { header: "Ntrx", key: "nTrx", type: columnType.NUMBER },
  { header: "วันที่ผ่านด่าน", key: "trxDateTime", type: columnType.DATETIME },
  { header: "พนักงาน", key: "staffId", type: columnType.DEFAULT },
  { header: "TC/OBU", key: "tcObuClass", type: columnType.NUMBER },
  { header: "AVC", key: "avcClass", type: columnType.NUMBER },
  { header: "ล้อ", key: "wheel", type: columnType.NUMBER },
  { header: "เพลา", key: "shaft", type: columnType.NUMBER },
  { header: "ล้อคู่", key: "twinWheels", type: columnType.DEFAULT },
  { header: "ค่าผ่านทาง", key: "toll", type: columnType.NUMBER },
  { header: "ประเภทการชำระ", key: "paymentTypeName", type: columnType.DEFAULT },
  { header: "PAN/CardNo/CustName", key: "ref1Pan", type: columnType.DEFAULT },
  { header: "สัญญาณการผ่านทาง", key: "signalCode", type: columnType.DEFAULT },
]

const header821 = [
  { header: "ลำดับ", key: "order", type: columnType.DEFAULT },
  { header: "ด่าน", key: "plazaName", type: columnType.DEFAULT },
  { header: "ช่องทาง", key: "laneName", type: columnType.DEFAULT },
  { header: "วันที่ผ่านทาง", key: "trxDate", type: columnType.DATETIME },
  { header: "PAN", key: "pan", type: columnType.DEFAULT },
  { header: "ค่าผ่านทาง", key: "fareAmount", type: columnType.NUMBER },
  { header: "เลขที่ใบกำกับ", key: "invoiceNumber", type: columnType.DEFAULT },
  { header: "วันที่ใบกำกับ", key: "invoiceDate", type: columnType.DEFAULT },
  { header: "รหัสพนักงานบันทึก", key: "saveStaffNo", type: columnType.DEFAULT },
  { header: "วันเวลาบันทึก", key: "saveDatetime", type: columnType.DEFAULT },
  { header: "วันที่คืนเงิน", key: "refundDate", type: columnType.DEFAULT },
]

const footer31 = [
  { key: "prefixText", headerKey: "index" },
  { key: "count", headerKey: "plazaAbbreviation" },
  { key: "secondText", headerKey: "laneAbbreviation" },
];

const footer34 = [
  { key: "prefixText", headerKey: "index" },
  { key: "totalRow", headerKey: "plazaAbbreviation" },
  { key: "secondText", headerKey: "laneAbbreviation" },
  { key: "totalAmountBth", headerKey: "nTrx" },
];

const footer311 = [
  { key: "prefixText", headerKey: "index" },
  { key: "totalRow", headerKey: "plazaAbbreviation" },
  { key: "secondText", headerKey: "laneAbbreviation" },
];

const footer57 = [
  { key: "prefixText", headerKey: "laneAbbreviation" },
  { key: "tollTotalTotal", headerKey: "tollTotal" },
  { key: "class1Diss0Total", headerKey: "class1Diss0" },
  { key: "class1Diss2Total", headerKey: "class1Diss2" },
  { key: "class1Diss5Total", headerKey: "class1Diss5" },
  { key: "class1Diss255Total", headerKey: "class1Diss255" },
  { key: "class2Diss0Total", headerKey: "class2Diss0" },
  { key: "class2Diss2Total", headerKey: "class2Diss2" },
  { key: "class2Diss5Total", headerKey: "class2Diss5" },
  { key: "class2Diss255Total", headerKey: "class2Diss255" },
  { key: "summaryErrorTotal", headerKey: "summaryError" },
  { key: "percentAverage", headerKey: "percent" },
];

const footer72 = [
  { key: "prefixTotal", headerKey: "declareType" },
  { key: "totalAmountSum", headerKey: "totalAmount" },
  { key: "totalDeclareAmount", headerKey: "declareAmount" },
  { key: "totalDifferentAmount", headerKey: "differentAmount" },
  { key: "allTotal", headerKey: "totalofType" },
];

const footer77 = [
  { key: "amTotal", headerKey: "am" },
  { key: "pmTotal", headerKey: "pm" },
  { key: "nightTotal", headerKey: "night" },
  { key: "tollTotal", headerKey: "tollTotal" },
  { key: "tollPercent", headerKey: "tollPercent" },
];

const footer611 = [
  { key: "prefixText", headerKey: "index" },
  { key: "count", headerKey: "plazaAbbreviation" },
  { key: "secondText", headerKey: "laneAbbreviation" },
];

const footer612 = [
  { key: "totalCash", headerKey: "cash" },
  { key: "totalCoupon", headerKey: "coupon" },
  { key: "totalQr", headerKey: "qr" },
  { key: "totalTotal", headerKey: "total" },
];

const footer84 = [
  { key: "prefixText", headerKey: "index" },
  { key: "totalRow", headerKey: "plazaAbbreviation" },
  { key: "secondText", headerKey: "laneAbbreviation" },
  { key: "totalAmountBth", headerKey: "nTrx" },
];

const report31 = {
  header: header31,
  footer: footer31,
};

const report34 = {
  header: header34,
  footer: footer34,
};

const report311 = {
  header: header311,
  footer: footer311,
};

const report57 = {
  header: header57,
  footer: footer57,
};

const report72 = {
  header: header72,
  footer: footer72,
};

const report76 = {
  header: header76,
  footer: []
}

const report77 = {
  header: header77,
  footer: footer77,
};

const report611 = {
  header: header611,
  footer: footer611,
};

const report612 = {
  header: header612,
  footer: footer612,
};

const report613 = {
  header: header613,
  footer: [],
};

const report614 = {
  header: header614,
  footer: [],
};

const report615 = {
  header: header615,
  footer: [],
};

const report616 = {
  header: header616,
  footer: [],
};

const report617 = {
  header: header617,
  footer: [],
};

const report618 = {
  header: header618,
  footer: [],
};

const report619 = {
  header: header619,
  footer: [],
};

const report620 = {
  header: header620,
  footer: [],
};

const report621 = {
  header: header621,
  footer: [],
};

const report84 = {
  header: header84,
  footer: footer84,
};

const report821 = {
  header: header821,
  footer: [],
};

export const getReportType = (rType = "") => {
  let type = { header: [], footer: [] };
  switch (rType) {
    case reportType._72:
      type = report72;
      break;
    case reportType._76:
      type = report76
      break;
    case reportType._77:
      type = report77
      break;
    case reportType._34:
      type = report34
      break;
    case reportType._31:
      type = report31
      break;
    case reportType._311:
      type = report311
      break;
    case reportType._57:
      type = report57
      break;
    case reportType._611:
      type = report611
      break;
    case reportType._612:
      type = report612
      break;
    case reportType._613:
      type = report613
      break;
    case reportType._614:
      type = report614
      break;
    case reportType._615:
      type = report615
      break;
    case reportType._616:
      type = report616
      break;
    case reportType._617:
      type = report617
      break;
    case reportType._618:
      type = report618
      break;
    case reportType._619:
      type = report619
      break;
    case reportType._620:
      type = report620
      break;
    case reportType._621:
      type = report621
      break;
    case reportType._84:
      type = report84
      break;
    case reportType._821:
      type = report821
      break;
    default:
      break;
  }
  return type;
};
