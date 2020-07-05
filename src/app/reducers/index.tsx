import { data, initialState, TComments } from "./comments";
import { combineReducers } from "redux";

export interface TRootState {
  data: TComments;
}
export const TRootStateInitial: TRootState = {
  data: initialState,
};

const rootReducer = combineReducers<TRootState>({
  data,
});

export default rootReducer;
