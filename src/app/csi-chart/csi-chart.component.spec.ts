import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsiChartComponent } from './csi-chart.component';

describe('CsiChartComponent', () => {
  let component: CsiChartComponent;
  let fixture: ComponentFixture<CsiChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
