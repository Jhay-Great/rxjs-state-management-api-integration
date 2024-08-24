import { Injectable } from '@angular/core';
import { OrderItem, Product } from '../interfaces/shop-data.interface';
import { ShopDataService } from './shop-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
    // order.subscribe(item => this.orderedItems.push(item));
    order.subscribe(item => [...this.orderedItems, item]);
    this.orderSubject.next(this.orderedItems);




    // this.orderedItems.push(order)
    // const data = this.store.findItem(order);
    
    
    // const item = this.orderedItems.find(item => item.id === id);
    // if (item) {
    //   const { id, price, name } = item;

    // } else {
    //   const data = this.store.findItem(id);
    //   this.orderedItems.push();
    // }
  }

  getDataFromCart () {
    return this.orders$;
  }
}
