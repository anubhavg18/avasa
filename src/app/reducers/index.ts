import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { searchCriteriaReducer } from '../components/frontend/search-criteria/search-criteria.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
searchCriteria: searchCriteriaReducer
};


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return localStorageSync({ keys: ['searchCriteria'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];