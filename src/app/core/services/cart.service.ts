import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  // Variable publica para que cualquier otro componente se suscriba a una unica suscripcion
  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product) {
    this.products.push(product)
    // Practica de no mutacion, creando una nueva instancia del arreglo de clase
    // this.products = [...this.products, product];
    this.cart.next(this.products);
  }
}
