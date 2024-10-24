import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';
import {environment} from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  // API = environment.SERVIDOR+"/api/login";
  API = "http://localhost:8080/api/login";


  constructor() { }

  // ADICIONADO AGORA
  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, { responseType: 'text' as 'json' })
      .pipe(
        tap(token => {
          // Armazenando o token no localStorage
          this.addToken(token);
        }),
        catchError(error => {
          // Lidar com erros de autenticação
          console.error('Erro ao fazer login', error);
          return throwError(() => new Error('Erro ao fazer login'));
        })
      );
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role == role)
      return true;
    else
      return false;
  }

  getUsuarioLogado () {
    return this.jwtDecode() as Usuario;
  }


}
