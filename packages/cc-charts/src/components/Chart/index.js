import React, { useEffect, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { createXYChart } from './helpers/XYChart'
import { createPieChart } from './helpers/createPieChart'
import { createTimeLineChart } from './helpers/createTimeLineChart'
import { createLinearProcessDiagram } from './helpers/createLinearProcessDiagram'
import { createPictorialFractionChart } from './helpers/createPictorialFractionChart'
import PropTypes from 'prop-types'
import { createSerpentineChart } from './helpers/createSerpentineChart'
import { createSolidGauge } from './helpers/createSolidGauge'
import {createChordDiagram} from "./helpers/createChordDiagram";

am4core.useTheme(am4themes_animated)

export const Chart = ({ name, data, type, options }) => {
  const [chartDivId, setChartDivId] = useState(name || '')

  useEffect(() => {
    setChartDivId(
      name || `chartdiv${Math.floor(Math.random() * (+999999999 - +1)) + +1}`
    )
  }, [])

  const createChart = () => {
    let chart
    if (chartDivId) {
      chart =
        type === 'PieChart'
          ? createPieChart(chartDivId, data, options?.pieChart)
          : type === 'TimeLineChart'
          ? createTimeLineChart(chartDivId, data, options?.timeLineChart)
          : type === 'LinearProcessDiagram'
          ? createLinearProcessDiagram(
              chartDivId,
              data,
              options?.linearProcessDiagram
            )
          : type === 'PictorialFractionChart'
          ? createPictorialFractionChart(
              chartDivId,
              data,
              options?.pictorialFractionChart
            )
          : type === 'SerpentineChart'
          ? createSerpentineChart(chartDivId, data, options?.serpentineChart)
          : type === 'SolidGauge'
          ? createSolidGauge(chartDivId, data, options?.solidGauge)
          : type === 'ChordDiagram'
          ? createChordDiagram(chartDivId, data, options?.chordDiagram)
          : createXYChart(chartDivId, data, options?.xyChart)
    }
    if (options?.padding) {
      chart.padding(...options?.padding)
    } else {
      if (options?.paddingTop) chart.paddingTop = options?.paddingTop
      if (options?.paddingRight) chart.paddingRight = options?.paddingRight
      if (options?.paddingBottom) chart.paddingBottom = options?.paddingBottom
      if (options?.paddingLeft) chart.paddingLeft = options?.paddingLeft
    }
    return () => {
      if (chart) {
        chart.dispose()
      }
    }
  }

  useEffect(createChart, [chartDivId])

  useEffect(createChart, [data])

  useEffect(createChart, [options])

  return (
    <div
      id={chartDivId}
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '500px',
        ...options?.chartContainerStyles
      }}
    />
  )
}

Chart.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
  options: PropTypes.object
}
