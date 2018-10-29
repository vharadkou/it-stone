import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SocketService } from './services/socket.service';
import { baseUrl } from '../constants/baseUrl';
import { FightService } from './services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from './components/add-user-dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        public dialog: MatDialog
    ) {
    }
}
