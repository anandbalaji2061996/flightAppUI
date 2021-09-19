import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAirlineComponent } from './edit-airline.component';

describe('EditAirlineComponent', () => {
  let component: EditAirlineComponent;
  let fixture: ComponentFixture<EditAirlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAirlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
