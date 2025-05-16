import { produce } from 'immer';

import { create } from 'zustand';
import { JobApplication } from '../types/jobApplication';

type State = {
  selectedMyJob: null | JobApplication;
};
type Store = State & {
  selectMyJob: (job: JobApplication | null) => void;
};
const initialState: State = {
  selectedMyJob: null,
};

export const useMyJobStore = create<Store>((set) => ({
  ...initialState,
  selectMyJob: (job: JobApplication | null) =>
    set(
      produce((draft) => {
        draft.selectedMyJob = job;
      })
    ),
}));
