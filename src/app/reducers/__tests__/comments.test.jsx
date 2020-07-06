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

describe("comments reducer", function () {
  const payload = [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body:
        "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      selected: true,
    },
    {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body:
        "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      selected: false,
    },
  ];
  const previousState = {
    data: { comments: [], fetchingStatus: TFetchingStatus.Defined },
  };
  const previousState2 = {
    comments: payload,
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
    const action = getCommentsSuccessAction({ comments: payload });
    expect(action).toEqual({
      type: "data/FETCH_SUCCESS",
      meta: undefined,
      payload: { comments: payload },
    });

    const newState = data(previousState, action);

    expect(newState.fetchingStatus).toEqual(TFetchingStatus.Success);
    expect(newState.comments).toEqual(payload);
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
