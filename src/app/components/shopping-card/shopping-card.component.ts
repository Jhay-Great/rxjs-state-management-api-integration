import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// local module imports
import { ShopDataService } from '../../services/shop-data.service';
import { productList } from '../../interfaces/shop-data.interface';

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent implements OnInit {

  @Input () productList!: productList | null;

  addToCartIsClicked:boolean = false;

  constructor (
    private productService: ShopDataService,
  ) {
  }
  
  ngOnInit(): void {
    
  }

  addProductToCart (id:string) {
    this.addToCartIsClicked = true;
    const quantityCount = 1;
    const data = this.getItemData(id);
    if (data) {
      const { name, price } = data;
      const orderData = {
        id,
        name,
        price,
        quantityCount,
        productId: id,
      }
      this.productService.addNewOrder(orderData);
    }
    // console.log(this.productService.getOrderData());
    return;

  }

  getItemData (id:string) {
    const data = this.productList?.find(item => item.id === id);
    return {
      name: data?.name, 
      price: data?.price
    };
  }

  increaseProductQuantity () {

  }

  decreaseProductQuantity () {

  }

}
