import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {FormsModule} from '@angular/forms';
import {Proprietario} from '../../../models/proprietario';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {ProprietarioService} from '../../../services/proprietario.service';

@Component({
  selector: 'app-proprietariosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './proprietariosdetails.component.html',
  styleUrl: './proprietariosdetails.component.scss'
})
export class ProprietariosdetailsComponent {

  @Input("proprietario") proprietario: Proprietario = new Proprietario(0, '');
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  proprietarioService = inject(ProprietarioService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }else{
      if (this.proprietario.id > 0) {
        this.findById(id);
      }
    }
  }


  findById(id: number) {
    this.proprietarioService.findById(id).subscribe({
      next: retorno => {
        this.proprietario = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }

  save() {
    if (this.proprietario.id > 0) {
      this.proprietarioService.update(this.proprietario, this.proprietario.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/proprietarios'], {state: {proprietarioEditado: this.proprietario}});
          this.retorno.emit(this.proprietario);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });

    } else {
      this.proprietarioService.save(this.proprietario).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/proprietarios'], {state: {proprietarioNovo: this.proprietario}});
          this.retorno.emit(this.proprietario);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });

    }
  }
}
