import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';


import { AngularFileUploaderConfig } from 'angular-file-uploader';

import { globalroom } from '../../../services/globalroom';

import { UserService } from '../../../services/user.service';
import { RoomService } from '../../../services/room.service';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../../models/room';

@Component({
  selector: 'app-updateroom',
  templateUrl: './updateroom.component.html',
  styleUrls: ['./updateroom.component.scss']
})
export class UpdateroomComponent implements OnInit {
  forma   : FormGroup;
  public room: Room;
 // public afuConfig;
 public rooms: Room[];
  public url;
  public token;
  public data;
  public status;
  public id;
  public idRoom;
  public resetVar;
  public imagePath;
  public image1;
  public image2;
  public image3;
  public image4;
  public image5;
  public imgURL;
  public params;


  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private roomservice: RoomService,
    private http: HttpClient,

    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.token = userservice.getToken();
    console.log(this.token);
    this.crearFormulario();
    this.activatedRoute.params.subscribe( params =>
    {
      console.log(params);
      console.log(params.id);
    });
    this.url = globalroom.url;
    this.getRoom();


    
  }

  ngOnInit(): void {
  }

  get titleNoValido() {
    return this.forma.get('title').invalid && this.forma.get('title').touched
    }
    
    get descriptionNoValido() {
      return this.forma.get('description').invalid && this.forma.get('description').touched
    }
    
    get languageNoValido() {
    return this.forma.get('language').invalid && this.forma.get('language').touched
    }
    
    get priceNoValido() {
      return this.forma.get('price').invalid && this.forma.get('price').touched
    }
    
    get roomtypeNoValido() {
      return this.forma.get('roomtype').invalid && this.forma.get('roomtype').touched
    }
    
    get mapgoogleNoValido() {
      return this.forma.get('mapgoogle').invalid && this.forma.get('mapgoogle').touched
    }
    
    
    get referenceNoValido() {
      return this.forma.get('reference').invalid && this.forma.get('reference').touched
    }
    
    get locationNoValido() {
      return this.forma.get('location').invalid && this.forma.get('location').touched
    }
    
    
    
    
    crearFormulario() 
    {
      this.forma = this.fb.group({
      _id : [this.room ? this.room.id : '', Validators.required],  
      title  : [this.room ? this.room.title : '', [ Validators.required, Validators.minLength(4) ]  ],
      description : [this.room ? this.room.description : '', Validators.required ],
      language : [this.room ? this.room.language : '', Validators.required ],
      roomtype : [this.room ? this.room.roomtype : '', Validators.required ],
      mapgoogle : [this.room ? this.room.mapgoogle : '', Validators.required ],
      price : [this.room ? this.room.price : '', Validators.required ],
      reference : [this.room ? this.room.reference : '', Validators.required ],
      location : [this.room ? this.room.location : '', Validators.required ],
      image1 : [this.room ? this.room.image1 : '', Validators.required ],
      image2 : [this.room ? this.room.image2 : '', Validators.required ],
      image3 : [this.room ? this.room.image3 : '', Validators.required ],
      image4 : [this.room ? this.room.image4 : '', Validators.required ],
      image5 : [this.room ? this.room.image5 : '', Validators.required ],

      });
    
    
    }

    upload1(data)
    {
      //let data_obj = JSON.parse(image1.response);
      //this.room.image1 = data.body;
      console.log(this.room.id);

      this.activatedRoute.params.subscribe( params =>
        {
          console.log(params);
          console.log(params.id);
          return params.id;

  


        });

        var roomParams = this.room.id;
        console.log(roomParams);
        this.roomservice.saveImg(this.room.id).subscribe(
          response =>
            {
              console.log("estoy en el response");
            },
            error =>
            {
              console.log(error);
            }
    
        );


      console.log("llegue aki nada mas");
      console.log('image1',this.room.image1);
      // comprobar si existe una imagen previa
     // console.log(this.token);
     // let name = image1.file0;
     // console.log(name);
      //return  this.room.image1 = name;
      console.log(this.room.image1);
      // this.activatedRoute.params.subscribe( params =>
      //   {
      //     console.log(params);
      //     //console.log(params.id);
      //     this.roomservice.saveImg(this.params,this.room.image1).subscribe(
      //       response =>
      //       {
      //         console.log("estoy en el response");
      //       },
      //       error =>
      //       {
      //         console.log(error);
      //       }
      
      //     );
      //   });
      // if(this.room.image1)
      // {
      //   this.roomservice.deleteAvatar(this.room.image1).subscribe(
      //     response =>
      //     {
      //       console.log("estoy en el response");
      //     },
      //     error =>
      //     {
      //       console.log(error);
      //     }
  
      //   );
      // }

 
  }
  
  //    //let name = data.body.image;
  //   console.log("aki");
  //  // this.book.image = name;
  //   console.log(this.room.image1);
  //   this.roomservice.update(this.room).subscribe(
  //     response =>
  //     {
        
  //       this.getRoom();
  
  //     },
  //     error =>
  //     {
  //       console.log(error);
  //     }
  //   )      
    
    


  

    getRoom()
    {
      this.route.params.subscribe(params =>{
        let id = params['id'];
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
              this.forma.controls['_id'].setValue(response.room._id);
              this.forma.controls['title'].setValue(response.room.title);
              this.forma.controls['description'].setValue(response.room.description);
              this.forma.controls['language'].setValue(response.room.language);
              this.forma.controls['roomtype'].setValue(response.room.roomtype);
              this.forma.controls['mapgoogle'].setValue(response.room.mapgoogle);
              this.forma.controls['price'].setValue(response.room.price);
              this.forma.controls['reference'].setValue(response.room.reference);
              this.forma.controls['location'].setValue(response.room.location);
              this.forma.controls['image1'].setValue(response.room.image1);
              this.forma.controls['image2'].setValue(response.room.image2);
              this.forma.controls['image3'].setValue(response.room.image3);
              this.forma.controls['image4'].setValue(response.room.image4);
              this.forma.controls['image5'].setValue(response.room.image5);
              this.imgURL = response.room.image1;
              
              //console.log(this.imgURL);
              console.log(this.room);
            }
          }
        )
      });
    }
    

    afuConfig: AngularFileUploaderConfig = {
      
      multiple: false,
      formatsAllowed: '.jpg, .jpeg, .png, .gif',
     // maxSize: '50' ,
      uploadAPI:{
        url: 'http://localhost:3999/admin/' + 'upload-avatar'
        
      
       // headers:{
       //'Authorization': this.token,
       
       // }
        
      },
    
    
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
     // attachPinText: ' Sube la imagen'
    };


   

    onSubmit()
    {
    
    
      this.room = this.forma.value;
      this.roomservice.update(this.room).subscribe(
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

}
