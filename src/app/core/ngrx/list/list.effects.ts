import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import * as listActions from './list.actions';
import {ListService} from '../../database/list.service';

export type Action = listActions.All;


@Injectable()
export class ListEffects {

    @Effect()
    getLists: Observable<Action> = this.actions.ofType(listActions.FETCH_LISTS)
        .mergeMap(payload => this.listService.getAll())
        .map(lists => new listActions.FetchListsSuccess(lists));

    constructor(private actions: Actions, private listService: ListService) {
    }
}
