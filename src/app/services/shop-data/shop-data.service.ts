import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// import module import
import { ProductList, OrderData, OrderItem, Product } from '../../interfaces/shop-data.interface';
import { Observable, BehaviorSubject, map, debounceTime, delay, tap, retry, catchError, of, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {

  private data$!: Observable<ProductList>
  private jsonDataUrl = '../../assets/data.json';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  successRate:number = 0.6;

  // subjects
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();


  constructor(
    private http: HttpClient,
  ) { }

  //  fetchProductData (): void {
   fetchProductData (): Observable<ProductList> {
     // this.data$ = this.http.get<ProductList>(`${this.jsonDataUrl}`)
     return this.http.get<ProductList>(`${this.jsonDataUrl}`).pipe(
       tap(() => {
        this.loadingSubject.next(true);

      }),
      throttleTime(1000),
      delay(2000),
      map(data => {
        if (Math.random() < this.successRate) {
          this.loadingSubject.next(false);
          return data;
        } else {
          throw new Error('An error occurred in fetching data')
        }
      }),
      retry(2),
      catchError(error => {
        this.errorSubject.next('Failed to load data kindly contact admin');
        this.loadingSubject.next(false);
        console.log(error); // for debugging purposes
        return of([]);
      })
    )
   }
   

  getData () :Observable<ProductList> {
    return this.fetchProductData();
    // this.data$.pipe(
    //   map(data => {
    //     data.map(dessert => 
    //       ({...dessert, addedToCart: false})
    //     );
    //   })
    // )
    // return this.data$
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
