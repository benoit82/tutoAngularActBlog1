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
  apiXivKey = '88fdf3601b1b4e9ebe38beaa';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get<any[]>(
    'https://xivapi.com/character/734000?key=' + this.apiXivKey
      ).subscribe(
      (data) => {
        this.persoInfos = data;
        console.log(data);
      }
    );
  }


}
