import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListroomsComponent } from './listrooms.component';

describe('ListroomsComponent', () => {
  let component: ListroomsComponent;
  let fixture: ComponentFixture<ListroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
