import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {UnsubscribeOnDestroyAdapter} from '../unsubscribe-o-destroy-adapter';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  heroes: Hero[];
  
  constructor(private heroService:HeroService) {
    super();
   }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(){
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.subs.sink = this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.subs.sink = this.heroService.deleteHero(hero).subscribe();
  }

}
