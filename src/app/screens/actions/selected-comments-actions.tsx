import { ActionType, createAction } from "typesafe-actions";
import { TComment } from "../../reducers/comments";

export const selectCommentAction = createAction(
  "homepage/CLICK_SELECT_COMMENT"
)<Pick<TComment, "id">>();
export const removeSelectedCommentAction = createAction(
  "selected-comments/REMOVE_SELECTED_COMMENT"
)<Pick<TComment, "id">>();

export type TSelectCommentAction = ActionType<typeof selectCommentAction>;

export type TRemoveSelectedCommentAction = ActionType<
  typeof removeSelectedCommentAction
>;

export type TSelectedCommentActions =
  | TSelectCommentAction
  | TRemoveSelectedCommentAction;
