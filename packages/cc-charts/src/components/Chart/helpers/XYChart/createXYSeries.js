import {getXYChartSeries} from "./XYChartSeries";
import {createCircleBullet, createMovingImageBullets} from "../bullets";

import {validateZero} from './../validateZero'

export const xyChartSeriesCreateSeries = (chart,serie,xAxis,yAxis) =>{
  const xySeries = chart.series.push(getXYChartSeries(serie?.type));

  xySeries.dataFields[xAxis?.type+"X"] = serie?.xAxisValueName || xAxis?.valueName || xAxis?.type || "category";
  xySeries.dataFields[yAxis?.type+"Y"] = serie?.yAxisValueName || yAxis?.valueName  || yAxis?.type || "value";
  if(serie?.openY) xySeries.dataFields["open"+ yAxis?.type.charAt(0).toUpperCase() + yAxis?.type.slice(1)+"Y"] = serie?.openY ;
  if(serie?.openX) xySeries.dataFields["open"+ xAxis?.type.charAt(0).toUpperCase() + xAxis?.type.slice(1)+"X"] = serie?.openX ;
  xySeries.name = serie?.name;

  //color
  if(serie?.fill) xySeries.fill = serie?.fill;
  if(serie?.sequencedInterpolation) xySeries.sequencedInterpolation = serie?.sequencedInterpolation;
  if(validateZero(serie?.fillOpacity)) xySeries.fillOpacity = serie?.fillOpacity;
  if(validateZero(serie?.transitionDuration)) xySeries.defaultState.transitionDuration = serie?.transitionDuration;

  //stroke
  if(serie?.stroke) xySeries.stroke = serie?.stroke;
  if(validateZero(serie?.strokeWidth)) xySeries.strokeWidth = serie?.strokeWidth;

  //stacked
  xySeries.stacked = serie?.stacked;

  //tooltip
  if(!serie?.disabledTooltip){
    const seriesTooltip = xySeries.tooltip;

    xySeries.tooltipText = serie?.tooltipText || `{valueY.value}` ;
    if(serie?.tooltipHTML) xySeries.tooltipHTML = serie?.tooltipHTML;
    if(serie?.tooltipFill) seriesTooltip.background.fill = serie?.tooltipFill;
    if(serie?.tooltipGetFillFromObject) seriesTooltip.getFillFromObject = serie?.tooltipGetFillFromObject;
    if(serie?.tooltipGetStrokeFromObject) seriesTooltip.getStrokeFromObject = serie?.tooltipGetStrokeFromObject;
    if(validateZero(serie?.tooltipStrokeWidth)) seriesTooltip.background.strokeWidth = serie?.tooltipStrokeWidth;
    if(serie?.pointerOrientation) seriesTooltip.pointerOrientation = serie?.pointerOrientation;
    if(validateZero(serie?.tooltipDy)) seriesTooltip.dy = serie?.tooltipDy;
    if(validateZero(serie?.tooltipDx)) seriesTooltip.dx = serie?.tooltipDx;
  }
  //Only ColumnSeries settings
  if (serie?.type==="ColumnSeries" ){
    const columnsTemplate = xySeries.columns.template;

    if(validateZero(serie?.columnsWidth)) columnsTemplate.width = serie?.columnsWidth;
    if(validateZero(serie?.columnsHeight)) columnsTemplate.height = serie?.columnsHeight;
    if(validateZero(serie?.columnsMaxHeight)) columnsTemplate.maxHeight = serie?.columnsMaxHeight;
    if(validateZero(serie?.columnsMaxWidth)) columnsTemplate.maxWidth = serie?.columnsMaxWidth;
    if(serie?.columnsCornerRadius) columnsTemplate.column.cornerRadius(...serie?.columnsCornerRadius);
    if(validateZero(serie?.columnsStrokeOpacity)) columnsTemplate.strokeOpacity = serie?.columnsStrokeOpacity;

    if(serie?.columnsHeatRules) xySeries.heatRules.push({ target:  columnsTemplate, ...serie?.columnsHeatRules});

  }

  //Add bullets
  if(serie?.bullets) {
    const bulletsIsArray = Array.isArray(serie?.bullets);
    if (bulletsIsArray) {
      serie?.bullets.map(bulletData => createCircleBullet(xySeries, bulletData))
    } else {
      createCircleBullet(xySeries, serie?.bullets)
    }
  }

  xySeries.mainContainer.mask = serie?.mainContainerMask;
  if(validateZero(serie?.zIndex)) xySeries.columnsContainer.zIndex = serie?.zIndex;

  //Add Moving Bullets
  serie?.movingImageBullets && createMovingImageBullets(chart,xySeries,serie?.movingImageBullets);

  return xySeries
};
