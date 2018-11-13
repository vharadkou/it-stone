import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnButtonComponent } from './turn-button.component';

describe('TurnButtonComponent', () => {
  let component: TurnButtonComponent;
  let fixture: ComponentFixture<TurnButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
