
import { DataService } from './data.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsComponent } from './movements.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

// material design
import { MaterialModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    MovementsComponent,
    ListComponent,
    FormComponent
  ],
  exports: [
    MovementsComponent
  ],
  providers: [
    DataService
  ]
})
export class MovementsModule { }
