import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { productList } from '../../interfaces/shop-data.interface';

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent implements OnInit {

  @Input () productList!: productList | null;

  addToCartIsClicked:boolean = false;

  constructor () {
  }
  
  ngOnInit(): void {
    
  }

  addProductToCart () {
    this.addToCartIsClicked = true;
  }

}
