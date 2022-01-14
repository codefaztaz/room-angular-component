import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListroomsnotComponent } from './listroomsnot.component';

xdescribe('ListroomsnotComponent', () => {
  let component: ListroomsnotComponent;
  let fixture: ComponentFixture<ListroomsnotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListroomsnotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListroomsnotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
