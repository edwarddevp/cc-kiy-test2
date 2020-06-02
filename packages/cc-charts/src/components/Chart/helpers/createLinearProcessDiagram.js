import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";


export const createLinearProcessDiagram = (chartDivId,data,options) => {
      const chart = am4core.create(chartDivId, am4plugins_timeline.CurveChart);
      chart.curveContainer.padding(100, 20, 50, 20);
      chart.maskBullets = false;

      chart.dateFormatter.inputDateFormat = options?.inputDateFormat || "yyyy-MM-dd HH:mm";
      chart.dateFormatter.dateFormat = options?.dateFormat || "HH";

      chart.data = data;

      chart.fontSize = 10;
      chart.tooltipContainer.fontSize = options?.tooltipFontSize ||  10;

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.labels.template.paddingRight = 25;
      categoryAxis.renderer.minGridDistance = 10;
      categoryAxis.renderer.innerRadius = 10;
      categoryAxis.renderer.radius = 30;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());


      dateAxis.renderer.points = options?.rendererPoints || getPoints();


      dateAxis.renderer.autoScale = false;
      dateAxis.renderer.autoCenter = false;
      dateAxis.renderer.minGridDistance = 70;
      dateAxis.baseInterval = { count: 5, timeUnit: "minute" };
      dateAxis.renderer.tooltipLocation = 0;
      dateAxis.renderer.line.strokeDasharray = "1,4";
      dateAxis.renderer.line.strokeOpacity = 0.5;
      dateAxis.tooltip.background.fillOpacity = 0.2;
      dateAxis.tooltip.background.cornerRadius = 5;
      dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
      dateAxis.tooltip.label.paddingTop = 7;
      dateAxis.endLocation = 0;
      dateAxis.startLocation = -0.5;
      dateAxis.min = options?.dateAxisMin  || new Date(2019, 0, 9, 23, 55).getTime();
      dateAxis.max = options?.dateAxisMax  || new Date(2019, 0, 11, 7, 10).getTime();

      const labelTemplate = dateAxis.renderer.labels.template;
      labelTemplate.verticalCenter = "middle";
      labelTemplate.fillOpacity = 0.6;
      labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor("background");
      labelTemplate.background.fillOpacity = 1;
      labelTemplate.fill = new am4core.InterfaceColorSet().getFor("text");
      labelTemplate.padding(7, 7, 7, 7);

      const series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
      series.columns.template.height = am4core.percent(30);

      series.dataFields.openDateX = "start";
      series.dataFields.dateX = "end";
      series.dataFields.categoryY = "category";
      series.baseAxis = categoryAxis;
      series.columns.template.propertyFields.fill = "color"; // get color from data
      series.columns.template.propertyFields.stroke = "color";
      series.columns.template.strokeOpacity = 0;
      series.columns.template.fillOpacity = 0.6;

      let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
      imageBullet1.background.radius = 18;
      imageBullet1.locationX = 1;
      imageBullet1.propertyFields.stroke = "color";
      imageBullet1.background.propertyFields.fill = "color";
      imageBullet1.image = new am4core.Image();
      imageBullet1.image.propertyFields.href = "icon";
      imageBullet1.image.scale = 0.7;
      imageBullet1.circle.radius = am4core.percent(100);
      imageBullet1.background.fillOpacity = 0.8;
      imageBullet1.background.strokeOpacity = 0;
      imageBullet1.dy = -2;
      imageBullet1.background.pointerBaseWidth = 10;
      imageBullet1.background.pointerLength = 10
      imageBullet1.tooltipText = "{text}";

      series.tooltip.pointerOrientation = "up";

      imageBullet1.background.adapter.add("pointerAngle", (value, target) => {
        if (target.dataItem) {
          const position = dateAxis.valueToPosition(target.dataItem.openDateX.getTime());
          return dateAxis.renderer.positionToAngle(position);
        }
        return value;
      });

      const hs = imageBullet1.states.create("hover");
      hs.properties.scale = 1.3;
      hs.properties.opacity = 1;

      const textBullet = series.bullets.push(new am4charts.LabelBullet());
      textBullet.label.propertyFields.text = "text";
      textBullet.disabled = true;
      textBullet.propertyFields.disabled = "textDisabled";
      textBullet.label.strokeOpacity = 0;
      textBullet.locationX = 1;
      textBullet.dy = - 100;
      textBullet.label.textAlign = "middle";

      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.align = options?.scrollbar?.align || "center";
      chart.scrollbarX.width =  options?.scrollbar?.width || am4core.percent(75);
      chart.scrollbarX.parent = options?.scrollbar?.position === 'left'
        ? chart.leftAxesContainer :  options?.scrollbar?.position === 'right'
          ? chart.rightAxesContainer:chart.curveContainer;
      chart.scrollbarX.height =  options?.scrollbar?.height || 300;
      chart.scrollbarX.orientation = options?.scrollbar?.orientation || "vertical";
      chart.scrollbarX.x = options?.scrollbar?.positionX || 128;
      chart.scrollbarX.y = options?.scrollbar?.positionY ||-140;
      chart.scrollbarX.isMeasured = false;
      chart.scrollbarX.opacity = options?.scrollbar?.opacity || 0.5;

      const cursor = new am4plugins_timeline.CurveCursor();
      chart.cursor = cursor;
      cursor.xAxis = dateAxis;
      cursor.yAxis = categoryAxis;
      cursor.lineY.disabled = true;
      cursor.lineX.disabled = true;

      dateAxis.renderer.tooltipLocation2 = 0;
      categoryAxis.cursorTooltipEnabled = false;

      chart.zoomOutButton.disabled = options?.isDisabledZoomOutButton;

      let previousBullet;

      chart.events.on("inited", function() {
        setTimeout(function() {
          hoverItem(series.dataItems.getIndex(0));
        }, 2000)
      })

      function hoverItem(dataItem) {
        const bullet = dataItem.bullets.getKey(imageBullet1.uid);
        let index = dataItem.index;

        if (index >= series.dataItems.length - 1) {
          index = -1;
        }

        if (bullet) {

          if (previousBullet) {
            previousBullet.isHover = false;
          }

          bullet.isHover = true;

          previousBullet = bullet;
        }
        setTimeout(
          function() {
            hoverItem(series.dataItems.getIndex(index + 1))
          }, 1000);
      }

  // Add a legend
  if(options?.legend){
    chart.legend = new am4charts.Legend();
  }

  return chart

};

