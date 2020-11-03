import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Product} from './../../models/product.model';

import {environment} from './../../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';


import * as Sentry from '@sentry/angular';

interface IUserTest {
  email: string;
  gender: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_api}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product);
  }

  // Usando Partial<Interface || clase> permite enviar solo una parte del objeto para no enviar todos los valores sino solo lo que cambio
  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }


  getRandomUsersTest(): Observable<IUserTest[]> {
    return this.http.get('https://randomusser.me/api/?results=2')
      .pipe(
        retry(3),
        catchError(this.handleErrorTest),  // Le pasamos una funcion que abstrae la logica para controlar el retorno de error
        map((response: any) => {
          return response.results as IUserTest[];
        })
      );
  }


  private handleErrorTest(error: HttpErrorResponse) {
    console.log('Error', error);

    // Capturando el error y enviandolo a la libreria
    Sentry.captureException(error);
    return throwError('Upss algo salio mal');
  }


  getFileTest() {
    const url = 'https://catalogo.mngcolombia.com/wp-content/uploads/real3d-flipbook/WOMAN_MAN_16/page7.jpg?1600786818737';
    return this.http.get(url, {responseType: 'blob'});
  }

}
