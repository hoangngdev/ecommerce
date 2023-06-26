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
    let searchUrl: string = (theCategoryId) ?
      `${this.productBaseUrl}/search/findByCategoryId?id=${theCategoryId}` :
      this.productBaseUrl;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {
    // handle url for with and without category info
    let searchUrl: string = (theCategoryId) ?
      `${this.productBaseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}` :
      `${this.productBaseUrl}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductById(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.productBaseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  searchProducts(searchKey: string): Observable<Product[]> {
    const searchUrl = `${this.productBaseUrl}/search/findByNameContaining?name=${searchKey}`;
    return this.getProducts(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryBaseUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}