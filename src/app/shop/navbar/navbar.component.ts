import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  productosCarrito: any[] = [];
  cantidadProductos: number = 0;
  carrito: boolean = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.productosCarrito = JSON.parse(localStorage.getItem('carrito') || '{}');

    this.cantidadProductos = this.productosCarrito.length;

    //validar si estoy en /shop/carrito
    if(this.router.url == '/shop/carrito'){
      this.cantidadProductos = 0;
      this.carrito = true;
    }
    //validar si existe el carrito en el localStorage
    if(!localStorage.getItem('carrito')){
      this.carrito = true;
    }
  }
  validar(){
    //validar si existe el carrito en el localStorage
    if(localStorage.getItem('carrito')){
      this.router.navigate(['/shop/carrito']);
    }else{
      alert('No hay productos en el carrito');
    }
  }

}
