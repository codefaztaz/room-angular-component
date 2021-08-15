import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../../models/room';

// services
import { UserService } from '../../../services/user.service';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.scss']
})
export class AddroomComponent implements OnInit {

  forma   : FormGroup;
  public room: Room;
 // public afuConfig;
  public url;
  public token;
  public data;
  public status;
  public id;
  public idBook;

  constructor(
  private fb: FormBuilder,
  private userservice: UserService,
  private roomservice: RoomService,
  private http: HttpClient,

  private route: ActivatedRoute,

  private router: Router,
) {
  this.token = userservice.getToken();
  console.log(this.token);
  this.crearFormulario();



  
}

get titleNoValido() {
return this.forma.get('title').invalid && this.forma.get('title').touched
}

get descriptionNoValido() {
  return this.forma.get('description').invalid && this.forma.get('description').touched
}

get availablecouplesNoValido() {
return this.forma.get('availablecouples').invalid && this.forma.get('availablecouples').touched
}

get depositNoValido() {
  return this.forma.get('deposit').invalid && this.forma.get('deposit').touched
  }

get billsNoValido() {
    return this.forma.get('bills').invalid && this.forma.get('bills').touched
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
  title  : [ '', [ Validators.required, Validators.minLength(4) ]  ],
  titleEs  : [ '', [ Validators.required, Validators.minLength(4) ]  ],
  description : [ '', Validators.required ],
  descriptionEs : [ '', Validators.required ],
  roomtype : [ '', Validators.required ],
  roomtypeEs : [ '', Validators.required ],
  mapgoogle : [ '', Validators.required ],
  mapgoogleEs : [ '', Validators.required ],
  price : [ '', Validators.required ],
  priceEs : [ '', Validators.required ],
  reference : [ '', Validators.required ],
  referenceEs : [ '', Validators.required ],
  location : ['', Validators.required ],
  locationEs : ['', Validators.required ],
  deposit : ['', Validators.required ],
  depositEs : ['', Validators.required ],
  bills : ['', Validators.required ],
  billsEs : ['', Validators.required ],
  length : ['', Validators.required ],
  lengthEs : ['', Validators.required ],
  parking : ['', Validators.required ],
  parkingEs : ['', Validators.required ],
  availablecouples : ['', Validators.required ],
  availablecouplesEs : ['', Validators.required ],
  availabilityfrom : ['', Validators.required ],
  availabilityfromEs : ['', Validators.required ],
  });


}
ngOnInit(): void {
}











  crearListeners() {

  this.forma.get('title').valueChanges.subscribe( console.log );
  }



  create(room)
  {

    console.log( this.forma );

    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    else
    {
      console.log("llege aqui");
      this.room = this.forma.value;
      console.log(this.room);
      this.roomservice.create(this.room).subscribe(
              response =>
              {
                console.log(this.room);
                this.forma.reset();
               // this.snackBar.open('book created', 'Close',{duration:3000});
             },
            error =>
            {
            console.log(error);
            }
            );
          }
        
    }

}
