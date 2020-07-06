import React from "react";
import "jest-styled-components";
import renderer from "react-test-renderer";
import { useHistory } from "react-router-dom";
import SelectedCommentsPage from "../selected-comments-page";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedCommentAction } from "../actions/selected-comments-actions";
import { mount } from "enzyme";
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
  test("should find table component when selectedComments > 0", () => {
    const tree = mount(<SelectedCommentsPage />);

    const table = tree.find("main TableComponent");
    console.log(table.prop("rows"));
    expect(table.prop("rows")).toEqual(
      payload.comments.filter((c) => c.selected)
    );
  });
  test("should not find table component when selectedComments === 0", () => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ data: { comments: [] } })
    );
    const tree = mount(<SelectedCommentsPage />);

    const table = tree.find("main TableComponent");
    expect(table).toEqual({});
  });
});
