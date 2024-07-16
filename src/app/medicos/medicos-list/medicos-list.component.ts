import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Medico} from "../model/medico";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-medicos-list',
  templateUrl: './medicos-list.component.html',
  styleUrls: ['./medicos-list.component.scss']
})
export class MedicosListComponent implements OnInit {

  @Input() medicos: Medico[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['nome_completo','email','registro','actions'];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(medico: Medico){
    this.edit.emit(medico);
  }

  onDelete(medico: Medico){
    this.remove.emit(medico);
  }


}
