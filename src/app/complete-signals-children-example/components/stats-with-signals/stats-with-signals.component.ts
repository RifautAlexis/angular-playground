import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-stats-with-signals',
  standalone: true,
  templateUrl: './stats-with-signals.component.html',
})
export class StatsWithSignalsComponent  {

  nbMatch = input<number>();
  nbWins = input<number>();
  nbLosses = input<number>();
  nbDraws = input<number>();

  constructor() {
    effect(() => {
      console.log(`Number of matches has been updated to :${this.nbMatch()}`);
    });
    effect(() => {
      console.log(`Number of matches won has been updated to :${this.nbWins()}`);
    });
    effect(() => {
      console.log(`Number of matches losses has been updated to :${this.nbLosses()}`);
    });
    effect(() => {
      console.log(`Number of matches draw has been updated to :${this.nbDraws()}`);
    });
  }
}
