import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-overview-example-dialog',
    templateUrl: 'add-user-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>
    ) { }
}
