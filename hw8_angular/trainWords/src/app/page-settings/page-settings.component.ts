import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.css'],
})
export class PageSettingsComponent implements OnInit {

  title: string = '';

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => this.title = data.title);
  }

}
