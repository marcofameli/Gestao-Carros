// import {Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild} from '@angular/core';
// import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
// import {FormsModule} from '@angular/forms';
// import {Carro} from '../../../models/carro';
// import {ActivatedRoute, Router} from '@angular/router';
// import Swal from "sweetalert2";
// import {CarroService} from '../../../services/carro.service';
// import {Marca} from '../../../models/marca';
// import {MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
// import {MarcaslistComponent} from '../../marcas/marcaslist/marcaslist.component';
// import {Proprietario} from '../../../models/proprietario';
// import {ProprietarioslistComponent} from '../../proprietarios/proprietarioslist/proprietarioslist.component';
//
// @Component({
//   selector: 'app-carrosdetails',
//   standalone: true,
//   imports: [MdbFormsModule, FormsModule, MarcaslistComponent, ProprietarioslistComponent],
//   templateUrl: './carrosdetails.component.html',
//   styleUrl: './carrosdetails.component.scss'
// })
// export class CarrosdetailsComponent {
//
//   @Input("carro") carro: Carro = new Carro(0, '', null);
//   @Output("retorno") retorno = new EventEmitter<any>();
//   router = inject(ActivatedRoute);
//   router2 = inject(Router);
//
//
//   modalService = inject(MdbModalService);
//   @ViewChild('modalMarcas') modalMarcas!: TemplateRef<any>;
//   @ViewChild('modalProprietarios') modalProprietarios!: TemplateRef<any>;
//   modalRef!: MdbModalRef<any>;
//
//
//   carroService = inject(CarroService);
//
//   constructor() {
//     let id = this.router.snapshot.params['id'];
//     if (id > 0) {
//       this.findById(id);
//     }
//   }
//
//
//   findById(id: number) {
//     this.carroService.findById(id).subscribe({
//       next: retorno => {
//         this.carro = retorno;
//       },
//       error: erro => {
//         Swal.fire({
//           title: 'Ocorreu um erro',
//           icon: 'error',
//           confirmButtonText: 'Ok'
//         });
//       }
//     })
//   }
//
//   save() {
//     if (this.carro.id > 0) {
//       this.carroService.update(this.carro, this.carro.id).subscribe({
//         next: mensagem => {
//           Swal.fire({
//             title: mensagem,
//             icon: 'success',
//             confirmButtonText: 'Ok',
//           });
//           this.router2.navigate(['admin/carros'], {state: {carroEditado: this.carro}});
//           this.retorno.emit(this.carro);
//         },
//         error: erro => {
//           Swal.fire({
//             title: 'Ocorreu um erro',
//             icon: 'error',
//             confirmButtonText: 'Ok',
//           });
//         }
//       });
//
//     } else {
//       this.carroService.save(this.carro).subscribe({
//         next: mensagem => {
//           Swal.fire({
//             title: mensagem,
//             icon: 'success',
//             confirmButtonText: 'Ok',
//           });
//           this.router2.navigate(['admin/carros'], {state: {carroNovo: this.carro}});
//           this.retorno.emit(this.carro);
//         },
//         error: erro => {
//           Swal.fire({
//             title: 'Ocorreu um erro',
//             icon: 'error',
//             confirmButtonText: 'Ok',
//           });
//         }
//       });
//
//     }
//   }
//
//   buscarMarcas() {
//     this.modalRef = this.modalService.open(this.modalMarcas, {modalClass: 'modal-lg'});
//   }
//
//   buscarProprietarios() {
//     this.modalRef = this.modalService.open(this.modalProprietarios, {modalClass: 'modal-lg'});
//   }
//
//   retornoMarca(marca: Marca) {
//     this.carro.marca = marca;
//     this.modalRef.close();
//   }
//
//   retornoProprietario(proprietario: Proprietario) {
//     if (this.carro.proprietarios == null) {
//       this.carro.proprietarios = [];
//     }
//
//     this.carro.proprietarios.push(proprietario);
//
//     this.modalRef.close();
//   }
//
//   desvincularProprietariodoCarro(proprietario: Proprietario) {
//
//     let posicao = this.carro.proprietarios.findIndex(x => { return x.id == proprietario.id })
//     this.carro.proprietarios.splice(posicao, 1);
//   }
//
//
// }
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";
import { CarroService } from '../../../services/carro.service';
import { Marca } from '../../../models/marca';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcaslistComponent } from '../../marcas/marcaslist/marcaslist.component';
import { Proprietario } from '../../../models/proprietario';
import { ProprietarioslistComponent } from '../../proprietarios/proprietarioslist/proprietarioslist.component';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent, ProprietarioslistComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrls: ['./carrosdetails.component.scss']  // Corrigido 'styleUrl' para 'styleUrls'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro(0, '', null);
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  modalService = inject(MdbModalService);
  @ViewChild('modalMarcas') modalMarcas!: TemplateRef<any>;
  @ViewChild('modalProprietarios') modalProprietarios!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  carroService = inject(CarroService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save() {
    if (this.carro.id > 0) {
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
          this.retorno.emit(this.carro);
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
      this.carroService.save(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
          this.retorno.emit(this.carro);
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

  buscarMarcas() {
    this.modalRef = this.modalService.open(this.modalMarcas, { modalClass: 'modal-lg' });
  }

  buscarProprietarios() {
    this.modalRef = this.modalService.open(this.modalProprietarios, { modalClass: 'modal-lg' });
  }

  retornoMarca(marca: Marca) {
    this.carro.marca = marca;
    this.modalRef.close();
  }

  retornoProprietario(proprietario: Proprietario) {
    if (!this.carro.proprietarios) {
      this.carro.proprietarios = [];
    }

    this.carro.proprietarios.push(proprietario);
    this.modalRef.close();
  }

  desvincularProprietariodoCarro(proprietario: Proprietario) {
    let posicao = this.carro.proprietarios.findIndex(x => x.id === proprietario.id);
    if (posicao !== -1) {
      this.carro.proprietarios.splice(posicao, 1);
    }
  }
}

