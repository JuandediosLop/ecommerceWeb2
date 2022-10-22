import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pedidos:any = [];
  Productos:any = [];
  idProductos:any = [];
  productosFinal:any = [];
  pedidoFinal:any = [];
  foto: string = 'http://localhost:3000/';
  contador: number = 0;
  
  constructor( private servicio:OrderService, private servicioProducto: ProductService) { }

  ngOnInit(): void {
    //obtener el token del localstorage
    let token = localStorage.getItem('token');
    //llamar al servicio
    this.servicio.getOrdersByUser(token).subscribe(
      (response:any) => {
        
        this.pedidos = response;
        this.pedidos.forEach((pedido:any) => {
          this.contador++;
          pedido.contador = this.contador;
        });

        
        
        this.Productos = this.pedidos.map((pedido:any) =>
        pedido.products );
  
        
        this.idProductos = this.Productos.map((producto:any) =>{ 
            return producto.map((id:any) => id.product)
        });
    
        this.idProductos.forEach((id:any) => {
          id.forEach((id:any) => {
            this.servicioProducto.getProductById(id).subscribe(
              (response:any) => {
                this.productosFinal.push(response);
                //llenar el pedidos con los productos
                this.pedidos.forEach((pedido:any) => {
                  
                  pedido.products.forEach((producto:any) => {
                   
                    if(producto.product == response._id){
                      producto.productSales = producto.product
                      producto.product =  response;

                    }
                  })
                  
                  
                });

                
              }
            )
          })
        });
        
      }, (error:any) => {
        console.log(error);
      });
    
    
     
  }

}
