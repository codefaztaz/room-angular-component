import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListroomsnotComponent } from './listroomsnot.component';

describe('ListroomsnotComponent', () => {
  let component: ListroomsnotComponent;
  let fixture: ComponentFixture<ListroomsnotComponent>;

  beforeEach(async(() => {
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
