import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Proprietario} from '../models/proprietario';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {
  http = inject(HttpClient);

  // API = environment.SERVIDOR+'/api/proprietario';
  API = "http://localhost:8080/api/proprietario";

  constructor() { }

  listAll(): Observable<Proprietario[]> {
    return this.http.get<Proprietario[]>(this.API+'/listAll');
  }

  delete(id:number): Observable<string> {
    return this.http.delete<string>(this.API+'/delete/'+id,{responseType : 'text' as 'json'});
  }

  save(proprietario:Proprietario): Observable<string> {
    return this.http.post<string>(this.API+'/save',proprietario,{responseType : 'text' as 'json'});
  }
  update(proprietario:Proprietario, id:number): Observable<string> {
    return this.http.put<string>(this.API+'/update/'+id,proprietario,{responseType : 'text' as 'json'});
  }

  findById(id:number): Observable<Proprietario> {
    return this.http.get<Proprietario>(this.API+'/findById/'+id);
  }

}
