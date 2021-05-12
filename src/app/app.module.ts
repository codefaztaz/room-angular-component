import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard'; 
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';
import { ComponentCanDeactivate } from './services/componentcandeactivate.guard';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { AddroomComponent } from './components/admin/addroom/addroom.component';
import { ListroomsComponent } from './components/admin/listrooms/listrooms.component';
import { ListroomsnotComponent } from './components/admin/listroomsnot/listroomsnot.component';
import { UpdateroomComponent } from './components/admin/updateroom/updateroom.component';
import { LessPipe } from './pipes/less.pipe';
import { RoomComponent } from './components/room/room.component';
import { FilterPipe } from './pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelComponent,
    AddroomComponent,
    ListroomsComponent,
    UpdateroomComponent,
    LessPipe,
    RoomComponent,
    FilterPipe,
    ListroomsnotComponent,
    SafeHtmlPipe,
    SidebarComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  
  ],
  providers: [
    UserService,
    RoomService,
    UserGuard,
    NoIdentityGuard,
   
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
