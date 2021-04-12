import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Timer from "./Timer";

describe("<Timer />", () => {
  it("Component renders properly", () => {
    const { getByText } = render(<Timer />);

    const time = getByText("25:00");
    const button = getByText(/Start/i);

    expect(time).toBeInTheDocument();
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it("timer must starts when user press start button and button text must change to stop", async () => {
    jest.useFakeTimers();
    const { getByText } = render(<Timer />);

    fireEvent.click(getByText(/Start/i));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(getByText("24:58")).toBeInTheDocument();
      expect(getByText(/stop/i)).toBeInTheDocument();
    });
  });
});
