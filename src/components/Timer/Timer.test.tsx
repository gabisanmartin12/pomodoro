import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Timer from "./Timer";

describe("<Timer />", () => {
  it("Component renders properly", () => {
    const { getByText } = render(<Timer />);

    expect(getByText(/\d{2}:\d{2}/i)).toBeInTheDocument();
    expect(getByText(/Start/i)).toBeInstanceOf(HTMLButtonElement);
  });

  it("timer starts when user press start button and button text changes to stop", async () => {
    jest.useFakeTimers();
    const { getByText } = render(<Timer />);

    act(() => {
      fireEvent.click(getByText(/Start/i));
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(getByText("24:58")).toBeInTheDocument();
      expect(getByText(/stop/i)).toBeInTheDocument();
    });
  });

  it("timer stops when user presses the stop button and the button text changes to resume", async () => {
    jest.useFakeTimers();
    const { getByText } = render(<Timer />);

    act(() => {
      fireEvent.click(getByText(/Start/i));
      jest.advanceTimersByTime(2000);
      fireEvent.click(getByText(/Stop/i));
      jest.advanceTimersByTime(2000);
    });

    expect(getByText("24:58")).toBeInTheDocument();
    expect(getByText(/resume/i)).toBeInTheDocument();
  });
});
