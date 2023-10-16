import { Component } from '@angular/core';
import { TiendaService } from '../services/tienda.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-gestion-categorias',
  templateUrl: './gestion-categorias.component.html',
  styleUrls: ['./gestion-categorias.component.css']
})
export class GestionCategoriasComponent {
  initial:boolean = true;
  constructor(public _tiendaService:TiendaService, public router:Router) {}

  categoria_formulario = new FormGroup({

    idCategoria:new FormControl('',Validators.required),

    descripcion:new FormControl('',Validators.compose([

      Validators.required,

      Validators.maxLength(20),

     ])),

  })

 

  categoriaSubmit() {
    let categoria:Categoria = new Categoria(
      parseInt(this.categoria_formulario.get("idCategoria")?.value||''),
      this.categoria_formulario.get("descripcion")?.value||'',
    );

    this._tiendaService.getCategoriaById(categoria.idCategoria).subscribe(response=>{
      if(response==null){
        this._tiendaService.addCategoria(categoria).subscribe(response=>{
          if(response==0){
            alert("Categoria insertada correctamente");
          }else{
            alert("La categoria no se ha podido insertar");
          }
        })
      }else{
        alert("La categoría insertada ya existe, pruebe con otra");
      }
    })
  }

}