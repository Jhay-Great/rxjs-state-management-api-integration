import { Injectable } from '@angular/core';
import { OrderItem, Product } from '../interfaces/shop-data.interface';
import { ShopDataService } from './shop-data.service';
import { BehaviorSubject, Observable, filter, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderedItems:OrderItem[] = [];
  private orderSubject = new BehaviorSubject<OrderItem[]>(this.orderedItems);
  private orders$ = this.orderSubject.asObservable();

  // special as well
  private cartStateSubject = new BehaviorSubject<Map<string, boolean>>(new Map());
  cartState$ = this.cartStateSubject.asObservable();

  constructor(
    private store:ShopDataService,
  ) { }

  // special because i don't understand and i get copied it, hoping it'll work coz i was tired of thinking
  updateCartState(productId: string, inCart: boolean) {
    const currentState = this.cartStateSubject.getValue();
    currentState.set(productId, inCart);
    this.cartStateSubject.next(currentState);
  }

  addToCart (order:Observable<OrderItem>) {
    order.subscribe(item => this.orderedItems.push(item));
    // this.orderedItems = order.subscribe(item => [...this.orderedItems, item]);
    this.orderSubject.next(this.orderedItems);
    
  }
  // removeItemFromCart (productId:string) {
  //   this.orders$.pipe(
  //     map(data => data.filter(item => item.orderId !== productId))
  //   ).subscribe(
  //     updatedData => this.orderSubject.next(updatedData)
  //   )

  //   // this.orderSubject.next(updatedData);

    
  // }

  // removeItemFromCart(productId: string) {
  //   // Get the current value of the cart
  //   const currentOrders = this.orderSubject.getValue();
    
  //   // Filter out the item to be removed
  //   const updatedOrders = currentOrders.filter(item => item.productId !== productId);
  //   this.getDataFromCart().subscribe(data => console.log(data));
  //   console.log('order items array: ', this.orderedItems);
    
  //   // Emit the updated cart
  //   this.orderSubject.next(updatedOrders);
  // }

  removeItemFromCart (productId:string) {
    const data = this.orderedItems.filter(item => item.productId !== productId);
    console.log(data);
    this.orderSubject.next(data);
  }

  getDataFromCart () {
    return this.orders$;
  }

  // findItem () should be a composition (abstract it)
  findItem (id:string) {
    return this.orders$.pipe(
      map(data => data.find(data => data.productId === id)),
    )
  }

  updateItem(updatedItem: OrderItem): Observable<OrderItem> {
    const index = this.orderedItems.findIndex(item => item.productId === updatedItem.productId);
    if (index !== -1) {
      this.orderedItems[index] = updatedItem;
      // If you're using a backend API, you would make an HTTP request here instead
      return of(updatedItem);
    } else {
      // If the item doesn't exist, you might want to add it or handle this case differently
      return new Observable(observer => {
        observer.error(new Error('Item not found in cart'));
      });
    }
  }

  // increaseItem (productId:string) {
  //   const item = this.findItem(productId);
  //   console.log(item);
  //   item.subscribe(data => console.log(data?.name))
  // }




}
