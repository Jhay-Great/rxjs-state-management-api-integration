import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
// local module imports
import { CartService } from '../../services/cart.service';
import { ConfirmOrderService } from '../../services/confirm-order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  // isCartEmpty:boolean = !false;
  isCartEmpty!: Observable<boolean>;
  data
  length$!: Observable<number>;

  constructor (
    private cartService: CartService,
    private confirmService: ConfirmOrderService,
  ) { 
    this.data = this.cartService.getDataFromCart();
    this.length$ = this.data.pipe(
      map(data => data.length),
    );
    this.isCartEmpty = this.length$.pipe(
      map(number => number > 0),
    )
    // this.data.subscribe(data => console.log(data))
    
   };

   removeItem (id:string | undefined) {
    if (!id) return;
    
    console.log(id);
    this.cartService.updateCartState(id, false);
    this.cartService.removeItemFromCart(id);
   }

   confirmOrder() {
    this.confirmService.handleNewOrders();
  }


}
