import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// import module import
import { ProductList, OrderData, OrderItem, Product } from '../../interfaces/shop-data.interface';
import { Observable, BehaviorSubject, map, debounceTime, delay, tap, retry, catchError, of, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {

  private jsonDataUrl = '../../assets/data.json';
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private dataSubject = new BehaviorSubject<ProductList | null>(null)
  
  successRate:number = 0.6;
  
  // subjects
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  // private data$!: Observable<ProductList>
  private data$ = this.dataSubject.asObservable();


  constructor(
    private http: HttpClient,
  ) { }

  //  fetchProductData (): void {
   fetchProductData ():Observable<ProductList> {
    console.log('fetched product data fn here')
     // this.data$ = this.http.get<ProductList>(`${this.jsonDataUrl}`)
     return this.http.get<ProductList>(`${this.jsonDataUrl}`).pipe(
    //  this.data$ = this.http.get<ProductList>(`${this.jsonDataUrl}`).pipe(
      // this.mockApiRequest() // creating custom observable

       tap(() => {
        console.log('loading spinner in fetch fn')
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

  //  mockApiRequest () {
  //   tap(() => {
  //     this.loadingSubject.next(true);

  //   }),
  //   throttleTime(1000),
  //   delay(2000),
  //   map(data => {
  //     if (Math.random() < this.successRate) {
  //       this.loadingSubject.next(false);
  //       return data;
  //     } else {
  //       throw new Error('An error occurred in fetching data')
  //     }
  //   }),
  //   retry(2),
  //   catchError(error => {
  //     this.errorSubject.next('Failed to load data kindly contact admin');
  //     this.loadingSubject.next(false);
  //     console.log(error); // for debugging purposes
  //     return of([]);
  //   })
  //  }
   

  getData () :Observable<ProductList> {
    console.log('called...')

    if (!this.dataSubject.value) {
      this.fetchProductData().subscribe(
        data => this.dataSubject.next(data)
      )
    }
    
    
    // this.fetchProductData();
    return this.data$.pipe(
    // return this.data$.pipe(
      map(data => {
        if (!data) return []; // returning an empty array if no data is available

        return data.map(dessert => 
          ({...dessert, addedToCart: false})
        );
      })
    )
    // return this.data$
  }

  findItem (name:string) {
    return this.data$.pipe(
      // tap(data => { // for debugging and dev mode
      //   console.log(data);
      // }),
      map(data => data ? data.find(data => data.name === name) : null),
    )
  }
  // findItem (id:string) {
  //   return this.data$.pipe(
  //     map(data => data.find(data => data.id === id)),
  //   )
  // }
  
}
