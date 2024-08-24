import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
// local module imports
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  isCartEmpty:boolean = !true;
  data
  length$!: Observable<number>;

  constructor (
    private cartService: CartService,
  ) { 
    this.data = this.cartService.getDataFromCart();
    this.length$ = this.data.pipe(
      map(data => data.length),
    )
    // this.data.subscribe(data => console.log(data))
    
   };

   removeItem (id:string | undefined) {
    if (!id) return;
    
    console.log(id);
    this.cartService.removeItemFromCart(id);
   }


}
