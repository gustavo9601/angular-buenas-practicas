import {Component} from '@angular/core';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    this.createUserTest();
  }

  createUserTest() {
    // this.authService.createUser('test@test.com.co', 'Pruebas1234*');
  }

}
