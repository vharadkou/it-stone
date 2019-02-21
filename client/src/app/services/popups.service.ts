import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MaterialDialogComponent } from 'app/components/material-dialog/material-dialog.component';
import { Observable } from 'rxjs';

import { PopupTextContent } from '../../models';

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
}
