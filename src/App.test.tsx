import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders pomodoro title", () => {
  render(<App />);
  const titleElement = screen.getByText(/pomodoro/i);
  expect(titleElement).toBeInTheDocument();
});
