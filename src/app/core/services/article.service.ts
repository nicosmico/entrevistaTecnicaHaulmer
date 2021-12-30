import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpClient: HttpClient
    ) {
    }
    
    getBestStoriesIds(){
      return this.httpClient.get<number[]>(environment.url_api+'/beststories.json');
    }

    getArticleById(id: number){
      return this.httpClient.get<Article>(environment.url_api+'/item/'+id+'.json');
    }

    getBestStories(page: number){
      let articles: Article[] = [];
      let articlesBehaviorSubject = new BehaviorSubject<Article[]>([]);
      let articlesObservable$ = articlesBehaviorSubject.asObservable();
      
      this.getBestStoriesIds().subscribe(articleIds => {
        for (let index = page*50; index < (50*page+50); index++) {
          this.getArticleById(articleIds[index]).subscribe(article => {
            articles = [...articles, article];
            articlesBehaviorSubject.next(articles);
          });
        }
      });

      return articlesObservable$;
    }
}

