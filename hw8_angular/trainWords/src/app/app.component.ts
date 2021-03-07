import { Component } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Language } from './interfaces/language';
import { Link } from './interfaces/link';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'TrainWords';
  links: Link[] = [];
  activeLink: string = 'recently-added';

  get langSelected(): Language {
    return this.settings.getSrcLanguages().find( item => item.locale == this.settings.getSettings().locale )!;
  }

  constructor( private settings: SettingsService, private router: Router ) {
  }

  ngOnInit() {
    this.router.config.forEach( (item: Route) => {
      if(item.path && item.path !== '**') {
        let itemData: any = item.data;
        this.links.push({
          route: item.path!,
          text: itemData.title
        });  
      }
    });
    
  }
}

