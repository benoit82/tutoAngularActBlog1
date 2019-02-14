import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from 'src/models/character.model';
import { CharacterService } from 'src/services/character.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ffxiv',
  templateUrl: './ffxiv.component.html',
  styleUrls: ['./ffxiv.component.css']
})
export class FfxivComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  idList: any[] = [11271710, 13376194, 734000];

  characterSubscription: Subscription;

  constructor(
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.characterService.characters = [];
    for (const id of this.idList) {
      this.characterService.fetchCharacter(id);
    }
    this.characterSubscription = this.characterService.characterSubject.subscribe(
      (characters: Character[]) => {
        this.characters = characters;
        this.characters.sort((c1, c2) => {
          if (c1.name > c2.name) {
            return 1;
          }
          if (c1.name < c2.name) {
            return -1;
          }
        });
      }
    );
    this.characterService.emitCharacterSubject();
  }

  sortBy(index: number, prop: string) {
    return this.characters[index].gears.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  ngOnDestroy() {
    this.characterSubscription.unsubscribe();
  }
}
