import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoomAvailableComponent } from './room-available.component';

xdescribe('RoomAvailableComponent', () => {
  let component: RoomAvailableComponent;
  let fixture: ComponentFixture<RoomAvailableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
