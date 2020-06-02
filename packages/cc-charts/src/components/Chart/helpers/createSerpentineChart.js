import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import {createCircleBullet} from "./bullets";
import {createAxis} from "./createAxis";
import {validateZero} from "./validateZero";

export const createSerpentineChart = (chartDivId,data,options) => {

  const chart = am4core.create(chartDivId, am4plugins_timeline.SerpentineChart);

  const chartOrientation = options?.orientation || "vertical"

  chart.orientation = chartOrientation;
  chart.levelCount = options?.levelCount || 3;

  chart.yAxisRadius = options?.yAxisRadius || am4core.percent(20);
  chart.yAxisInnerRadius = options?.yAxisInnerRadius || am4core.percent(2);
  chart.maskBullets = false;

  chart.dateFormatter.inputDateFormat = options?.inputDateFormat || "yyyy-MM-dd HH:mm";
  chart.dateFormatter.dateFormat =   options?.dateFormat || "HH";

  chart.data = data;

  chart.fontSize = options?.chartFontSize ||  13;
  chart.tooltipContainer.fontSize = options?.tooltipFontSize || 10;


  //Create Y axis
  const defaultYAxis = {
    type:'category',
    minGridDistance:10,
    innerRadius: -60,
    radius: 60,
    gridTemplateDisabled: true,
    labels:{
      paddingRight:25,
      horizontalCenter: chartOrientation === 'vertical'? 'right':"left"
    },
    ...options?.xAxis
  };

  const YAxis = createAxis(chart,defaultYAxis,"YAxis");

  YAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
    const position = XAxis.valueToPosition(XAxis.min);
    const angle = chartOrientation === 'vertical'? -90 : 90
    return XAxis.renderer.positionToAngle(position) + angle;
  });


  //Create X axis
  const defaultXAxis = {
    type:'date',
    minGridDistance:70,
    baseInterval: { count: 30, timeUnit: "minute" },
    tooltipLocation:0,
    gridTemplateDisabled: true,
    startLocation: -0.5,
    LineStrokeDasharray: '1,4',
    lineStrokeOpacity: 0.7,
    backgroundFillOpacity:0.2,
    cornerRadius:5,
    paddingTop:7,
    labelFill:new am4core.InterfaceColorSet().getFor("alternativeBackground"),
    labels:{
      verticalCenter:"middle",
      labelOpacity: 0.7,
      backgroundFill:  new am4core.InterfaceColorSet().getFor("background"),
      backgroundOpacity: 1,
      padding:[7,7,7,7],
    },
    ...options?.yAxis
  };

  const XAxis = createAxis(chart,defaultXAxis,"XAxis");

  const series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
  series.columns.template.height = am4core.percent(options?.series?.columnsHeight || 20);
  series.columns.template.tooltipText =  options?.series?.tooltipText;

  series.dataFields.openDateX = options?.series?.openDateX || "start";
  series.dataFields.dateX = options?.series?.dateX || "end";
  series.dataFields.categoryY = options?.series?.categoryY || "category";
  series.columns.template.propertyFields.fill = options?.series?.propertyFill || "color"; // get color from data
  series.columns.template.propertyFields.stroke = options?.series?.propertyStroke || "color";// get stroke from data
  series.columns.template.strokeOpacity = options?.series?.strokeOpacity ||  0;

  //Create Bullet
  if(options?.bulletType !== 'circle'){
    const imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
    imageBullet1.locationX = options?.bullet?.locationX || 1;
    imageBullet1.propertyFields.stroke = options?.bullet?.propertyStroke || "color";
    imageBullet1.background.propertyFields.fill = options?.bullet?.propertyFill || "color";
    imageBullet1.background.propertyFields.tooltipColorSource = options?.bullet?.propertyTooltipColorSource|| "color";
    imageBullet1.image = new am4core.Image();
    imageBullet1.image.propertyFields.href = options?.bullet?.propertyHref || "icon";
    imageBullet1.image.scale = 0.5;
    imageBullet1.circle.radius = am4core.percent(100);
    imageBullet1.dy = -5;
    imageBullet1.tooltipText = options?.bullet?.tooltipText;
  }else{
      const defaultBulletData = {
      radius:10,
      strokeOpacity:0,
      propertyFill:"color",
    };
    const defaultBulletData1 = {
      locationX:0,
      ...defaultBulletData,
      ...options?.bullet
    }
    createCircleBullet(series,defaultBulletData1);
    const defaultBulletData2 = {
      locationX:1,
      ...defaultBulletData,
      ...options?.bullet
    }
    createCircleBullet(series,defaultBulletData2);
  }



  const textBullet = series.bullets.push(new am4charts.LabelBullet());
  textBullet.label.propertyFields.text = "text";
  textBullet.disabled = true;
  textBullet.propertyFields.disabled = "textDisabled";
  textBullet.label.strokeOpacity = 0;
  textBullet.locationX = 1;
  textBullet.dy = options?.bulletType === 'circle'? -50 : -100;
  textBullet.label.textAlign = "middle";

  // scrollbarX
  if(options?.enableScrollbarX) {
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center";
    chart.scrollbarX.width = am4core.percent(75);
    chart.scrollbarX.opacity = 0.5;
  }


  const cursor = new am4plugins_timeline.CurveCursor();
  chart.cursor = cursor;
  cursor.xAxis = XAxis;
  cursor.yAxis = YAxis;
  cursor.lineY.disabled = true;
  cursor.lineX.strokeDasharray = "1,4";
  cursor.lineX.strokeOpacity = 1;

  XAxis.renderer.tooltipLocation2 = 0;
  YAxis.cursorTooltipEnabled = false;


  const label = chart.createChild(am4core.Label);
  label.text = options?.chartTitle;
  label.isMeasured = false;
  label.y = am4core.percent(validateZero(options?.chartTitleYposition)  || 40);
  label.x = am4core.percent(validateZero(options?.chartTitleXposition)  || 50);
  label.horizontalCenter = "top";
  label.fontSize =options?.chartTitleFontSize || 20;

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
