import { Card } from '../../models/new-card';

export abstract class CardRepository {
    abstract getCards(): Promise<Card[]>
    abstract deleteCard(requestId: number): Promise<boolean>;
    abstract saveCard(
        id: number,
        name: string,
        surname: string,
        image: string,
        skills: string[],
        hp: number,
        damage: number
    ): Promise<Card>
    abstract updateCard(card: Card): Promise<boolean>
}