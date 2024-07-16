import { Component, OnInit } from '@angular/core';
import {Medico} from "../model/medico";
import {MedicosService} from "../services/medicos.service";
import {Observable, of, pipe} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/components/error-dialog/error-dialog.component";
import {ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "../../shared/components/confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {

  medicos$: Observable<Medico[]> | null = null;
  constructor(
    private medicosService: MedicosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh(){
    this.medicos$ = this.medicosService.list()
        .pipe(
            catchError(error => {
              this.onError('Erro ao carregar medicos.');
              return of([])
            })
        );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  ngOnInit(): void {

  }

  onAdd(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }

  onEdit(medico: Medico){
    this.router.navigate(['edit', medico.idmed],{relativeTo: this.route})
  }

  onRemove(medico: Medico){

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Tem certeza que deseja remover?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.medicosService.remove(medico.idmed).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Medico removido com sucesso','X',{
              duration: 4000,
              verticalPosition:'top',
              horizontalPosition:'center'
            });
          },
          () => this.onError('erro ao tentar remover')
        );
      }
    });
  }

}
