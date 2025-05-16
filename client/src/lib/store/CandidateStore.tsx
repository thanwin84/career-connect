import { produce } from 'immer';
import { create } from 'zustand';
import { Job, JobStatus } from '../types/job';
import { JobApplication } from '../types/jobApplication';
import { User } from '../types/user';

export type JobApplicant = JobApplication & {
  user: User;
  job: Job;
};
type InitialState = {
  jobApplicants: JobApplication[] | null;
  selectedApplicantIds: string[];
};
type Store = InitialState & {
  isAllSelected: boolean;
  addCandidates: (jobApplicants: JobApplication[]) => void;
  updateStatus: (id: string, status: JobStatus) => void;
  addSelectedItem: (id: string) => void;
  selectAllItems: () => void;
  updateSelectedItemsStatus: (status: JobStatus) => void;
  removeAllSelectedItems: () => void;
};

const initialState: InitialState = {
  jobApplicants: null,
  selectedApplicantIds: [],
};

export const useCandidateStore = create<Store>((set) => ({
  ...initialState,
  isAllSelected: false,
  addCandidates: (jobApplicants: JobApplication[]) =>
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
        draft.selectedApplicantIds = draft.selectedApplicantIds.includes(id)
          ? draft.selectedApplicantIds.filter((_id: string) => _id !== id)
          : [...draft.selectedApplicantIds, id];
      })
    ),

  selectAllItems: () =>
    set(
      produce((draft) => {
        if (draft.isAllSelected) {
          draft.selectedApplicantIds = [];
          draft.isAllSelected = false;
        } else {
          draft.selectedApplicantIds = draft.jobApplicants.map(
            (item: JobApplicant) => item._id
          );
          draft.isAllSelected = true;
        }
      })
    ),
  removeAllSelectedItems: () =>
    set(
      produce((draft) => {
        draft.selectedApplicantIds = [];
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
