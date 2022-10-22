import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formRegister: FormGroup;
  Usuario: any;
  constructor(private router:Router, private fb:FormBuilder, private servicio:UserService) { 
    this.formLogin = this.fb.group({
      email: [''],
      password: ['']
    });
    this.formRegister = this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      password: [''],
      address: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    //validar si existe el usuario en el localStorage
    if(localStorage.getItem('token')){
      this.router.navigate(['/shop/main-user']);
    }else{
    }
    
  }

  register(){
    //obtener los datos del formulario
    let name = this.formRegister.get('name')?.value;
    let lastname = this.formRegister.get('lastname')?.value;
    let email = this.formRegister.get('email')?.value;
    let password = this.formRegister.get('password')?.value;
    let address = this.formRegister.get('address')?.value;
    let phone = this.formRegister.get('phone')?.value;
    let role = 'user';
    //crear el objeto usuario
    this.Usuario = { name, lastname, email, password, address, phone, role };

    this.servicio.registerUser(this.Usuario).subscribe((data:any)=>{
      //validar si el usuario se registro correctamente
        console.log(data);
        
        alert('Usuario registrado correctamente, proceda a iniciar sesión');
        this.formRegister.reset();
        this.router.navigate(['/shop/login']);
      
    },(error:any)=>{
      //obtener el error
      let mensaje = error.error.message;
      alert(mensaje);
      console.log(error);
    });
  }
  login(){
    //obtener el email y password del formulario
    let email = this.formLogin.get('email')?.value;
    let password = this.formLogin.get('password')?.value;
    
    this.servicio.getUser(email, password).subscribe((data:any)=>{

      
      //obtener el usuario
        this.Usuario = data.user;
        //guardar el usuario en el localStorage
        localStorage.setItem('token', this.Usuario._id);
        //guardar el usuario completo en el localStorage y sustituir la contraseña encryptada por la contraseña original
        this.Usuario.password = password;
        localStorage.setItem('user', JSON.stringify(this.Usuario));
        this.router.navigate(['/shop/main-user']);
        
       
    },(error:any)=>{
      //obtener el error
      let mensaje = error.error.message;
      alert(mensaje);
      console.log(error);
    });
  }

}
