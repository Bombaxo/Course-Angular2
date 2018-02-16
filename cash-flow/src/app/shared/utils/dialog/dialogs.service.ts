import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog) { }

  public confirm( type: string, title: string, message: string, confirmTextBtn: string, cancelTextBtn: string ): Observable<boolean> {

      let dialogRef: MdDialogRef<ConfirmDialogComponent>;
    
      dialogRef = this.dialog.open( ConfirmDialogComponent, {
          disableClose: true
      }); 
    
      dialogRef.componentInstance.type           = type;
      dialogRef.componentInstance.title          = title;
      dialogRef.componentInstance.message        = message;
      dialogRef.componentInstance.confirmTextBtn = confirmTextBtn;
      dialogRef.componentInstance.cancelTextBtn  = cancelTextBtn;
    
      return dialogRef.afterClosed();
  }
}
