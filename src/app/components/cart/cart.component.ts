import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
// local module imports
import { CartService } from '../../services/cart/cart.service';
import { ConfirmOrderService } from '../../services/confirm-order/confirm-order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ AsyncPipe, CommonModule, ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  // isCartEmpty:boolean = !false;
  // isCartEmpty!: Observable<boolean>;
  data
  // length$!: Observable<number>;
  // totalPrice$ = this.cartService.getTotalPrice();

  constructor (
    private cartService: CartService,
    private confirmService: ConfirmOrderService,
  ) { 
    this.data = this.cartService.getCartItems();
    // console.log(this.data);
    // this.data.subscribe(val => console.log(val))

    // this.data = this.cartService.getDataFromCart();
    // this.data.pipe(
    //   map(item => item.map(b => b))
    // )

    
    
    // this.length$ = this.data.pipe(
    //   map(data => data.length),
    // );
    // this.isCartEmpty = this.length$.pipe(
    //   map(number => (console.log(number > 0, number), number > 0)),
    // )
    // this.data.subscribe(data => console.log(data))
    // this.totalPrice$ = this.cartService.getTotalPrice();
    
   };

  //  removeItem (id:string | undefined) {
  //   if (!id) return;
    
  //   // this.cartService.updateCartState(id, false);
  //   // this.cartService.removeItemFromCart(id);
  //  }

  //  confirmOrder() {
  //   this.confirmService.confirmOrder();
  // }

  // handleConfirmation (event: KeyboardEvent) {
  //   console.log(event);
    

  // }


}
