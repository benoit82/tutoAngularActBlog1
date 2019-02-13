import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/models/character.model';
import { Gear } from 'src/models/gear.model';

export class CharacterService implements OnInit {
    apiXivKey: string = '88fdf3601b1b4e9ebe38beaa';
    urlXivapi: string = 'https://xivapi.com';


    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() { }

    /**
     * 
     * @param idChar Id of FFXIV character
     */
    getCharacter(idChar: number): Character {
        const gears: Gear[] = [];
        const nameChr: string;
        const serverChr: string;
        this.http.get(
            this.urlXivapi + '/character/' + idChar + '?key=' + this.apiXivKey
        ).subscribe(
            (data) => {
                const persoInfos = data['Character'];
                nameChr = persoInfos.Name;
                serverChr = persoInfos.Server;
                for (const obj in persoInfos['GearSet']['Gear']) {
                    if (obj !== 'SoulCrystal') {
                        this.http.get(
                            this.urlXivapi + '/item/' + persoInfos.GearSet.Gear[obj].ID + '?key=' + this.apiXivKey
                        ).subscribe(
                            (dataItem) => {
                                gears.push(new Gear(persoInfos.GearSet.Gear[obj].ID, obj, dataItem.Name_fr, dataItem.LevelItem));
                            });
                    }
                }
            });
        return new Character(idChar, nameChr, serverChr, gears);
    }


}
