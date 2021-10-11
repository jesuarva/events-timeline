import { FC } from "react";
import { Event } from "../../types";

import "./EventsTimeLine.scss";

type Props = {
  events: Event[] | [];
};

const EventsTimeLine: FC<Props> = ({ events }) => {
  return (
    <section className="timeline">
      {events.length > 0 ? (
        events
          .sort((event1, event2) =>
            Date.parse(event1.date) > Date.parse(event2.date) ? -1 : 1
          )
          .slice(0, 6)
          .map(({ date, title, description }) => {
            const time = date.match(/\d{2}:\d{2}/)?.[0];
            return (
              <div
                key={`${date}${title}`}
                className="container"
                data-testid="event"
              >
                <div className="content">
                  <div className="time">{`${time}`}</div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </div>
            );
          })
      ) : (
        <div className="container" data-testid="event">
          <div className="content">
            <h2>{"Waiting for events"}</h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsTimeLine;
