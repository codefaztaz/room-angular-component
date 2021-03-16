import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalroom } from './globalroom';
import { UserService } from './user.service';
 
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public url: string;
  public token;

  constructor(
    private http: HttpClient,
    private userservice: UserService
  ) {
      this.url = globalroom.url
      this.token = this.userservice.getToken();
    }


  create(book): Observable<any>
  {
    let params = JSON.stringify(book);
    console.log(params);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url+'save', params, {headers: headers});
    
  }  

  getRooms(page = 1):Observable<any>
  {
    return this.http.get(this.url + 'rooms/' + page);
    console.log(page);
  }

  getRoomsFull(page = 1):Observable<any>
  {
    return this.http.get(this.url + 'roomsfull/' + page);
    console.log(page);
  }


  getRoom(roomId):Observable<any>
  {
    return this.http.get(this.url + 'room/' + roomId);
    console.log(roomId);
  }


  getAvatar(image):Observable<any>
  {
    return this.http.get(this.url + 'avatar/' + image);
    console.log(image);
  }

  update(token,room):Observable<any>
  {
    let params = JSON.stringify(room);
    let tokenid = JSON.stringify(token);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                  .set('Authorization', tokenid);

    return this.http.put(this.url + 'update', params, {headers: headers});
  }
  updateImage1(id, image1):Observable<any>
  {
  
    let headers = new HttpHeaders().set('Content-Type','application/json');


    return this.http.put(this.url + 'updateimage1',{'id':id, 'image1': image1}, {headers: headers});
  }
  updateImage2(id, image2):Observable<any>
  {
  
    let headers = new HttpHeaders().set('Content-Type','application/json');


    return this.http.put(this.url + 'updateimage1',{'id':id, 'image2': image2}, {headers: headers});
  }
  updateImage3(id, image3):Observable<any>
  {
  
    let headers = new HttpHeaders().set('Content-Type','application/json');


    return this.http.put(this.url + 'updateimage1',{'id':id, 'image3': image3}, {headers: headers});
  }
  updateImage4(id, image4):Observable<any>
  {
  
    let headers = new HttpHeaders().set('Content-Type','application/json');


    return this.http.put(this.url + 'updateimage1',{'id':id, 'image4': image4}, {headers: headers});
  }
  updateImage5(id, image5):Observable<any>
  {
  
    let headers = new HttpHeaders().set('Content-Type','application/json');


    return this.http.put(this.url + 'updateimage1',{'id':id, 'image5': image5}, {headers: headers});
  }
  saveImg(id,image1):Observable<any>
  {
   // console.log(image1);
   
   //let params = JSON.stringify(image1);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.url + 'saveimg/', {'id': id, 'image1': image1},{headers: headers});
  }

  saveImg2(id,image2):Observable<any>
  {
   // console.log(image1);
   
   //let params = JSON.stringify(image1);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.url + 'saveimg/', {'id': id, 'image2': image2},{headers: headers});
  }
  saveImg3(id,image3):Observable<any>
  {
   // console.log(image1);
   
   //let params = JSON.stringify(image1);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.url + 'saveimg/', {'id': id, 'image3': image3},{headers: headers});
  }

  saveImg4(id,image4):Observable<any>
  {
   // console.log(image1);
   
   //let params = JSON.stringify(image1);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.url + 'saveimg/', {'id': id, 'image4': image4},{headers: headers});
  }

  saveImg5(id,image5):Observable<any>
  {
   // console.log(image1);
   
   //let params = JSON.stringify(image1);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(this.url + 'saveimg/', {'id': id, 'image5': image5},{headers: headers});
  }
 

  deleteAvatar(image1):Observable<any>
  {
    let params = JSON.stringify(image1);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
                                 // .set('Authorization', token);
   
     console.log(image1);
    return this.http.delete(this.url + 'delete-avatar/' + params, { headers: headers });
  }

  uploadavatar(id):Observable<any>
  {
    let params = JSON.stringify(id);
    //console.log(book);
    let headers = new HttpHeaders().set(' Content-Type ', ' application/json ');

    return this.http.post(this.url + 'upload-avatar/'+params, { headers: headers });
  }
  delete(token,id):Observable<any>
  {
    let tokenid = JSON.stringify(token);
    //console.log(tokenid);
   
       // console.log(token);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', tokenid);

    return this.http.delete(this.url + 'delete/' + id,  { headers: headers } );
  }
}
