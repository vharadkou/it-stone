import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: string;
  text: string;
}

@Component({
  selector: 'app-not-saved-dialog',
  templateUrl: './not-saved-dialog.component.html',
  styleUrls: ['./not-saved-dialog.component.css']
})
export class NotSavedDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NotSavedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
