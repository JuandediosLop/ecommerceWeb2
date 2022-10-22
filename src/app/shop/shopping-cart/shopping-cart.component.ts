import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productos: any = [];
  foto:string = 'http://localhost:3000/';
  totalVenta: any[] = [];
  total: number = 0;
  stockFinal:any = [];
  constructor(private servicio:ProductService, private router:Router, private servicioOrden:OrderService) { }

  ngOnInit(): void {
    //validar si no existe el carrito en el localStorage
    if(!localStorage.getItem('carrito')){
      alert('No hay productos en el carrito');
      this.router.navigate(['/shop']);
    }else{
         //obtener el carrito del localStorage
    this.productos = JSON.parse(localStorage.getItem('carrito') || '{}');
    
    //calcular el total y agregarlo al objeto
    this.productos.total = this.productos.reduce((total:number, producto:any) => {
      return total + (producto.price * producto.cantidadComprar);

    },0);

    //guardar el total de la venta de cada producto
    this.productos.forEach((producto:any) => {
      this.totalVenta.push(producto.totalProducto);
    }
    );

    //sumar el array de total venta y guardarlo en total
    this.total = this.totalVenta.reduce((total:number, venta:number) => {
      return total + venta;
    }
    );

    }
   
  }

  bajarCantidad(producto:any){
    producto.cantidadComprar--;
    if(producto.cantidadComprar < 1){
      producto.cantidadComprar = 1;
    }
    producto.totalProducto = producto.cantidadComprar * producto.price;
    this.totalVenta = [];
    this.productos.forEach((producto:any) => {
      this.totalVenta.push(producto.totalProducto);
    }
    );
    this.total = this.totalVenta.reduce((total:number, venta:number) => {
      return total + venta;
    }
    );
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }
  subirCantidad(producto:any){
    producto.cantidadComprar++;
    //validar que el stock sea mayor a la cantidad a comprar
    this.servicio.getCheckStock(producto._id).subscribe((data:any) => {
      if(producto.cantidadComprar > data.stock){
        alert('No hay stock suficiente, solo disponibles ' + data.stock + ' unidades de este producto');
        producto.cantidadComprar = data.stock;
      } else{
        producto.totalProducto = producto.cantidadComprar * producto.price;
        this.totalVenta = [];
        this.productos.forEach((producto:any) => {
      
          this.totalVenta.push(producto.totalProducto);
        }
        );
        this.total = this.totalVenta.reduce((total:number, venta:number) => {

          return total + venta;
        }
        );
        localStorage.setItem('carrito', JSON.stringify(this.productos));
      }
    });
    
  }
  eliminarProducto(producto:any){
    const index = this.productos.indexOf(producto);
    this.productos.splice(index, 1);
    this.totalVenta = [];
    this.productos.forEach((producto:any) => {
      this.totalVenta.push(producto.totalProducto);
    }
    );
    if(this.totalVenta.length == 0){
      this.total = 0;
    }else{
      this.total = this.totalVenta.reduce((total:number, venta:number) => {
        return total + venta;
      }
      );
    }
 
    console.log(this.productos, this.productos.length);
    
    if(this.productos.length == 0){
      localStorage.removeItem('carrito');
      alert('El carrito se ha vaciado');
      this.router.navigate(['/shop']);

    }else{
      localStorage.setItem('carrito', JSON.stringify(this.productos));
    }
  }
  relizarCompra():void{
    if(!localStorage.getItem('token')){
      alert('Para realizar la compra debe iniciar sesión');
      this.router.navigate(['/shop/login']);
    }else{
      //obtener el id del usuario
      const idUsuario =localStorage.getItem('token') ;
      
      //obtener el carrito del localStorage
      const carrito = JSON.parse(localStorage.getItem('carrito') || '{}');
      console.log(carrito);
      
      //obtener del carrito el id de los productos y la cantidad a comprar
      const productos = carrito.map((producto:any) => {
        return {
          product: producto._id,
          quantity: producto.cantidadComprar
        }
      });

      //obtener el stock de cada producto del carrito y restarle la cantidad a comprar de cada producto
      this.stockFinal = carrito.map((producto:any) => {
        return {
          product: producto._id,
          quantity: producto.cantidadComprar,
          stock: producto.stock - producto.cantidadComprar

        }
      });
      console.log(this.stockFinal, 'stock');
      

      
      
      //obtener el total de la venta
      const totalFin = this.total;
      //crear el objeto de la orden
      const orden = {
        user: idUsuario,
        //obtener solo el id y quantity de la variable stock
        products: this.stockFinal.map((producto:any) => {
          return {
            product: producto.product,
            quantity: producto.quantity
          }
        }),
        status: 'pending',
        total: totalFin
    
      }
      console.log(idUsuario, 'user');
      console.log(orden.products, 'productos');
      console.log(orden.total, 'total');
      console.log(orden.status, 'status');
      
      
      
      
      //enviar el objeto a la api
      this.servicioOrden.newOrder(orden.user, orden.products,orden.total, orden.status ).subscribe((data:any) => {
        alert(data.message);
        
        this.stockFinal.forEach((producto:any) => {
          this.servicio.updateStock(producto.product, producto.stock).subscribe((data:any) => {
            console.log(data);
          });
        });
        localStorage.removeItem('carrito');
        alert('Compra realizada con éxito');
        this.router.navigate(['/shop']);
      }, (error:any) => {
        console.log(error);
      } );

     
    }
  }
}
