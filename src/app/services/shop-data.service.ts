import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// import module import
import {ProductList, OrderData, OrderItem, Product } from '../interfaces/shop-data.interface';
import { Observable, BehaviorSubject, map } from 'rxjs';

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

  private data$!: Observable<ProductList>
  private something$ = new Observable;

  // private cartItems: Product[] = [];
  // private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);

  // cartItems$ = this.cartItemsSubject.asObservable();

  private jsonDataUrl = '../../assets/data.json'

  constructor(
    private http: HttpClient,
  ) { }

   fetchProductData (): void {
    // this.data$ = this.http.get<ProductList>(`${this.api}${this.parameter}`) // for development
    this.data$ = this.http.get<ProductList>(`${this.jsonDataUrl}`)
   }
  //  fetchProductData (): Observable<ProductList> {
  //   return this.http.get<ProductList>(`${this.api}${this.parameter}`)
  //  }

  getData () {
    this.fetchProductData()
    return this.data$
  }

  findItem (id:string) {
    return this.data$.pipe(
      map(data => data.find(data => data.id === id)),
    )
  }

  //  addNewOrder (item: OrderItem):void {
  //   console.log('called to push item')
  //   this.orders.push(item);
  //  }
  //  getOrderData () {
  //   return this.orders;
  //  }

  //  updateOrder (updatedData:OrderItem) {
  //   this.orders = this.orders.map(item => {
  //     return item.orderId === updatedData.orderId ? updatedData : item
  //   })
  //  }

  //  generateId () {
  //   // const id = uuid().v4;
  //  }
}
