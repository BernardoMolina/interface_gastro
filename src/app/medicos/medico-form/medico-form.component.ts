import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MedicosService} from "../services/medicos.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Location  } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {Medico} from "../model/medico";

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.component.html',
  styleUrls: ['./medico-form.component.scss']
})
export class MedicoFormComponent implements OnInit {

  form =  this.formBuilder.group({
      idmed: [''],
      registro:[''],
      email:[''],
      nome_completo:[''],
      senha:[''],
      status:[''],
      permissao:[''],
      cpf:[''],
      telefone:['']

  });

  constructor(private formBuilder: FormBuilder,
              private service: MedicosService,
              public snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const medico: Medico = this.route.snapshot.data['medico'];
    this.form.setValue({
      idmed: medico.idmed,
      registro: medico.registro,
      email: medico.email,
      nome_completo: medico.nome_completo,
      senha:medico.senha,
      status:medico.status,
      permissao:medico.permissao,
      cpf:medico.cpf,
      telefone:medico.telefone

    })
  }

    enviarDados() {
        // Transforme os valores do formulário
        if(this.form.value.idmed == null){
            const formValue = this.form.value;
            const dados = {
                registro: formValue.registro,
                usuario: {
                    idus: 5
                }
            };
          const dados2 = {
            email: formValue.email,
            senha: formValue.senha,
            permissao:"medico",
            nome_completo:formValue.nome_completo,
            cpf:formValue.cpf,
            telefone:formValue.telefone,
            status:"ativo"
          };
            this.service.enviarDados(dados,dados2).subscribe(result => this.onSuccess(), error => this.onError());
        }else{
            const formValue = this.form.value;
            const dados = {
                idmed: formValue.idmed,
                registro: formValue.registro,

            };
          const dados2 = {
            idus: 5,
            email: formValue.email,
            senha: formValue.senha,
            permissao:"medico",
            nome_completo:formValue.nome_completo,
            cpf:formValue.cpf,
            telefone:formValue.telefone,
            status:"ativo"
          };
            this.service.enviarDados(dados,dados2).subscribe(result => this.onSuccess(), error => this.onError());
        }



    }

  onSubmit(){
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
      this.snackBar.open('Medico salvo com sucesso','',{duration: 4000});
      this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar medico','',{duration: 4000});
  }
}


