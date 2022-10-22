import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.css']
})
export class HomeShopComponent implements OnInit {
  productos: any[] = [];
  foto: string = 'http://localhost:3000/';
  idProducto: string = '';
  carrito: any[] = [];
  
  constructor(private servicio: ProductService, private router:Router) { }

  ngOnInit(): void {

    this.servicio.getProducts().subscribe((resultado) => {
  
      this.productos = resultado;
    });

  }
  
  irProducto(id: string) {
    //enviar id al componente producto
    this.idProducto = id;
    this.router.navigate(['/shop/producto/', this.idProducto]);
  }

  agregarCarrito(id:string): void {
    this.idProducto = id;
    this.servicio.getProductById(this.idProducto).subscribe((resultado) => {
      //añadir un atributo cantidadComprar al resultado
      resultado.cantidadComprar = 1;
      //añadir un totalProducto al resultado
      resultado.totalProducto = resultado.cantidadComprar * resultado.price;
      //añadir al localstorage
      this.carrito.push(resultado);
      if (localStorage.getItem('carrito') === null) {
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        //recargar la pagina
        window.location.reload();
      }else{
        //si ya hay algo en el carrito, validar que no se repita el producto
        let carritoLS = JSON.parse(localStorage.getItem('carrito') || '{}');
        let repetido = false;
        for (let i = 0; i < carritoLS.length; i++) {
          if (carritoLS[i]._id === this.idProducto) {
            repetido = true;
          }
        }
        if (repetido === false) {
          carritoLS.push(resultado);
          localStorage.setItem('carrito', JSON.stringify(carritoLS));
          //recargar la pagina
          window.location.reload();
        }else{
          alert('El producto ya está en el carrito, si desea modificar la cantidad, diríjase al carrito');
        }
      }
      //validar si existe el carrito en el localstorage
      
    });
    
  }
}
 
