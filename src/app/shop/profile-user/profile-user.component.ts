import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  form: FormGroup;
  Usuario: any;
  constructor(private router:Router, private fb:FormBuilder, private servicio:UserService) { 

    this.form= this.fb.group({
      name: [''],
      lastname: [''],
      email: [''],
      password: [''],
      address: [''],
      phone: ['']
    });
  }
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    //obtener el usuario del localStorage
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    //obtener la contraseña del user
    let passwordDes = user.password;    
    this.servicio.getUserById(token).subscribe((data:any)=>{
      this.form.setValue({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: passwordDes,
        address: data.address,
        phone: data.phone
      });
    }
    ,(error:any)=>{
      console.log(error);
    }
    );
  }

  actualizar():void{

    let name = this.form.get('name')?.value;
    let lastname = this.form.get('lastname')?.value;
    let email = this.form.get('email')?.value;
    let password = this.form.get('password')?.value;
    let address = this.form.get('address')?.value;
    let phone = this.form.get('phone')?.value;
    let role = 'user';
    //crear el objeto usuario
    this.Usuario = { name, lastname, email, password, address, phone, role };
    //obtener el token del localStorage
    let token = localStorage.getItem('token');

    this.servicio.updateUser(token, this.Usuario).subscribe((data:any)=>{
      //validar si el usuario se registro correctamente
        console.log(data);
        
        alert('Usuario actualizado correctamente');
        this.form.reset();
        this.router.navigate(['/shop/main-user']);
      
    },(error:any)=>{
      //obtener el error
      console.log(error);
    });
  }
}
