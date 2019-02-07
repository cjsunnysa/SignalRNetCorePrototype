import { NewsItem } from '../models/news-item.model';
import * as newsAction from './../actions/news.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface NewsState {
    newsItems: NewsItem[];
    groups: string[];
}

const initialState: NewsState = {
    newsItems: [],
    groups: []
};

export const selectNewsState = createFeatureSelector<NewsState>('news');

export function reducer(state = initialState, action: newsAction.Actions): NewsState {
    switch (action.type) {
        case newsAction.NewsActionTypes.ReceivedGroups: {
            return {
                ...state,
                groups: action.payload.groups
            };
        }
        case newsAction.NewsActionTypes.ReceivedItem: {
            return {
                ...state,
                newsItems: state.newsItems.concat(action.payload.newsItem)
            };
        }
        case newsAction.NewsActionTypes.ReceivedGroupLeft:
        case newsAction.NewsActionTypes.ReceivedGroupJoined: {
            console.log(action.payload.data);
            return {
                ...state,
                newsItems: []
            };
        }
        case newsAction.NewsActionTypes.ReceivedGroupHistory: {
            return {
                ...state,
                newsItems: action.payload.newsItems
            };
        }
        default: {
            return state;
        }
    }
}
