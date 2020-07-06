import { getComments } from "../../../../api-wrapper/get-comments";
import { fetchComments } from "../fetch-comments-actions";
import { initialState } from "../../../reducers/comments";
import { TFetchingStatus } from "../../../constants";
const payload = require("../../../../api-wrapper/test-helper/comments.data");
jest.mock("../../../../api-wrapper/get-comments");

describe("fetch comments actions", () => {
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
