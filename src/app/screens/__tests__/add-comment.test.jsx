import React from "react";
import "jest-styled-components";
import renderer from "react-test-renderer";
import AddComment from "../add-comment";
import { mount } from "enzyme";
import {useHistory} from "react-router-dom";

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
    jest.clearAllMocks();
  });
  test("should match snapshot AddComment component", () => {
    const tree = renderer.create(<AddComment />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("should test styles AddComment component", () => {
    const tree = mount(<AddComment />);
    console.log(tree.toString());
    expect(tree.find("main").exists()).toBe(true);
    expect(tree.find("main section")).toHaveStyleRule("display", "flex");
    const button = tree.find("main section header div button");
    expect(button.exists()).toBe(true);
  });
});
