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

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {
    // handle url for with and without category info
    let searchUrl: string = (theCategoryId) ?
      `${this.productBaseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}` :
      `${this.productBaseUrl}?page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProductsPaginate(thePage: number,
    thePageSize: number,
    searchKey: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.productBaseUrl}/search/findByNameContaining?name=${searchKey}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductById(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.productBaseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
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