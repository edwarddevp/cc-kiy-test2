import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {getAxis} from "./getAxis";
import {validateZero} from "./validateZero";

export const createSolidGauge = (chartDivId,data,options) => {

  const chart = am4core.create(chartDivId, am4charts.RadarChart);

  const xAxis={
    type:"value",
    ...options?.xAxis
  };

  const yAxis={
    type:"category",
    ...options?.yAxis
  };

// Add data
  chart.data = data;

  //Change Color Palette by index
  if(options?.colorList) chart.colors.list = options?.colorList;

// Make chart not full circle
  chart.startAngle = validateZero(options?.startAngle) || -90;
  chart.endAngle = validateZero(options?.endAngle) || 180;
  chart.innerRadius = validateZero(options?.innerRadius)  || am4core.percent(20);

// Set number format
  chart.numberFormatter.numberFormat = options?.numberFormat || "#.#'%'";

// Create axes
  const YAxis = chart.yAxes.push(getAxis(yAxis?.type,true));
  YAxis.dataFields[yAxis?.type] = yAxis?.valueName || yAxis?.type;
  YAxis.renderer.grid.template.location = 0;
  YAxis.renderer.grid.template.strokeOpacity = yAxis?.strokeOpacity || 0;
  YAxis.renderer.labels.template.horizontalCenter = yAxis?.horizontalCenter || "right";
  YAxis.renderer.labels.template.fontWeight = yAxis?.fontWeight || 500;
  YAxis.renderer.minGridDistance = yAxis?.minGridDistance || 10;

  YAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
    return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
  });

  const XAxis = chart.xAxes.push(getAxis(xAxis?.type,true));
  XAxis.dataFields[xAxis?.type] = xAxis?.valueName || xAxis?.type ;
  XAxis.renderer.grid.template.strokeOpacity = 0;
  XAxis.min = yAxis?.min || 0;
  XAxis.max = yAxis?.max || 100;
  XAxis.strictMinMax = yAxis?.strictMinMax || true;

// Create series
  //background Serie
  const backgroundSeries = chart.series.push(new am4charts.RadarColumnSeries());
  backgroundSeries.dataFields.valueX = options?.backgroundSeries?.xAxisValueName || "full";
  backgroundSeries.dataFields.categoryY = options?.backgroundSeries?.yAxisValueName ||  yAxis?.valueName || yAxis?.type;
  backgroundSeries.clustered = options?.backgroundSeries?.clustered || false;
    backgroundSeries.columns.template.fill = options?.backgroundSeries?.fill || new am4core.InterfaceColorSet().getFor("alternativeBackground");
  backgroundSeries.columns.template.fillOpacity = options?.backgroundSeries?.fillOpacity || 0.08;
  backgroundSeries.columns.template.cornerRadiusTopLeft = options?.backgroundSeries?.cornerRadiusTopLeft || 20;
  backgroundSeries.columns.template.strokeWidth = options?.backgroundSeries?.strokeWidth || 0;
  backgroundSeries.columns.template.radarColumn.cornerRadius = options?.backgroundSeries?.cornerRadius || 20;

  //Values Serie
  const valuesSeries = chart.series.push(new am4charts.RadarColumnSeries());
  valuesSeries.dataFields.valueX = options?.series?.xAxisValueName || xAxis?.valueName || xAxis?.type;
  valuesSeries.dataFields.categoryY = options?.series?.yAxisValueName || yAxis?.valueName || yAxis?.type;
  valuesSeries.clustered = options?.series?.clustered ||  false;
  valuesSeries.columns.template.strokeWidth = options?.series?.strokeWidth ||  0;
  valuesSeries.columns.template.tooltipText = options?.series?.tooltipText ||  "{category}: [bold]{value}[/]";
  valuesSeries.columns.template.radarColumn.cornerRadius = options?.series?.cornerRadius ||  20;

    valuesSeries.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
  })

  // Add cursor
  chart.cursor = new am4charts.RadarCursor();

  if(options?.padding){
    chart.curveContainer.padding(...options?.padding);
  } else {
    chart.curveContainer.paddingTop = options?.paddingTop || 40;
    if (options?.paddingRight) chart.curveContainer.paddingRight = options?.paddingRight;
    if (options?.paddingBottom) chart.curveContainer.paddingBottom = options?.paddingBottom;
    if (options?.paddingLeft) chart.curveContainer.paddingLeft = options?.paddingLeft;
  }


  return chart

};
