// class with help methods to use in the rest of services
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }  from 'rxjs/Observable';

// Import of Rx functions
import 'rxjs/add/observable/throw'
import { Router } from '@angular/router'

@Injectable()
export class HttpToolsService {

  private static _router: Router
  private static _token: any
  
  constructor( private router: Router ) {
    HttpToolsService._router=this.router
  }

  // Submissions requires always same config
  configHeaders() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'sessionId': HttpToolsService._token
    })
    // Equivalent to angularjs interceptors
    let options = new RequestOptions({ headers: headers })
    return options
  }
  // To extract json data from http request
  getData(response) { 
      // TODO: validate the status code and control empty
      return response.json() 
  }
  
  // treat communication errors
  treatError(error) {
    console.log(JSON.stringify(error));
    if (error.status == 401) {
      console.log("Invalid permisions");
      HttpToolsService._router.navigate(['security'])
    }
    else {
      console.log("Another Error");
    }
    return Observable.throw(error._body)
  } 

  // after get credencials
  saveCredentials(token) {
    // save credencials
    console.log('Saving token: ' + token);
    HttpToolsService._token = token
    // go to home page
    HttpToolsService._router.navigate(['cash-flow'])
    return token
  }
}