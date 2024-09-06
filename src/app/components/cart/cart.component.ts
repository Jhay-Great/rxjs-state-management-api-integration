import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
// local module imports
import { CartService } from '../../services/cart/cart.service';
import { ConfirmOrderService } from '../../services/confirm-order/confirm-order.service';
import { OrderItem } from '../../interfaces/shop-data.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ AsyncPipe, CommonModule, ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  // isCartEmpty:boolean = !false;
  // isCartEmpty!: Observable<boolean>;
  // data!:Observable<OrderItem[]>
  cartItems!:Observable<OrderItem[]>
  // length$!: Observable<number>;
  // totalPrice$ = this.cartService.getTotalPrice();

  constructor (
    private cartService: CartService,
    private confirmService: ConfirmOrderService,
  ) { 
    // console.log(this.data);
    // this.data.subscribe(val => console.log(val))
    // this.data = this.cartService.getCartItems();

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

   ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();

   }

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
