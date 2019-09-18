import { interfaces, controller, httpGet, response, request, queryParam } from 'inversify-express-utils';
import * as express from 'express';
import { inject } from 'inversify';
import { DeckRepository } from 'service';
import { Card } from '../../models/new-card';
import { Deck } from '../../models/new-deck';

@controller('/api')
export class DeckController implements interfaces.Controller {
    public constructor(
        @inject(DeckRepository) private deckRepository: DeckRepository
    ) { }

    @httpGet('/get-cards-from-deck/')
    private async getDeckCardsById(
        @queryParam("id") request: number,
        @response() response: express.Response
    ): Promise<Card[] | express.Response> { 
        try {
            return this.deckRepository.getDeckCardsById(request);
          } catch (error) {
            response.json(error);
        }
    }

    @httpGet('/get-decks/')
    private async getDecks(
        @request() request: express.Request,
        @response() response: express.Response
    ): Promise<Deck[] |express.Response> { 
        try {
            return this.deckRepository.getDecks();
          } catch (error) {
            response.json(error);
        }
    }

    @httpGet('/get-deck-by-id/')
    private async getDeckById(
        @queryParam("id") request: number,
        @response() response: express.Response
    ): Promise<Deck | express.Response> { 
        try {
            return this.deckRepository.getDeckById(request);
          } catch (error) {
            response.json(error);
        }
    }

    @httpGet('/get-deck-by-title/')
    private async getDeckByTitle(
        @queryParam("title") request: string,
        @response() response: express.Response
    ): Promise<Deck | express.Response> { 
        try {
            return this.deckRepository.getDeckByTitle(request);
          } catch (error) {
            response.json(error);
        }
    }
}
