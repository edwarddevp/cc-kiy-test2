import * as am4core from '@amcharts/amcharts4/core'
import { getAxis } from './getAxis'
import { validateZero } from './validateZero'

export const createAxis = (chart, axisData, axisType) => {
  const Axis =
    axisType === 'XAxis'
      ? chart.xAxes.push(getAxis(axisData?.type))
      : chart.yAxes.push(getAxis(axisData?.type))

  // The field to get the data
  Axis.dataFields[axisData?.type] = axisData?.valueName || axisData?.type

  // The title of the series
  Axis.title.text = axisData?.name

  // Distance Between the end and the beggining of the grid
  if (validateZero(axisData?.startLocation))
    Axis.startLocation = axisData?.startLocation
  if (validateZero(axisData?.endLocation))
    Axis.endLocation = axisData?.endLocation

  // size of the cell
  if (validateZero(axisData?.cellStartLocation))
    Axis.renderer.cellStartLocation = axisData?.cellStartLocation
  if (validateZero(axisData?.cellEndLocation))
    Axis.renderer.cellEndLocation = axisData?.cellStartLocation

  // Axis Above Series
  Axis.renderer.grid.template.above = !!axisData?.aboveSeries

  // Intervals of the data
  if (axisData?.baseInterval) Axis.baseInterval = axisData?.baseInterval

  // Distance between grid cells
  if (validateZero(axisData?.minGridDistance))
    Axis.renderer.minGridDistance = axisData?.minGridDistance

  // Put the axis inside the grid including labels
  if (axisData?.inside) Axis.renderer.inside = axisData?.inside

  // Disabled ticks
  Axis.renderer.ticks.template.disabled = !!axisData?.ticksDisabled

  // Inversed the data order
  if (axisData?.inversed) Axis.renderer.inversed = axisData?.inversed

  // To make a stripped axis
  if (axisData?.enableStriped)
    Axis.renderer.axisFills.template.disabled = !axisData?.enableStriped
  Axis.renderer.axisFills.template.fillOpacity =
    validateZero(axisData?.stripedFillOpacity) || 0.5
  Axis.renderer.axisFills.template.fill =
    axisData?.stripedFill || am4core.color('#000')

  // Grid lines opacity
  if (validateZero(axisData?.BaseGridStrokeOpacity))
    Axis.renderer.baseGrid.strokeOpacity = axisData?.BaseGridStrokeOpacity

  // min data of the axis
  if (validateZero(axisData?.min)) Axis.min = axisData?.min
  if (validateZero(axisData?.max)) Axis.max = axisData?.max

  // axis min Width
  if (validateZero(axisData?.minWidth))
    Axis.renderer.minWidth = axisData?.minWidth

  // radius settings
  if (validateZero(axisData?.innerRadius))
    Axis.renderer.innerRadius = axisData?.innerRadius
  if (validateZero(axisData?.radius)) Axis.renderer.radius = axisData?.radius

  // axis location
  if (validateZero(axisData?.location))
    Axis.renderer.grid.template.location = axisData?.location || 0

  // grid Stroke Opacity
  if (validateZero(axisData?.gridStrokeOpacity))
    Axis.renderer.grid.template.strokeOpacity = axisData?.gridStrokeOpacity

  // grid template disabled
  Axis.renderer.grid.template.disabled = !!axisData?.gridTemplateDisabled

  // renderer line

  if (axisData?.LineStrokeDasharray)
    Axis.renderer.line.strokeDasharray = axisData?.LineStrokeDasharray
  if (validateZero(axisData?.lineStrokeOpacity))
    Axis.renderer.line.strokeOpacity = axisData?.lineStrokeOpacity

  /** *****************************************Axis Labels***************************************************/
  if (axisData?.labels) {
    const labelsTemplate = Axis.renderer.labels.template
    const axisLabels = axisData?.labels

    // label Paddings
    if (axisLabels.padding) labelsTemplate.padding(...axisLabels.padding)
    if (validateZero(axisLabels.paddingRight))
      labelsTemplate.paddingRight = axisLabels.paddingRight
    if (validateZero(axisLabels.paddingTop))
      labelsTemplate.paddingTop = axisLabels.paddingTop
    if (validateZero(axisLabels.paddingleft))
      labelsTemplate.paddingleft = axisLabels.paddingleft
    if (validateZero(axisLabels.paddingBottom))
      labelsTemplate.paddingBottom = axisLabels.paddingBottom

    // rotate or not the label
    labelsTemplate.rotation = axisLabels.labelRotate
      ? -90
      : labelsTemplate.rotation

    // opacity of the labels
    if (validateZero(axisLabels.labelOpacity))
      labelsTemplate.fillOpacity = axisLabels.labelOpacity

    // horizontal center
    if (axisLabels.horizontalCenter)
      labelsTemplate.horizontalCenter = axisLabels.horizontalCenter
    if (axisLabels.verticalCenter)
      labelsTemplate.verticalCenter = axisLabels.verticalCenter

    // location label
    if (validateZero(axisLabels.labelsLocation))
      labelsTemplate.location = axisLabels.labelsLocation

    // position x and y
    if (validateZero(axisLabels.labelDx)) labelsTemplate.dx = axisLabels.labelDx
    if (validateZero(axisLabels.labelDy)) labelsTemplate.dy = axisLabels.labelDy

    // labels background
    if (axisLabels.backgroundFill)
      labelsTemplate.background.fill = axisLabels.backgroundFill
    if (validateZero(axisLabels.backgroundOpacity))
      labelsTemplate.background.fillOpacity = axisLabels.backgroundOpacity

    if (axisData?.labelRotate || axisData?.moveLabelsLeft) {
      Axis.renderer.labels.template.adapter.add('dx', function (dx, target) {
        return -target.maxRight / 2
      })
    }
  }
  /** *****************************************Axis Tooltip***************************************************/
  const axisTooltip = Axis.renderer.tooltip

  // Tooltip Location
  if (validateZero(axisData.tooltipLocation))
    Axis.renderer.tooltipLocation = axisData?.tooltipLocation

  // disabled tooltip
  if (axisData?.disabledTooltip)
    Axis.tooltip.disabled = axisData?.disabledTooltip

  // tooltip x and y location
  if (axisData?.tooltipDx) axisTooltip.dx = axisData?.tooltipDx
  if (axisData?.tooltipDy) axisTooltip.dy = axisData?.tooltipDy

  // tooltip background
  if (validateZero(axisData.backgroundFillOpacity))
    axisTooltip.background.fillOpacity = axisData.backgroundFillOpacity
  if (validateZero(axisData.cornerRadius))
    axisTooltip.background.cornerRadius = axisData.cornerRadius

  // tooltipLabel
  if (axisData?.labelFill) axisTooltip.label.fill = axisData.labelFill
  if (validateZero(axisData.paddingRight))
    axisTooltip.label.paddingRight = axisData.paddingRight
  if (validateZero(axisData.paddingTop))
    axisTooltip.label.paddingTop = axisData.paddingTop
  if (validateZero(axisData.paddingleft))
    axisTooltip.label.paddingleft = axisData.paddingleft
  if (validateZero(axisData.paddingBottom))
    axisTooltip.label.paddingBottom = axisData.paddingBottom

  return Axis
}
