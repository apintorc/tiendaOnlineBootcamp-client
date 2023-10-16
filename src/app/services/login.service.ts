import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogado: boolean = false;
  private url: string = "http://localhost:8080/api/tiendaonline";
  public role:string="";
  constructor(
    public http:HttpClient
    ) { }

  logarse(usuario:Usuario):Observable<Usuario>{
    this.isLogado = true;
    return this.http.get<Usuario>(this.url+"/login/"+usuario.user+"/"+usuario.password);
  }
}
