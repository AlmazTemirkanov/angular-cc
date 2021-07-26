/**
 * The main component that renders single TabComponent
 * instances.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
} from "@angular/core";

import { TabComponent } from "./tab.component";
// import { DynamicTabsDirective } from './dynamic-tabs.directive';

@Component({
  selector: "my-tabs",
  template: `
    <ul class="nav nav-tabs  mt-5">
      <li
        class="nav-link"
        aria-current="page"
        *ngFor="let tab of tabs"
        (click)="selectTab(tab)"
        [class.active]="tab.active"
      >
        <a href="#">{{ tab.title }}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styleUrls: ["./tabs.components.css"],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: any) {
    // deactivate all tabs
    this.tabs.toArray().forEach((tab) => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }
}
