import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/common/page';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  page: Page = new Page();
  previousCategoryId: number = Number(null);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.route.snapshot.paramMap.has('keyword') ? this.handleSearchProducts() : this.handleListProducts();
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProductsPaginate(this.page.pageNumber - 1, this.page.pageSize, keyword).subscribe(this.processResult())
  }

  handleListProducts() {
    let currentCategoryId = Number(null);

    if (this.route.snapshot.paramMap.has('id')) {
      // get the "id" param string. convert string to a number using the "+" symbol
      currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    console.log(`Current currentCategoryId ${currentCategoryId} previousCategoryId ${this.previousCategoryId}`);

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != currentCategoryId) {
      this.page.pageNumber = 1;
    }
    this.previousCategoryId = currentCategoryId;

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.page.pageNumber - 1, this.page.pageSize, currentCategoryId).subscribe(this.processResult())
  }

  updatePageSize(pageSize: string) {
    this.page.pageSize = +pageSize;
    this.page.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(new CartItem(product));
  }

  // Private methods
  private processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.page.pageNumber = data.page.number + 1;
      this.page.pageSize = data.page.size;
      this.page.totalElement = data.page.totalElements;
    };
  }
}
