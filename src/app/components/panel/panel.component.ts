import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserAdmin } from '../../models/useradmin';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  forma   : FormGroup;
  public useradmin: UserAdmin;
  public status: string;
  public identity;
  public token;
  public capslockOn;





  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.crearFormulario();

    this.useradmin = new UserAdmin(1, '', '', 'ROLE_USER', '', '');

    }

  ngOnInit() {
    this.logout();
  }

  get nombreNoValido() {
  return this.forma.get('name').invalid && this.forma.get('name').touched
}

  get apellidosNoValido() {
    return this.forma.get('surname').invalid && this.forma.get('surname').touched
  }


  crearFormulario() {

  this.forma = this.fb.group({
    email : ['', Validators.required ],
    password : ['', Validators.required ]

  });


}


@HostListener('window:click', ['$event']) onClick(event){
  if (event.getModifierState && event.getModifierState('CapsLock')) {
    this.capslockOn = true;
   } else {
    this.capslockOn = false;
   }
  }
 
 @HostListener('window:keydown', ['$event'])
 onKeyDown(event)
 {
 if(event.getModifierState && event.getModifierState('CapsLock')) 
 {
   this.capslockOn = true;
   console.log(this.capslockOn);
 } 
 else 
 {
    this.capslockOn = false;
 }
}
onSubmit(form){
    console.log(this.useradmin);
    this.userservice.signup(this.useradmin).subscribe(
      response =>
      {
        if(response.user)
        {

          this.identity = response.user;
          localStorage.setItem('identity',  JSON.stringify(this.identity));

          console.log(this.identity);

          this.userservice.signup(this.useradmin, true).subscribe(
            response =>
            {
              if(response)
              {
                this.token = response.token;
                localStorage.setItem('token',  this.token);
                console.log(this.token);

           	  // Redirección a inicio
            	this.router.navigate(['admin/listrooms']);
              }
            },
            error =>
            {
              this.status = 'error';
              console.log(error);

            }
          );
        }
      },
      error =>
      {
        this.status = 'error';
        console.log(error);
        console.log("no");
        this.snackBar.open('password or email incorrect ', 'Close',{duration:3000});

      }
    );

    }



logout()
{
  console.log("se ejecuto el metodo logout");
  this.route.params.subscribe(params =>{
    //let logout = +params['sure'];
    let logout = +params['sure'];
    if(logout == 1)
    {
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this.identity = null;
      this.token = null;

      // redireccion a inicio
      this.router.navigate(['panel']);
    }
  });
}


}
