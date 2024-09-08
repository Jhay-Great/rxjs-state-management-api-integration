import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, CategoryCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
