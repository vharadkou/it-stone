import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { first } from "rxjs/operators";
import { Card } from "models";
import { CardForStart, GameStatus, GameTurn, GameWin } from "models";
import {
  CardsFacade,
  GameProcessFacade,
  PlayersHPFacade,
 // SocketFacade
} from "store";
import { CardsService } from "../../services/cards.service";
import { PopupsService } from "../../services/popups.service";
import { SpellService } from "../../services/spell.service";
import { GameEventsHandlersService } from "../../services/gameEventsHandlers.service";

@Component({
  selector: "app-fight",
  templateUrl: "./fight.component.html",
  styleUrls: ["./fight.component.scss"]
})
export class FightPageComponent implements OnInit, AfterViewInit {
  public allCardsMy$ = this.cardsFacade.myCards$;
  public myCardsForChoosing$ = this.cardsFacade.myCardsForChoosing$;
  public allCardsEnemy$ = this.cardsFacade.enemyCards$;
  public myActiveCards$ = this.cardsFacade.myActiveCards$;
  public enemyActiveCards$ = this.cardsFacade.enemyActiveCards$;
  public selectedCardId$ = this.cardsFacade.selectedCardId$;
  public myCardsInHand$ = this.cardsFacade.myCardsInHand$;

  public gameStatus$ = this.gameProcessFacade.gameStatus$;
  public moveNumber$ = this.gameProcessFacade.moveNumber$;
  public whooseTurnNow$ = this.gameProcessFacade.whooseTurnNow$;
  public isTimerOn$ = this.gameProcessFacade.isTimerOn$;
  public myHero$ = this.gameProcessFacade.myHero$;
  public whooseWin$ = this.gameProcessFacade.whooseWin$;
  public isFirstMoveMy$ = this.gameProcessFacade.isFirstMoveMy$;
  public myManaLimit$ = this.gameProcessFacade.myManaLimit$;
  public myManaCurrentValue$ = this.gameProcessFacade.myManaCurrentValue$;

  public allCardsMy: Card[];
  public myCardsForChoosing: CardForStart[];
  public myCardsInHand: Card[];
  public myActiveCards: Card[];
  public enemyActiveCards: Card[];
  public allCardsEnemy: Card[];
  public cardsForChooseInBegin: Card[];
  public dialogConfig = new MatDialogConfig();

  public isFirstMoveMy: boolean;
  public whooseTurnNow: GameTurn;
  public moveNumber: number;
  public gameStatus: GameStatus;
  public myManaLimit: number;
  public myManaCurrentValue: number;

  public popupWasShown: boolean = false;

  constructor(
    private cardsFacade: CardsFacade,
    private gameProcessFacade: GameProcessFacade,
    public dialog: MatDialog,
    public popupsService: PopupsService,
    public spellService: SpellService,
    public cardsService: CardsService,
    public gameEventsHandlersService: GameEventsHandlersService
  ) {
    this.cardsFacade.loadCards();
  }

  ngOnInit() {
    // this.gameProcessFacade.startGameSuccess({
    //   status: GameStatus.Start,
    //   myFirstMove: false
    // });
    this.moveNumber$.subscribe((data: number) => {
      this.moveNumber = data;
    });
    this.isFirstMoveMy$.subscribe(
      (data: boolean) => (this.isFirstMoveMy = data)
    );

    this.myCardsForChoosing$.subscribe(
      (data: CardForStart[]) => (this.myCardsForChoosing = data)
    );
    this.allCardsEnemy$.subscribe(
      (data: Card[]) => (this.allCardsEnemy = data)
    );
    this.myActiveCards$.subscribe((data: Card[]) => {
      this.myActiveCards = data;

    
      //   this.spellService.deleteSpellWithMyCards(this.myActiveCards);
    });

    this.enemyActiveCards$.subscribe((data: Card[]) => {
      this.enemyActiveCards = data;
    });

    this.myCardsInHand$.subscribe(
      (data: Card[]) => (this.myCardsInHand = data)
    );

    this.whooseTurnNow$.subscribe(
      (data: GameTurn) => (this.whooseTurnNow = data)
    );
    //this.isTimerOn$.subscribe((data: boolean) => console.log(data));
    //this.myHero$.subscribe((data: any) => console.log(data));
    //this.whooseWin$.subscribe((data: GameWin) => console.log(data));
    this.myManaLimit$.subscribe((data: number) => (this.myManaLimit = data));
    // this.myManaCurrentValue$.subscribe(
    //   (data: number) => (this.myManaCurrentValue = data)
    // );
    this.myManaLimit = 8;
    this.myManaCurrentValue = 6;

    this.gameStatus$.subscribe((data: number) => {
      this.gameStatus = data;
      if (this.gameStatus === 1) {
        this.chooseTurnPopUp();
      } else if (this.gameStatus === 2) {
        console.log("Game over");
      } else if (this.gameStatus === 0) {
        console.log("Waiting for server...");
      } else {
        console.log("Error");
      }
    });

    this.allCardsMy$.subscribe((data: Card[]) => {
      this.allCardsMy = data;
      if (
        this.popupWasShown === false &&
        this.allCardsMy.length > 0 &&
        this.gameStatus === 1 &&
        this.moveNumber === 0
      ) {
        this.getFirstCards();
      }
    });
  }

  ngAfterViewInit() {}

  public onShuffle(event: any): void {
    this.cardsFacade.moveMyCardsWithinArray(event);
  }

  public onMyDrop(event: any): void {
    console.log('1');
    this.gameEventsHandlersService.userActiveZoneDradAndDropEventHandler(event);
  }

  public onEnd(event: {
    userCardId: any;
    enemyCardId: any;
    userCardDamage: any;
  }): void {
    console.log('2');
    this.gameEventsHandlersService.userActiveCardDragAndDropEventHandler(event);
  }

  public onMyCardTaken(cards): void {
    this.cardsFacade.getMyCardInHand(cards);
  }

  public onMyFirstCardChosen(cards): void {
    this.cardsFacade.changeMyFirstCards(cards);
    this.cardsFacade.getEnemyBattleCard(); // temporary
  }

  public chooseTurnPopUp(): void {
    const textContent = {
      title: "Right to first move is belong to...",
      text: undefined,
      buttonText: {
        cancel: "Ok"
      }
    };
    if (this.isFirstMoveMy) {
      textContent.text = "...you.";
    } else {
      textContent.text =
        "...your enemy. You receive additionad card in hand and +1 mana";
    }
    this.popupsService
      .openDialog(textContent)
      .subscribe(click => this.showPopUpWithCards());
  }

  public getFirstCards(): void {
    if (this.isFirstMoveMy) {
      this.cardsFacade.GetMyFirstCards(3);
    } else {
      this.cardsFacade.GetMyFirstCards(4);
    }
  }

  public showPopUpWithCards(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.data = {
      title: "Choose your cards",
      cards: this.myCardsForChoosing,
      buttonText: {
        confirm: "Choose"
      }
    };
    this.popupWasShown = true;
    this.popupsService.openCardChoosing(this.dialogConfig).subscribe(cards => {
      this.onMyFirstCardChosen(cards);
      this.gameProcessFacade.setMoveNumber();
    });
  }
}
