import EventsTimeLine from ".";
import { screen, render } from "@testing-library/react";
import { getMockEvent } from "../../store";

describe("<EventsTimeLine />", () => {
  test("Renders nothing is there are not events", () => {
    render(<EventsTimeLine events={[]} />);

    const events = screen.queryAllByTestId("event");
    expect(events.length).toBe(0);
  });

  test("Renders a maximum of 6 events", async () => {
    const events = Array.from({ length: 10 }, () => getMockEvent());
    render(<EventsTimeLine events={events} />);

    const renderedEvents = screen.queryAllByTestId("event");
    expect(renderedEvents.length).toBe(6);
  });
});
