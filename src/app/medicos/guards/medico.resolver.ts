import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {MedicosService} from "../services/medicos.service";
import {Medico} from "../model/medico";

@Injectable({
  providedIn: 'root'
})
export class MedicoResolver implements Resolve<Medico> {

  constructor(private service: MedicosService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Medico> {
    if (route.params && route.params['idmed']){
      return this.service.loadById(route.params['idmed']);
    }
    return of({idmed: '', registro: '', iduser: 1,email: '', cpf: '',nome_completo: '',telefone: '',senha:'',permissao:'',status:''});
  }
}
