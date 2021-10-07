import { useEffect } from "react";
import EventsTimeLine from "./components/EventsTimeLine";
import { useAppState } from "./store";

function App() {
  const {
    state: { events },
    dispatch,
  } = useAppState();

  useEffect(() => {
    const timer = setInterval(dispatch.updateEvents, 5_000);
    return () => clearTimeout(timer);
  }, [dispatch.updateEvents]);

  return <EventsTimeLine events={events} />;
}

export default App;
