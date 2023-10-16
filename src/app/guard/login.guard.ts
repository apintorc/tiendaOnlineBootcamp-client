import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../services/login.service';

import { inject } from '@angular/core';

 

 

export const loginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const rolespermitidos = route.data['expectedRol'];
  if (inject(LoginService).isLogado && rolespermitidos.indexOf(inject(LoginService).role) != -1) {
    return true;
  } else {
    alert("No tienes permisos");
    return false;
  }
};

/** 
export function authenticationGuard(): CanActivateFn {
  return () => {
    const oauthService: LoginService = inject(LoginService);
    
    if (oauthService.isLogado ) {
      return true;
    }
    //oauthService.logarse();
    return false;
  };
}*/