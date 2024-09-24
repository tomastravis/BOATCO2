import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', // Disponible globalmente en la aplicación
})
export class ApiService {

  private apiUrl = 'http://backend:8000'; // Cambia esto por tu URL de API

  constructor(private http: HttpClient) { }

  getBoats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_boats`).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  getPorts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_ports`).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  // Ejemplo de POST request
  enviarDatos(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/datos`, data);
  }

  // Ejemplo de PUT request
  actualizarDatos(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/datos/${id}`, data);
  }

  // Ejemplo de DELETE request
  borrarDatos(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/datos/${id}`);
  }
}
