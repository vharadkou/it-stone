import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketService } from './services/socket.service';
import { baseUrl } from '../constants/baseUrl';
import { FightService } from './services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

enum Status {
    GameField,
    Auth
}

interface GameStepData {
    fields: {
        id: 1 | 2 | 3 | 4,
        cards: any[]
    }[];
    myHp: number;
    enemyHp: number;
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
export class AppComponent implements OnInit {
    public myCard = [
        {
            name: 'Nikita Bazhkou',
            image: 'https://media.licdn.com/dms/image/C4E03AQHQPp3axkhdSA/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=NkQL-yaMMRa4WzI22Ks9xrmeTLekzYAjYnhGWD1Nc1Y',
            hp: 54,
            superSkill: undefined,
            createAttack:
            {
                'C#': 1,
                JavaScript: 7,
                SQL: 4,
                'Microsoft SQL Server': 2,
                'Cascading Style Sheets (CSS)': 2,
                'ASP.NET Core': 2,
                'ASP.NET MVC 5': 2,
                'Entity Framework': 2,
                LINQ: 2,
                'ADO.NET': 2,
                jQuery: 2,
                'React.js': 2,
                Angular: 2,
                git: 2,
                AJAX: 2,
                JIRA: 2,
                Solr: 2,
                'EPiServer CMS': 2,
                'EPiServer Commerce': 2
            },
            ignore: ['Java', 'TypeScript', 'NOSQL']
        },
        {
            'name': 'Yury Tatarynovich',
            'image': 'https://media.licdn.com/dms/image/C5603AQFj0AHyS3b2mw/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=o25zTwx4g3qhouVvFyHAPK2dvqFQ5EmmeJxGaSMkIus',
            'hp': 21,
            'superSkill': 'Base',
            'createAttack': {
                'JUnit': 2,
                'Maven': 2,
                'JIRA': 2,
                'Test Driven Development': 2,
                'Design Patterns': 2,
                'Scrum': 2,
                'Spring': 2,
                'Subversion': 2,
                'JSP': 2,
                'Hibernate': 2,
                'MongoDB': 2,
                'Grails': 2,
                'Freemarker': 2,
                'Groovy': 2,
                'TestNG': 2,
                'Velocity': 2
            },
            'ignore': []
        }
    ];
    public myActiveCard = [];
    public enemyActiveCard = [];
    public enemyCard = [ {
        "name": "Yury Tatarynovich",
        "image": "https://media.licdn.com/dms/image/C5603AQFj0AHyS3b2mw/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=o25zTwx4g3qhouVvFyHAPK2dvqFQ5EmmeJxGaSMkIus",
        "hp": 21,
        "superSkill": "Base",
        "createAttack": {
            "JUnit": 2,
            "Maven": 2,
            "JIRA": 2,
            "Test Driven Development": 2,
            "Design Patterns": 2,
            "Scrum": 2,
            "Spring": 2,
            "Subversion": 2,
            "JSP": 2,
            "Hibernate": 2,
            "MongoDB": 2,
            "Grails": 2,
            "Freemarker": 2,
            "Groovy": 2,
            "TestNG": 2,
            "Velocity": 2
        },
        "ignore": ['C#', 'Microsoft SQL Server']
    }
    ];
    public readonly Status = Status;
    public status: Status = Status.GameField;
    public myHp = 50;
    public enemyHp = 100;

    private socket: SocketIOClient.Socket;
    private attackStateArray = {
        me: null,
        enemy: null
    };
    private dataFromDb;
    constructor(
        private socketService: SocketService,
        private http: HttpClientModule,
        private fightService: FightService
    ) {
        this.socket = this.socketService.getSocket();
    }
    public ngOnInit() {
        this.socket.on('onStepChange', (data: GameStepData) => {
            this.myHp = data.myHp;
            this.enemyHp = data.enemyHp;
            this.enemyCard = data.fields[0].cards;
            this.myCard = data.fields[3].cards;
            this.enemyActiveCard = data.fields[1].cards;
            this.myActiveCard = data.fields[2].cards;
        });

        this.socket.on("onReady", (data: any) => {
            console.log(data);
            
        });
        const url = `${baseUrl}/api/users/get-cards`;
        // this.http.get(url).subscribe((data) => {
        //     this.dataFromDb = data;
        // });
    }
    public drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
            this.socket.emit('onStep', {
                fields: [
                    { id: 1, cards: this.myCard },
                    { id: 2, cards: this.myActiveCard },
                    { id: 3, cards: this.enemyActiveCard },
                    { id: 4, cards: this.enemyCard },
                ],
                myHp: this.myHp,
                enemyHp: this.enemyHp
            });
        }
    }

    public onCardSelect(data: SelectedCard) {
        if (data.type === 'my') {
            this.attackStateArray.me = data.person;
        } else {
            this.attackStateArray.enemy = data.person;
        }

        if (this.attackStateArray.enemy && this.attackStateArray.me) {
            console.log(this.fightService.fight(this.attackStateArray.me, this.attackStateArray.enemy));
        let fightResult = this.fightService.fight(this.attackStateArray.me, this.attackStateArray.enemy);

        if (fightResult.enemyHp === 0) {
            this.enemyHp = this.enemyHp - fightResult.damage;
            this.enemyActiveCard = this.enemyActiveCard.filter(person => {
                let attackName = this.attackStateArray.enemy.name;
                return !(person.name === attackName);
            });

            this.attackStateArray = { me: null, enemy: null };
        } else {
            let enemy = this.enemyActiveCard.find(person => {
                return (person.name + " " + person.fullname === this.attackStateArray.enemy.name);
            });

            enemy.hp = fightResult.enemyHp;
        };

        this.socket.emit('onStep', {
            fields: [
                { id: 1, cards: this.myCard },
                { id: 2, cards: this.myActiveCard },
                { id: 3, cards: this.enemyActiveCard },
                { id: 4, cards: this.enemyCard },
            ],
            myHp: this.myHp,
            enemyHp: this.enemyHp
        });

        if(this.enemyHp <= 0) {
            console.log("WIN");
        }
        }
    }
}
