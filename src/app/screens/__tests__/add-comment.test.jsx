import React from "react";
import "jest-styled-components";
import renderer from "react-test-renderer";
import { useHistory } from "react-router-dom";
import AddComment from "../add-comment";
jest.mock("react-redux");
jest.mock("react-router-dom", () => {
  return {
    useHistory: jest.fn(),
  };
});

describe("AddComment", () => {
  const historyMock = jest.fn();
  beforeEach(() => {
    useHistory.mockReturnValue(historyMock);
    // useHistory.mockImplementation(historyMock);

    jest.clearAllMocks();
  });
  test("should match snapshot AddComment component", () => {
    const tree = renderer.create(<AddComment />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
