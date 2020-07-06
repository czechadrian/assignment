import React from "react";
import "jest-styled-components";
import renderer from "react-test-renderer";
import { useHistory } from "react-router-dom";
import SelectedCommentsPage from "../selected-comments-page";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedCommentAction } from "../actions/selected-comments-actions";
const { payload } = require("../../../api-wrapper/test-helper/comments.data");
jest.mock("../actions/selected-comments-actions", () => {
  return {
    removeSelectedCommentAction: jest.fn(),
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

describe("SelectedCommentsPage", () => {
  const historyMock = jest.fn();
  const dispatchMock = jest.fn();
  beforeEach(() => {
    useHistory.mockReturnValue(historyMock);
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ data: payload })
    );

    removeSelectedCommentAction.mockReturnValue(() => jest.fn());

    jest.clearAllMocks();
  });
  test("should match snapshot HomePage component", () => {
    const tree = renderer.create(<SelectedCommentsPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
