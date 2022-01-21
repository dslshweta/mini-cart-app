import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MiniCart from "../components/MiniCart";
import ClearIcon from "@material-ui/icons/Clear";
import { ListItem, Box } from "@material-ui/core";

configure({ adapter: new Adapter() });

/**
 * Initialize common properties to be passed
 * @param {*} props properies to be override
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
  wrapper = shallow(<MiniCart {...props} /> );
});

describe("<MiniCart /> rendering & interactions", () => {
  it("should render a list of products in cart", () => {
    expect(wrapper.find(ListItem)).toHaveLength(1);
    expect(wrapper.find(ClearIcon)).toHaveLength(1);
  });

  it("should show empty cart in case all products are removed", () => {
    wrapper = shallow(<MiniCart {...props} cart={[]} /> );
    expect(wrapper.find(Box).dive().text()).toEqual("Empty Cart");
  });

});