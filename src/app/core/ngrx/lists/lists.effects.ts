import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import * as listActions from './lists.actions';
import {FetchList, FetchUserLists} from './lists.actions';
import {ListService} from '../../database/list.service';

export type Action = listActions.All;


@Injectable()
export class ListEffects {
    @Effect()
    getUserLists: Observable<Action> = this.actions.ofType<FetchUserLists>(listActions.FETCH_USER_LISTS)
        .mergeMap(action => this.listService.getUserLists(action.payload))
        .map(lists => new listActions.FetchUserListsSuccess(lists));

    @Effect()
    getList: Observable<Action> = this.actions.ofType<FetchList>(listActions.FETCH_LIST)
        .mergeMap(action => this.listService.get(action.payload))
        .map(list => new listActions.FetchListSuccess(list));

    constructor(private actions: Actions, private listService: ListService) {
    }
}
