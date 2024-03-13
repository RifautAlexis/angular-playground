import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './basic-signals-counter.component.html',
})
export class BasicSignalsCounterComponent {
  counter = signal<number>(0);

  increment() {
    this.counter.update((currentCounterValue) => currentCounterValue + 1);
  }

  decrement() {
    this.counter.update((currentCounterValue) => currentCounterValue - 1);
  }

  setValue(inputValue: any) {
    this.counter.set(inputValue.target?.value);
  }
}
