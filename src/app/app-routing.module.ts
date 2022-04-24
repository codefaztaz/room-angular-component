import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { ListroomsComponent } from './components/admin/listrooms/listrooms.component';
import { ListroomsnotComponent } from './components/admin/listroomsnot/listroomsnot.component';
import { AddroomComponent } from './components/admin/addroom/addroom.component';
import { UpdateroomComponent } from './components/admin/updateroom/updateroom.component';
import { RoomComponent } from './components/room/room.component';

// Services
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'panel', canActivate: [NoIdentityGuard], component: PanelComponent },
  { path: 'admin/listrooms', canActivate: [UserGuard], component: ListroomsComponent },
  { path: 'admin/listrooms/:page', component: ListroomsComponent },
  { path: 'admin/listroomsnot', component: ListroomsnotComponent },
  { path: 'admin/listroomsnot/:page',component: ListroomsnotComponent },
  { path: 'admin/addroom',component: AddroomComponent },
  { path: 'admin/updateroom/:id', component: UpdateroomComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'logout/:sure', component: PanelComponent },
  { path: 'login', component: PanelComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
