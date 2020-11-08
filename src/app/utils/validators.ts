import {AbstractControl} from '@angular/forms';
import {CategoriesService} from '../core/services/categories.service';
import {map} from 'rxjs/operators';

export class MyValidators {


  constructor() {
  }


  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000 || value < 0) {
      return {price_invalid: true};
    }
    return null;
  }

  static isPasswordValid(control: AbstractControl) {

    const value = control.value;
    console.log('value', value);
    if (!containsNumber(value)) {
      return {
        invalid_password: true
      };
    }

    return null;

  }

  static matchPasswords(control: AbstractControl) {
    // Al ser una validacion que aplica a nivel grupo, se puede acceder a los campos con get
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return {match_password: true};
    }
    return null;
  }

  // Le escpificamos el tipo de serivcio que recibe
  static validateCategory(service: CategoriesService) {
    // Retornamos ahora si la validacion, asincrona en el campo
    return (control: AbstractControl) => {
      const value = control.value;

      return service.checkCategory(value)
        .pipe(
          map((response: any) => {
            console.log('response validateCategory', response);
            const isAvailable = response.isAvailable;
            if (!isAvailable) {
              return {
                not_available: true
              };
            }
            return null;
          })
        );  // No se realiza la subscricion, ya que al llamamor desde las validaciones del FormBuilder lo ejecutara
    };
  }

}

function containsNumber(value: string) {
  // Funcion que verifica si en el string encuentra un numero
  return value.split('')
    .find(val => isNumber(val)) !== undefined;
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10));
}


