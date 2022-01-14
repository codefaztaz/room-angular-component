import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from '../../../components/home/home.component';
import { PanelComponent } from '../../../components/panel/panel.component';

import { AddroomComponent } from '../../../components/admin/addroom/addroom.component';
import { UpdateroomComponent } from '../../../components/admin/updateroom/updateroom.component';
import { RoomComponent } from '../../../components/room/room.component';
import { By } from '@angular/platform-browser';
import { ListroomsComponent } from './listrooms.component';
import { RouterModule, Routes } from '@angular/router'; 

xdescribe('ListroomsComponent', () => {

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'admin/listrooms', component: ListroomsComponent },
  { path: 'admin/listrooms/:page', component: ListroomsComponent },
  { path: 'admin/addroom', component: AddroomComponent },
  { path: 'admin/updateroom/:id', component: UpdateroomComponent },
  { path: 'room/:id', component: RoomComponent },
];
  let component: ListroomsComponent;
  let fixture: ComponentFixture<ListroomsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListroomsComponent ],
      imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),HttpClientTestingModule]
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
