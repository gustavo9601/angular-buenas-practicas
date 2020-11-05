import {Component} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

// Variable global para manipular el google analytics
declare var gtag: any;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService,
              private router: Router) {
    this.createUserTest();

    // Usamos el router de angular, para detectar cada cambio de path
    // filter permitira unicamente escuchar el evento de cambio de pagina NavigationEnd
    const navEndEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );

    // Nos suscribimos, y enviamos a google analytics el id de seguimiento con la url que cambio
    navEndEvents$.subscribe(
      (event: NavigationEnd) => {
        console.log('event.urlAfterRedirects', event.urlAfterRedirects);
        // console.log('event.url', event.url);
        gtag('config', 'G-F59TQE78SC', {
          page_path: event.urlAfterRedirects
        });
      }
    );
  }

  createUserTest() {
    // this.authService.createUser('test@test.com.co', 'Pruebas1234*');
  }

}
