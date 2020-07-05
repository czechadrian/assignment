import { createReducer } from "typesafe-actions";
import produce from "immer";
import { TFetchingStatus } from "../constants";
import {
  getCommentsFailureAction,
  getCommentsInitAction,
  getCommentsSuccessAction,
  TGetCommentsActions,
} from "../screens/actions/comments-actions";

export interface TComment {
  name: string;
}
export interface TComments {
  comments: TComment[];
  fetchingStatus: TFetchingStatus;
}

export const initialState: TComments = {
  comments: [],
  fetchingStatus: TFetchingStatus.Defined,
};

export const data = createReducer<TComments, TGetCommentsActions>(
  initialState
)
  .handleAction(getCommentsInitAction, (state) =>
    produce(state, (draftState) => {
      draftState.fetchingStatus = TFetchingStatus.Initial;
    })
  )
  .handleAction(getCommentsSuccessAction, (state, action) =>
    produce(state, (draftState) => {
      draftState.comments = action.payload.comments;
      draftState.fetchingStatus = TFetchingStatus.Success;
    })
  )
  .handleAction(getCommentsFailureAction, (state) =>
    produce(state, (draftState) => {
      draftState.fetchingStatus = TFetchingStatus.Failure;
    })
  );
