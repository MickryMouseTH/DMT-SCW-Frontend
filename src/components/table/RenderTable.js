
import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'antd'
// import SummaryData from './summaryData'
import { _isEmpty } from '../../tools/util'

let pageSize = 6
const RenderTable = ({ tableQuantity, SummaryData, dataSource, ...props }) => {
  const [dataPagination, setDataPagination] = useState([])
  const [dataList, setDataList] = useState([])
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    setDataList(dataSource.list || [])
    setDataPagination(_isEmpty(dataSource.list) ? [] : dataSource.list.slice(0, pageSize))
  }, [dataSource])

  const onChangePagination = (page, pageSize) => {
    const data = dataList.slice(Math.ceil((page * pageSize) - pageSize), Math.ceil(page * pageSize))
    setDataPagination(data)
    setCurrent(page)
  }

  return (
    <>
      {tableQuantity.map((item, ind) => (
        <Table
          {...props}
          bordered
          key={ind}
          size="small"
          columns={item}
          className="mb-30"
          // pagination={false}
          pagination={_isEmpty(dataSource.list) ? false : { position: ["topRight", 'bottomRight'] }}
          // scroll={{ x: 1450 }}
          rowKey={(row, ind) => ind}
          dataSource={dataPagination}
          summary={(p) => SummaryData ? <SummaryData record={item} dataSource={dataSource} rowsData={p} current={current} /> : null}
        />
      )
      )}
      <Pagination onChange={onChangePagination} total={dataList.length} pageSize={pageSize} current={current} className="d-flex justify-content-end" />
    </>
  )
}
export default RenderTable