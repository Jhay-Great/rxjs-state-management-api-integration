import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// import module import
import {productList, OrderData, OrderItem } from '../interfaces/shop-data.interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {
  api:string = 'http://localhost:3000/';
  parameter:string = 'dessert';
  // private orders!:OrderData[];
  private orders:OrderItem[] = [];
  private orderSubject = new BehaviorSubject<OrderItem[]>(this.orders);
  items$ = this.orderSubject.asObservable;

  // private cartItems: Product[] = [];
  // private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);

  // cartItems$ = this.cartItemsSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

   fetchProductData (): Observable<productList> {
    return this.http.get<productList>(`${this.api}${this.parameter}`)
   }

   addNewOrder (item: OrderItem):void {
    console.log('called to push item')
    this.orders.push(item);
   }
   getOrderData () {
    return this.orders;
   }

   updateOrder (updatedData:OrderItem) {
    this.orders = this.orders.map(item => {
      return item.id === updatedData.id ? updatedData : item
    })
   }

   generateId () {
    // const id = uuid().v4;
   }
}
