import { produce } from 'immer';

import { create } from 'zustand';
import { MyJobApplication } from '../types/jobApplication';

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
