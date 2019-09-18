import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CardForStart } from "models";

@Component({
  selector: "app-material-dialog-card-choosing",
  templateUrl: "./material-dialog-card-choosing.component.html",
  styleUrls: ["./material-dialog-card-choosing.component.css"]
})
export class MaterialDialogCardChoosingComponent {
  cards: CardForStart[];

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogCardChoosingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cards = [...data.cards];
  }

  public chooseCard(i) {
    this.cards[i] = { ...this.cards[i], isChosen: !this.cards[i].isChosen };
  }

  public onChooseClick(): void {
    this.dialogRef.close(this.cards);
  }
}
