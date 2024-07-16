import { Injectable } from '@angular/core';
import {Medico} from "../model/medico";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {delay, first, switchMap, tap} from "rxjs/operators";
import {ɵElement, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private readonly API = 'clinica-gastro/medico';
  private readonly API2 = 'clinica-gastro/usuario';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Medico[]>(this.API)
      .pipe(
        first(),
        delay(3000),
        tap(medicos => console.log(medicos))
      );
  }

  loadById(idmed:String){
    return this.httpClient.get<Medico>(`${this.API}/${idmed}`);
  }

  save(record: ɵTypedOrUntyped<{ [K in keyof { iduser: number[]; registro: string[] }]: ɵElement<{ iduser: number[]; registro: string[] }[K], null> }, ɵFormGroupValue<{ [K in keyof { iduser: number[]; registro: string[] }]: ɵElement<{ iduser: number[]; registro: string[] }[K], null> }>, any>){
    return this.httpClient.post<Medico>(this.API,record);
  }
    enviarDados(dados: any,dados2: any) {
      console.log(dados)
      if( dados.idmed){
        console.log('update');
        return this.updateUsuarioAndMedico(dados,dados2);
      }
      console.log('create');
      return this.createUsuarioAndMedico(dados,dados2);
    }

  createUsuarioAndMedico(dados: any, dados2: any){
    return this.create2(dados2).pipe(
      switchMap(usuario => {

        dados.usuario = { idus: usuario.idus };
        return this.create(dados);
      })
    );
  }

  updateUsuarioAndMedico(dados: any, dados2: any){
    return this.update(dados).pipe(
      switchMap(medico => {
        console.log(medico)
        dados2.idus = medico.iduser ;
        return this.update2(dados2);
      })
    );
  }

    private create(dados: any){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post<any>(this.API, dados, { headers });
    }
    private create2(dados2: any){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.post<any>(this.API2, dados2, { headers });
    }

    private update(dados: any){

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.httpClient.put<any>(this.API, dados, { headers });
    }
  private update2(dados2: any){
    console.log(dados2)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(this.API2, dados2, { headers });
  }

    remove(idmed: string){
    return this.httpClient.delete(`${this.API}/${idmed}`);
    }



}
