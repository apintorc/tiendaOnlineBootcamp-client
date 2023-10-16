import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { loginGuard } from './guard/login.guard';
import { MantenimientoProductosComponent } from './mantenimiento-productos/mantenimiento-productos.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';

const routes: Routes = [
  {path: '',component:LoginComponent },
  {path: 'categorias',component:CategoriaComponent,canActivate: [ loginGuard], data:{expectedRol:['USER']}},
  {path: 'productos/:idCategoria/:descripcion',component:ProductoComponent,canActivate: [ loginGuard], data:{expectedRol:['USER']}},
  {path: 'gestionProductos',component:MantenimientoProductosComponent,canActivate: [ loginGuard], data:{expectedRol:['ADMIN']}},
  {path: 'gestionCategorias',component:GestionCategoriasComponent,canActivate: [ loginGuard], data:{expectedRol:['ADMIN']}},
  {path: 'menuAdmin',component:MenuAdminComponent,canActivate: [ loginGuard], data:{expectedRol:['ADMIN']}},
  {path: '**',redirectTo:'/' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
