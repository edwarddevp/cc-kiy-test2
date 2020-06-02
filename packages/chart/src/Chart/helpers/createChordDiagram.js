import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {createCircleBullet} from "./bullets";

export const createChordDiagram = (chartDivId, data, options) => {


  const chart = am4core.create(chartDivId, am4charts.ChordDiagram);


  chart.data = data;

  chart.dataFields.fromName = options?.fromName || 'from';
  chart.dataFields.toName = options?.toName || 'to';
  chart.dataFields.value = options?.value || 'value';
  if(options?.color) chart.dataFields.color = options?.color;
  if(options?.innerRadius) chart.innerRadius= options?.innerRadius;

  const nodeOptions = options?.node;

// make nodes draggable
  const nodeTemplate = chart.nodes.template;
  nodeTemplate.readerTitle = nodeOptions?.readerTitle || 'Click to show/hide or drag to rearrange';
  nodeTemplate.showSystemTooltip = nodeOptions?.showSystemTooltip || true;

  const nodeLink = chart.links.template;


  if(!nodeOptions?.disabledHover){
    // link template
    nodeLink.strokeOpacity = nodeOptions?.link?.strokeOpacity || 0;
    nodeLink.fillOpacity = nodeOptions?.link?.fillOpacity || 0.15;
    nodeLink.tooltipText = nodeOptions?.link?.tooltipText || "{fromName} & {toName}:{value.value}";

    const hoverState = nodeLink.states.create("hover");
    hoverState.properties.fillOpacity = nodeOptions?.link?.fillOpacityOnHover || 0.7;
    hoverState.properties.strokeOpacity = nodeOptions?.link?.strokeOpacityOnHover || 0.7;
  }

  const bulletData = {
    radius:5,
    locationX:0.5,
    fillOpacity:1,
    ...options?.movingBullet
  }

  const animateBullet = (bullet) => {
    const duration = 3000 * Math.random() + 2000;
    const animation = bullet.animate([{property: 'locationX', from: 0, to: 1}], duration)
    animation.events.on('animationended', function (event) {
      animateBullet(event.target.object);
    })
  }

  if(!options?.disableMovingBullets){
      const bullet = createCircleBullet(nodeLink, bulletData);

    // create animations
      chart.events.on('ready', function () {
        for (let i = 0; i < chart.links.length; i++) {
          const link = chart.links.getIndex(i);
          const bullet = link.bullets.getIndex(0);
          animateBullet(bullet);
        }
    })
  }

  //Add bullets
  if(options?.bullets) {
    const bulletsIsArray = Array.isArray(options?.bullets);
    if (bulletsIsArray) {
      options?.bullets.map(bulletData => createCircleBullet(nodeLink, bulletData))
    } else {
      createCircleBullet(nodeLink, options?.bullets)
    }
  }

  // data credit label
  if(options?.creditLabel){
    const creditLabel = chart.chartContainer.createChild(am4core.TextLink);
    creditLabel.text = options?.creditLabel?.text;
    creditLabel.url = options?.creditLabel?.url;
    creditLabel.y = options?.creditLabel?.y || am4core.percent(99);
    creditLabel.x = options?.creditLabel?.x || am4core.percent(99);
    creditLabel.horizontalCenter = options?.creditLabel?.horizontalCenter || "right";
    creditLabel.verticalCenter = options?.creditLabel?.verticalCenter || "bottom";
  }

  if(options?.titleImage){
    const titleImage = chart.chartContainer.createChild(am4core.Image);
    titleImage.href = options?.titleImage.href;
    titleImage.x = options?.titleImage.x || 30
    titleImage.y = options?.titleImage.y || 30;
    titleImage.width = options?.titleImage.width || 200;
    titleImage.height = options?.titleImage.height || 200;
  }

  // Add a legend
  if(options?.legend){
    chart.legend = new am4charts.Legend();
    chart.legend.position = options?.legend?.position;
  }

  return chart

};
