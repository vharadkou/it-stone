import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';
import { MaterialDialogCardChoosingComponent } from 'app/components/material-dialog-card-choosing/material-dialog-card-choosing.component';
import { Observable } from 'rxjs';
import { Card } from '../../models';
import { PopupTextContent } from '../../models';
import { createConfig } from '@ngrx/store-devtools/src/instrument';

@Injectable({
  providedIn: 'root'
})
export class PopupsService {

  constructor(public dialog: MatDialog) { }

  public openDialog(textContent: PopupTextContent): Observable<boolean> {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '500px',
      data: textContent
    });

    return dialogRef.afterClosed();
  }

  public openCardChoosing(config: MatDialogConfig): Observable<any> {
    const dialogRef = this.dialog.open(MaterialDialogCardChoosingComponent, config);

    return dialogRef.afterClosed();
  }

}
