import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosComponent } from './medicos/medicos.component';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {SharedModule} from "../shared/shared.module";
import { MedicoFormComponent } from './medico-form/medico-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicosListComponent } from './medicos-list/medicos-list.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    MedicosComponent,
    MedicoFormComponent,
    MedicosListComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MedicosModule { }
