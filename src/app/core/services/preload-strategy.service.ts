import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadStrategyService implements PreloadingStrategy {

  constructor() {
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Verificando la data de la ruta, definida en el modulo de rutas manualmente
    if (route.data && route.data['preloadManual']) {
      return load();  // Retorna la funcion en dado caso de encontrar true para recargarlos
    }
    // Sino encuentra nada retornara un observable vacio
    return of();
  }

}
