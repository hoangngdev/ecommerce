import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlAllProducts = 'http://localhost:8080/api/products';
  private baseUrlSearchByID = 'http://localhost:8080/api/products/search/findByCategoryId?id=';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    let searchUrl = (theCategoryId) ? this.baseUrlSearchByID + `${theCategoryId}` : this.baseUrlAllProducts
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
