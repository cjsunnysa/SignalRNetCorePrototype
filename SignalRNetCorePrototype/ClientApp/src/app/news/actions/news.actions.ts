import { Action } from '@ngrx/store';
import { NewsItem } from '../models/news-item.model';

export enum NewsActionTypes {
    GetGroups = '[News] Get Groups',
    JoinGroup = '[News] Join Group',
    LeaveGroup = '[News] Leave Group',
    SendItem = '[News] Send Item',
    ReceivedGroups = '[News] Received Groups',
    ReceivedItem = '[News] Received Item',
    ReceivedGroupJoined = '[News] Received Group Joined',
    ReceivedGroupLeft = '[News] Received Group Left',
    ReceivedGroupHistory = '[News] Received Group History'
}


export class GetGroupsAction implements Action {
    readonly type = NewsActionTypes.GetGroups;
}

export class JoinGroupAction implements Action {
    readonly type = NewsActionTypes.JoinGroup;

    constructor(public payload: { groupName: string }) { }
}

export class LeaveGroupAction implements Action {
    readonly type = NewsActionTypes.LeaveGroup;

    constructor(public payload: { groupName: string }) { }
}

export class SendItemAction implements Action {
    readonly type = NewsActionTypes.SendItem;

    constructor(public payload: { item: NewsItem }) { }
}

export class ReceivedGroupsAction implements Action {
    readonly type = NewsActionTypes.ReceivedGroups;

    constructor(public payload: { groups: string[] }) { }
}

export class ReceivedItemAction implements Action {
    readonly type = NewsActionTypes.ReceivedItem;

    constructor(public payload: { newsItem: NewsItem }) { }
}

export class ReceivedGroupJoinedAction implements Action {
    readonly type = NewsActionTypes.ReceivedGroupJoined;

    constructor(public payload: { data: string }) { }
}

export class ReceivedGroupLeftAction implements Action {
    readonly type = NewsActionTypes.ReceivedGroupLeft;

    constructor(public payload: { data: string }) { }
}

export class ReceivedGroupHistoryAction implements Action {
    readonly type = NewsActionTypes.ReceivedGroupHistory;

    constructor(public payload: { newsItems: NewsItem[] }) { }
}

export type Actions =
    | GetGroupsAction
    | SendItemAction
    | JoinGroupAction
    | LeaveGroupAction
    | ReceivedGroupsAction
    | ReceivedItemAction
    | ReceivedGroupJoinedAction
    | ReceivedGroupLeftAction
    | ReceivedGroupHistoryAction;
