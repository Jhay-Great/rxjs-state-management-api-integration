import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { debounceTime, fromEvent, Subject, takeUntil, tap, throttleTime } from 'rxjs';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent implements OnInit, OnDestroy {

  @Input () route!:string;
  @Input () image!:string;
  destroy$ = new Subject<void>();

  // elementRef: any;
  
  constructor (
    private elementRef: ElementRef,
  ) {};
  
  ngOnInit(): void {
    const categoryCardElement = this.elementRef.nativeElement.querySelector('.category-card > button');

    fromEvent(categoryCardElement, 'click').pipe(
      // takeUntil(this.destroy$),
      // debounceTime(300),
      throttleTime(1000),
      tap(event => {
        console.log('event: ', event);
      }),
    ).subscribe(data => console.log(data));
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
