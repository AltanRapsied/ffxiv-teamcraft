import {Action} from '@ngrx/store';
import {List} from '../../../model/list/list';

export const FETCH_LISTS = 'Fetch LISTS';
export const FETCH_LISTS_SUCCESS = 'Fetch LISTS Success';

export const FETCH_LIST = 'Fetch LIST';
export const FETCH_LIST_SUCCESS = 'Fetch LIST Success';

export const SAVE_LIST = 'Save LIST';
export const SAVE_LIST_SUCCESS = 'Save LIST Success';

export const ADD_LIST = 'Add LIST';
export const ADD_LIST_SUCCESS = 'Add LIST Success';

export const DELETE_LIST = 'Delete LIST';
export const DELETE_LIST_SUCCESS = 'Delete LIST Success';

export class FetchLists implements Action {
    readonly type = FETCH_LISTS;

    constructor() {
    };
}

export class FetchListsSuccess implements Action {
    readonly type = FETCH_LISTS_SUCCESS;

    constructor(public payload: List[]) {
    };
}

export class FetchList implements Action {
    readonly type = FETCH_LIST;

    constructor(public payload: string) {
    };
}

export class FetchListSuccess implements Action {
    readonly type = FETCH_LIST_SUCCESS;

    constructor(public payload: List) {
    };
}

export class AddList implements Action {
    readonly type = ADD_LIST;

    constructor(public payload: List) {
    };
}

export class AddListSuccess implements Action {
    readonly type = ADD_LIST_SUCCESS;

    constructor(public payload: List) {
    };
}

export class SaveList implements Action {
    readonly type = SAVE_LIST;

    constructor() {
    };
}

export class SaveListSuccess implements Action {
    readonly type = SAVE_LIST_SUCCESS;

    constructor(public payload: string) {
    };
}

export class DeleteList implements Action {
    readonly type = DELETE_LIST;

    constructor(public payload: string) {
    };
}

export class DeleteListSuccess implements Action {
    readonly type = DELETE_LIST_SUCCESS;

    constructor(public payload: string) {
    };
}

export type All =
    FetchLists
    | FetchListsSuccess
    | FetchList
    | FetchListSuccess
    | SaveList
    | SaveListSuccess
    | DeleteList
    | DeleteListSuccess
    | AddList
    | AddListSuccess;
