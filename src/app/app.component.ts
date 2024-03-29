import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  routes: { name: string; url: string }[] = [
    {
      name: 'Basic Example',
      url: 'basic',
    },
    {
      name: 'Complete Example',
      url: 'complete',
    },
    {
      name: 'Complete Example With Children',
      url: 'complete-with-children',
    },
  ];
}
