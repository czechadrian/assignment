import { apiGet } from "../api-call";
import { getComments } from "../get-comments";
import { PARAMS_LIMIT, URL_COMMENTS } from "../../app/constants";

jest.mock("../api-call", () => {
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
