import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoomUnavailableComponent } from './room-unavailable.component';

xdescribe('RoomUnavailableComponent', () => {
  let component: RoomUnavailableComponent;
  let fixture: ComponentFixture<RoomUnavailableComponent>;

  beforeEach(waitForAsync(() => {
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
