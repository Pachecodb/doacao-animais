import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecieListComponent } from './especie-list.component';

describe('EspecieComponent', () => {
  let component: EspecieListComponent;
  let fixture: ComponentFixture<EspecieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
