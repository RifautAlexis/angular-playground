export interface SportingSeason {
    name: string;
    matches: Match[];
}

export interface Match {
    status: MatchStatus;
    goalScored: number;
    goalConceded: number;
}

export enum MatchStatus {
    Draw = 'Draw',
    Win = 'Win',
    Loss = 'Loss',
}