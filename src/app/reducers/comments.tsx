import { createReducer } from "typesafe-actions";
import produce from "immer";
import { TFetchingStatus } from "../constants";
import {
  getCommentsFailureAction,
  getCommentsInitAction,
  getCommentsSuccessAction,
  TGetCommentsActions,
} from "../screens/actions/comments-actions";
import {
  removeSelectedCommentAction,
  selectCommentAction,
  TSelectedCommentActions,
} from "../screens/actions/selected-comments-actions";

export interface TComment {
  name: string;
  email: string;
  id: number;
  postId: number;
  body: string;
  selected: boolean;
}
export interface TComments {
  comments: TComment[];
  fetchingStatus: TFetchingStatus;
}

export const initialState: TComments = {
  comments: [],
  fetchingStatus: TFetchingStatus.Defined,
};

type TCommentActions = TGetCommentsActions | TSelectedCommentActions;

export const data = createReducer<TComments, TCommentActions>(initialState)
  .handleAction(getCommentsInitAction, (state) =>
    produce(state, (draftState) => {
      draftState.fetchingStatus = TFetchingStatus.Initial;
    })
  )
  .handleAction(getCommentsSuccessAction, (state, action) =>
    produce(state, (draftState) => {
      draftState.comments = action.payload.comments;
      draftState.comments.forEach((comment) => (comment.selected = false));
      draftState.fetchingStatus = TFetchingStatus.Success;
    })
  )
  .handleAction(getCommentsFailureAction, (state) =>
    produce(state, (draftState) => {
      draftState.fetchingStatus = TFetchingStatus.Failure;
    })
  )
  .handleAction(selectCommentAction, (state, action) =>
    produce(state, (draftState) => {
      draftState.comments.forEach((comment) => {
        if (comment.id === action.payload.id) {
          comment.selected = true;
        }
      });
    })
  )
  .handleAction(removeSelectedCommentAction, (state, action) =>
    produce(state, (draftState) => {
      draftState.comments.forEach((comment) => {
        if (comment.id === action.payload.id) {
          comment.selected = false;
        }
      });
    })
  );
