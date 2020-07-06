import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "jest-styled-components";
import renderer from "react-test-renderer";
import CustomForm from "../form-component";
import { addCommentAction } from "../../screens/actions/add-comment-action";

jest.mock("../../screens/actions/add-comment-action", () => {
  return {
    addCommentAction: jest.fn(),
  };
});

jest.mock("react-redux", () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

describe("CustomForm", () => {
  const dispathMock = jest.fn();
  const selectorMock = jest.fn();
  beforeEach(() => {
    useSelector.mockImplementation(selectorMock);
    useDispatch.mockReturnValue(dispathMock);

    addCommentAction.mockReturnValue(() => jest.fn());

    jest.clearAllMocks();
  });
  test("selected comments component test", () => {
    const tree = renderer.create(<CustomForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
