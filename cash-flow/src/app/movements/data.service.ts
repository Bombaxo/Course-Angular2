import { Injectable } from '@angular/core';
import { MasterModel, MasterTypeModel, MovementModel, Movement } from './data.model';
// import objects from http library
import { Http } from '@angular/http';

// import of reactive extensions operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpToolsService } from './../shared/http.service';


/**
 * Reactive programing with observablesReactive
 */

// Allows subscription to stream changes
import { Observable } from 'rxjs/Observable';

// Behaves as an observable 
// and allows data emision towards an observable
import { Subject } from 'rxjs/Subject';


@Injectable()
export class DataService {

  private urlBase         : string = 'http://localhost:3030/api'
  private categoriesTypes : MasterTypeModel[] = [];

  // Claim dependency on http  
  // It has been registered in the root module, it is assumed common use to several services
  constructor( private http: Http, private httpToolsService: HttpToolsService ) {
  }

  getNewMovement(): MovementModel {
    return new Movement(
      "",
      new Date(),
      0,
      0,
      0,
      0,
      0
    );
  }

  // Returns observable with specific types  
  getKinds(): Observable<MasterModel[]> {
    // Calls return observables
    // Hide the path definition
    return this.http
      .get(`${this.urlBase}/pub/masters/kinds`)
      .map(this.httpToolsService.getData)
  }

  // Returns observable with specific types
  getCategories(): Observable<MasterTypeModel[]> {
    // Calls return observables
    // Hide the path definition
    return this.http
      .get(`${this.urlBase}/pub/masters/categories`)
      .map(this.httpToolsService.getData)
      .map(categories => this.categoriesTypes = categories)
  }

  getCategoriesByType(kind): MasterTypeModel[] {
    return this.categoriesTypes.filter(c => c.type === kind);
  }

  getMovements$(): Observable<MovementModel[]> {
    let options = this.httpToolsService.configHeaders()
    return this.http
      .get(`${this.urlBase}/priv/movements`,options)
      .map(this.httpToolsService.getData)
      .catch(this.httpToolsService.treatError)
  }  

  postMovement(movement: Movement) {
    /**
     * First data preparation for sending
     * Then subscription and response operations
     */
    console.log("movement.label");
    console.log(movement.label);

    let body = JSON.stringify(movement)
    let options = this.httpToolsService.configHeaders()
    if (movement._id && movement._id !=='_') {
      console.log("movement.post");
      return this.http
        .put(`${this.urlBase}/priv/movements/${movement._id}`, body, options)
        .catch(this.httpToolsService.treatError)
        
    }
    else {console.log("movement.postelse");
      return this.http
        .post(`${this.urlBase}/priv/movements`, body, options)
        .catch(this.httpToolsService.treatError)
    }
  }  

  getMovId$(_id) : Observable<MovementModel>{
    let options = this.httpToolsService.configHeaders()
    return this.http
      .get(`${this.urlBase}/priv/movements/${_id}`,options)
      .map(this.httpToolsService.getData)
      .catch(this.httpToolsService.treatError)
  }
  
  // Aux function
  //private getKindsBase = () => this.kinds[0].id;
  getCategoryBase = (kindId) => this.getCategoriesByType(kindId)[0].id;

  removeMovementByID(id: String) {

    let options = this.httpToolsService.configHeaders()
    if (id && id !=='_') {
      console.log("movement.deleting by id");
      return this.http
        .delete(`${this.urlBase}/priv/movements/${id}`, options)
        .catch(this.httpToolsService.treatError)
        
    }
    else { // Implement a right return object 
      console.log("not found");      
    }
  }
  
  /*
  postMovement(movement: Movement) {
    var movementClone: Movement = Object.assign({}, movement);
    this.movements.push(movementClone);
    // generate new value in observable
    this.movements$.next(this.movements);
  }

  getMovements$(): Observable<MovementModel[]> {
      // Behaves as an observable
      return this.movements$.asObservable();
  }

  clearAllMovements() {
     // this.movements.length = 0;
     console.log(this.movements.length);
     while (this.movements.length) {
      this.movements.pop();
    }
  }

  clearLastMovement() {
    this.movements.pop();
  }
  */


}
