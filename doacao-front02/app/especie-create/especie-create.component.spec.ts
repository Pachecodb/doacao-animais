import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecieCreateComponent } from './especie-create.component';

describe('EspecieCreateComponent', () => {
  let component: EspecieCreateComponent;
  let fixture: ComponentFixture<EspecieCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecieCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
