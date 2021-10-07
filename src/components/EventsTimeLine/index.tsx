import { FC } from "react";
import { Event } from "../../types";

import "./EventsTimeLine.scss";

type Props = {
  events: Event[] | [];
};

const EventsTimeLine: FC<Props> = ({ events }) => {
  console.log("\x1b[45mJSAV\x1b[0m events  ", events);
  return (
    <section className="timeline">
      {events
        .sort((event1, event2) =>
          Date.parse(event1.date) > Date.parse(event2.date) ? -1 : 1
        )
        .slice(0, 6)
        .map(({ date, title, description }) => {
          const time = date.match(/\d{2}:\d{2}/)?.[0];
          return (
            <div key={date} className="container">
              <div className="content">
                <div className="time">{`${time}`}</div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default EventsTimeLine;
