import { Component, OnInit } from '@angular/core';
import { MasterModel, MasterTypeModel, MovementModel, Movement } from './data.model';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ToastComponent } from './../shared/utils/toast/example/toast.component';
import { ToastService } from './../shared/utils/toast/toast.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  // All necessary data to manage the component
  kindsInContainer : MasterModel[]     = [];
  categories       : MasterTypeModel[] = [];
  allCategories    : MasterTypeModel[] = [];
  
  movement         : Movement;
  movements        : Movement[];
  movements$       : Observable<Movement[]>;
  
  // Dependencies are declared as constructor parameter
  constructor( private dataService: DataService, private toastyService: ToastyService, private toastService: ToastService ) { }

  // On start, obtains static data and subscriptions
  ngOnInit() {
    this.movement   = this.dataService.getNewMovement();
    this.movements$ = this.dataService.getMovements$();
    this.movements$.subscribe(movements => this.movements = movements);
    let kinds$ : Observable<any> = this.dataService.getKinds();
    kinds$.subscribe(kinds => {
      this.kindsInContainer = kinds;
      this.dataService.getCategories().subscribe(categories => {
        this.allCategories = categories;
        this.categories = this.dataService.getCategoriesByType(this.movement.kind);
      });
    });
  }

  refreshMovements(){
    this.movements$ = this.dataService.getMovements$();
    this.movements$.subscribe(movements => this.movements = movements);
  }

  // When happens change in movement kind
  changeKindMovement (){
    this.categories = this.dataService.getCategoriesByType(this.movement.kind);
      // kind changes, creates changes in category
    this.movement.category = this.dataService.getCategoryBase(this.movement.kind);
  }
  
  // When happens change in movement kind
  setCategory ( categoryId: number ){ 
    this.changeKindMovement();
    this.movement.category = categoryId;
  } 

  // When movements needs to be created
  saveMovement() {

    this.toastService.setPosition('top-right');
    let toastOptions: ToastOptions = {
            title: "Movement",
            msg: "Movement is ready to edit",
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
    };

    this.dataService.postMovement(this.movement)
      .subscribe(result => { 
        if( result.status == 201 || result.status == 200 ){
          this.movement   = this.dataService.getNewMovement();
          this.refreshMovements();
          if( result.status == 201 ){
            toastOptions.title = "New movement";
            toastOptions.msg   = "Created new movement";
            this.toastyService.success(toastOptions);
          }else if( result.status == 200 ){
            toastOptions.title = "Update movement";
            toastOptions.msg   = "Movement was updated";
            this.toastyService.success(toastOptions);
          }
        }
      });
  }
  
  // When movements needs to be in the form
  bringMovId ( idMovement: String ){ 
    this.dataService.getMovId$( idMovement )
      .subscribe(result => { 
        this.movement = result[0];
        this.setCategory( result[0].category );        
      });
  }

  // When movements needs to be removed
  removeMovId ( idMovement: String ){ 
    this.toastService.setPosition('top-right');
    let toastOptions: ToastOptions = {
            title: "Info Movement",
            msg: "Movement deleted successfully",
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
    };
    this.dataService.removeMovementByID( idMovement )
      .subscribe(result =>{
        //if( result.status == 201 ){
           console.log(result);
           this.refreshMovements();
           this.toastyService.info(toastOptions);
        //}
        });      
  }

  clearForm (){ 
    this.movement = this.dataService.getNewMovement();
  }

}
