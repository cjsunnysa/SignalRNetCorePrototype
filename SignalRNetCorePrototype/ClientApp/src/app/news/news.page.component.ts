import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromNews from './reducers/news.reducer';
import * as newsActions from './actions/news.actions';
import { NewsItem } from './models/news-item.model';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './news.page.component.html'
})
export class NewsPageComponent implements OnInit {
    public async: any;
    newsItem: NewsItem;
    newsItems: NewsItem[] = [];
    group: string;
    author: string;
    newsState$: Observable<fromNews.NewsState>;
    groups = [];

    constructor(private store: Store<any>) {

        this.newsState$ = this.store.select<fromNews.NewsState>(state => state.news);

        this.store
            .select(fromNews.selectNewsState)
            .subscribe((state: fromNews.NewsState) => {
                this.groups = state.groups;
                this.group = !this.group && state.groups.length > 0 ? state.groups[0] : this.group;
                this.newsItems = state.newsItems;
            });

        this.initNewsItem();
    }

    private initNewsItem(): void {
        this.newsItem = {
            author: '',
            newsGroup: '',
            header: '',
            article: ''
        };
    }

    public sendNewsItem(): void {
        const newNews = { ...this.newsItem, newsGroup: this.group };

        this.initNewsItem();

        this.store.dispatch(new newsActions.SendItemAction({ item: newNews }));
    }

    public join(): void {
        this.store.dispatch(new newsActions.JoinGroupAction({ groupName: this.group }));
    }

    public leave(): void {
        this.store.dispatch(new newsActions.LeaveGroupAction({ groupName: this.group }));
    }

    ngOnInit() {
        console.log('go');
        this.store.dispatch(new newsActions.GetGroupsAction());
    }
}
