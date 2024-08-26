import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ConfirmOrderService {

  private isConfirmedSubject = new BehaviorSubject<boolean>(false);
  isConfirmed$ = this.isConfirmedSubject.asObservable();


  constructor() { }

  confirmOrder () {
    this.isConfirmedSubject.next(true);
  }

  handleNewOrders () {
    this.isConfirmedSubject.next(false);
  }
}
