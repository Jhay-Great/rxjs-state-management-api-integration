import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

// local module imports
import { ShopDataService } from '../../services/shop-data.service';
import { ProductList, Product } from '../../interfaces/shop-data.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent implements OnInit {

  @Input () product!: Product;

  // cartProductIds: Set<string> = new Set<string>();
  addToCartIsClicked:boolean = false;
  selectedProductId: string | null = null;
  clicked:string[] = [];

  constructor (
    private productService: ShopDataService,
    private cartServices: CartService,
    private changeDetect: ChangeDetectorRef
  ) {
    // console.log(this.productService.items$.length);
  }
  
  ngOnInit(): void {
    // console.log(this.productService.items$.length);
    
  }


  addProductToCart (id:string) {
    this.addToCartIsClicked = true;
    const data = this.productService.findItem(id).pipe(
      map(data => ({
        orderId: '3',
        name: data?.name,
        price: data?.price,
        productId: data?.id, 
        quantityCount: 1
      }))
    )
    this.cartServices.addToCart(data);

    
    // this.selectedProductId = id; 
    // this.cartProductIds.add(id);
    // const quantityCount = 1;
    // const data = this.getItemData(id);
    // if (data) {
    //   const { name, price } = data;
    //   const orderData = {
    //     id,
    //     name,
    //     price,
    //     quantityCount,
    //     productId: id,
    //   }
    //   this.productService.addNewOrder(orderData);
    //   console.log(this.productService.getOrderData());
    //   // console.log('called: ', id)
    //   return true;
    // }
    // // console.log(this.productService.getOrderData());
    // return false;

  }

    // Method to check if the product is selected
    // isProductSelected(productId: string): boolean {
    //   // return this.selectedProductId === productId;
    //   return this.cartProductIds.has(productId);
    // }

  getItemData (id:string) {
    const data = Object.assign(this.product)?.find((item:Product) => item.id === id);
    return {
      name: data?.name, 
      price: data?.price
    };
  }

  increaseProductQuantity (productId:string) {
    const orderData = this.productService.getOrderData();
    const data = orderData.find(item => item.productId === productId);
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
    const data = orderData.find(item => item.productId === productId);
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
