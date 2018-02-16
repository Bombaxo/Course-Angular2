import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public type: string;
  public title: string;
  public message: string;
  public confirmTextBtn: string;
  public cancelTextBtn: string;

  public classColors = [
    { name: 'successDialog', icon: 'done' },
    { name: 'deleteDialog', icon: 'delete' },
    { name: 'infoDialog', icon: 'info outline' }, 
    { name: 'warningDialog', icon: 'warning' }
  ];

  constructor( public dialogRef: MdDialogRef<ConfirmDialogComponent> ) { }

  ngOnInit() {
  }

}
