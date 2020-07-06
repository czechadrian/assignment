import { getComments } from "../../../../api-wrapper/get-comments";
import { fetchComments } from "../fetch-comments-actions";
import { initialState } from "../../../reducers/comments";
import { TFetchingStatus } from "../../../constants";

jest.mock("../../../../api-wrapper/get-comments");

describe("fetch comments actions", () => {
  const payload = {
    comments: [
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
    ],
  };
  it("should dispatch init and success actions", async () => {
    const dispatchStub = jest.fn();
    const state = {
      data: { comments: [], fetchingStatus: TFetchingStatus.Defined },
    };
    getComments.mockReset();
    getComments.mockResolvedValue(payload);

    await fetchComments(initialState)(dispatchStub, () => state);

    expect(dispatchStub).toHaveBeenCalledTimes(2);
    expect(dispatchStub).toHaveBeenCalledWith({
      type: "data/FETCH_INIT",
    });
    expect(dispatchStub).toHaveBeenCalledWith({
      type: "data/FETCH_SUCCESS",
      payload: { comments: payload },
    });
  });

  it("should dispatch init and failure actions", async () => {
    const dispatchStub = jest.fn();
    const state = {
      data: { comments: [], fetchingStatus: TFetchingStatus.Defined },
    };
    getComments.mockReset();
    getComments.mockRejectedValue();

    await fetchComments(initialState)(dispatchStub, () => state);

    expect(dispatchStub).toHaveBeenCalledTimes(2);
    expect(dispatchStub).toHaveBeenCalledWith({
      type: "data/FETCH_INIT",
    });
    expect(dispatchStub).toHaveBeenCalledWith({
      type: "data/FETCH_FAILURE",
    });
  });
});
