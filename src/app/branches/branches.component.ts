import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { isPlatformBrowser } from "@angular/common";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: "app-branches",
  templateUrl: "./branches.component.html",
  styleUrls: ["./branches.component.css"],
})
export class BranchesComponent implements OnInit {
  private chart: am4charts.XYChart;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone
  ) {}
  loading: boolean;
  response: any;
  select: any;
  range: any;
  selected: any;
  selectGroup: any;

  dataChart: any;
  public start: Date = new Date();

  public end: Date = new Date();

  valueChange(event: any) {
    this.selectGroup = event.target.value;
  }
  onChange(event: any) {
    this.range = event;
    this.loading = true;
    this.selected =
      this.datePipe.transform(this.range[0], "yyyy-MM-dd") +
      "/" +
      this.datePipe.transform(this.range[1], "yyyy-MM-dd");

    this.http
      .get("http://172.28.141.23:8282/api/v2/retail/bro/" + "/" + this.selected)
      .subscribe((response: any) => {
        this.response = response;
        this.dataChart = response.map((i) => i[0]);
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);

          let chart = am4core.create("chartdiv", am4charts.XYChart);
          chart.hiddenState.properties.opacity = 0;

          let data = [];
          response.map((i) => {
            console.log(i[2]);

            data.push({
              country: i[2],
              visits: i[0],
            });
          });
          chart.data = data;

          let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.dataFields.category = "country";
          categoryAxis.fontSize = 11;

          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.min = 0;
          valueAxis.max = 10;
          valueAxis.strictMinMax = true;

          let series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.categoryX = "country";
          series.dataFields.valueY = "visits";
          series.columns.template.tooltipText = "{valueY.value} ";
          series.columns.template.tooltipY = 0;
          series.columns.template.strokeOpacity = 0;

          // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
          series.columns.template.adapter.add("fill", function (fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
          });

          this.chart = chart;
        });
        this.loading = false;
      });
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
