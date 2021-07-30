import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-branches",
  templateUrl: "./branches.component.html",
  styleUrls: ["./branches.component.css"],
})
export class BranchesComponent implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  loading: boolean;
  searchText: any;
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
      .get("http://172.28.141.23:8282/api/v1/cc/" + this.selected)
      .subscribe((response: any) => {
        this.response = response;
        this.dataChart = response.map((i) => i[0]);

        this.loading = false;
      });
  }
  ngOnInit() {}
}
