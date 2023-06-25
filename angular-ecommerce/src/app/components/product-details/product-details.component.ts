import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadProductDetail();
    });
  }

  loadProductDetail() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const currentProductId: number = +this.route.snapshot.paramMap.get('id')!;

    // now get the products for the given category id
    this.productService.getProductById(currentProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
}
