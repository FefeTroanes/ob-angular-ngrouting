import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { IRandomContact, Results } from '../models/randomuser';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error(`Ha ocurrido un error: ${error.error}`)
    } else {
      console.error(`Error en el backend: ${error.status}. El error es: ${error.error}`)
    }
    return throwError(() => new Error('Error en la peticion de contacto aleatorio'));
  }

  obtenerRandomContact(): Observable<Results> {
    return this.http.get<Results>('https://randomuser.me/api/').pipe(
      retry(2), // numero de reintentos, y si no funca pasa al error
      catchError(this.handleError)
    );
  }

  obtenerMultipleRandomContacts(n: number, sexo?: string): Observable<Results> {
    let params: HttpParams = new HttpParams().set("results", n);

    if(sexo) {
      params = params.append("gender", sexo);
    }

    return this.http.get<Results>('https://randomuser.me/api/', {params: params}).pipe(
      retry(2), // numero de reintentos, y si no funca pasa al error
      catchError(this.handleError)
    )
  }

  // obtenerRandomContactPorGenero(sexo: string): Observable<Results> {
  //   const params: HttpParams = new HttpParams().set("gender", sexo);

  //   return this.http.get<Results>('https://randomuser.me/api/', {params: params}).pipe(
  //     retry(2), // numero de reintentos, y si no funca pasa al error
  //     catchError(this.handleError)
  //   )
  // }
}