import { Component } from '@angular/core';
import { getLocaleEraNames } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts = [
    {
      title: 'Mon premier post',
      content: 'Ullamco enim elit ex consectetur laborum velit commodo minim tempor et culpa.'
      + 'Enim eiusmod aliquip sunt ex anim culpa incididunt exercitation nulla aliquip anim officia ad culpa.',
      loveIts: 0,
      created_at: new Date('2019-02-06T17:27:00')
    },
    {
      title: 'Mon deuxième post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lectus nec lacus bibendum maximus.'
      + 'Aliquip veniam nulla aliquip dolore qui. Ut pariatur eu elit nisi.',
      loveIts: 3,
      created_at: new Date('2019-02-06T23:45:00')
    },
    {
      title: 'Un troisième post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lectus nec lacus bibendum maximus.'
      + 'Exercitation officia incididunt esse officia culpa voluptate duis. Anim officia commodo velit laborum sit voluptate proident ad.',
      loveIts: -2,
      created_at: new Date('2019-02-07T03:24:00')
    }
  ];

}
