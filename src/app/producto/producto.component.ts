import { Component, OnInit } from '@angular/core';
import { Iproducto } from '../interface/iproducto';
import { TiendaService } from '../services/tienda.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Item } from '../model/Item';
import { Compra } from '../model/Compra';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Iproducto[] = [];
  idCategoria: number = 0;
  descripcion: string | null | undefined;
  carrito: Item[] = [];
  verCarrito:boolean = false;
  
  constructor(public tiendaService: TiendaService,
    public loginService: LoginService,
    public activatedRouter: ActivatedRoute,
    public route: Router) { }

  ngOnInit(): void {
    this.carrito= JSON.parse(sessionStorage.getItem("carrito")|| '{}');
    this.activatedRouter.paramMap.subscribe(
      (parametros: ParamMap) => {
        this.idCategoria = parseInt(parametros.get("idCategoria") || ""); //nombre que le hemos puesto en el archivo de rutas
        this.descripcion = parametros.get("descripcion");
        this.tiendaService.getProductosByCategoria(this.idCategoria).subscribe(promise => {
          this.productos = promise;
        })
      })
  }
  add(producto: Iproducto) {
    this.carrito= JSON.parse(sessionStorage.getItem("carrito")|| '{}');

    const itemIndex = this.carrito.findIndex((item) => item.idProducto === producto.idProducto);
    if (itemIndex !== -1) {
      this.carrito[itemIndex].cantidad += 1;
    } else {
      const newItem = new Item(producto.idProducto, producto.descripcion, producto.precio, 1);
      this.carrito.push(newItem);
    }
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito)|| '{}');

  }

  

  remove(item: Item) {
    this.carrito= JSON.parse(sessionStorage.getItem("carrito")|| '{}');
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad -= 1;
      } else {
        this.carrito.splice(index, 1);
      }
    }
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito)|| '{}');
  }

  decrementItem(item: Item) {
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad -= 1;
      } else {
        this.carrito.splice(index, 1);
      }
    }
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito) || '{}');

  }
  
  incrementItem(item: Item) {
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      this.carrito[index].cantidad += 1;
    }
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito) || '{}');

  }

  getTotalPrice(): number {
    let totalPrice = 0;
  
    for (const item of this.carrito) {
      totalPrice += item.cantidad * item.precio;
    }
  
    return totalPrice;
  }

  getTotalNumberCarrito(): number {
    let total = 0;
  
    for (const item of this.carrito) {
      total = this.carrito.length;
    }
  
    return total;
  }
  
  delete(item:number){
    this.carrito= JSON.parse(sessionStorage.getItem("carrito")|| '{}');
    this.carrito.splice(item, 1);
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito)|| '{}');
  }

  comprar(){
    //mandar carrito y usuario al BACK y crear una pantalla con los datos de la compra
    this.carrito= JSON.parse(sessionStorage.getItem("carrito")|| '{}');
    let user= JSON.parse(sessionStorage.getItem("user")|| '{}');

    let compra:Compra = new Compra(user,this.carrito);
    this.tiendaService.comprar(compra).subscribe(response=>{
      if(response == 0){
        alert("Compra realizada correctamente");
      }else{
        alert("No se ha podido realizar la compra");
      }
      this.eliminarCarrito();
      sessionStorage.clear();
      //sessionStorage.setItem('user', JSON.stringify("")|| '{}');
      this.loginService.isLogado=false;
      this.loginService.role='';
      this.route.navigate(["/"]);
    }
      );

  }
  eliminarCarrito(){
    this.carrito= JSON.parse(sessionStorage.getItem("carrito")|| '{}');
    this.carrito = [];
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito)|| '{}');
  }

  verOcultarCarrito(){
    this.verCarrito = !this.verCarrito; 
  }

  goBack() {
    this.route.navigate(["/categorias"]);
  }
}
