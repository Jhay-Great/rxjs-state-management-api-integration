import { Injectable } from '@angular/core';
import { OrderItem, Product } from '../interfaces/shop-data.interface';
import { ShopDataService } from './shop-data.service';
import { BehaviorSubject, Observable, filter, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // isConfirmed: boolean = false;
  // private isConfirmedSubject = new BehaviorSubject<boolean>(this.isConfirmed);
  // private isConfirmed$ = this.isConfirmedSubject.asObservable();

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

  // addToCart (order:Observable<OrderItem>) {
  //   order.subscribe(item => this.orderedItems.push(item));
  //   // this.orderedItems = order.subscribe(item => [...this.orderedItems, item]);
  //   this.orderSubject.next(this.orderedItems);
  //   console.log('logging orderedItems: ', this.orderedItems);
    
  // }

  addToCart(order: Observable<OrderItem>) {
    order.subscribe(item => {
      // Create a new array with the added item
      this.orderedItems = [...this.orderedItems, item];
      this.orderSubject.next(this.orderedItems); // Emit the updated array
      console.log('logging orderedItems: ', this.orderedItems);
    });
  }

  getDataFromCart () {
    return this.orders$;
  }
  
  removeItemFromCart (productId:string) {
    const data = this.orderedItems.filter(item => item.productId !== productId);
    console.log(data);
    this.orderSubject.next(data);
  }

  // removes or clears all the orders made within the orderitems array
  clearOrders() {
    // Emit an empty array to the BehaviorSubject
    this.orderSubject.next([]);
  }

  // removes all data from the map array used to toggle add to cart display in the template file of the shopping card
  removeAllItems() {
    // Create a new empty Map
    const emptyMap = new Map<string, boolean>();
    
    // Emit the empty Map to the BehaviorSubject
    this.cartStateSubject.next(emptyMap);
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

  // getTotalPrice(): Observable<number> {
  //   return this.orders$.pipe(
  //     map(items => items.reduce((total, item) => total + (item.price * item.quantityCount), 0))
  //   );
  // }

  getTotalPrice(): Observable<number> {
    return this.orders$.pipe(
      map(items => items.reduce((total, item) => {
        // Use a default value of 0 if price is undefined
        const price = item.price || 0;
        return total + (price * item.quantityCount);
      }, 0))
    );
  }




}
