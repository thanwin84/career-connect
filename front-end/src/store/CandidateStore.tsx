import { produce } from 'immer';
import { create } from 'zustand';
import { JobApplication, User, Job, JobStatus } from '../types';

export type JobApplicant = JobApplication & {
  user: User;
  job: Job;
};
type InitialState = {
  jobApplicants: JobApplicant[] | null;
  selectedApplicantIds: string[];
};
type Store = InitialState & {
  addCandidates: (jobApplicants: JobApplicant[]) => void;
  updateStatus: (id: string, status: JobStatus) => void;
  addSelectedItem: (id: string) => void;
  removeSelectedItem: (id: string) => void;
  removeAllSelectedItems: () => void;
  selectAllItems: () => void;
  updateSelectedItemsStatus: (status: JobStatus) => void;
};

const initialState: InitialState = {
  jobApplicants: null,
  selectedApplicantIds: [],
};

export const useCandidateStore = create<Store>((set) => ({
  ...initialState,
  addCandidates: (jobApplicants: JobApplicant[]) =>
    set(
      produce((draft) => {
        draft.jobApplicants = jobApplicants;
      })
    ),
  updateStatus: (id: string, status: JobStatus) =>
    set(
      produce((draft) => {
        draft.jobApplicants = draft.jobApplicants.map(
          (applicant: JobApplicant) =>
            applicant._id === id ? { ...applicant, status: status } : applicant
        );
      })
    ),
  addSelectedItem: (id: string) =>
    set(
      produce((draft) => {
        draft.selectedApplicantIds.push(id);
      })
    ),
  removeSelectedItem: (itemId: string) =>
    set(
      produce((draft) => {
        draft.selectedApplicantIds = draft.selectedApplicantIds.filter(
          (id: string) => id !== itemId
        );
      })
    ),
  removeAllSelectedItems: () =>
    set(
      produce((draft) => {
        draft.selectedApplicantIds = [];
      })
    ),
  selectAllItems: () =>
    set(
      produce((draft) => {
        draft.selectedApplicantIds =
          draft.jobApplicants.map((item: JobApplicant) => item._id) || [];
      })
    ),
  updateSelectedItemsStatus: (value: JobStatus) =>
    set(
      produce((draft) => {
        draft.jobApplicants = draft.jobApplicants.map((item: JobApplicant) =>
          draft.selectedApplicantIds.includes(item._id)
            ? { ...item, status: value }
            : item
        );
      })
    ),
}));
