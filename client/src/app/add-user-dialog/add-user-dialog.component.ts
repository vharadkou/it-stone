import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-dialog-overview-example-dialog',
    templateUrl: 'add-user-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

    public findedUser: any;

    private userName = '';

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private userService: UserService,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    changeInputValue(userName: string): void {
        console.log(userName);
        this.userName = userName;
    }

    findUser(): void {
        this.userService.findUser(this.userName).subscribe((data) => {
            console.log('data from find', data);
            this.findedUser = data;
        });
    }
}
