import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ShoppingItemsComponent } from './components/shopping-items/shopping-items.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,

    },
    {
        path: 'dessert',
        component: ShoppingItemsComponent,
    }
];
