// Imports common utils of framework
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Imports modules and components - including the root component
import { AppComponent } from './app.component';
import { MovementsModule } from './movements/movements.module';
import { MovementsComponent } from './movements/movements.component';
import { HomeComponent } from './home/home.component';
import { ModalboxModule } from './modalbox/modalbox.module';
import { ModalboxComponent } from './modalbox/modalbox.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ClientsModule } from './clients/clients.module';
import { ClientsComponent} from './clients/clients.component';
import { DialogModule } from './shared/utils/dialog/dialog.module';
import { ToastyModule } from 'ng2-toasty';
import { ToastComponent } from './shared/utils/toast/example/toast.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SlimComponent } from './shared/utils/slim/example/slim.component';
import { SecurityComponent } from './security/security.component';
// Import services
import { HttpToolsService } from './shared/http.service';
import { SecurityService } from './security/security.service';
import { DialogsService } from './shared/utils/dialog/dialogs.service';
import { ToastService } from './shared/utils/toast/toast.service';
// Import routing of app
import { routing } from './app.routing';
// Material design
import { MaterialModule } from '@angular/material';
// Browser animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Decorator to define module
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParameterComponent,
    SecurityComponent,
    ToastComponent,
    SlimComponent,
  ],  // Declaration in this module
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MovementsModule,
    ModalboxModule,
    ClientsModule,
    DialogModule,
    routing,
    ToastyModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpToolsService,
    SecurityService,
    DialogsService,
    ToastService
  ],  // Inyection of common services
  bootstrap: [AppComponent] // Root component to init
})
export class AppModule { }
