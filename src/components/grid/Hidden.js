/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Grid } from 'antd';
const { useBreakpoint } = Grid;
const Hidden = (props) => {
  const [childrenPoint, setChildrenPoint] = useState(false)
  const screens = useBreakpoint();

  useEffect(() => {
    checkBreakpoint()
  }, [props, screens])

  const checkBreakpoint = () => {
    if (props.show) {
      const breakpoint = props.show.map(pointScreen => screens[pointScreen])
      setChildrenPoint(breakpoint.some((item) => item))
      return breakpoint.some((item) => item)
    } else {
      setChildrenPoint(true)
      return props.children
    }
  }
  return (
    <>
      {childrenPoint ? props.children : null}
    </>
  );
}
export default Hidden