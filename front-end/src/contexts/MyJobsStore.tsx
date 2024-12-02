import { produce } from "immer";
import { ModifiedJobApplication } from "../types";
import { createStore } from "../utils/storeCreator";

type Type = {
  selectedMyJob: null | ModifiedJobApplication;
};
const initialState: Type = {
  selectedMyJob: null,
};
export const useMyJobsStore = () => {
  return createStore(initialState, (setState) => {
    return {
      selectMyJob: (job: ModifiedJobApplication | null) => {
        setState(
          produce((draft) => {
            draft.selectedMyJob = job;
          })
        );
      },
    };
  });
};
