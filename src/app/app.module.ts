import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//guards
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard'; 

//services
import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';
import { LanguageService } from './services/language.service';
import { ComponentCanDeactivate } from './services/componentcandeactivate.guard';

//components
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { RoomUnavailableComponent } from './components/room-unavailable/room-unavailable.component';
import { RoomAvailableComponent } from './components/room-available/room-available.component';


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
    HeaderComponent,
    RoomUnavailableComponent,
    RoomAvailableComponent,

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
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  
  ],
  providers: [
    UserService,
    RoomService,
    UserGuard,
    NoIdentityGuard,
    LanguageService
   
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}