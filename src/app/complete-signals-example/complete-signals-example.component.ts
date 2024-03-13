import { Component, signal, computed, effect } from '@angular/core';
import { MatchStatus, SportingSeason } from './models/sporting-season';

@Component({
  standalone: true,
  templateUrl: './complete-signals-example.component.html',
  styleUrls: ['./complete-signals-example.component.scss'],
})
export class CompleteSignalsExampleComponent {
  sportingSeason = signal<SportingSeason>({
    name: 'Season 5',
    matches: [
      {
        status: MatchStatus.Draw,
        goalScored: 2,
        goalConceded: 2,
      },
      {
        status: MatchStatus.Win,
        goalScored: 3,
        goalConceded: 1,
      },
      {
        status: MatchStatus.Win,
        goalScored: 2,
        goalConceded: 0,
      },
      {
        status: MatchStatus.Loss,
        goalScored: 1,
        goalConceded: 2,
      },
      {
        status: MatchStatus.Win,
        goalScored: 1,
        goalConceded: 0,
      },
      {
        status: MatchStatus.Loss,
        goalScored: 1,
        goalConceded: 0,
      },
    ],
  });

  nbWins = computed(() =>
    this.sportingSeason().matches.reduce(
      (previous, current) =>
        current.status === MatchStatus.Win ? previous + 1 : previous,
      0
    )
  );
  nbLosses = computed(() =>
    this.sportingSeason().matches.reduce(
      (previous, current) =>
        current.status === MatchStatus.Loss ? previous + 1 : previous,
      0
    )
  );
  nbDraws = computed(() =>
    this.sportingSeason().matches.reduce(
      (previous, current) =>
        current.status === MatchStatus.Draw ? previous + 1 : previous,
      0
    )
  );
  nbMatch = computed(() => this.sportingSeason().matches.length);

  constructor() {
    effect(() =>
      console.log(`Number of wins has been updated to : ${this.nbWins()}`)
    );
  }

  addWin(): void {
    this.sportingSeason.update((data) => {
      const sportingSeasonUpdated: SportingSeason = { ...data };

      const minCeiled = Math.ceil(1);
      const maxFloored = Math.floor(5);
      const goalScored = Math.floor(
        Math.random() * (maxFloored - minCeiled) + minCeiled
      );

      sportingSeasonUpdated.matches.push({
        status: MatchStatus.Win,
        goalScored: goalScored,
        goalConceded: goalScored - 1,
      });

      return sportingSeasonUpdated;
    });
  }

  removeWin(): void {
    this.sportingSeason.update((data) => {
      const sportingSeasonUpdated: SportingSeason = { ...data };

      const nbMatchesWon = sportingSeasonUpdated.matches.filter(
        (match) => match.status === MatchStatus.Win
      ).length;

      if (nbMatchesWon > 0) {
        const lastIndexOfWin = sportingSeasonUpdated.matches
          .map((match) => match.status)
          .lastIndexOf(MatchStatus.Win);
        sportingSeasonUpdated.matches.splice(lastIndexOfWin, 1);
      }

      return sportingSeasonUpdated;
    });
  }
}
