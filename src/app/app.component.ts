import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public identity;
  public token;
  public url;


  constructor(
    public userservice: UserService

  )
  {

    this.loadUser();
    this.url = global.url;

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
}
