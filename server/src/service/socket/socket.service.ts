import { injectable, inject } from 'inversify';
import SocketIO from 'socket.io';
import { CardRepository } from '../card';

interface GameStepData {
    fields: [{
        id: number,
        cards: any[]
    }];
    myHp: number;
    enemyHp: number;
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

    public static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService(new CardRepository());
        }
        return SocketService.instance;
    }

    public async setSocket(socketIO: SocketIO.Server): Promise<void | Response> {

        socketIO.on('connection', async (client: SocketIO.Socket) => {
            this.clients.push(client);
            if (this.clients.length === 2) {
                const states = await this.createDefaultState();
                this.clients.forEach((c, index) => {
                    c.emit('onReady', states[index]);
                });
            }

            client.on('disconnect', () => this.onDisconnect(client));
            client.on('onStep', (data) => this.notifyOtherUser(client, data));
        });
    }

    public notifyOtherUser(client: SocketIO.Socket, data: GameStepData): void {
        const otherClient = this.clients.find((c) => c.id !== client.id);
        const newDate = this.swapStepData(data);
        otherClient.emit('onStepChange', newDate);
    }

    private onDisconnect(client: SocketIO.Socket): void {
        this.clients.splice(this.clients.indexOf(client), 1);
    }

    private swapStepData(data: GameStepData): GameStepData {
        data.fields.map((gameStepData: any) => {
            if (gameStepData.id === 1) {
                gameStepData.id = 4;
                return gameStepData;
            }

            if (gameStepData.id === 4) {
                gameStepData.id = 1;
                return gameStepData;
            }

            if (gameStepData.id === 2) {
                gameStepData.id = 3;
                return gameStepData;
            }

            if (gameStepData.id === 3) {
                gameStepData.id = 2;
                return gameStepData;
            }

        });

        let tmp = data.myHp;
        data.myHp = data.enemyHp;
        data.enemyHp = tmp;

        return data;
    }

    private async createDefaultState(): Promise<any[]> {
        let cards: any = await this.cardRepository.getCards();
        cards = cards.map((card: any) => card['_doc']).map((card: any) => {
            return {
                name: card.name,
                image: card.image,
                hp: card.hp,
                superSkill: card.superSkill,
                createAttack: card.createAttack
            }
        });
        console.log(cards);
        const firstDeck = [];
        const secondDeck = [];

        for (let index = 0; index < 15; index++) {
            const rnd = Math.floor(Math.random() * 10);
            firstDeck.push(cards[rnd]);
        }

        for (let index = 0; index < 15; index++) {
            const rnd = Math.floor(Math.random() * 10);
            secondDeck.push(cards[rnd]);
        }

        const firstUser = {
            fields: [{
                id: 1,
                cards: firstDeck,
            }, {
                id: 2,
                cards: [],
            }, {
                id: 3,
                cards: [],
            }, {
                id: 4,
                cards: secondDeck,
            }],
            myHp: 100,
            enemyHp: 100,
        };

        const secondUser = this.swapStepData(firstUser as GameStepData);

        return [firstUser, secondUser]
    }
}

