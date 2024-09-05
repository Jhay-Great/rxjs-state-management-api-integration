import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter, map, mergeMap, Observable, of, switchMap, take, tap } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

// local module imports
import { ShopDataService } from '../../services/shop-data.service';
import { ProductList, Product, OrderItem } from '../../interfaces/shop-data.interface';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [CurrencyPipe],
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

  // special as well
  cartState: Map<string, boolean> = new Map();

  constructor (
    private productService: ShopDataService,
    private cartService: CartService,
  ) {
    // console.log(this.productService.items$.length);
  }
  
  ngOnInit(): void {
    // console.log(this.productService.items$.length);
    // also special
    this.cartService.cartState$.subscribe((state:any) => {
      this.cartState = state;
      // console.log('Cart state: ', state);
    });
    
  }


  addProductToCart (id:string) {
    this.cartService.updateCartState(id, true);
    // this.addToCartIsClicked = true;
    const FIRST_ITEM_ADDED = 1;
    this.orderQuantity = FIRST_ITEM_ADDED;
    const data = this.productService.findItem(id).pipe(
      map(data => ({
        orderId: '3',
        name: data?.name,
        price: data?.price,
        productId: data?.id, 
        quantityCount: FIRST_ITEM_ADDED
      }))
    )
    this.cartService.addToCart(data);


  }

  
  
  // increaseProductQuantity (productId:string) {
  //   this.cartService.increaseItem(productId);

  // }
  


  increaseProductQuantity(productId: string) {
    // const data$ = this.cartService.getTotalPrice();
    // data$.subscribe(val => console.log(val));
    // data$.pipe(
    //   tap(console.log),
    // )

    // this.totalPrice$ = this.cartService.getTotalPrice();

    this.cartService.findItem(productId).pipe(
      take(1),
      filter((data): data is OrderItem => !!data), // This ensures data is not null or undefined
      map(data => ({...data, quantityCount: (data.quantityCount || 0) + 1})),
      switchMap(updatedItem => this.cartService.updateItem(updatedItem))
    ).subscribe({
      next: (updatedItem) => {
        // You can add any additional logic here, like updating a local state
        this.orderQuantity = updatedItem.quantityCount;
        // console.log('Item updated successfully', updatedItem);
      },
      error: (error) => {
        console.error('Error updating item', error);
        // Handle the error appropriately
      }
    });
  }

  
  decreaseProductQuantity (productId: string) {
    this.cartService.findItem(productId).pipe(
      take(1),
      filter((item): item is OrderItem => !!item),
      map(item => ({ 
        ...item, 
        quantityCount: Math.max((item.quantityCount || 0) - 1, 0) 
      })),
      switchMap(updatedItem => this.cartService.updateItem(updatedItem))
    ).subscribe({
      next: (updatedItem) => {
        // Optionally, you can emit this updated item or update some local state
        this.orderQuantity = updatedItem.quantityCount;
        // console.log('Item quantity decreased:', updatedItem);
      },
      error: (error) => {
        console.error('Error decreasing item quantity:', error);
      }
    });
  }

  // decreaseProductQuantity (productId:string) {
  //   const orderData = this.productService.getOrderData();
  //   const data = orderData.find(item => item.productId === productId);
  //   if (data) {
  //     let { quantityCount } = data;
  //     quantityCount -= 1;

  //     const updatedData = {...data, quantityCount};
  //     this.productService.updateOrder(updatedData);
  //     console.log(this.productService.getOrderData());
  //     return;
  //   }
  //   return;
    

  // }

  displayOrderQuantity (quantity: number) {
    return quantity;
  }
  

}
