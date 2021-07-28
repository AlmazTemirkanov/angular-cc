import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { ExcelService } from "../excel.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"],
})
export class GroupComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private excelService: ExcelService
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
    this.excelService.exportAsExcelFile(this.response, "ОПиО");
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
        "http://172.28.141.23:8282/api/v2/retail/users/" + "/" + this.selected
      )
      .subscribe((response: any) => {
        this.response = response;
        this.loading = false;
      });
  }

  ngOnInit() {}
}
