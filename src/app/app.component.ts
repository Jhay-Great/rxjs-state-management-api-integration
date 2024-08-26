import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// local module imports
import { ShoppingItemsComponent } from './components/shopping-items/shopping-items.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmOrderModalComponent } from './components/confirm-order-modal/confirm-order-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShoppingItemsComponent, CartComponent, ConfirmOrderModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-list-app';
}
