import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'basic-counter',
        title: 'Basic Counter',
        loadComponent: () => import('./basic-signals-counter/basic-signals-counter.component').then(comp => comp.BasicSignalsCounterComponent),
    }
];
