/* eslint-disable */
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
// Remove warnings from test results - https://github.com/facebook/jest/issues/286
console.error = jest.fn();