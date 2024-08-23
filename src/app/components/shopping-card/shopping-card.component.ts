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

  cartProductIds: Set<string> = new Set<string>();
  selectedProductId: string | null = null;
  addToCartIsClicked:boolean = false;
  clicked:string[] = [];

  constructor (
    private productService: ShopDataService,
  ) {
  }
  
  ngOnInit(): void {
    
  }


  addProductToCart (id:string) {
    this.selectedProductId = id; //
    this.cartProductIds.add(id);

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
      // console.log('called: ', id)
      return true;
    }
    // console.log(this.productService.getOrderData());
    return false;

  }

    // Method to check if the product is selected
    isProductSelected(productId: string): boolean {
      // return this.selectedProductId === productId;
      return this.cartProductIds.has(productId);
    }

  getItemData (id:string) {
    const data = this.productList?.find(item => item.id === id);
    return {
      name: data?.name, 
      price: data?.price
    };
  }

  increaseProductQuantity (productId:string) {
    const orderData = this.productService.getOrderData();
    const data = orderData.find(item => item.id === productId);
    if (data) {
      let { quantityCount } = data;
      quantityCount += 1;

      const updatedData = {...data, quantityCount};
      this.productService.updateOrder(updatedData);
      console.log(this.productService.getOrderData());
      return;
    }
    return;
    

  }
  decreaseProductQuantity (productId:string) {
    const orderData = this.productService.getOrderData();
    const data = orderData.find(item => item.id === productId);
    if (data) {
      let { quantityCount } = data;
      quantityCount -= 1;

      const updatedData = {...data, quantityCount};
      this.productService.updateOrder(updatedData);
      console.log(this.productService.getOrderData());
      return;
    }
    return;
    

  }

  displayOrderQuantity (quantity: number) {
    return quantity;
  }
  

}
