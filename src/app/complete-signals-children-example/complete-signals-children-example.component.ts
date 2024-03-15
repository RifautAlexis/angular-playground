import {
  Component,
  signal,
  computed,
} from '@angular/core';
import { MatchStatus, SportingSeason } from './models/sporting-season';
import { StatsWithSignalsComponent } from './components/stats-with-signals/stats-with-signals.component';
import { TableWithSignalsComponent } from './components/table-with-signals/table-with-signals.component';

@Component({
  selector: 'app-complete-signals-children-example',
  standalone: true,
  templateUrl: './complete-signals-children-example.component.html',
  imports: [StatsWithSignalsComponent, TableWithSignalsComponent],
})
export class CompleteSignalsChildrenExampleComponent {
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

  addMatch(matchStatus: MatchStatus): void {
    this.sportingSeason.update((data) => {
      const sportingSeasonUpdated: SportingSeason = { ...data };

      let goalScored = 0;
      let goalConceded = 0;
      let minCeiled = 0;
      let maxFloored = 0;

      switch (matchStatus) {
        case MatchStatus.Win:
          minCeiled = Math.ceil(1);
          maxFloored = Math.floor(5);
          goalScored = Math.floor(
            Math.random() * (maxFloored - minCeiled) + minCeiled
          );
          goalConceded = goalScored - 1;
          break;
        case MatchStatus.Loss:
          minCeiled = Math.ceil(1);
          maxFloored = Math.floor(5);
          goalConceded = Math.floor(
            Math.random() * (maxFloored - minCeiled) + minCeiled
          );
          goalScored = goalConceded - 1;
          break;
        case MatchStatus.Draw:
        default:
          minCeiled = Math.ceil(1);
          maxFloored = Math.floor(5);
          goalScored = goalConceded = Math.floor(
            Math.random() * (maxFloored - minCeiled) + minCeiled
          );
          break;
      }

      sportingSeasonUpdated.matches.push({
        status: matchStatus,
        goalScored: goalScored,
        goalConceded: goalScored,
      });

      return sportingSeasonUpdated;
    });
  }

  removeMatch(matchStatus: MatchStatus): void {
    this.sportingSeason.update((data) => {
      const sportingSeasonUpdated: SportingSeason = { ...data };

      const nbMatchesFiltered = sportingSeasonUpdated.matches.filter(
        (match) => match.status === matchStatus
      ).length;

      if (nbMatchesFiltered > 0) {
        const lastIndexOfSelectedMatch = sportingSeasonUpdated.matches
          .map((match) => match.status)
          .lastIndexOf(matchStatus);
        sportingSeasonUpdated.matches.splice(lastIndexOfSelectedMatch, 1);
      }

      return sportingSeasonUpdated;
    });
  }
}
