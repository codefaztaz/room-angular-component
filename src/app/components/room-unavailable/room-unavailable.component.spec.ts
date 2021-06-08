import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUnavailableComponent } from './room-unavailable.component';

describe('RoomUnavailableComponent', () => {
  let component: RoomUnavailableComponent;
  let fixture: ComponentFixture<RoomUnavailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomUnavailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
