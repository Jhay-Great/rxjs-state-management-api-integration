import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter, map, mergeMap, Observable, of, switchMap, take, tap } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';

// local module imports
import { ShopDataService } from '../../services/shop-data/shop-data.service';
import { ProductList, Product, OrderItem } from '../../interfaces/shop-data.interface';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent implements OnInit {

  @Input () product!: Product;

  // cartProductIds: Set<string> = new Set<string>();
  addToCartIsClicked:boolean = false;
  selectedProductId: string | null = null;
  clicked:string[] = [];
  orderQuantity!:number;
  orderData!:Observable<OrderItem[]>;
  productName!:string;

  // special as well
  cartState: Map<string, boolean> = new Map();

  constructor (
    private productService: ShopDataService,
    private cartService: CartService,
  ) {  }
  
  ngOnInit(): void {
    this.orderData = this.cartService.getCartItems();
    
    
    
    
    // console.log(this.product)
    // this.cartService.cartState$.subscribe((state:any) => {
    //   this.cartState = state;
    // });
    
  }

  onAddToCart (id:string) { 
    this.productName = id;
    this.addToCartIsClicked = true;
    this.cartService.addToCart(id);
  }

  onReduceProductQuantity (id:string) {
    this.cartService.decreaseQuantity(id);
    // this.addToCartIsClicked = false; // use this to display addToCart btn
  }

  onIncreaseProductQuantity (id:string) {
    this.cartService.increaseQuantity(id)
  }


  // addProductToCart (id:string) {
  //   this.cartService.updateCartState(id, true);
  //   // this.addToCartIsClicked = true;
  //   const FIRST_ITEM_ADDED = 1;
  //   this.orderQuantity = FIRST_ITEM_ADDED;
  //   const data = this.productService.findItem(id).pipe(
  //     map(data => ({
  //       orderId: '3',
  //       name: data?.name,
  //       price: data?.price,
  //       productId: data?.id, 
  //       quantityCount: FIRST_ITEM_ADDED
  //     }))
  //   )
  //   this.cartService.addToCart(data);


  // }
  
  // increaseProductQuantity(productId: string) {

  //   this.cartService.findItem(productId).pipe(
  //     take(1),
  //     filter((data): data is OrderItem => !!data), // This ensures data is not null or undefined
  //     map(data => ({...data, quantityCount: (data.quantityCount || 0) + 1})),
  //     switchMap(updatedItem => this.cartService.updateItem(updatedItem))
  //   ).subscribe({
  //     next: (updatedItem) => {
  //       // You can add any additional logic here, like updating a local state
  //       this.orderQuantity = updatedItem.quantityCount;
  //       // console.log('Item updated successfully', updatedItem);
  //     },
  //     error: (error) => {
  //       console.error('Error updating item', error);
  //       // Handle the error appropriately
  //     }
  //   });
  // }

  
  // decreaseProductQuantity (productId: string) {
  //   this.cartService.findItem(productId).pipe(
  //     take(1),
  //     filter((item): item is OrderItem => !!item),
  //     map(item => ({ 
  //       ...item, 
  //       quantityCount: Math.max((item.quantityCount || 0) - 1, 0) 
  //     })),
  //     switchMap(updatedItem => this.cartService.updateItem(updatedItem))
  //   ).subscribe({
  //     next: (updatedItem) => {
  //       // Optionally, you can emit this updated item or update some local state
  //       this.orderQuantity = updatedItem.quantityCount;
  //     },
  //     error: (error) => {
  //       console.error('Error decreasing item quantity:', error);
  //     }
  //   });
  // }

  // displayOrderQuantity (quantity: number) {
  //   return quantity;
  // }
  

}
