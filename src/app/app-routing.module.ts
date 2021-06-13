import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { ListroomsComponent } from './components/admin/listrooms/listrooms.component';
import { ListroomsnotComponent } from './components/admin/listroomsnot/listroomsnot.component';
import { AddroomComponent } from './components/admin/addroom/addroom.component';
import { UpdateroomComponent } from './components/admin/updateroom/updateroom.component';
import { RoomComponent } from './components/room/room.component';
import { RoomUnavailableComponent } from './components/room-unavailable/room-unavailable.component';
import { RoomAvailableComponent } from './components/room-available/room-available.component';


// Services
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'panel', canActivate: [NoIdentityGuard], component: PanelComponent },
  { path: 'admin/listrooms', canActivate: [UserGuard], component: ListroomsComponent },
  { path: 'admin/listrooms/:page',canActivate: [UserGuard], component: ListroomsComponent },
  { path: 'admin/listroomsnot',canActivate: [UserGuard], component: ListroomsnotComponent },
  { path: 'admin/listroomsnot/:page', canActivate: [UserGuard],component: ListroomsnotComponent },
  { path: 'admin/addroom', canActivate: [UserGuard],component: AddroomComponent },
  { path: 'admin/updateroom/:id',canActivate: [UserGuard], component: UpdateroomComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'room-unavailable/:id', component: RoomUnavailableComponent },
  { path: 'room-available/:id', component: RoomAvailableComponent },
  { path: 'logout/:sure', component: PanelComponent },
  { path: 'login', component: PanelComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
