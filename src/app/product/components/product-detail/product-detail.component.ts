import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {ProductsService} from './../../../core/services/products/products.service';
import {Product} from './../../../core/models/product.model';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        const id = params.id;
        this.fetchProduct(id);
        // this.product = this.productsService.getProduct(id);
      });
  }

  fetchProduct(id: string) {
    // Retornando la respuesta y asginandole sin el subscribe a la variable
    this.product$ = this.productsService.getProduct(id);
  }

  createProduct() {
    const newProduct: Product = {
      _id: (Math.random() * 100).toString(),
      name: 'nuevo desde angular',
      image: 'https://picsum.photos/200/300',
      price: 3000,
      category_id: '1',
      description: 'nuevo producto'
    };
    this.productsService.createProduct(newProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 555555,
      description: 'edicion titulo'
    };
    this.productsService.updateProduct('2', updateProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  deleteProduct() {
    this.productsService.deleteProduct('222')
      .subscribe(rta => {
        console.log(rta);
      });
  }

  fetchRandomUsers() {
    this.productsService.getRandomUsersTest().subscribe(
      (users) => {
        console.log('Users', users);
      }
    );
  }

  fetchFile() {
    this.productsService.getFileTest().subscribe(
      (contentFile) => {
        console.log('contentFile', contentFile);
      }
    );
  }

}
