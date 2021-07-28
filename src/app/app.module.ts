import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { ChartsModule } from "ng2-charts";

import { TabsComponent } from "./tabs/tabs.component";
import { TabComponent } from "./tabs/tab.component";
import { AppComponent } from "./app.component";
import { EmployeeComponent } from "./employee/employee.component";
import { GroupComponent } from "./group/group.component";
import { OfficeComponent } from "./office/office.component";
import { BranchesComponent } from "./branches/branches.component";

import { ExcelService } from "./excel.service";

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    EmployeeComponent,
    GroupComponent,
    OfficeComponent,
    BranchesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    DateRangePickerModule,
    ChartsModule,
  ],
  providers: [DatePipe, ExcelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