const getPoints = () => {

  const points = [{ x: -1300, y: 200 }, { x: 0, y: 200 }];

  const w = 400;
  const h = 400;
  const levelCount = 4;

  const radius = am4core.math.min(w / (levelCount - 1) / 2, h / 2);
  const startX = radius;

  for (let i = 0; i < 25; i++) {
    const angle = i / 25 * 90;
    const centerPoint = { y: 200 - radius, x: 0 };
    points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
  }


  for (let i = 0; i < levelCount; i++) {

    if (i % 2 !== 0) {
      points.push({ y: -h / 2 + radius, x: startX + w / (levelCount - 1) * i });
      points.push({ y: h / 2 - radius, x: startX + w / (levelCount - 1) * i });

      const centerPoint = { y: h / 2 - radius, x: startX + w / (levelCount - 1) * (i + 0.5) };
      if (i < levelCount - 1) {
        for (let k = 0; k < 50; k++) {
          const angle = -90 + k / 50 * 180;
          points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
        }
      }

      if (i === levelCount - 1) {
        points.pop();
        points.push({ y: -radius, x: startX + w / (levelCount - 1) * i });
        const centerPoint = { y: -radius, x: startX + w / (levelCount - 1) * (i + 0.5) };
        for (let k = 0; k < 25; k++) {
          const angle = -90 + k / 25 * 90;
          points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
        }
        points.push({ y: 0, x: 1300 });
      }

    }
    else {
      points.push({ y: h / 2 - radius, x: startX + w / (levelCount - 1) * i });
      points.push({ y: -h / 2 + radius, x: startX + w / (levelCount - 1) * i });
      const centerPoint = { y: -h / 2 + radius, x: startX + w / (levelCount - 1) * (i + 0.5) };
      if (i < levelCount - 1) {
        for (let k = 0; k < 50; k++) {
          const angle = -90 - k / 50 * 180;
          points.push({ y: centerPoint.y + radius * am4core.math.cos(angle), x: centerPoint.x + radius * am4core.math.sin(angle) });
        }
      }
    }
  }

  return points;
}
