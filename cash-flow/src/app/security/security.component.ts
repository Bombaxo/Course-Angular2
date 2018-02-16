import { SecurityService } from './security.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

    user    = { email: '', password: '' };
    mensaje = '';
    constructor( private securityService: SecurityService){
    }

    ngOnInit(){
    }

    registerUser(){
        console.log('Submitting credentials for registration: ' + JSON.stringify(this.user));
        this.securityService
            .register(this.user)
            .subscribe(
                r=>{
                    console.log(r);
                },
                e=>{
                    this.mostrarError(e);
                })
    }

    loginUser(){
        console.log('Sending credentials for input: ' + JSON.stringify(this.user));
        this.mensaje="Validating...";
        this.securityService
            .login(this.user)
            .subscribe(
                r=>{
                    console.log(r);
                },
                e=>{
                    this.mostrarError(e);
                })
    }

    mostrarError(e){
        this.mensaje="ERROR";
        console.error(e);
    }
}
