import * as ListActions from './lists.actions';
import {List} from '../../../model/list/list';
import {SAVE_LIST} from './lists.actions';

// Define state
export interface ListsState {
    loading: boolean; // indicates loading while fetching data
    lists: List[];
}

// Define initial state
const initialState: ListsState = {
    loading: false,
    lists: []
};

// reducer function
export function listReducer(state = initialState,
                            action: ListActions.All): ListsState {
    switch (action.type) {
        case ListActions.FETCH_USER_LISTS: {
            return {
                ...state,
                loading: true
            }
        }
        case ListActions.FETCH_USER_LISTS_SUCCESS: {
            return {
                lists: action.payload,
                loading: false
            }
        }
        case ListActions.DELETE_LIST: {
            state.lists = state.lists.filter(l => l.$key !== action.payload);
            return {
                ...state,
                loading: false
            }
        }
        case ListActions.ADD_LIST: {
            return {
                ...state,
                loading: true
            }
        }
        case ListActions.ADD_LIST_SUCCESS: {
            state.lists.push(action.payload);
            return {
                ...state,
                loading: false
            }
        }
        case SAVE_LIST: {
            const listIndex = state.lists.map(list => list.$key).indexOf(action.payload.$key);
            state.lists[listIndex] = action.payload;
            return {
                ...state,
                loading: false
            }
        }
        default: {
            return state
        }
    }
}
