import { inject, injectable } from 'inversify';

import { AppTokenRepository } from 'service/app-token';
import { PlayersBind } from '../../model';

@injectable()
export class PlayersBindService {
    private playersBinds: PlayersBind[] = [];

    constructor(
        @inject(AppTokenRepository) private tokenRepository: AppTokenRepository
    ) { }

    public getPlayersBinds(): PlayersBind[]{
        return this.playersBinds
    }
}
