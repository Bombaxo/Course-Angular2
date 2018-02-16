import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MovementsModule } from './movements/movements.module';
import { MovementsComponent } from './movements/movements.component';
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


// Main navigation in app.component
// Routes definitions
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cash-flow', component: MovementsComponent },
  { path: 'parameter', component: ParameterComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'parameter/:value', component: ParameterComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'modalbox', component: ModalboxComponent },
  { path: 'messages', component: ToastComponent },
  { path: 'loading-bar', component: SlimComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);