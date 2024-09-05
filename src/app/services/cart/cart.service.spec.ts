import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove the item from the cart', () => {
    const cartData = [
      {
        orderId: 12, 
        name: 'doughnut', 
        price: 12.30, 
        productId: '321sa', 
        quantityCount: 2,
      },
      {
        orderId: 12, 
        name: 'doughnut', 
        price: 12.30, 
        productId: '321sa', 
        quantityCount: 2,
      }
    ];
    
    
  })
  
});
