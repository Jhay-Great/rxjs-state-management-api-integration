import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ConfirmOrderService } from '../../services/confirm-order.service';

@Component({
  selector: 'app-confirm-order-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-order-modal.component.html',
  styleUrl: './confirm-order-modal.component.css'
})
export class ConfirmOrderModalComponent {

  constructor (
    private cartService: CartService,
    private confirmService: ConfirmOrderService,
  ) {

  };

  startNewOrder() {
    this.confirmService.handleNewOrders();
  }


}
