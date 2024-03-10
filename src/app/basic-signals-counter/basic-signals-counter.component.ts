import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-basic-signals-counter',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './basic-signals-counter.component.html',
})
export class BasicSignalsCounterComponent {
  counter = signal<number>(0);

  increment() {
    this.counter.update(currentCounterValue => currentCounterValue + 1);
  }

  decrement() {
    this.counter.update(currentCounterValue => currentCounterValue - 1);
  }

  setValue(newValue: number) {
    this.counter.set(newValue);
  }
}
