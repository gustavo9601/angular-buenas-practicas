import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.AddTocken(request);  // Seteando de encontrar el token , la cabecera
    return next.handle(request);  // retornando el request modificado
  }

  private AddTocken(request: HttpRequest<any>) {
    const tokenFake = '123456';
    if (true) {  // Validacion si existe un token, cloanara el request y le añadira el token al heder
      request = request.clone({
        setHeaders: {
          token: tokenFake   // Nombre de la cabecera agregada
        }
      });
      return request;
    }
  }
}
