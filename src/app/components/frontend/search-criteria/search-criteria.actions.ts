import { Action } from '@ngrx/store';

export enum ActionTypes {
  Increment = '[Counter Component] Increment',
  Decrement = '[Counter Component] Decrement',
  Reset = '[Counter Component] Reset',
  UpdateForm = '[SearchCriteria] UpdateForm',
  Test = '[Test Component] Test'
}

export class Increment implements Action {
  readonly type = ActionTypes.Increment;
}

export class Decrement implements Action {
  readonly type = ActionTypes.Decrement;
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}

export class UpdateForm implements Action {
	readonly type = ActionTypes.UpdateForm
	name:string;
	value:string;
	formObj: object;
	constructor(obj) {
		this.formObj = obj;
		// console.log("INSIDE ACTION", obj)
		// this.name = Object.keys(obj)[0];
		// this.value = obj[Object.keys(obj)[0]];
	}
}