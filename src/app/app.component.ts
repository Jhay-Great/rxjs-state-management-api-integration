import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// local module imports
import { ShoppingItemsComponent } from './components/shopping-items/shopping-items.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmOrderModalComponent } from './components/confirm-order-modal/confirm-order-modal.component';
import { CartService } from './services/cart.service';
import { ConfirmOrderService } from './services/confirm-order.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShoppingItemsComponent, CartComponent, ConfirmOrderModalComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-list-app';
  isConfirmed!:boolean;
  confirm!: Observable<boolean>

  constructor (
    // private cartService: CartService,
    private confirmService: ConfirmOrderService,
  ) {
    // this.isConfirmed = this.cartService.isConfirmed;
    this.confirm = this.confirmService.isConfirmed$
    this.confirmService.isConfirmed$.subscribe(value => console.log('i trigger on init: ', value))
  };
}
