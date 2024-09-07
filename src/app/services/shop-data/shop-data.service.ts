import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// import module import
import { ProductList, OrderData, OrderItem, Product } from '../../interfaces/shop-data.interface';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {

  private data$!: Observable<ProductList>
    private jsonDataUrl = '../../assets/data.json'

  constructor(
    private http: HttpClient,
  ) { }

   fetchProductData (): void {
    this.data$ = this.http.get<ProductList>(`${this.jsonDataUrl}`)
   }
   

  getData () :Observable<ProductList> {
    this.fetchProductData();
    // this.data$.pipe(
    //   map(data => {
    //     data.map(dessert => 
    //       ({...dessert, addedToCart: false})
    //     );
    //   })
    // )
    return this.data$
  }

  findItem (name:string) {
    return this.data$.pipe(
      map(data => data.find(data => data.name === name)),
    )
  }
  // findItem (id:string) {
  //   return this.data$.pipe(
  //     map(data => data.find(data => data.id === id)),
  //   )
  // }
  
}
