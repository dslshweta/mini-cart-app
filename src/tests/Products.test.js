import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Products from "../components/Products";
import { act } from "react-dom/test-utils";
import { ListItem } from "@material-ui/core";

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

let data = {"products": [
  {
    "id": "123442",
    "title": "Product 1",
    "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    "image": "/product1.jpeg",
    "price": "39",
    "currency": "$"
  }
]};
        
let wrapper, props;
const originalError = console.error;

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    data,
    json: () => data
  }));
});

beforeAll(() => {
  console.error = jest.fn();
});
  
afterAll(() => {
  console.error = originalError;
});

describe("<Products /> rendering", () => {
  it("should call fetch in useEffect & render products in list", async () => {
    await act(async () => {
      props = createTestProps();
      wrapper = await mount(<Products {...props} />);
      wrapper.update();
    });
    expect(global.fetch).toHaveBeenLastCalledWith("http://dnc0cmt2n557n.cloudfront.net/products.json");
    act(() => {
      wrapper.update();
    });
    expect(wrapper.find(ListItem)).toHaveLength(1);
  });
});