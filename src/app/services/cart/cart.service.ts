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


  // isConfirmed: boolean = false;
  // private isConfirmedSubject = new BehaviorSubject<boolean>(this.isConfirmed);
  // private isConfirmed$ = this.isConfirmedSubject.asObservable();

  // orderedItems:OrderItem[] = [];
  // private orderSubject = new BehaviorSubject<OrderItem[]>(this.orderedItems);
  // private orders$ = this.orderSubject.asObservable();

  // // creating a behaviorSubject to calculate the total price
  // totalPriceSubject = new BehaviorSubject<number>(0);
  // private totalPrice$ = this.totalPriceSubject.asObservable();

  // // special as well
  // private cartStateSubject = new BehaviorSubject<Map<string, boolean>>(new Map());
  // cartState$ = this.cartStateSubject.asObservable();

  constructor(
    private itemStore:ShopDataService,
  ) { 
        // Recalculate total price whenever orderedItems changes
        // this.orders$.pipe(
        //   map(items => this.calculateTotalPrice(items))
        // ).subscribe(total => this.totalPriceSubject.next(total));
   }

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
    // console.log('added to cart: ', this.cartItems); // log items in the cart
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
      tap(data => {
        // console.log(data);
      })
    )
   }

   getCartItems(): Observable<OrderItem[]> {
    return this.cartSubject$.asObservable(); 
  }

  increaseQuantity (id:string) {
    // console.log(this.totalOrder()); // remove this later, strictly for dev mode
    
    this.getOrderFromCart(id).pipe(
      map(product => 
          product.map(product =>
          ({...product, quantityCount: product.quantityCount + 1})
          )
        ),
        tap(data => {
          // console.log('logging data on increase to see qtyCnt: ', data);
          
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
      // map(order => 
      //   order.map(product => product.quantityCount * (product?.price ?? 0))
      // ),
      map(product => 
        product.map(order => {
          console.log(order.quantityCount, order.price)
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
    // console.log(this.cartItems);

    // go through the array and get the totalQuantityPrice and add the numbers
    // reduce method, map and add logic

    // creating an observable, subscribing to the subject will trigger a multiple rendering
    const data = of(this.cartItems).pipe(
      map(purchaseData => 
        purchaseData.reduce((acc, curr) => {
          const result = acc + (curr.totalQuantityPrice ?? 0);
          return result;

        }, 0)
      ),
      tap(value => {
        console.log(value);
        this.totalPriceSubject$.next(value)
      }),
    )
    .subscribe();
    return data;
    
  }



  // special because i don't understand and i get copied it, hoping it'll work coz i was tired of thinking
  // updateCartState(productId: string, inCart: boolean) {
  //   const currentState = this.cartStateSubject.getValue();
  //   currentState.set(productId, inCart);
  //   this.cartStateSubject.next(currentState);
  // }
  

  // addToCart(order: Observable<OrderItem>) {
  //   order.subscribe(item => {
  //     // Check if the item already exists in the cart
  //     const existingItemIndex = this.orderedItems.findIndex(i => i.productId === item.productId);
  //     if (existingItemIndex >= 0) {
  //       // Update quantity of existing item
  //       this.orderedItems[existingItemIndex].quantityCount += item.quantityCount;
  //     } else {
  //       // Add new item to the cart
  //       this.orderedItems = [...this.orderedItems, item];
  //     }
  //     this.orderSubject.next(this.orderedItems);
  //   });
  // }
  

  // getDataFromCart () {
  //   return this.orders$;
  // }
  
  // removeItemFromCart (productId:string) {
  //   const data = this.orderedItems.filter(item => item.productId !== productId);
  //   console.log(data);
  //   this.orderSubject.next(data);
  // }

  // removes or clears all the orders made within the orderitems array
  // clearOrders() {
  //   // Emit an empty array to the BehaviorSubject
  //   this.orderSubject.next([]);
  // }

  // removes all data from the map array used to toggle add to cart display in the template file of the shopping card
  // removeAllItems() {
  //   // Create a new empty Map
  //   const emptyMap = new Map<string, boolean>();
    
  //   // Emit the empty Map to the BehaviorSubject
  //   this.cartStateSubject.next(emptyMap);
  // }


  // findItem () should be a composition (abstract it)
  // findItem (id:string) {
  //   return this.orders$.pipe(
  //     map(data => data.find(data => data.productId === id)),
  //   )
  // }

  // updateItem(updatedItem: OrderItem): Observable<OrderItem> {
  //   const index = this.orderedItems.findIndex(item => item.productId === updatedItem.productId);
  //   if (index !== -1) {
  //     this.orderedItems[index] = updatedItem;
  //     // If you're using a backend API, you would make an HTTP request here instead
  //     return of(updatedItem);
  //   } else {
  //     // If the item doesn't exist, you might want to add it or handle this case differently
  //     return new Observable(observer => {
  //       observer.error(new Error('Item not found in cart'));
  //     });
  //   }
  // }
  

  // private calculateTotalPrice(items: OrderItem[]): number {
  //   return items.reduce((total, item) => {
  //     const price = item.price || 0;
  //     return total + (price * item.quantityCount);
  //   }, 0);
  // }
  

  // getTotalPrice (): Observable<number> {
  //   // console.log('getting total called...')
  //   this.totalPrice$.subscribe(val => console.log(val));
  //   return this.totalPrice$
  // }





}
