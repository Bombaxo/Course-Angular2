import { Component, Directive, forwardRef, Attribute, OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User }    from './../clients';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{

  model = new User('','',null,'','','');
  submitted = false;
  onSubmit() { this.submitted = true; }
}
