import {TestBed} from '@angular/core/testing';

import {ProductsService} from './products.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product.model';
import {environment} from '../../../../environments/environment';

describe('ProductsService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });


    // Incializando las variables necesarias para probar los servicios
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fdescribe('test for getAllProducts', () => {

    it('should return products', function() {
      // arrange => preparar (Mokear datos fake de la respuesta)
      const expectData: Product[] = [
        {
          _id: '1',
          name: 'test name',
          price: 1000,
          description: 'test description',
          image: 'img/img.jpg'
        },
        {
          _id: '2',
          name: 'test name 2',
          price: 2000,
          description: 'test description',
          image: 'img/img.jpg'
        }
      ];
      let dataError, dataResponse;
      // act  => actuar en base a la respuesta
      service.getAllProducts().subscribe(
        (response) => {
          dataResponse = response;
        }, (error) => {
          dataError = error;
        }
      );

      // que espere una peticion hacia dicha url
      const req = httpTestingController.expectOne(`${environment.url_api}/products`);
      req.flush(expectData);  // Seteando cual seria el mock de respuesta

      // assert => verificar el mock quemado corresponde con lo obtenido

      expect(dataResponse.length).toEqual(2);
      expect(req.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();  // Si no genero error
    });
  });

});
