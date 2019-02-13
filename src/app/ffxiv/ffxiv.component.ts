import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ffxiv',
  templateUrl: './ffxiv.component.html',
  styleUrls: ['./ffxiv.component.css']
})
export class FfxivComponent implements OnInit {

  Idlist: any[] = [11271710, 13376194, 734000];
  persoInfos = [];
  apiXivKey = '88fdf3601b1b4e9ebe38beaa';
  armors: any[] = [];
  ilvl = 0;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get(
      'https://xivapi.com/character/' + this.Idlist[1] + '?key=' + this.apiXivKey
    ).subscribe(
      (data) => {
        this.persoInfos = data['Character'];
        this.armors = [];
        // tslint:disable-next-line:forin
        for (const obj in this.persoInfos['GearSet']['Gear']) {
          if (obj !== 'SoulCrystal') {
            this.httpClient.get(
              'https://xivapi.com/item/' + data.Character.GearSet.Gear[obj].ID + '?key=' + this.apiXivKey
            ).subscribe(
              (dataItem) => {
                this.armors.push([obj, dataItem.Name_fr, dataItem.LevelItem]);
                this.ilvl += dataItem['LevelItem'];
              });
          }
        };
        this.ilvl = this.ilvl / this.armors.length;
      });
  }
}
