import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import module import
import {productList, OrderData, OrderItem } from '../interfaces/shop-data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {
  api:string = 'http://localhost:3000/';
  parameter:string = 'dessert';
  private orders!:OrderData[];

  constructor(
    private http: HttpClient,
  ) { 

   }

   fetchProductData (): Observable<productList> {
    // console.log(this.http.get(`${this.api}${this.parameter}`))
    return this.http.get<productList>(`${this.api}${this.parameter}`)
   }

   addNewOrder (item: OrderData) {
    this.orders.push(item);
   }
   getOrderData () {
    return this.orders;
   }
}
