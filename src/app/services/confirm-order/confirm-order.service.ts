import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartService } from '../cart/cart.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmOrderService {

  private isConfirmedSubject = new BehaviorSubject<boolean>(false);
  isConfirmed$ = this.isConfirmedSubject.asObservable();


  constructor(
    private cartService: CartService,
  ) { }

  confirmOrder () {
    this.isConfirmedSubject.next(true);
  }

  // handleNewOrders () {
  //   this.isConfirmedSubject.next(false);
  //   this.cartService.removeAllItems();
  //   this.cartService.clearOrders();
  // }

  // removeItems () {
  //   const data = this.cartService.getDataFromCart();
  //   data.pipe(
  //     map(item => item.slice(0))
  //   )
  // }


}
