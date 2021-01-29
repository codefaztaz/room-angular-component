import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { ListroomsComponent } from './components/admin/listrooms/listrooms.component';
import { AddroomComponent } from './components/admin/addroom/addroom.component';
import { UpdateroomComponent } from './components/admin/updateroom/updateroom.component';
import { RoomComponent } from './components/room/room.component';


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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
