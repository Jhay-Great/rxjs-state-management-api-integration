import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

// local module imports
import { ShopDataService } from '../../services/shop-data/shop-data.service';
import { Observable } from 'rxjs';

// interfaces
import { ProductList,  } from '../../interfaces/shop-data.interface';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-shopping-items',
  standalone: true,
  imports: [AsyncPipe, ShoppingCardComponent, CartComponent],
  templateUrl: './shopping-items.component.html',
  styleUrl: './shopping-items.component.css'
})
export class ShoppingItemsComponent implements OnInit {

  productList$!: Observable<ProductList>;
  loading$!:Observable<boolean>;
  error$!:Observable<string | null>;
  data!:ProductList;

  constructor (
    private shoppingMartData: ShopDataService,
  ) {  }
  
  ngOnInit(): void {
    this.productList$ = this.shoppingMartData.getData();
    this.loading$ = this.shoppingMartData.loading$;
    this.error$ = this.shoppingMartData.error$;
    
  }
}
