import { Action } from '@ngrx/store';
import { ActionTypes } from './search-criteria.actions';

export const initialState = {count: 0,searchControl:0, asd:""};

export function searchCriteriaReducer(state = initialState, action: Action) {

  switch (action.type) {
    case ActionTypes.Increment:
      return {...state, count: state.count+1};

    case ActionTypes.Decrement:
      return {...state, count: state.count-1};

    case ActionTypes.Reset:
      return {...state, count: 0};

     case ActionTypes.UpdateForm:
       return {...state, ...action['formObj']};
    default:
      return state;
  }
}