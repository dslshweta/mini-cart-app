import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Header from "../components/Header";
import { Button, Popover } from "@material-ui/core";

configure({ adapter: new Adapter() });

/**
 * Initialize common properties to be passed
 * @param {*} props properies to override
 */
function createTestProps(props) {
  return {
    cart: [{"id":"123442","title":"Product 1","currency":"$","price":"39","quantity":1}],
    cartChanger: jest.fn(),
    ...props,
  };
}

let wrapper, props;

beforeEach(() => {
  props = createTestProps();
  wrapper = shallow(<Header {...props} /> );
});

describe("<Header /> rendering & interactions", () => {
  it("should render a cart icon", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("should render a total price", () => {
    expect(wrapper.find(".cartTotal")).toHaveLength(1);
  });

  it("should not render total price when cart is empty", () => {
    wrapper = shallow(<Header {...props} cart={[]} /> );
    expect(wrapper.find(".cartTotal")).toHaveLength(0);
  });

  it("should call the onClick function and render popover when cart button is clicked", () => {
    const mockedEvent = { target: {} }
    wrapper.find(Button).simulate("click", mockedEvent);
    expect(wrapper.find(Popover)).toHaveLength(1);
  });

  it("should not open popover when cart is empty", () => {
    const mockedEvent = { target: {} }
    wrapper = shallow(<Header {...props} cart={[]} /> );
    wrapper.find(Button).simulate("click", mockedEvent);
    expect(wrapper.find(Popover).prop("open")).toBe(false);
  });
});