import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NewWordComponent } from '../new-word/new-word.component';

@Component({
  selector: 'app-page-recently-added',
  templateUrl: './page-recently-added.component.html',
  styleUrls: ['./page-recently-added.component.css']
})
export class PageRecentlyAddedComponent implements OnInit {

  title = '';

  constructor( private route: ActivatedRoute , private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => this.title = data.title);
  }

  openDialog():MatDialogRef<NewWordComponent> {
    return this.dialog.open(NewWordComponent);
  }

}
