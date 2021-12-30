import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Article } from '../core/models/article.model';
import { ArticleService } from '../core/services/article.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  bestStories?: Article[];
  pageIndex: number = 0;
  pageEvent?: PageEvent;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.fetchData(this.pageIndex);
  }
  
  fetchData(page: number){
    this.articleService.getBestStories(page).subscribe(data => this.bestStories = data);
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    console.log('Pagina: '+this.pageIndex);
    this.fetchData(this.pageIndex);
  }

}
