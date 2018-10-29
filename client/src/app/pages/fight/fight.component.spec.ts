import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightPageComponent } from './fight.component';

describe('FightComponent', () => {
  let component: FightPageComponent;
  let fixture: ComponentFixture<FightPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
