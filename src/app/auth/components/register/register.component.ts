import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from './../../../core/services/auth.service';
import {MyValidators} from '../../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
        .then(() => {
          this.router.navigate(['/auth/login']);
        }, (error: any) => {
          console.log('error create user', error);
          alert('error: ' + error.message);
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10), MyValidators.isPasswordValid]],
      confirmPassword: ['', [Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]],
    }, {  // Recibe un objeto con las validaciones a nivel form
      validators: MyValidators.matchPasswords
    });


    // Validaciones condicionadas, en funcion de la escucha de algun evento o cambio
    this.typeField.valueChanges.subscribe(
      (valueTypeField) => {
        console.log('valueTypeField', valueTypeField);
        // Solo si es company, debe ser requerido el campo
        if (valueTypeField === 'company') {
          this.companyNameField.setValidators([Validators.required]);
        } else {
          // En caso contrario se le quita el required
          this.companyNameField.setValidators(null);
        }
        // Actualice el valor y lo revalide, para que vuelva a su estado normal de ser necesario el campo
        this.companyNameField.updateValueAndValidity();
      }
    );
  }

  get typeField() {
    return this.form.get('type');
  }

  get companyNameField() {
    return this.form.get('companyName');
  }


}
