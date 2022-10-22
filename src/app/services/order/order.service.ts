import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  //nueva orden
  newOrder(user: any, products:any, total: any, status: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/order/newOrder`, {user, products, total, status},).pipe(
      map((response: any) => response)
    );
  }

  //obtener ordenes por usuario
  getOrdersByUser(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/order/getOrdersForUser/${id}`).pipe(
      map((response: any) => response)
    );
  }
}
