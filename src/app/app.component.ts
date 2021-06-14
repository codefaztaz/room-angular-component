import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public identity;
  public token;
  public url;
  public title : String = "room app";


  constructor(
    public userservice: UserService,
    public translate: TranslateService

  )
  {

    this.loadUser();
    this.url = global.url;
    this.title;
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');


  }

test()
{

}
  ngOnInit()
  {
    console.log('webapp cargada correctamente');
    //console.log(this.identity);
  //  console.log(this.token);
//    console.log(this.token);
  }

  ngDoCheck()
  {
    this.loadUser();
  }

  loadUser()
  {

    this.identity = this.userservice.getIdentity();
  //  console.log(this.identity);
    this.token = this.userservice.getToken();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
