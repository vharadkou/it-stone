import { PlayersBind } from '../../model';

export abstract class PlayerBindRepository{
    public abstract savePlayersBind(playersBind: PlayersBind): void
}