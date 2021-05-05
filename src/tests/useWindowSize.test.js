import { fireEvent } from "@testing-library/dom";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";
import useWindowSize from "../utils/useWindowSize";

describe("useWindowSize", () => {
  it("Listens for window size correctly", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 500;
      fireEvent(window, new Event("resize"));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(500);
  });
});
