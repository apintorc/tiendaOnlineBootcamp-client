import { Component, OnInit } from '@angular/core';
import { Icategoria } from '../interface/icategoria';
import { TiendaService } from '../services/tienda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias:Icategoria[]=[];
  constructor(
    public tiendaService:TiendaService,
    public router:Router
    ){}

  ngOnInit(): void {
    if(this.tiendaService.categoriasCargadas == true){
      this.categorias = this.tiendaService.categoriasEnMemoria;
    }else{
      this.loadCategorias();
    }
    
  }

  loadCategorias(){
    this.tiendaService.listAllCategorias().subscribe(res=>{
      this.categorias=res;
      this.tiendaService.categoriasEnMemoria = res;
    });

  }

  onSelect(categoria:Icategoria){
    this.router.navigate(["/productos/"+categoria.idCategoria+"/"+categoria.descripcion]);
  }
}
