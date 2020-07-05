import { ActionType, createAction } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";
import { TRootState } from "../../reducers";
import { getComments } from "../../../api-wrapper/get-comments";
import { TComments } from "../../reducers/comments";

export const getCommentsInitAction = createAction("data/FETCH_INIT")();
export const getCommentsSuccessAction = createAction("data/FETCH_SUCCESS")<
  Pick<TComments, "comments">
>();
export const getCommentsFailureAction = createAction("data/FETCH_FAILURE")();

export type TGetCommentsInitAction = ActionType<typeof getCommentsInitAction>;
export type TGetCommentsSuccessAction = ActionType<
  typeof getCommentsSuccessAction
>;
export type TGetCommentsFailureAction = ActionType<
  typeof getCommentsFailureAction
>;

export type TGetCommentsActions =
  | TGetCommentsSuccessAction
  | TGetCommentsFailureAction
  | TGetCommentsInitAction;

export type TFetchCommentsAction = () => ThunkAction<
  void,
  TRootState,
  null,
  TGetCommentsActions
>;
export const fetchComments: TFetchCommentsAction = () => (dispatch) => {
  dispatch(getCommentsInitAction());
  return getComments()
    .then((payload) => {
      return dispatch(getCommentsSuccessAction({ comments: payload }));
    })
    .catch(() => {
      dispatch(getCommentsFailureAction());
    });
};
