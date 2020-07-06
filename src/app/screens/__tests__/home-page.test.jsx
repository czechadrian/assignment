import React from "react";
import "jest-styled-components";
import renderer from "react-test-renderer";
import HomePage from "../home-page";
import { useSelector, useDispatch } from "react-redux";
import { selectCommentAction } from "../actions/selected-comments-actions";
import { mount } from "enzyme";
import { useHistory } from "react-router-dom";
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
    useDispatch.mockReturnValue(dispatchMock);
    useHistory.mockReturnValue(historyMock);
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
  test("should test styles HomePage component with empty comments collection", () => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ data: { comments: [] } })
    );
    const tree = mount(<HomePage />);

    expect(tree.contains("Loading....")).toBe(true);
  });

  test("should test styles HomePage component with non-empty comments collection", () => {
    const tree = mount(<HomePage />);

    expect(tree.find("main header div").exists()).toBe(true);

    const button1 = tree.find("main header div button").at(0);
    const button2 = tree.find("main header div button").at(1);
    const button3 = tree.find("main header div button").at(2);

    expect(button1.exists()).toBe(true);
    expect(button2.exists()).toBe(true);
    expect(button3.exists()).toBe(true);
  });
});
