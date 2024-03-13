import { CompleteSignalsExampleComponent } from './complete-signals-example.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchStatus, SportingSeason } from './models/sporting-season';
import { signal } from '@angular/core';

describe('CompleteSignalsExampleComponent', () => {
  let component: CompleteSignalsExampleComponent;
  let fixture: ComponentFixture<CompleteSignalsExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompleteSignalsExampleComponent],
    });

    fixture = TestBed.createComponent(CompleteSignalsExampleComponent);
    component = fixture.componentInstance;
  });

  describe('constructor', () => {
    it('should create instance', () => {
      expect(component).toBeDefined();
    });

    it('should trigger effect when component initialize itself', () => {
      const spy = spyOn(console, 'log');

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledOnceWith(
        `Number of wins has been updated to : ${component.nbWins()}`
      );
    });
  });

  describe('addWin', () => {
    it('should add a new element to the matches when there is none', () => {
      component.sportingSeason = signal<SportingSeason>({
        name: 'Season 5',
        matches: [],
      });

      component.addWin();

      expect(component.sportingSeason().matches.length).toBe(1);
    });

    it('should add a new element to the matches when there is already some elements', () => {
      component.sportingSeason = signal<SportingSeason>({
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
        ],
      });

      component.addWin();

      expect(component.sportingSeason().matches.length).toBe(3);
    });

    it('should add a new element to the matches, this new element should have a greater goalScored than goalConceded', () => {
      component.sportingSeason = signal<SportingSeason>({
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
        ],
      });

      component.addWin();

      const lastMatchAdded = component.sportingSeason().matches.at(-1);
      expect(lastMatchAdded!.goalScored).toBeGreaterThan(
        lastMatchAdded!.goalConceded
      );
    });
  });

  describe('removeWin', () => {
    it('should remove the last match won', () => {
      component.sportingSeason = signal<SportingSeason>({
        name: 'Season 5',
        matches: [
          {
            status: MatchStatus.Win,
            goalScored: 1,
            goalConceded: 0,
          },
          {
            status: MatchStatus.Draw,
            goalScored: 2,
            goalConceded: 2,
          },
          {
            status: MatchStatus.Loss,
            goalScored: 1,
            goalConceded: 0,
          },
        ],
      });

      component.removeWin();

      expect(component.sportingSeason().matches.length).toBe(2);
    });

    it('should remove the only the last match won when there is several matches won', () => {
      component.sportingSeason = signal<SportingSeason>({
        name: 'Season 5',
        matches: [
          {
            status: MatchStatus.Win,
            goalScored: 1,
            goalConceded: 0,
          },
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
            goalConceded: 0,
          },
        ],
      });

      component.removeWin();

      expect(component.sportingSeason().matches.length).toBe(4);
    });

    it('should do nothing when matches is empty', () => {
      component.sportingSeason = signal<SportingSeason>({
        name: 'Season 5',
        matches: [],
      });

      component.removeWin();

      expect(component.sportingSeason().matches.length).toBe(0);
    });

    it('should do nothing when there is no match won', () => {
      component.sportingSeason = signal<SportingSeason>({
        name: 'Season 5',
        matches: [
          {
            status: MatchStatus.Draw,
            goalScored: 2,
            goalConceded: 2,
          },
          {
            status: MatchStatus.Loss,
            goalScored: 1,
            goalConceded: 0,
          },
        ],
      });

      component.removeWin();

      expect(component.sportingSeason().matches.length).toBe(2);
    });
  });
});
