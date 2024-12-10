import { useState } from "react";

export function createStore<S, A>(
  initialState: S,
  actionsFactory: (setState: React.Dispatch<React.SetStateAction<S>>) => A
) {
  const [state, setState] = useState(initialState);
  const actions = actionsFactory(setState);

  return {
    state,
    actions,
  };
}
