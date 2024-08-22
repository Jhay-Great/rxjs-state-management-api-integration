import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { productData, productList } from '../../interfaces/shop-data.interface';

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent implements OnInit {

  @Input () productList!: productList | null;

  constructor () {
  }
  
  ngOnInit(): void {
    console.log(this.productList)
    
  }

}
