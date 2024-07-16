import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedicosComponent} from "./medicos/medicos.component";
import {MedicoFormComponent} from "./medico-form/medico-form.component";
import {MedicoResolver} from "./guards/medico.resolver";

const routes: Routes = [
  { path: '', component: MedicosComponent},
  { path: 'new', component: MedicoFormComponent, resolve: {medico: MedicoResolver}},
  { path: 'edit/:idmed', component: MedicoFormComponent, resolve: {medico: MedicoResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
