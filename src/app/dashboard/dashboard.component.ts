import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {UnsubscribeOnDestroyAdapter} from '../unsubscribe-o-destroy-adapter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent extends UnsubscribeOnDestroyAdapter {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
      super();
      this.subs.sink = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));

   }

}