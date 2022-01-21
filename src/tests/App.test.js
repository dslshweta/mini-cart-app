import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TextField } from "@material-ui/core";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useLocalStorage } from "../hooks/useLocalStorage";
import App from "../App";

configure({ adapter: new Adapter() });
let wrapper;

const lsKey = "cart";
const lsValue = [{"id":"123442","title":"Product 1","currency":"$","price":"39","quantity":1}];
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
const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});
  
afterAll(() => {
  console.error = originalError;
});

describe("Application integration tests", () => {

  it("On click of + icon, Product quantity value and cart total in Header should increase", async () => {
    
    let prodQntElement;
    renderHook(() => useLocalStorage(lsKey, lsValue));
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      data,
      json: () => data
    }));

    await act(async () => {
      wrapper = await mount(<App />);
      wrapper.update();
    });
        
    act(() => {
      wrapper.update();
      prodQntElement = wrapper.find("#prod-123442");
      // click + icon
      prodQntElement.find("#addButton").at(0).simulate("click");            
    });
        
    act(() => {
      wrapper.update();
      const newCartTotal =  wrapper.find(".cartTotal").text();
      // Since in renderHook we set the product qty value to 1 in cart localstorage
      // So now after simulating + icon, in Header cartTotal should show sum of 2 items 
      expect(newCartTotal).toEqual("$78");
      prodQntElement = wrapper.find("#prod-123442");

      // after simulating + icon it should be 2
      expect(prodQntElement.find(TextField).prop("value")).toBe(2);
    });
  });
});