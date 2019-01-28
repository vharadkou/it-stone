import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';
import { CardDetailComponent } from 'app/components';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupsService {

  constructor(public dialog: MatDialog) { }

  public openDialog( title: string, text: string): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '500px',
      data: {title, text}
    });

    const dialogSubscribtion = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Все окей');
      }
      dialogSubscribtion.unsubscribe();
    });
  }
}
