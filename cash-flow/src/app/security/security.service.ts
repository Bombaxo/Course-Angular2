import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
/**
 * The RxJS library is broken down into operations
 * You have to import them individually
 */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
/**
 * Import utility service
 */
import { HttpToolsService } from '../shared/http.service'

@Injectable()
export class SecurityService {
  urlBase: string = 'http://localhost:3030/api';

  constructor(
    private http: Http, 
    private httpToolsService: HttpToolsService
) {
  }

  register(credenciales) {
    let path = `${this.urlBase}/pub/users`;
    return this.comunicar(credenciales, path);
  }

  login(credenciales) {
    let path = `${this.urlBase}/pub/sessions`;
    return this.comunicar(credenciales, path);
  }


  comunicar(credenciales, path) {
    // The security call should give us back credentials
    // Part of our work will be to save it for future uses
    let body = JSON.stringify(credenciales)
    console.log(body);
    let options = this.httpToolsService.configHeaders()
    return this.http
        .post(path, body, options)
        .map(this.httpToolsService.getData)
        .map(this.httpToolsService.saveCredentials)
        .catch(this.httpToolsService.treatError)
  }
}

