import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
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
      .get(
        "http://172.28.141.23:8282/api/v1/all/" +
          this.select +
          "/" +
          this.selected
      )
      .subscribe((response: any) => {
        this.response = response;
        this.loading = false;
      });
  }

  ngOnInit() {}
}
