import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Room } from '../../models/room';
import { TranslateService } from '@ngx-translate/core';

import { global } from '../../services/global';
import { globalroom } from '../../services/globalroom';

import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { LanguageService } from '../../services/language.service';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public identity;
  public token;
  public rooms: Room[];
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;
  public url: string;
  public bookId;
  public room: Room;
  public _id;
  public takeId;
  public id;
  public  translateEn:boolean = true;
  public language:string;




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService,
    private roomservice: RoomService,
    public translate: TranslateService,
    public languageservice: LanguageService
  ) {
     this.url = globalroom.url;
     this.room = new Room('','','','','', '', '','','','','', '','','','','', 1,1,  '', '','', 1,1, '', '','','', '', '', '','','' );
     this.loadUser();
     this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');



}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let page:number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 1;
      }

      this.getRooms(page);

  this.switchLang(this.language);

    });




  }


  ngAfterViewInit(): void {


  }



 getId(id)
 {
   // recoger id del libro
   this.bookId = id ;

   console.log(id);

 }

  loadUser()
  {

    this.identity = this.userservice.getIdentity();
  //  console.log(this.identity);
    this.token = this.userservice.getToken();
  }

  getRooms(page = 1)
  {
      //  console.log('error');
    this.roomservice.getRooms(page).subscribe(
      response =>
      {

        if(response.rooms)
        {
          this.rooms = response.rooms;


          // navegacion de paginación
          this.totalPages = response.totalPages;
          console.log(this.totalPages);

          var number_pages = [];
          for(var i = 1; i <= this.totalPages; i++)
          {
            number_pages.push(i);
          }
          this.number_pages = number_pages;

          if(page >=2)
          {
            this.prev_page = page-1;
          }
          else
          {
            this.prev_page = 1;
          }
          if(page < this.totalPages)
          {
            this.next_page = page+1;
            console.log(page);
          }
          else
          {
            this.next_page = this.totalPages;
          }

        }
        else
        {
         this.router.navigate(['home']);
         console.log('error');
        }
      },
      error =>
      {
        console.log(error);
      }
    );
  }



  getRoomsEs(page = 1)
  {
      //  console.log('error');
    this.roomservice.getRoomsEs(page).subscribe(
      response =>
      {

        if(response.rooms)
        {
          this.rooms = response.rooms;


          // navegacion de paginación
          this.totalPages = response.totalPages;
          console.log(this.totalPages);

          var number_pages = [];
          for(var i = 1; i <= this.totalPages; i++)
          {
            number_pages.push(i);
          }
          this.number_pages = number_pages;

          if(page >=2)
          {
            this.prev_page = page-1;
          }
          else
          {
            this.prev_page = 1;
          }
          if(page < this.totalPages)
          {
            this.next_page = page+1;
            console.log(page);
          }
          else
          {
            this.next_page = this.totalPages;
          }

        }
        else
        {
         this.router.navigate(['home']);
         console.log('error');
        }
      },
      error =>
      {
        console.log(error);
      }
    );
  }

  // switchLang(language: string) {
  //   console.log('valor language',this.language);
  //   this.idioma = this.translate.use(language);
  //   console.log('this.idioma',this.idioma);
  //   //this.translateEn = language === 'en';
  //  // this.translate.currentLang;
  //   if(language == 'en')
  //   {
  //     this.translate.use(language);
  //   }
  //   console.log('current2' ,this.translate.currentLang);

  // }


  switchLang(language: string)
  {


    this.translate.use(language);
    console.log('valor language',this.language);

    //this.translateEn = language === 'en';
    this.translate.currentLang;
    console.log('this.translate.currentlang', this.translate.currentLang);
    if(this.translate.use('en'))
    {
      this.translateEn = true;
    }
    else if(this.translate.use('es'))
    {
      this.translateEn = false;

    }
  }




  // crear metodo que observe el cambio de idioma y hacer un console log de momento







}
