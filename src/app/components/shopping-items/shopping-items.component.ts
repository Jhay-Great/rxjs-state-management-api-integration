import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

// local module imports
import { ShopDataService } from '../../services/shop-data.service';
import { map, Observable } from 'rxjs';

// interfaces
import { productCategory, productList, productData } from '../../interfaces/shop-data.interface';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-shopping-items',
  standalone: true,
  imports: [AsyncPipe, ShoppingCardComponent, CartComponent],
  templateUrl: './shopping-items.component.html',
  styleUrl: './shopping-items.component.css'
})
export class ShoppingItemsComponent {

  productList$!: Observable<productList>;

  data!:productList;

  constructor (
    private shoppingMartData: ShopDataService,
  ) {

    this.productList$ = this.shoppingMartData.fetchProductData();

    // // console.log(this.shoppingMartData.fetchProductData());
    // this.productList$ = this.shoppingMartData.fetchProductData();
    // // console.log(this.productList$);

    // this.productList$.subscribe((val:productList) => {
    //   console.log(val);
    //   this.data = val;
    //   if (Array.isArray(val)) {
    //     console.log('Is array');
    //   } else {
    //     console.log('Is not array');
    //   }
    //   // console.log(this.data);
    //   // console.log(this.data.map(val => console.log(val)))
    // });
    
    
    
    // // this.productList$.subscribe(value => value.map(val => console.log(val.name)));

    // // this.data$ = this.productList$.pipe(
    // //   map(value => [...value])
    // // );

    // const httpResponse$ = this.shoppingMartData.fetchProductData();

    // // this.productList$ = httpResponse$.pipe(
    // //   map((value:productList) => value),
    // // )

    // httpResponse$.subscribe(val => console.log(val))


    


  }
}
