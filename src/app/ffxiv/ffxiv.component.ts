import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ffxiv',
  templateUrl: './ffxiv.component.html',
  styleUrls: ['./ffxiv.component.css']
})
export class FfxivComponent implements OnInit {

  Idlist: any[] = [11271710, 13376194, 734000];
  persoInfos: any[] = [];
  bodyInfos: any[] = [];
  apiXivKey = '88fdf3601b1b4e9ebe38beaa';
  xpBar: number;
  bodyId: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get<any[]>(
      'https://xivapi.com/character/' + this.Idlist[1] + '?key=' + this.apiXivKey
    ).subscribe(
      (data) => {
        this.persoInfos = data.Character;
        this.httpClient.get<any[]>(
          'https://xivapi.com/item/' + data.Character.GearSet.Gear.Body.ID + '?key=' + this.apiXivKey
        ).subscribe(
          (data) => {
            this.bodyInfos = data;
          });
      });

  }
}
