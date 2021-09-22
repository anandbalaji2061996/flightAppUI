import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAirlineComponent } from './view-airline.component';

describe('ViewAirlineComponent', () => {
  let component: ViewAirlineComponent;
  let fixture: ComponentFixture<ViewAirlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAirlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
