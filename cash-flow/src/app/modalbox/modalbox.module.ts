import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalboxComponent } from './modalbox.component';

// material design
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ModalboxComponent 
  ],
  exports:[
    ModalboxComponent
  ]
})
export class ModalboxModule { }