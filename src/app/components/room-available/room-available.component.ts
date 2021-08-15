import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  



import { globalroom } from '../../services/globalroom';

import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../models/room';

@Component({
  selector: 'app-room-available',
  templateUrl: './room-available.component.html',
  styleUrls: ['./room-available.component.scss']
})
export class RoomAvailableComponent implements OnInit {
  forma   : FormGroup;
  public rooms: Room[];
  public room: Room;
  public url :String;
  public token :any;
  public data;
  public status;
  public id;
  public _id;
  public idRoom;
  public resetVar;
  public imagePath;
  public image1 :String;
  public image2 :String;
  public image3 :String;
  public image4 :String;
  public image5 :String;
  public imgURL: String;
  public imgURL2 :String;
  public imgURL3 :String;
  public imgURL4 :String;
  public imgURL5 :String;
  public params :any;
  public filtercond;
  public div1:boolean=true;
  public div2:boolean=true;
  public flag:boolean = false;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private roomservice: RoomService,
    private http: HttpClient,

    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private config: NgbCarouselConfig
  ) {
    this.token = userservice.getToken();
    console.log(this.token);
    // this.crearFormulario();
    this.activatedRoute.params.subscribe( params =>
    {
      console.log(params);
      console.log(params.id);
    });
    this.url = globalroom.url;
    this.getRoom();
    this.crearFormulario();


    this.room = new Room('','','','','', '', '','','','','', '','','','','', 1,1,  '', '','', 1,1, '', '','','', '', '', '','','' );      
    config.interval = 0;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false; 
  }

  crearFormulario() 
  {
      this.forma = this.fb.group({ 
      name  : [ '', [ Validators.required, Validators.minLength(4) ]  ],
      message : [ '', Validators.required], 
      

      });
    
    
  }

  get nameNoValido() 
  {
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }
    
  get messageNoValido() 
  {
      return this.forma.get('message').invalid && this.forma.get('message').touched
  }  


  getRoom()
  {
    this.route.params.subscribe(params =>{
      let id = params['id'];
      console.log(id);
      this.roomservice.getRoom(id).subscribe(
        response =>
        {
          if(!response.room)
          {
            this.router.navigate(['/admin/listrooms']);
          }
    
          else
          {
            this.room = response.room;
            this.room._id =response.room._id;
            this.room.title = response.room.title;
            this.room.description = response.room.description;

            this.room.roomtype = response.room.roomtype;
            this.room.mapgoogle = response.room.mapgoogle;
            this.room.price = response.room.price;
            this.room.availability = response.room.availability;
            this.room.availabilityfrom = response.room.availabilityfrom;
            this.room.reference = response.room.reference;
            this.room.location = response.room.location;
            this.room.image1 = response.room.image1;
            this.room.image2 = response.room.image2;
            this.room.image3 = response.room.image3;
            this.room.image4 = response.room.image4;
            this.room.image5 = response.room.image5;
            this.imgURL = response.room.image1;
            this.imgURL2 = response.room.image2;
            this.imgURL3 = response.room.image3;
            this.imgURL4 = response.room.image4;
            this.imgURL5 = response.room.image5;

            //console.log(this.imgURL);
            console.log(this.room);
            console.log(this.imgURL2);
            console.log('imag3',this.imgURL3);
            console.log('img4',this.imgURL4);
          }
        }
      )
    });
  }
    
  
 

  ngOnInit(): void {
  }

          
  onSubmit()
  {
  
  
    this.room = this.forma.value;
    this.roomservice.update(this.token,this.room).subscribe(
      response =>
       {
        
         console.log(this.room);
       //  this.save();
        // this.getBook();
  
      },
      error =>
      {
        console.log(error);
      }
   );
  
  
  }




  showPictures()
  {
     this.flag = false;
 

  }

  showMap()
  {
   //  this.flag = !this.flag;
     this.flag = true;


  }
  


}
