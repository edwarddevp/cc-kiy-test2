import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {validateZero} from './validateZero'

export const createCircleBullet = (series, bulletData) => {
  const bullet = series.bullets.create(am4charts.CircleBullet);
  if(validateZero(bulletData?.radius)) bullet.circle.radius = bulletData?.radius;
  if(validateZero(bulletData?.locationY)) bullet.locationY = bulletData?.locationY ;
  if(validateZero(bulletData?.locationX)) bullet.locationX = bulletData?.locationX ;
  if(validateZero(bulletData?.horizontalCenter)) bullet.horizontalCenter = bulletData?.horizontalCenter;
  if(validateZero(bulletData?.verticalCenter)) bullet.verticalCenter = bulletData?.verticalCenter;
  if(validateZero(bulletData?.fill)) bullet.fill = bulletData?.fill;
  if(validateZero(bulletData?.propertyFill)) bullet.propertyFields.fill = bulletData?.propertyFill;
  if(validateZero(bulletData?.fillOpacity)) bullet.circle.fillOpacity = bulletData?.fillOpacity;
  if(validateZero(bulletData?.stroke)) bullet.stroke = bulletData?.stroke;
  if(validateZero(bulletData?.strokeWidth)) bullet.strokeWidth = bulletData?.strokeWidth;
  if(validateZero(bulletData?.strokeOpacity)) bullet.circle.strokeOpacity = bulletData?.strokeOpacity;
  if(validateZero(bulletData?.tooltipText)) bullet.tooltipText = bulletData?.tooltipText;
};

export const createMovingImageBullets = (chart,series,type) =>{
  const isVertical = type === "vertical";
  const bullet = series.columns.template.createChild(am4charts.CircleBullet);
  bullet.circle.radius = 30;
  bullet.valign = isVertical? "bottom" :"middle";
  bullet.align =  isVertical? "center" :"left";
  bullet.isMeasured = true;
  bullet.interactionsEnabled = false;
  bullet.interactionsEnabled = false;

  if(isVertical){
    bullet.verticalCenter = "bottom";
  }else{
    bullet.horizontalCenter = "right";
  }

  const hoverState = bullet.states.create("hover");
  const outlineCircle = bullet.createChild(am4core.Circle);
  outlineCircle.adapter.add("radius", function (radius, target) {
    const circleBullet = target.parent;
    return circleBullet.circle.pixelRadius + 10;
  });

  const image = bullet.createChild(am4core.Image);
  image.width = 60;
  image.height = 60;
  image.horizontalCenter = "middle";
  image.verticalCenter = "middle";
  image.propertyFields.href = "href";

  image.adapter.add("mask", function (mask, target) {
    const circleBullet = target.parent;
    return circleBullet.circle;
  });

  let previousBullet;
  chart.cursor.events.on("cursorpositionchanged", function (event) {
    const dataItem = series.tooltipDataItem;

    if (dataItem.column) {
      const bullet = dataItem.column.children.getIndex(1);

      if (previousBullet && previousBullet != bullet) {
        previousBullet.isHover = false;
      }

      if (previousBullet != bullet) {

        const hs = bullet.states.getKey("hover");
        if(isVertical){
          hs.properties.dy = -bullet.parent.pixelHeight + 30;
        }else{
          hs.properties.dx = dataItem.column.pixelWidth;
        }
        bullet.isHover = true;

        previousBullet = bullet;
      }
    }
  })
};
