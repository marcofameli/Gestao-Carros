import { CanActivateFn } from '@angular/router';
import {LoginService} from './login.service';
import {inject} from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  if (loginService.hasPermission("USER") && state.url == "/admin/proprietarios") {
    return false;
  }


  return true;
};
