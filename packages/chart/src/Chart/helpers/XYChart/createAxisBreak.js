export const createAxisBreak = (axisBreakData,XAxis,YAxis) =>{
  const axis = axisBreakData?.axisLocation === "XAxis"? XAxis : YAxis;
  const axisBreak = axis.axisBreaks.create();
  axisBreak['start'+axis?.axisFieldName.charAt(0).toUpperCase() + axis?.axisFieldName.slice(1)] = axisBreakData?.startValue;
  if(axisBreakData?.endValue) axisBreak['end'+ axis?.axisFieldName.charAt(0).toUpperCase() + axis?.axisFieldName.slice(1)] = axisBreakData?.endValue;
  axisBreak.breakSize = axisBreakData?.breakSize || 0.05 ; // 0.05 means that the break will take 5% of the total value axis height

  const hoverState = axisBreak.states.create("hover");
  hoverState.properties.breakSize = 10;
  hoverState.properties.opacity = 0.1;
  hoverState.transitionDuration = 1500;

  axisBreak.defaultState.transitionDuration = 1000;
};
