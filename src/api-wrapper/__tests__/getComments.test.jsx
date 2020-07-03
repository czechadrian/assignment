import { apiGet } from "../apiCall";
import { getComments } from "../getComments";
import { PARAMS_LIMIT, URL_COMMENTS } from "../../app/constants";

jest.mock("../apiCall", () => {
  return {
    apiGet: jest.fn(),
  };
});

describe("getComments ", () => {
  test("should get comments", () => {
    getComments();
    expect(apiGet).toHaveBeenCalledWith(URL_COMMENTS, PARAMS_LIMIT);
  });
});
