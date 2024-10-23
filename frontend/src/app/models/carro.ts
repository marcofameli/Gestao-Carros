import {Marca} from './marca';
import {Proprietario} from './proprietario';

export class Carro {
  id! : number;
  nome!: string;
  marca!: Marca;
  proprietarios: Proprietario[] = [];

  constructor(id: number, nome: string, marca: Marca | null) {
    this.id = id;
    this.nome = nome;
    if (marca) this.marca = marca;
  }
}
