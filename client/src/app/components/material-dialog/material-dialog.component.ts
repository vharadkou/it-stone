import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  title: string;
  text: string;
}

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
