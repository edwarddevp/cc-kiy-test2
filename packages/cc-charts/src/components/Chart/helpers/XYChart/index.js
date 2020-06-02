import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {createAxis} from "../createAxis";
import {xyChartSeriesCreateSeries} from "./createXYSeries";
import {createAxisBreak} from "./createAxisBreak";
import {createAxisRange} from "./createAxisRange";
import {createCursor} from "./createCursor";


export const createXYChart = (chartDivId,data,options) => {
  const xAxis={
    type:"category",
    disabledTooltip:true,
    gridStrokeOpacity:0.2,
    ...options?.xAxis
  };

  const yAxis={
    type:"value",
    disabledTooltip:true,
    gridStrokeOpacity:0.2,
    ...options?.yAxis
  };

  const seriesIsArray = Array.isArray(options?.series);

  const chart =  am4core.create(chartDivId, am4charts.XYChart);
  if(options?.inputDateFormat) chart.dateFormatter.inputDateFormat = options?.inputDateFormat;
  chart.hiddenState.properties.opacity = 0;
  chart.data = data;

  //X Axis
  let XAxis = createAxis(chart,xAxis,"XAxis");

  //Y Axis
  let YAxis = createAxis(chart,yAxis,"YAxis");

  //ScrollbarX
  let scrollbarX = new am4charts.XYChartScrollbar();

  // add Cursor
  if(!options?.disabledCursor) createCursor(chart,XAxis,YAxis,options?.cursor);

  //Series
  if(seriesIsArray){
    options?.series.map(serie => {
      let series = xyChartSeriesCreateSeries(chart,serie,xAxis,yAxis);
      scrollbarX.series.push(series);
    })

  }else{
    let series = xyChartSeriesCreateSeries(chart,options?.series,xAxis,yAxis);
    scrollbarX.series.push(series);
  }

  //Add XYChartScrollbar
  if( !options?.disabledScrollBarXYChart){
    chart.scrollbarX = scrollbarX;
  }

  // scrollbarX
  if(options?.enableScrollbarX) chart.scrollbarX = new am4core.Scrollbar();

  //scrollbarY
  if(options?.enableScrollbarY) chart.scrollbarY = new am4core.Scrollbar();

  //Axis Break
  if(options?.axisBreak){
    const axisBreakIsArray = Array.isArray(options?.axisBreak);
    if(axisBreakIsArray){
      options?.axisBreak.map(axisBreak => createAxisBreak(axisBreak,XAxis,YAxis))
    }else{
      createAxisBreak(options?.axisBreak,XAxis,YAxis)
    }
  }

  // add an axis ranges
  if(options?.axisRange){
    const axisRangeIsArray = Array.isArray(options?.axisRange);
    if(axisRangeIsArray){
      options?.axisRange.map(axisRange => createAxisRange(axisRange,XAxis,YAxis))
    }else{
      createAxisRange(options?.axisRange,XAxis,YAxis)
    }
  }

  // Add a legend
  if(options?.legend){
    chart.legend = new am4charts.Legend();
    chart.legend.position = options?.legend?.position;
  }

  if(options?.padding){
    chart.padding(...options?.padding);
  } else {
    if (options?.paddingTop) chart.paddingTop = options?.paddingTop;
    if (options?.paddingRight) chart.paddingRight = options?.paddingRight;
    if (options?.paddingBottom) chart.paddingBottom = options?.paddingBottom;
    if (options?.paddingLeft) chart.paddingLeft = options?.paddingLeft;
  }

  return chart

};










