import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { ExcelService } from "../excel.service";
import { isPlatformBrowser } from "@angular/common";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"],
})
export class GroupComponent implements OnInit {
  private chart: am4charts.XYChart;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private excelService: ExcelService,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone
  ) {}
  searchText: any;
  loading: boolean;
  response: any;
  select: any;
  range: any;
  selected: any;
  selectGroup: any;
  public start: Date = new Date();

  public end: Date = new Date();

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.response, "Колл-Центр");
  }
  onChange(event: any) {
    this.range = event;
    this.loading = true;
    this.selected =
      this.datePipe.transform(this.range[0], "yyyy-MM-dd") +
      "/" +
      this.datePipe.transform(this.range[1], "yyyy-MM-dd");

    this.http
      .get(
        "http://172.28.141.23:8282/api/v1/" + this.select + "/" + this.selected
      )
      .subscribe((response: any) => {
        this.response = response;
        this.browserOnly(() => {
          am4core.useTheme(am4themes_animated);
          // Themes end
          
          // Create chart instance
          am4core.useTheme(am4themes_animated);
          // Themes end
          
          // Create chart instance
          let chart = am4core.create("chartdiv3", am4charts.XYChart);
          
          // Add data
          // chart.data = [{
          //     "name": "John",
          //     "points": 35654,
          //     "color": chart.colors.next(),
          //     "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
          // }];
          response.map((i) => {
            chart.data.push({
              name: i[2],
              points: i[0],
              color: chart.colors.next(),
              // bullet: i[3]
            });
          });
          
          // Create axes
          let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "name";
          categoryAxis.renderer.grid.template.disabled = true;
          categoryAxis.renderer.minGridDistance = 30;
          categoryAxis.renderer.inside = true;
          categoryAxis.renderer.labels.template.fill = am4core.color("#000");
          categoryAxis.renderer.labels.template.fontSize = 8;
          
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.grid.template.strokeDasharray = "4,4";
          valueAxis.renderer.labels.template.disabled = true;
          valueAxis.min = 0;
          
          // Do not crop bullets
          // chart.maskBullets = false;
          
          // Remove padding
          chart.paddingBottom = 0;
          
          // Create series
          let series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = "points";
          series.dataFields.categoryX = "name";
          series.columns.template.propertyFields.fill = "color";
          series.columns.template.propertyFields.stroke = "color";
          series.columns.template.column.cornerRadiusTopLeft = 15;
          series.columns.template.column.cornerRadiusTopRight = 15;
          series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";
          
          // Add bullets
          // let bullet = series.bullets.push(new am4charts.Bullet());
          // let image = bullet.createChild(am4core.Image);
          // image.horizontalCenter = "middle";
          // image.verticalCenter = "bottom";
          // image.dy = 20;
          // image.y = am4core.percent(100);
          // image.propertyFields.href = "bullet";
          // image.tooltipText = series.columns.template.tooltipText;
          // image.propertyFields.fill = "color";
          // image.filters.push(new am4core.DropShadowFilter());
        });
        this.loading = false;
      });
  }
  valueChange(e) {
    try {
      this.selected =
        this.datePipe.transform(this.range[0], "yyyy-MM-dd") +
        "/" +
        this.datePipe.transform(this.range[1], "yyyy-MM-dd");

      this.http
        .get(
          "http://172.28.141.23:8282/api/v1/" +
            e.target.value +
            "/" +
            this.selected
        )
        .subscribe((response: any) => {
          this.response = response;
          this.browserOnly(() => {
            am4core.useTheme(am4themes_animated);
            
            am4core.useTheme(am4themes_animated);
            
            let chart = am4core.create("chartdiv3", am4charts.XYChart);
            
            response.map((i) => {
              chart.data.push({
                name: i[2],
                points: i[0],
                color: chart.colors.next(),
              });
            });
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.renderer.grid.template.disabled = true;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.labels.template.fill = am4core.color("#000");
            categoryAxis.renderer.labels.template.fontSize = 8;
            
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.grid.template.strokeDasharray = "4,4";
            valueAxis.renderer.labels.template.disabled = true;
            valueAxis.min = 0;
            chart.paddingBottom = 0;
            
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "points";
            series.dataFields.categoryX = "name";
            series.columns.template.propertyFields.fill = "color";
            series.columns.template.propertyFields.stroke = "color";
            series.columns.template.column.cornerRadiusTopLeft = 15;
            series.columns.template.column.cornerRadiusTopRight = 15;
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";
            
          });
        });
    } catch (error) {}
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
