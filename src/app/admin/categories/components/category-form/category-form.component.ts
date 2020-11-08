import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../../../core/services/categories.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
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
  categoryId: string;

  constructor(private fb: FormBuilder,
              private _categoriesService: CategoriesService,
              private router: Router,
              private afs: AngularFireStorage,
              private activatedRoute: ActivatedRoute) {
    this.buildForm();
    this.categoryId = '';
  }

  ngOnInit(): void {
    // Detectando si recibe parametros
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.categoryId = params.id;
        // Verifica si existe el parametro enviado
        if (this.categoryId) {
          this.getCategory();
        }
      }
    );

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
      // Si existe el id
      if (this.categoryId) {
        // Se actualiza
        this.updateCategory();
      } else {
        // Se crea
        this.createCategory();
      }
    } else {
      // Si no es valido, que marque todo como tocado paramostrar errores al usuario
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data = this.form.value;
    this._categoriesService.createCategory(data).subscribe(
      (category) => {
        console.log('category created', category);
        this.router.navigate(['/admin/categories']);
      }
    );
  }

  private getCategory() {
    const id = this.categoryId;
    this._categoriesService.getCategory(id).subscribe(
      (category) => {
        // Recibimos la categoria a editar
        console.log('category to update', category);

        // Patch sobre los campos del formulario
        this.form.patchValue(category);

        // Individual el patch sobre un campo
        // this.form.get('name').setValue(value);
      }
    );
  }

  private updateCategory() {
    const data = this.form.value;
    const id = this.categoryId;
    this._categoriesService.updateCategory(id, data).subscribe(
      (category) => {
        console.log('category update', category);
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
