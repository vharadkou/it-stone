import { PlayersBind } from 'models';

export abstract class PlayerBindRepository{
    public abstract savePlayersBind(playersBind: PlayersBind): void
}