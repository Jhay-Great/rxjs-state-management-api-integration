import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import module import
import '../../assets/data.json'

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {
  api:string = '';

  constructor(
    private http: HttpClient,
  ) { 

   }

   fetchProductData () {
    
   }
}
