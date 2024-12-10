import { create } from "zustand";
import { Education, User } from "../types";
import { produce } from "immer";

type UserState = {
  isLoggedIn: boolean;
  userAvatar: string | null;
  user: User | null;
  jobAppliedIds: string[];
};

type Store = UserState & {
  addUser: (user: User) => void;
  logoutUser: () => void;
  toggleTwoStepAuthentication: () => void;
  addPhoneNumber: (phoneNumber: string) => void;
  updateEducationRecord: (education: Education, id: string) => void;
  addEducationRecord: (education: Education) => void;
  deleteEducationRecord: (id: string) => void;
  updateUserAvatar: (avatar: string) => void;
};

const initialUserState: UserState = {
  isLoggedIn: false,
  user: null,
  userAvatar: null,
  jobAppliedIds: [],
};

export const useUserStore = create<Store>((set) => ({
  ...initialUserState,
  addUser: (user: User) =>
    set(
      produce((draft) => {
        draft.user = user;
        draft.isLoggedIn = true;
        draft.userAvatar = user.avatar?.url || null;
      })
    ),
  logoutUser: () =>
    set(
      produce((draft) => {
        draft.user = null;
        draft.isLoggedIn = false;
        draft.userAvatar = null;
      })
    ),
  toggleTwoStepAuthentication: () =>
    set(
      produce((draft) => {
        if (draft.user) {
          draft.user.twoStepAuthentication = !draft.user.twoStepAuthentication;
        }
      })
    ),
  addPhoneNumber: (phoneNumber: string) =>
    set(
      produce((draft) => {
        if (draft.user) {
          draft.user.phoneNumber = phoneNumber;
        }
      })
    ),
  updateEducationRecord: (education: Education, id: string) =>
    set(
      produce((draft) => {
        if (draft.user && draft.user.educationRecords) {
          draft.user.educationRecords = draft.user.educationRecords.map(
            (record: Education) => (record._id === id ? education : record)
          );
        }
      })
    ),
  addEducationRecord: (education: Education) =>
    set(
      produce((draft) => {
        if (draft.user && draft.user.educationRecords) {
          draft.user.educationRecords.push(education);
        }
      })
    ),
  deleteEducationRecord: (id: string) =>
    set(
      produce((draft) => {
        if (draft.user && draft.user.educationRecords) {
          draft.user.educationRecords = draft.user.educationRecords.filter(
            (record: Education) => record._id !== id
          );
        }
      })
    ),
  updateUserAvatar: (avatar: string) =>
    set(
      produce((draft) => {
        if (draft.user) {
          if (draft.user.avatar) {
            draft.user.avatar.url = avatar;
          }
        }
      })
    ),
}));
