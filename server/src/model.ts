export interface AppToken {    
    token: string;    
}

export interface PlayersBind {
    room: string;
    players: string[];
}

export enum RoomStatus {
    INIT,
    GAME_STARTED,
    GAME_FINISHED
}

export interface Room {
    roomToken: string;
    players: Player[];
    status: RoomStatus;
}

export enum ResultStatus {
    INIT,
    WIN,
    LOSE,
    DEAD_HEAT,
}

export enum ParticipationStatus {
    INIT,
    LEAVE,
    PLAY
}

export interface Player {
    playerToken: string;
    playerSocket: string;
    participationStatus: ParticipationStatus;
    resultStatus: ResultStatus;
}

export interface Skill {
    id: number;
    name: string;
    description: string;
}

export interface User {
    userToken: string;
}