import {Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {Proprietario} from '../../../models/proprietario';
import {RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {ProprietariosdetailsComponent} from '../proprietariosdetails/proprietariosdetails.component';
import {ProprietarioService} from '../../../services/proprietario.service';




@Component({
  selector: 'app-proprietarioslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, ProprietariosdetailsComponent],
  templateUrl: './proprietarioslist.component.html',
  styleUrl: './proprietarioslist.component.scss'
})
export class ProprietarioslistComponent {

  lista: Proprietario[] = [];
  proprietarioEdit: Proprietario = new Proprietario(0, '');

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild('modalProprietarioDetalhe') modalProprietarioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  proprietarioService = inject(ProprietarioService);

  constructor() {
    this.listAll();

    let proprietarioNovo = history.state.proprietarioNovo;
    let proprietarioEditado = history.state.proprietarioEditado;

    if (proprietarioNovo) {
      proprietarioNovo.id = 555;
      this.lista.push(proprietarioNovo);
    }

    if (proprietarioEditado) {
      let indice = this.lista.findIndex(x => {
        return x.id == proprietarioEditado.id
      });
      this.lista[indice] = proprietarioEditado;
    }

  }

  listAll() {
    this.proprietarioService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: 'ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });

  }


  deleteById(proprietario: Proprietario) {
    Swal.fire({
      title: 'Tem certeza que desejar excluir o ' + proprietario.nome + '?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim, quero deletar',

    }).then((result) => {
      if (result.isConfirmed) {

        this.proprietarioService.delete(proprietario.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.listAll();
          },
          error: erro => {
            Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          }
        });
      }
    })


  }


  new() {
    this.proprietarioEdit = new Proprietario(0, '')
    this.modalRef = this.modalService.open(this.modalProprietarioDetalhe);
  }

  edit(proprietario: Proprietario) {
    this.proprietarioEdit = proprietario;
    this.modalRef = this.modalService.open(this.modalProprietarioDetalhe);
  }

  retornoDetalhe(proprietario: Proprietario) {

    this.listAll();
    this.modalRef.close();
  }

  select(proprietario: Proprietario){
    this.retorno.emit(proprietario);
  }
}
