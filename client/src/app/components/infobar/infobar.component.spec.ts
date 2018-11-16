import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobarComponent } from './infobar.component';

describe('InfobarComponent', () => {
  let component: InfobarComponent;
  let fixture: ComponentFixture<InfobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
