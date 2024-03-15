import { CommonModule } from '@angular/common';
import { Component, input, Output, EventEmitter } from '@angular/core';
import { MatchStatus, SportingSeason } from '../../models/sporting-season';

@Component({
  selector: 'app-table-with-signals',
  standalone: true,
  styleUrls: ['./table-with-signals.component.scss'],
  imports: [
    CommonModule,
  ],
  templateUrl: './table-with-signals.component.html',
})
export class TableWithSignalsComponent {

  @Output() addMatch = new EventEmitter<MatchStatus>();
  @Output() removeMatch = new EventEmitter<MatchStatus>();

  dataTable = input.required<SportingSeason>();

  MatchStatus = MatchStatus;

  addMatchClicked(matchStatus: MatchStatus) {
    this.addMatch.emit(matchStatus);
  }

  removeMatchClicked(matchStatus: MatchStatus) {
    this.removeMatch.emit(matchStatus);
  }

}
