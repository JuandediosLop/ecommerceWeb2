import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: any = {};
  id: string = '';
  foto: string ='';
  carrito: any[] = [];
  idProducto: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private servicio: ProductService) { }

  ngOnInit(): void {
    //recibir id del componente home-shop
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      //validar que el id exista
      if (this.id) {
        this.servicio.getProductById(this.id).subscribe((resultado) => {
          this.producto = resultado;    
          this.foto =   this.getFoto(this.producto.image);
        }, (error) => {
          alert('El producto no existe');
          this.router.navigate(['/shop']);
        }
        );
      }
    });
  }
  getFoto(foto: string) {
    return 'http://localhost:3000/' + foto;
  }
  agregarCarrito(id:string): void {
    this.idProducto = id;
    this.servicio.getProductById(this.idProducto).subscribe((resultado) => {
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
