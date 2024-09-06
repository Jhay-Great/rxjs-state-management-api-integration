import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { OrderItem, Product } from '../../interfaces/shop-data.interface';
import { ShopDataService } from '../shop-data/shop-data.service';
import { BehaviorSubject, Observable, filter, from, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems:OrderItem[] = [];
  private cartSubject$ = new BehaviorSubject(this.cartItems);

  // total price
  private totalPriceSubject$ = new BehaviorSubject<number>(0);
  totalPrice = this.totalPriceSubject$;
  
  constructor(
    private itemStore:ShopDataService,
  ) { }

   addToCart (name:string) {
    this.createOrder(name).pipe(
      tap(data => {
        this.cartItems = [...this.cartItems, data];
        console.log(this.cartItems);
        this.cartSubject$.next(this.cartItems);

        // calculating the current total order
        this.totalOrder();
        
      }),
    )
    .subscribe();
   }

  //  considering changing function name to createOrderItem or createOrderObject or createOrder
   private createOrder (name:string) {
    return this.itemStore.findItem(name).pipe(
      map(item => {
        const quantityCount = 1
        const order = {
          name: item?.name,
          price: item?.price,
          quantityCount,
          productId: '',
          orderId: '',
          totalQuantityPrice: (item?.price ?? 0) * quantityCount,

        }
        return order
      }),
      // tap(data => {
      //   // console.log(data);
      // })
    )
   }

   getCartItems(): Observable<OrderItem[]> {
    return this.cartSubject$.asObservable(); 
  }

  increaseQuantity (id:string) {
    this.getOrderFromCart(id).pipe(
      map(product => 
          product.map(product =>
          ({...product, quantityCount: product.quantityCount + 1})
          )
        ),
        tap(data => {
          
          const productIndex = this.cartItems.findIndex(product => product.name === data[0].name);

          if ( productIndex !== -1 ) {
            const item = {
              ...this.cartItems[productIndex],
              ...data[0],
            } 

            const updatedCartItems = [
              ...this.cartItems.slice(0, productIndex),
              item,
              ...this.cartItems.slice(productIndex + 1),

            ];

            this.cartItems = updatedCartItems;
            this.cartSubject$.next(this.cartItems);

            // calculates the total price
            this.calculateQuantityTotal(id);
            this.totalOrder();
            
          }
          
          
        })
        
    )
    .subscribe();
    // this.calculateQuantityTotal(id).subscribe();

  }

  decreaseQuantity (id:string) {
    this.getOrderFromCart(id).pipe(
      map(product => 
          product.map(product =>
          ({...product, quantityCount: product.quantityCount - 1})
          )
        ),
        tap(data => {

          // if quantity count is 0 then remove item from the cart
          // abstract removing order from cart call from component
          
          const productIndex = this.cartItems.findIndex(product => product.name === data[0].name);

          if ( productIndex !== -1 ) {
            const item = {
              ...this.cartItems[productIndex],
              ...data[0],
            } 

            const updatedCartItems = [
              ...this.cartItems.slice(0, productIndex),
              item,
              ...this.cartItems.slice(productIndex + 1),

            ];

            this.cartItems = updatedCartItems;
            this.cartSubject$.next(this.cartItems);

            // calculates the total price
            this.calculateQuantityTotal(id) // alternative call
            this.totalOrder();

          }
          
          
        })
        
    )
    .subscribe();
    // this.calculateQuantityTotal(id).subscribe();
  }

  private updateOrderItem (data:OrderItem[]) {
    const productIndex = this.cartItems.findIndex(product => product.name === data[0].name);

    if ( productIndex !== -1 ) {
      const item = {
        ...this.cartItems[productIndex],
        ...data[0],
      } 

      const updatedCartItems = [
        ...this.cartItems.slice(0, productIndex),
        item,
        ...this.cartItems.slice(productIndex + 1),

      ];

      this.cartItems = updatedCartItems;
      this.cartSubject$.next(this.cartItems);

    }
  }

  // change function name to getOrderFromCart()
  private getOrderFromCart (id:string) {
    const productItem = this.cartItems.filter(product => product.name === id);
    return of(productItem);
    
  }

  getQuantityCount (id:string) {
    return this.getOrderFromCart(id).pipe(
      map(data => {
        const quantity = data[0].quantityCount;
        return quantity
      })
    )
  }

  removeOrderFromCart (id:string) {
    const updatedCart = this.cartItems.filter(item => item.name !== id);
    this.cartItems = updatedCart;
    this.cartSubject$.next(this.cartItems)
  }

  calculateQuantityTotal (id:string) {
    return this.getOrderFromCart(id).pipe(
      map(product => 
        product.map(order => {
          // console.log(order.quantityCount, order.price)
          const item = {
            ...order, 
            totalQuantityPrice: order.quantityCount * (order?.price ?? 0)
          }
          return item
        })
      ),
      tap ( data => {
        this.updateOrderItem(data)
      }
        
      )
    )
    .subscribe();
  }
  
    

  totalOrder () {
    // creating an observable, subscribing to the subject will trigger a multiple rendering
    const data = of(this.cartItems).pipe(
      map(purchaseData => 
        purchaseData.reduce((acc, curr) => {
          const result = acc + (curr.totalQuantityPrice ?? 0);
          return result;

        }, 0)
      ),
      tap(value => {
        this.totalPriceSubject$.next(value)
      }),
    )
    .subscribe();
    return data;
    
  }

}
