import React from 'react'
import { Skeleton, Row } from "antd";

const SkeletonLoading = ({ loading = false, children }) => {
    return (
        <div>
            <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                {children}
            </Skeleton>
            {loading && (
                <Row justify='center' align='bottom'>
                    <h1 style={{ color: 'var(--color-text-muted)' }}>กำลังทำงานโปรดรอสักครู่...</h1>
                </Row>
            )}
        </div>
    )
}

export default SkeletonLoading
