import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {Carro} from '../../../models/carro';
import {RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {CarrosdetailsComponent} from '../carrosdetails/carrosdetails.component';
import {CarroService} from '../../../services/carro.service';
import {Marca} from '../../../models/marca';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, '', new Marca(0, ''));


  modalService = inject(MdbModalService);
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);

  constructor() {
    this.listAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }

    if (carroEditado) {
      let indice = this.lista.findIndex(x => {
        return x.id == carroEditado.id
      });
      this.lista[indice] = carroEditado;
    }

  }

  listAll() {
    this.carroService.listAll().subscribe({
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


  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza que desejar excluir o ' + carro.nome + '?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim, quero deletar',

    }).then((result) => {
      if (result.isConfirmed) {

        this.carroService.delete(carro.id).subscribe({
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
    this.carroEdit = new Carro(0, '', new Marca(0, ''));
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro) {
    this.carroEdit = carro;
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro) {

    this.listAll();
    this.modalRef.close();
  }
}
