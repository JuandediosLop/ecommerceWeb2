import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(email:String, password:String): Observable<any> {
    return this.http.get(`http://localhost:3000/api/user/getUser/${email}-${password}`).pipe(
      map((response: any) => response)
    );
  }
  //register
  registerUser(user: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/newUser`, user).pipe(
      map((response: any) => response)
    );
  }
  //obtener el usuario por el id
  getUserById(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/user/getUserById/${id}`).pipe(
      map((response: any) => response)
    );
  }

  //update user
  updateUser(id: any, user: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/user/updateUser/${id}`, user).pipe(
      map((response: any) => response)
    );
  }
}
