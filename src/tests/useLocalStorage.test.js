import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../hooks/useLocalStorage";

const lsKey = "cart";
const lsValue = [{"id":"123442","title":"Product 1","currency":"$","price":"39","quantity":1}];

describe("Test custom hook - useLocalStorage", () => {
  it("should set localStorage with default value", () => {
    renderHook(() => useLocalStorage(lsKey, lsValue));
    expect(JSON.parse(localStorage.getItem(lsKey))).toEqual(lsValue);
  });
  
  it("should set the default value from localStorage if it exists", () => {
    // set the localStorage to the test value
    localStorage.setItem(lsKey, JSON.stringify(lsValue));
  
    // initialise with an empty object
    const { result } = renderHook(() => useLocalStorage(lsKey, []));
  
    // check that the value is what is stored in localStorage (and not an empty object)
    const [value] = result.current;
    expect(value).toEqual(lsValue);
  
    // expect value to be taken from localStorage (rather than empty object)
    expect(JSON.parse(localStorage.getItem(lsKey))).toEqual(lsValue);
  });
  
  it("should update localStorage when state changes", () => {
    // initialise with test object
    const { result } = renderHook(() =>
      useLocalStorage(lsKey, lsValue)
    );
  
    const [, cartChanger] = result.current;
  
    // set the state with updated quantity
    const newValue = [{"id":"123442","title":"Product 1","currency":"$","price":"39","quantity":4}];
    act(() => {
      cartChanger(newValue);
      // localStorage should have updated to new value
      expect(JSON.parse(localStorage.getItem(lsKey))).toEqual(lsValue);
    });      
  });
});