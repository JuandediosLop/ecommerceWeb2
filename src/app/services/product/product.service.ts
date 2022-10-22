import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) {
   }


  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/api/product/getProducts').pipe(
      map((response: any) => response)
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/product/getProduct/${id}`).pipe(
      map((response: any) => response)
    );
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/product/getProductsByCategory/${category}`).pipe(
      map((response: any) => response)
    );
  }
  //validar que el producto exista
  getCheckProduct(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/product/validateProduct/${id}`).pipe(
      map((response: any) => response)
    );
  }
  //comprobar stock
  getCheckStock(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/product/checkStock/${id}`).pipe(
      map((response: any) => response)
    );
  }
  //restar stock
  updateStock(id: string, stock:any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/product/updateStock/${id}`, {stock}).pipe(
      map((response: any) => response)
    );

  }
}
