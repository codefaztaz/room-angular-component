import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { AddroomComponent } from './components/admin/addroom/addroom.component';
import { ListroomsComponent } from './components/admin/listrooms/listrooms.component';
import { UpdateroomComponent } from './components/admin/updateroom/updateroom.component';
import { LessPipe } from './pipes/less.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelComponent,
    AddroomComponent,
    ListroomsComponent,
    UpdateroomComponent,
    LessPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
