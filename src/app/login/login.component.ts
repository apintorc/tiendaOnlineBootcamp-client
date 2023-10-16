import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoginService } from '../services/login.service';
import { Usuario } from '../model/Usuario';
import { Router } from '@angular/router';
import { Item } from '../model/Item';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor (public loginService:LoginService, public router:Router){}
  editMode: boolean = true;
  initial: boolean = true;
  myMap = new Map<string,string>();
  carrito:Item[] = [];
  login_formulario = new FormGroup({
    user: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
  });

  ngOnInit(): void {
    this.myMap.set('USER','categorias');
    this.myMap.set('ADMIN','menuAdmin');
    this.myMap.set('USER1','categorias');
  }
 
  submit(){
    let usuario:Usuario = new Usuario(this.login_formulario.get('user')?.value||'',this.login_formulario.get('password')?.value||'','');
    this.loginService.logarse(usuario).subscribe(response => {
      if(response == null){
        alert("Usuario no registrado!");
      }else{
        sessionStorage.setItem('carrito', JSON.stringify(this.carrito)|| '{}');
        sessionStorage.setItem('user', JSON.stringify(this.login_formulario.get("user")?.value||'')|| '{}');        this.loginService.role = response.role;
        this.router.navigate([this.myMap.get(response.role)]);
        /**if(response.role == 'USER'){
          this.router.navigate(["categorias"]);
        }else{
          this.router.navigate(["gestionProductos"]);
        }*/

      }
    });
    
  }
}