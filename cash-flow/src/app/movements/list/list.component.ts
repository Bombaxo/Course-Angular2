import { MasterModel, MasterTypeModel, MovementModel, Movement } from './../data.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogsService } from './../../shared/utils/dialog/dialogs.service';


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  /** Receives data via properties**/

   // Input property for movement types
  @Input() kinds      : MasterModel[] = [];

  // Input property for movement categories
  @Input() categories : MasterTypeModel[] = [];
  
  // Input property for movement types
  @Input('movements') movements     : MovementModel[];

  /** Emits changing events and saving**/
  // Output property to emit the saving event from current movement
  @Output() userRemoveMovemment  : EventEmitter<string> = new EventEmitter<string>();
  // Output property to emit the saving event from current movement
  @Output() requestMovement  : EventEmitter<string> = new EventEmitter<string>();
 
  constructor( private dialogsService: DialogsService ) { }  

  ngOnInit() { }

    // Emitt event to bring the movement to the form
  getMovementForm( id ) { console.log("getMovementForm");
      this.requestMovement.emit(id);            
  }

    // Open dialog, emitt event to movement
  userRemoveIdMovement( id ) {

    this.dialogsService
                .confirm('warningDialog', 'Delete Movement', 'Are you sure you want delete this Movement?', 'Delete', 'Cancel')
                .subscribe(result => {
                    if( result ) {
                        this.userRemoveMovemment.emit(id);
                    }              
                });
  }
  

  /*public openDialog() {
    this.dialogsService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe(res => this.result = res);
      console.log("result" + this.result);
  }*/
    

}
