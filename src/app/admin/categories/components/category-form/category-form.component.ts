import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../../../core/services/categories.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {MyValidators} from '../../../../utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private _categoriesService: CategoriesService,
              private router: Router,
              private afs: AngularFireStorage) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)],  // Validaciones sincronas
        MyValidators.validateCategory(this._categoriesService)], // Vlidaciones asincronas
      image: ['', Validators.required],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    console.log('this.form.value', this.form.value);
    if (this.form.valid) {
      this.createCategory();
    } else {
      // Si no es valido, que marque todo como tocado paramostrar errores al usuario
      this.form.markAllAsTouched();
    }
  }

  createCategory() {
    const data = this.form.value;
    this._categoriesService.createCategory(data).subscribe(
      (category) => {
        console.log('category created', category);
        this.router.navigate(['/admin/categories']);
      }
    );
  }

  uploadFile($event) {
    const image = $event.target.files[0];
    const name = (Math.random() * 100) + '.png';
    const ref = this.afs.ref(name);
    const task = this.afs.upload(name, image);

    task.snapshotChanges()
      .pipe(
        // Pipe que detecta cuando finaliza por completo la subida
        finalize(() => {
          const urlImage$ = ref.getDownloadURL();
          urlImage$.subscribe(urlFinal => {
            console.log('urlFinal', urlFinal);
            // Setea el valor
            this.imageField.setValue(urlFinal);
          });
        })
      )
      .subscribe();

  }
}
