import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent implements OnInit {
  user:any;
  constructor( private router:Router, private servicio: UserService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    //validar si existe el usuario en el localStorage
    if(!localStorage.getItem('token')){
      alert('Debe iniciar sesión para acceder a esta sección');
      this.router.navigate(['/shop/login']);
    } else{
      //obtener el token del localStorage
      
      this.servicio.getUserById(token).subscribe((data:any)=>{
        this.user = data;

      },(error:any)=>{
        //obtener el error
        let mensaje = error.error.message;
        alert(mensaje);
        console.log(error);
      });
    }
    

  }

  irPerfil(){
    this.router.navigate(['/shop/profile-user']);
  }
  irOrdenes(){
    this.router.navigate(['/shop/orders']);
  }
  cerrarSesion(){
    //eliminar el token y user del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/shop/login']);
  }
}
