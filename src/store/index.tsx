import {
  FC,
  useReducer,
  createContext,
  useContext,
  useRef,
  Dispatch,
} from "react";
import { Event } from "../types";

/* Types */
interface AppState {
  events: Event[] | [];
}

interface ContextShape {
  dispatch: Dispatchers;
  state: AppState;
}

/* Actions Types */
enum ActionTypes {
  updateEvents = "updateEvents",
}

interface Action<T> {
  type: T;
}

interface ActionUpdateEvent extends Action<ActionTypes.updateEvents> {
  event: Event;
}

type AppActions = ActionUpdateEvent;

/** Dispatchers */
type Dispatchers = {
  updateEvents: () => void;
};

let count = 0;
export function getMockEvent(): Event {
  return {
    date: new Date().toISOString(),
    title: `Something happen - ${++count}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae dolor.".repeat(
        Math.ceil(Math.random() * 3)
      ),
  };
}

function getDispatchers(dispatch: Dispatch<AppActions>): Dispatchers {
  return {
    updateEvents() {
      dispatch({ type: ActionTypes.updateEvents, event: getMockEvent() });
    },
  };
}

/** Reducer */
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionTypes.updateEvents: {
      return {
        ...state,
        events: [...state.events, action.event],
      };
    }
    default:
      return state;
  }
}

/* Context */
const initialState: AppState = {
  events: [],
};

const AppStateContext = createContext<ContextShape>({
  state: initialState,
} as ContextShape);

const useAppState = (): ContextShape => useContext(AppStateContext);

const isDev = process.env.NODE_ENV === "development";

const AppStateContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    isDev ? logger(reducer) : reducer,
    initialState
  );
  const dispatchersRef = useRef(getDispatchers(dispatch));

  return (
    <AppStateContext.Provider
      value={{ state, dispatch: dispatchersRef.current }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

function logger<S, A extends { type: unknown }>(
  reducer: (state: S, action: A) => S
) {
  return (state: S, action: A): S => {
    const next = reducer(state, action);
    console.groupCollapsed(
      "%cAction type:",
      "color: #00A7F7; font-weight: 700;",
      action.type
    );
    console.log(
      "%cPrevious State:",
      "color: #9E9E9E; font-weight: 700;",
      state
    );
    console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
    console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
    console.groupEnd();
    return next;
  };
}

export { useAppState, AppStateContextProvider };
