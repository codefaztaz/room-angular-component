import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    public url: string;
    public identity;
    public token;




  constructor(
    public http: HttpClient
  )
  {
      this.url = global.url;
  }


  ngOnInit()
  {
    //let identity = JSON.parse(localStorage.getItem('identity'));
  //  console.log(this.identity);
  }
  register(useradmin): Observable<any>
  {
    let params = JSON.stringify(useradmin);
  //  let params = 'json='+json;
  //let params = 'json='+json;
  //  console.log(params);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //  return this.http.post(this.url+'saveadmin', params, {headers: headers,responseType:'text'});
    return this.http.post(this.url+'saveadmin', params, {headers: headers,responseType:'text'});
  

  }

  create(book): Observable<any>
  {
    let params = JSON.stringify(book);
    console.log(params);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url+'save', params, {headers: headers});
    
  }
  update(book): Observable<any>
  {
    let params = JSON.stringify(book);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url+'update', params, {headers:headers});
  }



  signup(useradmin, gettoken = null): Observable<any>
  {
    if(gettoken != null)
    {
      useradmin.gettoken = 'true';
    }
    let params = JSON.stringify(useradmin);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url+'login', params, { headers:headers });
  }



  signupuser(user, gettoken = null): Observable<any>
  {
    if(gettoken != null)
    {
      user.gettoken = 'true';
    }
    let params = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'loginuser', params, { headers:headers });
  }

//  responseType:'text'



  getIdentity()
  {

    let identityjson = localStorage.getItem('identity');
    let identity = JSON.parse(identityjson);
  //  console.log(this.identity);


  //  console.log(this.identity);
    if(identity && identity != "undefined")
    {
      this.identity = identity;
    //  console.log(this.identity);

//      console.log(identity);
    }
    else
    {
      this.identity = null;
      //    console.log(this.identity);
    }

    return this.identity;
  //  console.log(this.identity);

  }

  getToken()
  {
    let token  = localStorage.getItem('token');

    if(token && token != 'undefined')
    {
      this.token = token;
    }
    else
    {
      this.token = null;
    }
    return this.token;
  }
}
