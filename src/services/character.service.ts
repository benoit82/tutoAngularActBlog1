import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/models/character.model';
import { Gear } from 'src/models/gear.model';
import { Subject } from 'rxjs';

@Injectable()
export class CharacterService implements OnInit {
  apiXivKey = '88fdf3601b1b4e9ebe38beaa';
  urlXivapi = 'https://xivapi.com';

  characters: Character[] = [];
  characterSubject = new Subject<Character[]>();

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  /**
   *
   * @param idChar Id of FFXIV character
   */
  fetchCharacter(idChar: number) {
    const gears: Gear[] = [];
    let nameChr: string;
    let serverChr: string;
    let portraitLink: string;

    this.http
      .get(this.urlXivapi + '/character/' + idChar + '?key=' + this.apiXivKey)
      .subscribe(data => {
        console.log(data);
        let persoInfos = data['Character'];
        nameChr = persoInfos.Name;
        portraitLink = persoInfos['Portrait'];
        serverChr = persoInfos['Server'];
        for (let obj in persoInfos['GearSet']['Gear']) {
          if (obj !== 'SoulCrystal') {
            this.http
              .get(this.urlXivapi + '/item/' + persoInfos.GearSet.Gear[obj].ID + '?key=' + this.apiXivKey)
              .subscribe(dataItem => {
                gears.push(
                  new Gear(persoInfos.GearSet.Gear[obj].ID, obj, dataItem['Name_fr'], dataItem['LevelItem'])
                );
              });
          }
        }
        this.characters.push(new Character(idChar, nameChr, serverChr, portraitLink, gears));
        this.emitCharacterSubject();
      });
  }

  emitCharacterSubject() {
    this.characterSubject.next(this.characters.slice());
  }
}
