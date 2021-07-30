import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { ExcelService } from "../excel.service";
import { isPlatformBrowser } from "@angular/common";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: "app-office",
  templateUrl: "./office.component.html",
  styleUrls: ["./office.component.css"],
})
export class OfficeComponent implements OnInit {
  private chart: am4charts.XYChart;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private excelService: ExcelService,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone
  ) {}
  dataCsi: any;
  loading: boolean;
  response: any;
  select: any;
  range: any;
  selected: any;
  selectGroup: any;
  name:string;
  name1:string;
  public start: Date = new Date();

  public end: Date = new Date();

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.response, "ОПиО");
  }
  onChange(event: any) {
    this.range = event;
    this.loading = true;
    this.selected =
      this.datePipe.transform(this.range[0], "yyyy-MM-dd") +
      "/" +
      this.datePipe.transform(this.range[1], "yyyy-MM-dd");
try {
  this.http

      .get("http://172.28.141.23:8282/api/v1/csi/" + this.selected)
      .subscribe((response: any) => {
        this.response = response;
        
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);

          let chart = am4core.create("chartdiv", am4charts.XYChart);
          chart.hiddenState.properties.opacity = 0;

          let data = [];
          response.map((i) => {
            data.push({
              country: i[2],
              visits: i[0],
            });
          });
          chart.data = data;

          let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          // categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.dataFields.category = "country";
          categoryAxis.fontSize = 11;

          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.min = 0;
          valueAxis.max = 10;
          valueAxis.strictMinMax = true;

          let series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.categoryX = "country";
          series.dataFields.valueY = "visits";
          series.columns.template.tooltipText = "{categoryX}: {valueY.value} ";
          series.columns.template.tooltipY = 0;
          series.columns.template.strokeOpacity = 0;

          // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
          series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
          });

          this.chart = chart;
        });
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);

          // Create chart
          let chart = am4core.create("chartdiv1", am4charts.GaugeChart);
          // chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
          chart.innerRadius = am4core.percent(82);
          
          let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
          axis.min = 0;
          axis.max = 100;
          axis.strictMinMax = true;
          axis.renderer.radius = am4core.percent(80);
          axis.renderer.inside = true;
          axis.renderer.line.strokeOpacity = 1;
          axis.renderer.ticks.template.disabled = false
          axis.renderer.ticks.template.strokeOpacity = 1;
          axis.renderer.ticks.template.length = 10;
          axis.renderer.grid.template.disabled = true;
          axis.renderer.labels.template.radius = 40;
          
          /**
           * Axis for ranges
           */
          
          let colorSet = new am4core.ColorSet();
          
          let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
          axis2.min = 0;
          axis2.max = 100;
          axis2.strictMinMax = true;
          axis2.renderer.labels.template.disabled = true;
          axis2.renderer.ticks.template.disabled = true;
          axis2.renderer.grid.template.disabled = true;
          
          let range0 = axis2.axisRanges.create();
          range0.value = 0;
          range0.endValue = 50;
          range0.axisFill.fillOpacity = 1;
          range0.axisFill.fill = colorSet.getIndex(0);
          
          let range1 = axis2.axisRanges.create();
          range1.value = 50;
          range1.endValue = 100;
          range1.axisFill.fillOpacity = 1;
          range1.axisFill.fill = colorSet.getIndex(2);
          
          /**
           * Label
           */
          
          let label = chart.radarContainer.createChild(am4core.Label);
          label.isMeasured = false;
          label.fontSize = 45;
          label.x = am4core.percent(50);
          label.y = am4core.percent(100);
          label.horizontalCenter = "middle";
          label.verticalCenter = "bottom";
          label.text = "50%";
          
          
          /**
           * Hand
           */
          
          let hand = chart.hands.push(new am4charts.ClockHand());
          hand.axis = axis2;
          hand.innerRadius = am4core.percent(40);
          hand.startWidth = 10;
          hand.pin.disabled = true;
          hand.value = response[1].find((i) => i > 10  && i < 100)
          
          
          hand.events.on("propertychanged", function(ev) {
            range0.endValue = ev.target.value;
            range1.value = ev.target.value;
            label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
            axis2.invalidate();
          });

          this.name = "NPS"
        });
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);

          // Create chart
          let chart = am4core.create("chartdiv2", am4charts.GaugeChart);
          // chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
          chart.innerRadius = am4core.percent(82);
          
          let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
          axis.min = 0;
          axis.max = 10;
          axis.strictMinMax = true;
          axis.renderer.radius = am4core.percent(80);
          axis.renderer.inside = true;
          axis.renderer.line.strokeOpacity = 1;
          axis.renderer.ticks.template.disabled = false
          axis.renderer.ticks.template.strokeOpacity = 1;
          axis.renderer.ticks.template.length = 10;
          axis.renderer.grid.template.disabled = true;
          axis.renderer.labels.template.radius = 40;
          
          /**
           * Axis for ranges
           */
          
          let colorSet = new am4core.ColorSet();
          
          let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
          axis2.min = 0;
          axis2.max = 10;
          axis2.strictMinMax = true;
          axis2.renderer.labels.template.disabled = true;
          axis2.renderer.ticks.template.disabled = true;
          axis2.renderer.grid.template.disabled = true;
          
          let range0 = axis2.axisRanges.create();
          range0.value = 0;
          range0.endValue = 50;
          range0.axisFill.fillOpacity = 1;
          range0.axisFill.fill = colorSet.getIndex(0);
          
          let range1 = axis2.axisRanges.create();
          range1.value = 50;
          range1.endValue = 100;
          range1.axisFill.fillOpacity = 1;
          range1.axisFill.fill = colorSet.getIndex(2);
          
          /**
           * Label
           */
          
          let label = chart.radarContainer.createChild(am4core.Label);
          label.isMeasured = false;
          label.fontSize = 45;
          label.x = am4core.percent(50);
          label.y = am4core.percent(100);
          label.horizontalCenter = "middle";
          label.verticalCenter = "bottom";
          label.text = "50%";
          
          
          /**
           * Hand
           */
          
          let hand = chart.hands.push(new am4charts.ClockHand());
          hand.axis = axis2;
          hand.innerRadius = am4core.percent(40);
          hand.startWidth = 10;
          hand.pin.disabled = true;
          const data = response.map(i => i[0])
          this.dataCsi =data.reduce((a,b) => (a+b)) / data.length
          hand.value = this.dataCsi
         
          
          hand.events.on("propertychanged", function(ev) {
            range0.endValue = ev.target.value;
            range1.value = ev.target.value;
            label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
            axis2.invalidate();
          });

          this.name1 = "CSI"
        });
        this.loading = false;
      });
} catch (error) {
  console.log(error);
  
}
    
  }
  ngOnInit() {}
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
