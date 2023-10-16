import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { MantenimientoProductosComponent } from './mantenimiento-productos/mantenimiento-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    LoginComponent,
    ProductoComponent,
    MantenimientoProductosComponent,
    MenuAdminComponent,
    GestionCategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
