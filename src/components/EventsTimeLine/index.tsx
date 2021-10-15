import { FC, useEffect, useRef, useState } from "react";
import { Event } from "../../types";

import "./EventsTimeLine.scss";

type Props = {
  events: Event[] | [];
};

const EventsTimeLine: FC<Props> = ({ events }) => {
  const [modal, setModal] = useState<Event | null>();
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    function closeModal(e: MouseEvent) {
      console.log("\x1b[45mJSAV\x1b[0m e.target  ", e.target);
      if (
        e.target !== modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setModal(null);
      }
    }
    modal && document.addEventListener("click", closeModal as EventListener);
    return () => {
      modal &&
        document.removeEventListener("click", closeModal as EventListener);
    };
  }, [modal]);

  return (
    <div className={`wrapper ${modal ? "open" : ""}`}>
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
                  onClick={() => setModal({ date, title, description })}
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
      {modal && (
        <div className="modal">
          <div ref={modalRef} className="content">
            <div className="time">{`${
              modal.date.match(/\d{2}:\d{2}/)?.[0]
            }`}</div>
            <h2>{modal.title}</h2>
            <p>{modal.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTimeLine;
