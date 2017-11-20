import * as ListActions from './list.actions';
import {List} from '../../../model/list/list';

// Define state
export interface State {
    loading: boolean; // indicates loading while fetching data
    lists: List[];
}

// Define initial state
const initialState: State = {
    loading: false,
    lists: []
};

// reducer function
export function listReducer(state = initialState,
                            action: ListActions.All): State {
    switch (action.type) {
        case ListActions.FETCH_LISTS: {
            return {
                ...state,
                loading: true
            }
        }
        case ListActions.FETCH_LISTS_SUCCESS: {
            return {
                loading: false,
                lists: action.payload
            }
        }
        case ListActions.DELETE_LIST: {
            state.lists = state.lists.filter(l => l.$key !== action.payload);
            return {
                ...state,
                loading: false
            }
        }
        case ListActions.DELETE_LIST_SUCCESS: {
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
        default: {
            return state
        }
    }
}
