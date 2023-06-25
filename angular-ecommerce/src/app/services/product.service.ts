import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product.category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productBaseUrl = 'http://localhost:8080/api/products';
  private categoryBaseUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    let searchUrl: string = (theCategoryId) ? `${this.productBaseUrl}/search/findByCategoryId?id=${theCategoryId}` : this.productBaseUrl;
    return this.getProducts(searchUrl);
  }

  searchProducts(searchKey: string): Observable<Product[]> {
    const searchUrl = `${this.productBaseUrl}/search/findByNameContaining?name=${searchKey}`;
    return this.getProducts(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryBaseUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}