import { Component, OnInit } from '@angular/core';
import { DialogsService } from './../shared/utils/dialog/dialogs.service';


@Component({
  selector: 'app-modalbox',
  templateUrl: './modalbox.component.html',
  styleUrls: ['./modalbox.component.css']
})
export class ModalboxComponent implements OnInit {

  constructor( private dialogsService: DialogsService ) { }

  ngOnInit() {
  }

    // Open dialog - Success type
  openDialogSuccess( ) {

    this.dialogsService
                .confirm('successDialog', 
                    'Submit Order', 
                    'Are you sure you want finish this process?', 
                    'Confirm', 'Cancel');
  }
    // Open dialog - Delete type
  openDialogDelete( ) {

    this.dialogsService
                .confirm('deleteDialog', 
                    'Delete Product', 
                    'Are you sure you want delete this item from order?', 
                    'Delete', 'Cancel');
  }
    // Open dialog - Warning type
  openDialogWarning( ) {

    this.dialogsService
                .confirm('warningDialog', 
                    'Warning Information', 
                    'The order was not completed. Are you sure you want to do this action?', 
                    'Accept', 'Cancel');
  }
    // Open dialog - Info type
  openDialogInfo( ) {

    this.dialogsService
                .confirm('infoDialog', 
                    'Information Order', 
                    'The information you have bellow could be useful to read.', 
                    'Ok', 'Cancel');
  }

}
