import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.scss']
})
export class BasicFormsComponent implements OnInit {

  nameField = new FormControl('Control state nameField');
  lastNameField = new FormControl('Control state lasNameField');
  emailField = new FormControl('test@test.com');
  colorField = new FormControl('#333333');
  dateField = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
    this.lastNameField.valueChanges.subscribe(
      (newValue) => {
        console.log('newValue lastNameField', newValue);
      }
    );
  }

  getValueLastNameField() {
    console.log('value lastNameField', this.lastNameField.value);
  }


}
