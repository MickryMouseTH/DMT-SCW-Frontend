import React, { useEffect, useRef } from 'react'
import { scaleLinear, scaleBand } from 'd3-scale'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import useChartDimensions from './chartDimensionsHook'
import useTheme from '../../theme/useTheme'

const defaultChartSettings = {
  marginLeft: 40,
  marginBottom: 20,
  marginTop: 20,
  marginRight: 30,
  height: 250,
}

const BarGraph = ({
  data = [], pain = [],
  chartSettings, fillColor,
  title, yAxisName = '' }) => {
  const [ref, dms] = useChartDimensions({ ...defaultChartSettings, ...chartSettings })
  const { isDark } = useTheme()

  const surfaceColor = isDark ? '#1a1d24' : '#ffffff'
  const axisColor = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'
  const valueColor = isDark ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.85)'
  const titleColor = isDark ? '#ffffff' : '#ffffff'
  const resolvedFill = fillColor || (isDark ? '#73d13d' : '#018656')

  const xAxis = useRef(null)
  const yAxis = useRef(null)

  const xScale = scaleBand().domain(pain).rangeRound([0, dms.boundedWidth]).paddingInner(0.5)
  const yScale = scaleLinear().domain([0, 1]).nice().range([dms.boundedHeight, 0])

  useEffect(() => {
    select(xAxis.current)
      .style('font-size', '12px')
      .style('color', axisColor)
      .call(axisBottom(xScale).tickSizeOuter(0))
  }, [xAxis, xScale, axisColor])

  useEffect(() => {
    select(yAxis.current)
      .style('font-size', '12px')
      .style('color', axisColor)
      .call(axisLeft(yScale).ticks(6, '%'))
      .call((g) => g.select('.domain').remove())
  }, [yAxis, yScale, axisColor])

  return (
    <div ref={ref} style={{ background: surfaceColor, borderRadius: '10px' }}>
      <svg width={dms.width} height={dms.height} viewBox={`0 0 ${dms.width} ${dms.height}`}>
        {/* Graph Boundary */}
        <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
          <text
            x={-dms.marginLeft + dms.width / 2}
            textAnchor="middle"
            y={-40}
            fontWeight="bold"
            fill={titleColor}
            fontSize="12px"
          >
            {title}
          </text>

          <text x={0 + dms.marginLeft - 25} textAnchor="middle" y={-25} fontWeight="100" fill={valueColor} fontSize="13px">
            {yAxisName}
          </text>
          {/* For Each Group of Rects */}
          {data.map(({ name, value }, i) => (
            <React.Fragment key={i}>
              <rect
                x={(xScale(name))}
                y={yScale(value)}
                dx={'-20'}
                width={xScale.bandwidth()}
                height={yScale(0) - yScale(value)}
                fill={resolvedFill}
              />
              <text
                x={((xScale(name)) + xScale.bandwidth() / 2)}
                y={yScale(value)}
                dy={'-4px'}
                textAnchor="middle"
                width={xScale.bandwidth()}
                height={yScale(0) - yScale(value)}
                fill={valueColor}
                fontSize="13px"
              >
                {(value * 100).toFixed(1)}%
              </text>
            </React.Fragment>
          ))}

          <g transform={`translate(0, ${dms.boundedHeight})`}>
            <g ref={xAxis} />
          </g>
          <g>
            <g ref={yAxis} />
          </g>
        </g>
      </svg>
    </div>
  )
}

export default BarGraph
