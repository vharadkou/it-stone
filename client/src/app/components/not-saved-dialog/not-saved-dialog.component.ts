import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-not-saved-dialog',
  templateUrl: './not-saved-dialog.component.html',
  styleUrls: ['./not-saved-dialog.component.css']
})
export class NotSavedDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NotSavedDialogComponent>
  ) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
