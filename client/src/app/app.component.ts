import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SocketService } from './services/socket.service';
enum Status {
    GameField,
    Auth
}

interface SelectedCard {
    type: string;
    person: any;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public myCard = [
        {
            firstName: 'Valiantsin1',
            lastName: 'Tsikhanau',
            picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
            jobPosition: '...',
            skil1: 'Skil1',
            skil2: 'Skil2',
            skil3: 'Skil3',
        },
        {
            firstName: 'Valiantsin2',
            lastName: 'Tsikhanau',
            picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
            jobPosition: '...',
            skil1: 'Skil1',
            skil2: 'Skil2',
            skil3: 'Skil3',
        },
        {
            firstName: 'Valiantsin3',
            lastName: 'Tsikhanau',
            picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
            jobPosition: '...',
            skil1: 'Skil1',
            skil2: 'Skil2',
            skil3: 'Skil3',
        },
    ];
    public myActiveCard = [];
    public enemyActiveCard = [
        {
            firstName: 'Valiantsin4',
            lastName: 'Tsikhanau',
            picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
            jobPosition: '...',
            skil1: 'Skil1',
            skil2: 'Skil2',
            skil3: 'Skil3',
        },
        {
            firstName: 'Valiantsi5',
            lastName: 'Tsikhanau',
            picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
            jobPosition: '...',
            skil1: 'Skil1',
            skil2: 'Skil2',
            skil3: 'Skil3',
        },
        {
            firstName: 'Valiantsin6',
            lastName: 'Tsikhanau',
            picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
            jobPosition: '...',
            skil1: 'Skil1',
            skil2: 'Skil2',
            skil3: 'Skil3',
        },
    ];
    public enemyCard = [{
        firstName: 'Valiantsin1',
        lastName: 'Tsikhanau',
        picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
        jobPosition: '...',
        skil1: 'Skil1',
        skil2: 'Skil2',
        skil3: 'Skil3',
    },
    {
        firstName: 'Valiantsin2',
        lastName: 'Tsikhanau',
        picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
        jobPosition: '...',
        skil1: 'Skil1',
        skil2: 'Skil2',
        skil3: 'Skil3',
    },
    {
        firstName: 'Valiantsin3',
        lastName: 'Tsikhanau',
        picture: 'https://static.cdn.epam.com/avatar/60655420492f5fca5a2f840c132d7e82.jpg',
        jobPosition: '...',
        skil1: 'Skil1',
        skil2: 'Skil2',
        skil3: 'Skil3',
    },
    ];
    public readonly Status = Status;
    public status: Status = Status.GameField;
    public myHp = 100;
    public enemyHp = 100;

    private socket: SocketIOClient.Socket;
    private attackStateArray = {
        me : null,
        enemy: null
    };
    constructor(
        private socketService: SocketService
    ) {
        this.socket = this.socketService.getSocket();
    }

    public drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
            this.socket.emit('onStep', [
                { id: 1, cards: this.myCard },
                { id: 2, cards: this.myActiveCard },
                { id: 3, cards: this.enemyActiveCard },
                { id: 4, cards: this.enemyCard },
            ]);
        }
    }

    public onCardSelect(data: SelectedCard) {
        if (data.type === 'my') {
            this.attackStateArray.me = data.person;
        } else {
            this.attackStateArray.enemy = data.person;
        }

        if (this.attackStateArray.enemy && this.attackStateArray.me) {
            console.log(`FIGHT`);
        }
    }
}
