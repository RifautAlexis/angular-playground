import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'basic',
    title: 'Basic Example',
    loadComponent: () =>
      import('./basic-signals-counter/basic-signals-counter.component').then(
        (comp) => comp.BasicSignalsCounterComponent
      ),
  },
  {
    path: 'complete',
    title: 'Complete Example',
    loadComponent: () =>
      import(
        './complete-signals-example/complete-signals-example.component'
      ).then((comp) => comp.CompleteSignalsExampleComponent),
  },
];
