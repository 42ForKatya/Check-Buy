import { Component, OnInit } from '@angular/core';
import {WebService} from "../web.service";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: any[];

  constructor(private webService: WebService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.webService.getNews().subscribe(res => {
      this.news = res.news;
    })
  }

  getImg(str) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + str);
  }

}
