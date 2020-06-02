import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import { getAxis } from "./getAxis";


export const createTimeLineChart = (chartDivId,data,options) => {

    const xAxis={
        type:"category",
        disabledTooltip:true,
        rendererPoints:[
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 200, y: 0 },
            { x: 300, y: 0 },
            { x: 400, y: 0 }
        ],
        tensionX:1,
        tensionY:1,
        autoScale:true,
        autoCenter:true,
        ...options?.xAxis
    };

    const yAxis={
        type:"value",
        disabledTooltip:true,
        gridTemplateDisabled:true,
        radius:300,
        innerRadius:0,
        ...options?.yAxis
    };

    const chart = am4core.create(chartDivId, am4plugins_timeline.CurveChart);
    chart.data = data;

// Create category (X) axis
    let XAxis = chart.xAxes.push( getAxis(xAxis?.type));
    XAxis.dataFields[xAxis?.type] = xAxis?.valueName || xAxis?.type;
    XAxis.title.text = xAxis?.name;
    XAxis.renderer.grid.template.disabled = true;
    XAxis.renderer.minGridDistance = 30;
    XAxis.renderer.polyspline.tensionX = xAxis?.tensionX;
    XAxis.renderer.polyspline.tensionY = xAxis?.tensionY;
    XAxis.renderer.points = xAxis?.rendererPoints;
    XAxis.renderer.autoScale = xAxis?.autoScale;
    XAxis.renderer.autoCenter = xAxis?.autoCenter;

// Create value (Y) axis
    let YAxis = chart.yAxes.push(getAxis(yAxis?.type));
    YAxis.dataFields[xAxis?.type] = yAxis?.valueName || xAxis?.type;
    YAxis.title.text = yAxis?.name;
    YAxis.renderer.radius = yAxis?.radius;
    YAxis.renderer.innerRadius = yAxis?.innerRadius;
    YAxis.renderer.grid.template.disabled = yAxis?.gridTemplateDisabled;


// Create series
    const seriesIsArray = Array.isArray(options?.series);

    if(seriesIsArray){
        options?.series.map(serie => timeLineChartCreateSeries(chart,serie,xAxis,yAxis))
    }else{
        timeLineChartCreateSeries(chart,options?.series,xAxis,yAxis)
    }

// Add some white space around the chart
  if(options?.padding){
    chart.curveContainer.padding(...options?.padding);
  } else {
    chart.curveContainer.paddingTop = options?.paddingTop || 20;
    chart.curveContainer.paddingRight = options?.paddingRight || 20;
    chart.curveContainer.paddingBottom = options?.paddingBottom || 20;
    chart.curveContainer.paddingLeft = options?.paddingLeft || 20;
  }

  // Add a legend
  if(options?.legend){
    chart.legend = new am4charts.Legend();
  }

    return chart

};

const defaultTimeLineSeries = {
  name:"",
  xAxisValueName: "category",
  yAxisValueName:"value",
  fill:am4core.color("#888"),
  strokeWidth: 2,
  strokeColor: am4core.color("#fff"),
  tooltipText: `{valueY}`,
};

export const timeLineChartCreateSeries = (chart,serie,xAxis,yAxis) =>{
  let timeLineSeries = chart.series.push(getTimeLineChartSeries( serie?.type));
  timeLineSeries.dataFields[xAxis?.type+"X"] = serie?.xAxisValueName || xAxis?.valueName || xAxis?.type || defaultTimeLineSeries.xAxisValueName;
  timeLineSeries.dataFields[yAxis?.type+"Y"] = serie?.yAxisValueName || yAxis?.valueName  || yAxis?.type || defaultTimeLineSeries.yAxisValueName;
  timeLineSeries.name = serie?.name || defaultTimeLineSeries.name;

  if(serie?.type === "CurveColumnSeries"){
    timeLineSeries.columns.template.fill = serie?.fill || defaultTimeLineSeries.fill;
    timeLineSeries.columns.template.strokeWidth = serie?.strokeWidth || defaultTimeLineSeries.strokeWidth;
    timeLineSeries.columns.template.stroke = serie?.strokeColor || defaultTimeLineSeries.stroke;
  }
  if(!serie?.disabledTooltip && serie?.type === "CurveColumnSeries"){
    timeLineSeries.columns.template.tooltipText = serie?.tooltipText || defaultTimeLineSeries.tooltipText;
  }

  if(serie?.bullet || serie?.type === "CurveLineSeries"){
    let bullet = timeLineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = serie?.bullet?.radius || 10;
    bullet.circle.fill = serie?.bullet?.fill;
    bullet.circle.stroke = serie?.bullet?.strokeColor;
    bullet.circle.width = serie?.bullet?.width;
  }

  return timeLineSeries
};

export const getTimeLineChartSeries = (seriesName) => {
  return seriesName === 'CurveStepLineSeries' ?
    new am4plugins_timeline.CurveStepLineSeries() :
    seriesName === 'CurveLineSeries'?
      new am4plugins_timeline.CurveLineSeries() :
      new am4plugins_timeline.CurveColumnSeries()

};
