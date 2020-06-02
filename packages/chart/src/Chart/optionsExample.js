import * as am4core from "@amcharts/amcharts4/core";

export const optionsExample = {
    disabledCursor:false, //disabled Cursor
    // legend:true, // it use the name and fill from each series
    //Chart Div container styles
    chartContainerStyles:{
        height:"500px"
    },
    //XYChart Options
    xyChart:{
        //habilitar o deshabilitar scroll superior
        // disabledScrollBarX:true,
        //eje vertical y
        yAxis:{
            type:"value",
            disabledTooltip:true,
            valueName:"marketing",
            name:"Category"
        },
        //eje hotizontal x
        xAxis:{
            type:"category",
            disabledTooltip:true,
            valueName:"category",
            name:"Countries"
        },
        // Serie de elementos puede ser array o un unico objeto
        // Ejemplo un unico objeto

        series:{
                type:"ColumnSeries",
                xAxisValueName:'category',
                yAxisValueName:'marketing',
                name:"Marketing",
                stacked:true,
                // disabledTooltip:true,
                // tooltipText: "{name}: [bold]{valueY}[/]",
            },
        // Ejemplo Array
        // series:[ {
        //     type:"ColumnSeries",
        //     xAxisValueName:'category',
        //     yAxisValueName:'marketing',
        //     name:"Marketing",
        //     stacked:true,
        //     tooltipText: "{name}: [bold]{valueY}[/]",
        //     fill:am4core.color("#999"),
        //     strokeWidth: 0
        // }, {
        //     type:"ConeSeries",
        //     xAxisValueName:'category',
        //     yAxisValueName:'sales',
        //     name:"Sales",
        //     stacked:true,
        //     tooltipText: "{name}: [bold]{valueY}[/]",
        //     fill:am4core.color("#555"),
        //     strokeWidth: 0
        // }, {
        //     type:"LineSeries",
        //     xAxisValueName:'category',
        //     yAxisValueName:'value',
        //     name:"Research",
        //     stacked:true,
        //     tooltipText: "{name}: [bold]{valueY}[/]",
        //     fill:am4core.color("#111"),
        //     stroke:am4core.color("#222"),
        //     strokeWidth: 1
        // },],
    },
    //PieChart Options
    pieChart:{
         radiusInside:60,
        type:"PieChart3D",
        series:{
            type:"PieSeries",
            value:'value',
            category:'category',
            name:'Value',
            scale:1.2,
            disabledTick:true,
            disabledLabel:true,
        },
        // series:[{
        //     type:"PieSeries3D",
        //     value:'value',
        //     category:'category',
        //     name:'Value',
        //     scale:0.9,
        //     disabledTick:true,
        //     disabledLabel:true,
        // },{
        //     type:"PieSeries3D",
        //     value:'marketing',
        //     category:'category',
        //     name:'Marketing',
        //     scale:1,
        //     disabledTick:true,
        //     disabledLabel:true,
        // },,{
        //     type:"PieSeries3D",
        //     value:'sales',
        //     category:'category',
        //     name:'Sales',
        //     scale:1.1,
        //     // disabledTick:true,
        //     // disabledLabel:true,
        // }]
    },
    //TimeLineChart Options
    timeLineChart:{
        xAxis:{
            type:"category",
            disabledTooltip:true,
            valueName:"category",
            rendererPoints:[
                { x: 0, y: 0 },
                { x: 100, y: 0 },
                { x: 500, y: -100 },
                { x: 700, y: -120 },
                { x: 800, y: -60 },
                { x: 900, y: 0 }
            ],
            tensionX:0.8,
            tensionY:1,
        },
        series:{
            // type:"CurveLineSeries"
            // bullet:{
            //     // radius,
            //     // fill,
            //     // strokeColor,
            //     // width
            // }
        },
        // series:[{
        //     type:"CurveLineSeries",
        //     name:"Curva 2"
        // },{
        //     name:"curva 1"
        // }],
    }
}