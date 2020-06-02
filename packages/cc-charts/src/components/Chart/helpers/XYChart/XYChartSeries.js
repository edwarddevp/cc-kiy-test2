import * as am4charts from "@amcharts/amcharts4/charts";

export const getXYChartSeries = (seriesName) => {
  return seriesName === 'CandlestickSeries' ?
    new am4charts.CandlestickSeries() :
    seriesName === 'ColumnSeries'?
      new am4charts.ColumnSeries() :
      seriesName === 'ColumnSeries3D'?
        new am4charts.ColumnSeries3D() :
        seriesName === 'ConeSeries'?
          new am4charts.ConeSeries() :
          seriesName === 'CurvedColumnSeries'?
            new am4charts.CurvedColumnSeries() :
            seriesName === 'StepLineSeries'?
              new am4charts.StepLineSeries() :
              seriesName === 'OHLCSeries'?
                new am4charts.OHLCSeries() :
                new am4charts.LineSeries()

};
