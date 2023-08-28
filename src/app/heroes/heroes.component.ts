import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    new LogService().log('Executing onInit')
    this.getHeroes(); 
  }

  getHeroes(): void {
    new LogService().log('Executing getHeroes')
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    new LogService().log('Executing add from heroes component')
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
    new LogService().log('Adding hero, name: '+ name)
  }

  delete(hero: Hero): void {
    new LogService().log('Deleting hero n:' + hero.id + 'alias: ' + hero.name)
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}