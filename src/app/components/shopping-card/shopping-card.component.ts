import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter, map, mergeMap, Observable, of, switchMap, take, tap } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';

// local module imports
import { ShopDataService } from '../../services/shop-data/shop-data.service';
import { ProductList, Product, OrderItem } from '../../interfaces/shop-data.interface';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent implements OnInit {

  @Input () product!: Product;

  orderData!:Observable<OrderItem[]>;
  addToCartIsClicked:boolean = false;
  productName!:string;
  

  constructor (
    private cartService: CartService,
  ) {  }
  
  ngOnInit(): void {
    this.orderData = this.cartService.getCartItems();
    // this.orderData.subscribe(val =>
    //   console.log('in component: ', val),
    // ) // for dev purposes strictly
  }

  onAddToCart (id:string) { 
    this.productName = id;
    this.addToCartIsClicked = true;
    this.cartService.addToCart(id);
  }

  onReduceProductQuantity (id:string) {
    this.cartService.decreaseQuantity(id);
    this.cartService.getQuantityCount(id).subscribe(
      quantity => {
        if (quantity > 0) return;
        this.cartService.removeOrderFromCart(id);
        this.addToCartIsClicked = false; // use this to display addToCart btn
        
      }
    );
    
  }

  onIncreaseProductQuantity (id:string) {
    this.cartService.increaseQuantity(id)
  }
  
}
