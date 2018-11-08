import { injectable, inject } from 'inversify';
import SocketIO from 'socket.io';
import { CardRepository } from '../card';
import { Card } from './../../models';

interface DataFromFront {
  myCardCount: number;
  enemyCardCount?: number;
  myActiveCards: number[];
  enemyActiveCards: number[];
  myHp: number;
  enemyHp: number;
}

interface User {
  cards: Card[];
  deck: number[];
  enemyCardCount: number;
  myCards: number[];
  enemyActiveCards: number[];
  myActiveCards: number[];
}

@injectable()
export class SocketService {
  private static instance: SocketService;
  private clients: SocketIO.Socket[] = [];

  private constructor(
    @inject(CardRepository) private cardRepository: CardRepository
  ) {
    if (SocketService.instance) {
      throw new Error('You try to destroy singleton');
    }
  }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService(new CardRepository());
        }
        return SocketService.instance;
    }

  public async setSocket(socketIO: SocketIO.Server): Promise<void | Response> {
    socketIO.on('connection', async (client: SocketIO.Socket) => {
      this.clients.push(client);
      if (this.clients.length === 2) {
        const states = await this.createDefaultState(15, 5);
        this.clients.forEach((c, index) => {
          c.emit('onReady', states[index]);
        });
      }

      client.on('disconnect', () => this.onDisconnect(client));
      client.on('onStep', data => this.notifyOtherUser(client, data));
    });
  }

  public notifyOtherUser(client: SocketIO.Socket, data: DataFromFront): void {
    const otherClient = this.clients.find(c => c.id !== client.id);
    const newDate = this.swapStepData(data);
    otherClient.emit('onStepChange', newDate);
  }

  private onDisconnect(client: SocketIO.Socket): void {
    this.clients.splice(this.clients.indexOf(client), 1);
  }

  private swapStepData(data: DataFromFront): DataFromFront {
    const enemyActiveCards = data.myActiveCards.slice(
      0,
      data.myActiveCards.length
    );
    const myActiveCards = data.enemyActiveCards.slice(
        0,
        data.enemyActiveCards.length
    );

    data.myActiveCards = myActiveCards;
    data.enemyActiveCards = enemyActiveCards;
    data.enemyCardCount = data.myCardCount;

    const tmp = data.myHp;
    data.myHp = data.enemyHp;
    data.enemyHp = tmp;

    return data;
  }

  private async createDefaultState(deckLength: number, cardsLength: number): Promise<any[]> {
    let cards: any = await this.cardRepository.getCards();
    let cardId = 0;
    cards = cards.map((card: any) => card['_doc']).map((card: any) => {
      return {
        id: cardId++,
        name: card.name,
        image: card.image,
        hp: card.hp,
        superSkill: card.superSkill,
        ignore: card.ignore,
        createAttack: JSON.parse(card.createAttack)
      };
    });
    const firstDeck = [];
    const secondDeck = [];
    const myCardArr = [];

    for (let i = 0; i < cardsLength; i++) {
      const rnd = Math.floor(Math.random() * cards.length);
      myCardArr.push(rnd);
    }

    for (let index = 0; index < deckLength; index++) {
      const rnd = Math.floor(Math.random() * 10);
      firstDeck.push(rnd);
    }

    for (let index = 0; index < deckLength; index++) {
      const rnd = Math.floor(Math.random() * 10);
      secondDeck.push(rnd);
    }

    const firstUser: User = {
      cards: cards as Card[],
      deck: firstDeck,
      enemyCardCount: 5,
      myCards: myCardArr,
      enemyActiveCards: [],
      myActiveCards: [],
    };

    const secondUser = this.swapStepData(firstUser as any);

    return [firstUser, secondUser];
  }
}
