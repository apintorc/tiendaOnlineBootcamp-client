import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategoria } from '../interface/icategoria';
import { Iproducto } from '../interface/iproducto';
import { Compra } from '../model/Compra';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url: string = "http://localhost:8080/api/tiendaonline";
  public categoriasEnMemoria : Icategoria[] = new Array;
  public categoriasCargadas : boolean = false;

  constructor(private _http: HttpClient) { }

  public listAllCategorias():Observable<Icategoria[]>{
    this.categoriasCargadas = true;
    return this._http.get<Icategoria[]>(this.url+"/categorias");
  }

  public getProductosByCategoria(idCategoria:number):Observable<Iproducto[]>{
    return this._http.get<Iproducto[]>(this.url+"/productos/"+idCategoria);
  }

  public comprar(compra:Compra):Observable<number>{
    return this._http.post<number>(this.url+"/comprar",compra);
  }

  public getCategoriaById(idCategoria:number):Observable<Categoria>{
    return this._http.get<Categoria>(this.url+"/"+idCategoria);
  }

  public addCategoria(categoria:Categoria):Observable<number>{
    return this._http.post<number>(this.url,categoria);
  }
}
