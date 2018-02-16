import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { FormsModule } from '@angular/forms';

// material design
import { MaterialModule } from '@angular/material';
import { LoginFormComponent } from './loginForm/login-form.component';
import { EqualValidator } from './loginForm/password.match.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [ClientsComponent, LoginFormComponent, LoginFormComponent, EqualValidator ],
  exports: [ ClientsComponent]
})
export class ClientsModule { }
