import { produce } from "immer";
import { MyJobApplication } from "../types";
import { create } from "zustand";

type State = {
  selectedMyJob: null | MyJobApplication;
};
type Store = State & {
  selectMyJob: (job: MyJobApplication | null) => void;
};
const initialState: State = {
  selectedMyJob: null,
};

export const useMyJobStore = create<Store>((set) => ({
  ...initialState,
  selectMyJob: (job: MyJobApplication | null) =>
    set(
      produce((draft) => {
        draft.selectedMyJob = job;
      })
    ),
}));
