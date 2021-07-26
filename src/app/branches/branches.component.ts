import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, Color } from "ng2-charts";

@Component({
  selector: "app-branches",
  templateUrl: "./branches.component.html",
  styleUrls: ["./branches.component.css"],
})
export class BranchesComponent implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  loading: boolean;
  response: any;
  select: any;
  range: any;
  selected: any;
  selectGroup: any;
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
        this.barChartLabels = response.map((i) => i[2]);
        this.barChartData[0].data = response.map((i) => i[0]);
        this.loading = false;
      });
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = "bar";
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {
      data: [],
      label: "CSI",
    },
  ];
  barColor: Color[] = [
    { backgroundColor: "#8ef5f5" },
    { backgroundColor: "#8eb0f5" },
  ];
  ngOnInit() {}
}
