import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "jest-styled-components";
import renderer from "react-test-renderer";
import TableComponent from "../table-component";
import {
  removeSelectedCommentAction,
  selectCommentAction,
} from "../../screens/actions/selected-comments-actions";

const payload = require("../../../api-wrapper/test-helper/comments.data");
jest.mock("../../screens/actions/selected-comments-actions", () => {
  return {
    selectCommentAction: jest.fn(),
    removeSelectedCommentAction: jest.fn(),
  };
});

jest.mock("react-redux", () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

describe("TableComponent", () => {
  const dispathMock = jest.fn();
  beforeEach(() => {
    useSelector.mockImplementation((selectorFn) => selectorFn());
    useDispatch.mockReturnValue(dispathMock);

    selectCommentAction.mockReturnValue(() => jest.fn());
    removeSelectedCommentAction.mockReturnValue(() => jest.fn());

    jest.clearAllMocks();
  });
  test("selected comments component test", () => {
    const tree = renderer
      .create(
        <TableComponent
          rows={payload.payload.comments}
          homePageTable={false}
          action={removeSelectedCommentAction}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("homepage component test", () => {
    const tree = renderer
      .create(
        <TableComponent
          rows={payload.payload.comments}
          homePageTable={true}
          action={selectCommentAction}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
