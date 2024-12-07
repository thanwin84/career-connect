import { produce } from "immer";
import { MyJobApplication } from "../types";
import { createStore } from "../utils/storeCreator";

type Type = {
  selectedMyJob: null | MyJobApplication;
};
const initialState: Type = {
  selectedMyJob: null,
};
export const useMyJobsStore = () => {
  return createStore(initialState, (setState) => {
    return {
      selectMyJob: (job: MyJobApplication | null) => {
        setState(
          produce((draft) => {
            draft.selectedMyJob = job;
          })
        );
      },
    };
  });
};
