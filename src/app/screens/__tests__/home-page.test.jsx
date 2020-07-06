import React from "react";
import "jest-styled-components";
import renderer from "react-test-renderer";
import { useHistory } from "react-router-dom";
import HomePage from "../home-page";
import { useSelector, useDispatch } from "react-redux";
import { selectCommentAction } from "../actions/selected-comments-actions";
const { payload } = require("../../../api-wrapper/test-helper/comments.data");
jest.mock("../actions/selected-comments-actions", () => {
  return {
    selectCommentAction: jest.fn(),
  };
});
jest.mock("react-redux", () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});
jest.mock("react-router-dom", () => {
  return {
    useHistory: jest.fn(),
  };
});

describe("HomePage", () => {
  const historyMock = jest.fn();
  const dispatchMock = jest.fn();
  beforeEach(() => {
    useHistory.mockReturnValue(historyMock);
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ data: payload })
    );

    selectCommentAction.mockReturnValue(() => jest.fn());

    jest.clearAllMocks();
  });
  test("should match snapshot HomePage component", () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
