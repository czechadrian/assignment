import { ActionType, createAction } from "typesafe-actions";
import { TComment } from "../../reducers/comments";

export const addCommentAction = createAction("comment/ADD_NEW_COMMENT")<
  TComment
>();

export type TAddCommentAction = ActionType<typeof addCommentAction>;
