import * as am4charts from "@amcharts/amcharts4/charts";

export const createCursor = (chart,XAxis,YAxis,cursorOptions) => {
  const cursor = new am4charts.XYCursor();
  chart.cursor = cursor;
  if(cursorOptions){
    if(!cursorOptions?.disabledXAxis ) cursor.xAxis = XAxis;
    if(!cursorOptions?.disabledYAxis ) cursor.yAxis = YAxis;
    if(cursorOptions?.fullWidthLineX ) cursor.fullWidthLineX = cursorOptions?.fullWidthLineX;
    if(cursorOptions?.strokeWidth ) cursor.lineX.strokeWidth = cursorOptions?.strokeWidth;
    if(cursorOptions?.fill ) cursor.lineX.fill = cursorOptions?.fill;
    if(cursorOptions?.fillOpacity ) cursor.lineX.fillOpacity = cursorOptions?.fillOpacity;

    if(cursorOptions?.disabledLineX ) cursor.lineX.disabled = cursorOptions?.disabledLineX;
    if(cursorOptions?.disabledLineY ) cursor.lineY.disabled = cursorOptions?.disabledLineY;
    if(cursorOptions?.behavior ) cursor.behavior = cursorOptions?.behavior;
  }
};
