import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ConfirmOrderService } from '../../services/confirm-order.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-order-modal',
  standalone: true,
  imports: [ AsyncPipe, CurrencyPipe ],
  templateUrl: './confirm-order-modal.component.html',
  styleUrl: './confirm-order-modal.component.css'
})
export class ConfirmOrderModalComponent implements OnInit {

  data
  totalPrice$!: Observable<number>
  
  constructor (
    private cartService: CartService,
    private confirmService: ConfirmOrderService,
  ) {
    this.data = this.cartService.getDataFromCart();
    
  };
  
  ngOnInit(): void {
    this.totalPrice$ = this.cartService.getTotalPrice();
    
  }

  startNewOrder() {
    this.confirmService.handleNewOrders();
    // this.cartService.
  }


}
