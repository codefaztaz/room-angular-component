import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
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
export class UpdateroomComponent implements OnInit, OnChanges, DoCheck {
  forma   : FormGroup;
  public room: Room;
  // public afuConfig;
  public rooms: Room[];
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

   // this.avatar();
    
  }



  // avatar()
  // {
  //   this.activatedRoute.params.subscribe( params =>
  //   {
  //     console.log(params);
  //     console.log(params.id);
      
  //    let _id = params['id'];
  //    console.log(_id);
  //    return _id;
  //   });
    
  // }

  ngOnInit(): void {
  }

  ngOnChanges():void
  {
  
  }
  ngDoCheck():void
  {

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
      _id : [this.room ? this.room._id : '', Validators.required],  
      title  : [this.room ? this.room.title : '', [ Validators.required, Validators.minLength(4) ]  ],
      description : [this.room ? this.room.description : '', Validators.required ],
      language : [this.room ? this.room.language : '', Validators.required ],
      roomtype : [this.room ? this.room.roomtype : '', Validators.required ],
      mapgoogle : [this.room ? this.room.mapgoogle : '', Validators.required ],
      price : [this.room ? this.room.price : '', Validators.required ],
      availability : [this.room ? this.room.availability : '', Validators.required ],
      availabilityfrom : [this.room ? this.room.availabilityfrom  : '', Validators.required ],
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

      if(data.body.image1 && this.room.image1 != undefined && this.room.image1 != 'no-image.png')
      {
        this.roomservice.deleteAvatar(this.room.image1).subscribe(
          response =>
          {
              
          },
          error =>
          {
            console.log(error);
          }
  
        );
      }
      else if(data.body.image2 && this.room.image2 != undefined)
      {
        this.roomservice.deleteAvatar(this.room.image2).subscribe(
          response =>
          {
              
          },
          error =>
          {
            console.log(error);
          }
  
        );
      }
      else if(data.body.image3 && this.room.image3 != undefined)
      {
        this.roomservice.deleteAvatar(this.room.image3).subscribe(
          response =>
          {
              
          },
          error =>
          {
            console.log(error);
          }
  
        );
      }
      else if(data.body.image4 && this.room.image4 != undefined)
      {
        this.roomservice.deleteAvatar(this.room.image4).subscribe(
          response =>
          {
              
          },
          error =>
          {
            console.log(error);
          }
  
        );
      }
      else if(data.body.image5 && this.room.image5 != undefined)
      {
        this.roomservice.deleteAvatar(this.room.image5).subscribe(
          response =>
          {
              
          },
          error =>
          {
            console.log(error);
          }
  
        );
      }

      console.log("estoy en el response");
      this.activatedRoute.params.subscribe( params =>
        {
          console.log(params);
          console.log(params.id);
          let id = params['id'];
          this.room._id = id;
          console.log(this.room._id);
          this.room.image1 =  data.body.image1;
          this.room.image2 =  data.body.image2;
          this.room.image3 =  data.body.image3;
          this.room.image4 =  data.body.image4;
          this.room.image5 =  data.body.image5;
          console.log('import',this.room.image1);
     
          if(data.body.image1)
          {

            // this.roomservice.deleteAvatar(this.room.image1).subscribe(
            //   response =>
            //     {
            //       //this.room.image1;
            //       this.getRoom();    
                  
            //     },
            //     error =>
            //     {
            //       console.log(error);
            //     }
            // );
            this.roomservice.saveImg(this.room._id,this.room.image1).subscribe(
            response =>
              {
                //this.room.image1;
                this.getRoom();    
                
              },
              error =>
              {
                console.log(error);
              }
      
          );
            }
            if(data.body.image2)
            {
            this.roomservice.saveImg2(this.room._id,this.room.image2).subscribe(
              response =>
                {
                  //this.room.image1;
                  this.getRoom();    
                  
                },
                error =>
                {
                  console.log(error);
                }
        
            );
              }

              if(data.body.image3)
              {
              this.roomservice.saveImg3(this.room._id,this.room.image3).subscribe(
                response =>
                  {
                    //this.room.image1;
                    this.getRoom();    
                    
                  },
                  error =>
                  {
                    console.log(error);
                  }
          
              );
                }
                if(data.body.image4)
                {
                this.roomservice.saveImg4(this.room._id,this.room.image4).subscribe(
                  response =>
                    {
                      //this.room.image1;
                      this.getRoom();    
                      
                    },
                    error =>
                    {
                      console.log(error);
                    }
            
                );
                  }
                  if(data.body.image5)
                  {
                  this.roomservice.saveImg5(this.room._id,this.room.image5).subscribe(
                    response =>
                      {
                        //this.room.image1;
                        this.getRoom();    
                        
                      },
                      error =>
                      {
                        console.log(error);
                      }
              
                  );
                    }
        }); 
      
        
      }
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
              this.forma.controls['availability'].setValue(response.room.availability);
              this.forma.controls['availabilityfrom'].setValue(response.room.availabilityfrom);
              this.forma.controls['reference'].setValue(response.room.reference);
              this.forma.controls['location'].setValue(response.room.location);
              this.forma.controls['image1'].setValue(response.room.image1);
              this.forma.controls['image2'].setValue(response.room.image2);
              this.forma.controls['image3'].setValue(response.room.image3);
              this.forma.controls['image4'].setValue(response.room.image4);
              this.forma.controls['image5'].setValue(response.room.image5);
              this.imgURL  = response.room.image1;
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
    
  
 
          afuConfig: AngularFileUploaderConfig = {
            
            multiple: false,
            formatsAllowed: '.jpg, .jpeg, .png, .gif',
            maxSize: 0.5 ,
            uploadAPI:{
              url: 'http://localhost:3999/admin/' + 'upload-avatar',
              
              params: {
                'image': '1'
              }
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
        
     
          afuConfig2: AngularFileUploaderConfig = {
            
            multiple: false,
            formatsAllowed: '.jpg, .jpeg, .png, .gif',
            maxSize: 0.5,
            uploadAPI:{
              url: 'http://localhost:3999/admin/' + 'upload-avatar',
              params: {
                'image': '2'
              }
              
            
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

          afuConfig3: AngularFileUploaderConfig = {
            
            multiple: false,
            formatsAllowed: '.jpg, .jpeg, .png, .gif',
            maxSize: 0.5 ,
            uploadAPI:{
              url: 'http://localhost:3999/admin/' + 'upload-avatar',

              params: {
                'image': '3'
              }
              
            
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

          afuConfig4: AngularFileUploaderConfig = {
            
            multiple: false,
            formatsAllowed: '.jpg, .jpeg, .png, .gif',
            maxSize: 0.5 ,
            uploadAPI:{
              url: 'http://localhost:3999/admin/' + 'upload-avatar',
              params: {
                'image': '4'
              }
              
            
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

          afuConfig5: AngularFileUploaderConfig = {
            
            multiple: false,
            formatsAllowed: '.jpg, .jpeg, .png, .gif',
            maxSize: 0.5 ,
            uploadAPI:{
              url: 'http://localhost:3999/admin/' + 'upload-avatar',
              params: {
                'image': '5'
              }
              
            
              // headers:{
              //'Authorization': this.token,
              
              // }
              
            },
          
          
            theme: 'attachPin',
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            replaceTexts: {
              selectFileBtn: 'Select Files',
            //  afterUploadMsg_success: 'Successfully Uploaded !',
              afterUploadMsg_error: 'Upload Failed !',
              sizeLimit: 'less 500 kb'
            }
            // attachPinText: ' Sube la imagen'
          };


    deleteImage()
    {
      this.room.image1 = "no-image.png";
      console.log('image1-delete',this.room.image1);
      this.roomservice.updateImage1(this.room._id, this.room.image1).subscribe(
        response =>
        {

        }
      )
      if( this.room.image1 != undefined && this.room.image1 != 'no-image.png')
      {
        this.roomservice.deleteAvatar(this.room.image1).subscribe(
          response =>
          {
            this.room.image1 = null;
            
            console.log('img1a', this.room.image1);
              
          },
          error =>
          {
            console.log(error);
          }
  
        );
      }


    }      
        
     
   
        
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
