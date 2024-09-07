import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// import module import
import { ProductList, OrderData, OrderItem, Product } from '../../interfaces/shop-data.interface';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';

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
    return this.data$.pipe(
      // transforming the observable data to add a cart boolean
      map(data => {
        return data.map(dessert => 
          ({...dessert, addedToCart: false})
        );
      }),
      // tap(data => {
      //   console.log(data);
      // })
    )
    // return this.data$ // returns initial observable data without transformation
  }

  findItem (name:string) {
    // return this.data$.pipe(
    return this.getData().pipe(
      map(data => data.find(data => data.name === name)),
    )
  }
  // findItem (id:string) {
  //   return this.data$.pipe(
  //     map(data => data.find(data => data.id === id)),
  //   )
  // }
  
}
