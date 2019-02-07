import { Effect, Actions, ofType } from '@ngrx/effects';
import { NewsService } from '../services/news-service';
import * as newsActions from './../actions/news.actions';
import { map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsEffects {

    constructor(
        private _actions$: Actions,
        private _service: NewsService
    ) { }

    @Effect()
    getGroups$ = this._actions$.pipe(
        ofType<newsActions.GetGroupsAction>(newsActions.NewsActionTypes.GetGroups),
        exhaustMap(_ =>
            this._service.getAllGroups().pipe(
                map(groups => new newsActions.ReceivedGroupsAction({ groups: groups }))
            )
        )
    );

    @Effect({ dispatch: false })
    sendItem$ = this._actions$.pipe(
        ofType<newsActions.SendItemAction>(newsActions.NewsActionTypes.SendItem),
        map(action => action.payload.item),
        exhaustMap(item =>
            of(this._service.send(item))
        )
    );

    @Effect({ dispatch: false })
    joinGroup$ = this._actions$.pipe(
        ofType<newsActions.JoinGroupAction>(newsActions.NewsActionTypes.JoinGroup),
        map(action => action.payload.groupName),
        exhaustMap(groupName =>
            of(this._service.joinGroup(groupName))
        )
    );

    @Effect({ dispatch: false })
    leaveGroup$ = this._actions$.pipe(
        ofType<newsActions.LeaveGroupAction>(newsActions.NewsActionTypes.LeaveGroup),
        map(action => action.payload.groupName),
        exhaustMap(groupName =>
            of(this._service.leaveGroup(groupName))
        )
    );
    
}
