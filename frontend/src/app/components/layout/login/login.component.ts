import {Component, inject} from '@angular/core';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {FormsModule, NgModel} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../auth/login.service';
import {Login} from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();
  usuario!: string;
  senha!: string;

  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) {
          this.loginService.addToken(token);
          this.router.navigate(['/admin/carros']);
        } else {
          alert("usuario ou senha incorretos");
        }
      },
      error: error => {
        alert("deu erro");
        console.error('erro no login', error);
      }
    });

  }


}
