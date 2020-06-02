import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const createPieChart = (chartDivId, data, options) => {


    const chart = options?.type === "PieChart3D" ?
        am4core.create(chartDivId, am4charts.PieChart3D) :
        am4core.create(chartDivId, am4charts.PieChart);

    // if(options?.colorList) chart.colors.list = options?.colorList;
    chart.data = data;

    const seriesIsArray = Array.isArray(options?.series);

    if(seriesIsArray){
        options?.series.map(serie => pieChartSeriesCreateSeries(chart,serie))
    }else{
        pieChartSeriesCreateSeries(chart,options?.series)
    }

    chart.innerRadius = am4core.percent(options?.radiusInside || 30);

    // Add a legend
    if(options?.legend){
      chart.legend = new am4charts.Legend();
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


const defaultPieSeries = {
  type:"PieSeries",
  value:"value",
  name:"",
  category:"category",
  circleStroke: am4core.color("#fff"),
  strokeOpacity: 1,
  strokeWidth: 2,
  disabledLabel:false,
  disabledTick:false,
  scale:1.1,
  tooltipText:"{category}: [bold]{value.percent}[/]\n{name}: [bold]{value.value}[/]"
};




const pieChartSeriesCreateSeries = (chart,serie) =>{
  const pieSeries = chart.series.push(getPieChartSeries(serie?.type));

  pieSeries.dataFields.value = serie?.value  || defaultPieSeries.value;
  pieSeries.dataFields.category = serie?.category  || defaultPieSeries.category;
  pieSeries.name = serie?.name || defaultPieSeries.name;

  pieSeries.slices.template.propertyFields.fill = "color";

  //stroke
  pieSeries.slices.template.stroke = serie?.stroke || defaultPieSeries.circleStroke;
  pieSeries.slices.template.strokeWidth = serie?.strokeWidth || defaultPieSeries.strokeWidth;
  pieSeries.slices.template.strokeOpacity = serie?.strokeOpacity || defaultPieSeries.strokeOpacity;

  //tooltip
  if(!serie?.disabledTooltip){
    pieSeries.slices.template.tooltipText = serie?.tooltipText || defaultPieSeries.tooltipText;
  }

  // Disable labels and ticks on inner circle
  pieSeries.labels.template.disabled = serie?.disabledLabel || defaultPieSeries.disabledLabel;
  pieSeries.ticks.template.disabled = serie?.disabledTick || defaultPieSeries.disabledTick;

  // Change sliding out of slices
  pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
  pieSeries.slices.template.states.getKey("hover").properties.scale = serie?.scale || defaultPieSeries.scale;

  return pieSeries
};

const getPieChartSeries = (seriesName) => {
  return seriesName === 'PieSeries3D' ?
    new am4charts.PieSeries3D() :
    new am4charts.PieSeries()

};
