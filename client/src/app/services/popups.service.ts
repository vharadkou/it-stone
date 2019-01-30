import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PopupsService {

  constructor(public dialog: MatDialog) { }

  public openDialog(title: string, text: string) {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '500px',
      data: { title, text }
    });

    return dialogRef.afterClosed();
  }
}
