import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { PopupTextContent } from 'models';

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public onYesClick(): void {
    this.dialogRef.close(true);
  }

  public onNoClick(): void {
    this.dialogRef.close(false);
  }
  public onChooseClick(event): void {
    console.log(event)
    this.dialogRef.close(event);
  }
}
