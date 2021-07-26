//our root app component
import { Component, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";

import { TabsComponent } from "./tabs/tabs.component";

@Component({
  selector: "my-app",
  templateUrl: "./app.components.html",
  styleUrls: ["./app.components.css"],
})
export class AppComponent {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
}
