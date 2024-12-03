import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Referidos }  from '../modelos/referidos';


@Injectable({
  providedIn: 'root'
})
export class ReferidosService {


  //url prueba  (SOLO SE USA PARA CARGAR EL POR LA IP DEL COMPUTADOR)
  //private apiUrl = 'http://192.168.1.148:8000/api/referidos/';



  private apiUrl = 'https://pruebahostinger.devbymiguel.com/api/referidos/';

  
   // URL de la API para obtener usuarios
   usersUrl = 'https://pruebahostinger.devbymiguel.com/api/users';
 

  constructor(private http: HttpClient) { }

   // Método para obtener un usuario por su ID
   getUserById(userId: number | null | undefined, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers };
    return this.http.get<any>(`${this.usersUrl}/${userId}`, options);
  }


  getReferidos(access_token:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.get(this.apiUrl, options);
  }

  downloadDocumento(id: number, access_token: string ): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers, responseType: 'blob' as 'json' };
    return this.http.get<Blob>(`${this.apiUrl}download/${id}`, options);
  }

  deleteReferido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}`);
  }

  // Método para actualizar una incapacidad médica existente
  updateReferidos(id:string, referidos:Referidos, access_token:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    });
    const options = { headers: headers};
    return this.http.put(this.apiUrl +id,referidos, options);         
  }


}
