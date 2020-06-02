import * as am4charts from "@amcharts/amcharts4/charts";
/* axisName possible values
* category
* date
* value
* duration
 */

export const getAxis = (axisName,disabledDuration) => {
    return axisName === 'category' ?
        new am4charts.CategoryAxis() :
        axisName === 'date'?
            new am4charts.DateAxis() :
            axisName === 'duration' && !disabledDuration?
                new am4charts.DurationAxis() :
                new am4charts.ValueAxis()
};
