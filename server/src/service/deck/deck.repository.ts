import { Deck } from '../../models/new-deck';
import { Card } from '../../models/new-card';

export abstract class DeckRepository {
    abstract getDeckCardsById(id: number): Promise<Card[]>
    abstract getDecks(): Promise<Deck[]>
    abstract getDeckById(id: number): Promise<Deck>
    abstract getDeckByTitle(title: string): Promise<Deck>
}
