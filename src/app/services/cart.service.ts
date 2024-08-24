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

  constructor(
    private store:ShopDataService,
  ) { }

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

  removeItemFromCart(productId: string) {
    // Get the current value of the cart
    const currentOrders = this.orderSubject.getValue();
    
    // Filter out the item to be removed
    const updatedOrders = currentOrders.filter(item => item.productId !== productId);
    
    // Emit the updated cart
    this.orderSubject.next(updatedOrders);
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
