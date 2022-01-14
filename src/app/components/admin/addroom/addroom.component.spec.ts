import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddroomComponent } from './addroom.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

describe('AddroomComponent', () => {
  let component: AddroomComponent;
  let fixture: ComponentFixture<AddroomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddroomComponent ],
      imports: [FormsModule,ReactiveFormsModule,HttpClientModule,    RouterTestingModule],
      providers:[FormBuilder]
   
    })


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('el titulo tiene que ser mayor de 4 caracteres', () =>{

    const control = component.forma.get('title');
    control.setValue('camaleon');
    expect(control.valid).toBeTruthy();

  });



  
});
