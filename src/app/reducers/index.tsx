import { initialState, TComments, comments } from "./comments";
import { combineReducers } from "redux";

export interface TRootState {
  comments: TComments;
}
export const TRootStateInitial: TRootState = {
  comments: initialState,
};

const rootReducer = combineReducers<TRootState>({
  comments,
});

export default rootReducer;
