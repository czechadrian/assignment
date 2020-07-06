import { TFetchingStatus } from "../../constants";
import {
  getCommentsFailureAction,
  getCommentsInitAction,
  getCommentsSuccessAction,
} from "../../screens/actions/fetch-comments-actions";
import { data } from "../comments";
import {
  removeSelectedCommentAction,
  selectCommentAction,
} from "../../screens/actions/selected-comments-actions";

const {payload} = require("../../../api-wrapper/test-helper/comments.data");
describe("comments reducer", function () {
  const previousState = {
    data: { comments: [], fetchingStatus: TFetchingStatus.Defined },
  };
  const previousState2 = {
    comments: payload.comments,
  };

  it("should fetch comments - init", () => {
    const action = getCommentsInitAction();
    expect(action).toEqual({
      type: "data/FETCH_INIT",
      meta: undefined,
    });

    const newState = data(previousState, action);

    expect(newState.fetchingStatus).toEqual(TFetchingStatus.Initial);
  });

  it("should fetch comments - success", () => {
    const action = getCommentsSuccessAction({ comments: payload.comments });
    expect(action).toEqual({
      type: "data/FETCH_SUCCESS",
      meta: undefined,
      payload: { comments: payload.comments },
    });

    const newState = data(previousState, action);

    expect(newState.fetchingStatus).toEqual(TFetchingStatus.Success);
    expect(newState.comments).toEqual(payload.comments);
  });

  it("should fetch comments - failure", () => {
    const action = getCommentsFailureAction();
    expect(action).toEqual({
      type: "data/FETCH_FAILURE",
      meta: undefined,
    });

    const newState = data(previousState, action);

    expect(newState.fetchingStatus).toEqual(TFetchingStatus.Failure);
  });
  it("should remove comment from selected comment", () => {
    const action = removeSelectedCommentAction({ id: 1 });
    expect(action).toEqual({
      type: "selected-comments/REMOVE_SELECTED_COMMENT",
      meta: undefined,
      payload: { id: 1 },
    });

    const newState = data(previousState2, action);

    expect(newState.comments[0].selected).toEqual(false);
  });
  it("should select comment", () => {
    const action = selectCommentAction({ id: 2 });
    expect(action).toEqual({
      type: "homepage/CLICK_SELECT_COMMENT",
      meta: undefined,
      payload: { id: 2 },
    });

    const newState = data(previousState2, action);

    expect(newState.comments[1].selected).toEqual(true);
  });
});
