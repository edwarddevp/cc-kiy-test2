
export const createAxisRange = (axisRange,XAxis,YAxis) => {
  const axis = axisRange?.axisLocation === "YAxis"? YAxis : XAxis;
  const range = axis.axisRanges.create();
  range[axis?.axisFieldName] = axisRange?.startValue;
  if(axisRange?.endValue) range['end'+ axis?.axisFieldName.charAt(0).toUpperCase() + axis?.axisFieldName.slice(1)] = axisRange?.endValue;
  if(axisRange?.fill) range.axisFill.fill = axisRange?.fill;
  range.axisFill.fillOpacity = axisRange?.fillOpacity || 0.2;
  range.grid.stroke = axisRange?.stroke;
  range.grid.strokeDasharray = axisRange?.strokeDasharray;
  range.grid.strokeOpacity = axisRange?.strokeOpacity || 0.2;

  range.label.text = axisRange?.text;
  range.label.inside = !axisRange?.disabledInside;
  range.label.rotation = axisRange?.rotate ? 90 : 0;
  range.label.horizontalCenter = axisRange?.horizontalCenter || "right";
  range.label.verticalCenter = axisRange?.verticalCenter || "bottom";
};
