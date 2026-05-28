/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { Table, /*Pagination*/ } from 'antd'
import { _isEmpty } from '../../tools/util'

let pageSize = 5
const RenderTable = ({ tableQuantity, SummaryData, dataSource,pageSizeTotal, ...props }) => {
  const [dataPagination, setDataPagination] = useState([])
  const [dataList, setDataList] = useState([])
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    setDataList(dataSource.list || [])
    setDataPagination(_isEmpty(dataSource.list) ? [] : dataSource.list.slice(0, pageSizeTotal ? pageSizeTotal : pageSize))
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])

  // const onChangePagination = (page, pageSize) => {
  //   const data = dataList.slice(Math.ceil((page * pageSize) - pageSize), Math.ceil(page * pageSize))
  //   setDataPagination(data)
  //   setCurrent(page)
  // }

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
          pagination={false}
          // scroll={{ x: 1450 }}
          rowKey={(row, ind) => ind}
          dataSource={dataPagination}
          // summary={(p) => SummaryData ? <SummaryData record={item} dataSource={dataSource} rowsData={p} current={current} /> : null}
        />
      )
      )}
      {/* <Pagination onChange={onChangePagination} total={dataList.length} pageSize={pageSize} current={current} className="d-flex justify-content-end" /> */}
    </>
  )
}
export default RenderTable