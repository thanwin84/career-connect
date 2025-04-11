import { create } from 'zustand';
import { produce } from 'immer';
import { Education, UpdateUserProfile, User } from '../types';

type UserState = {
  isLoggedIn: boolean;
  userAvatar: string | null;
  user: User | null;
  currentSelectedUser: User | null;
  jobAppliedIds: string[];
  isLoading: boolean;
  permissions: string[];
};

type Store = UserState & {
  addUser: (user: User) => void;
  addCurrentSelectedUser: (user: User) => void;
  logoutUser: () => void;
  toggleTwoStepAuthentication: () => void;
  addPhoneNumber: (phoneNumber: string) => void;
  updateEducationRecord: (education: Education, id: string) => void;
  addEducationRecord: (education: Education) => void;
  deleteEducationRecord: (id: string) => void;
  updateUserAvatar: (avatar: string) => void;
  setLoading: (value: boolean) => void;
  updateUser: (data: Omit<UpdateUserProfile, 'avatar'>, avatar: string) => void;
};

const initialUserState: UserState = {
  isLoggedIn: false,
  user: null,
  userAvatar: null,
  jobAppliedIds: [],
  isLoading: true,
  permissions: [],
  currentSelectedUser: null,
};

export const useUserStore = create<Store>((set) => ({
  ...initialUserState,
  addUser: (user: User) =>
    set(
      produce((draft) => {
        console.log(user);
        draft.user = user;
        draft.isLoggedIn = true;
        draft.userAvatar = user.avatar?.url || null;
        draft.permissions =
          user?.role.map((item) => item.permissions).flat() || [];
      })
    ),
  addCurrentSelectedUser: (user: User) =>
    set(
      produce((draft) => {
        draft.currentSelectedUser = user;
      })
    ),
  setLoading: (value: Boolean) =>
    set(
      produce((draft) => {
        draft.isLoading = value;
      })
    ),
  logoutUser: () =>
    set(
      produce((draft) => {
        draft.user = null;
        draft.isLoggedIn = false;
        draft.userAvatar = null;
        draft.permissions = [];
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
        if (
          draft.currentSelectedUser &&
          draft.currentSelectedUser.educationRecords
        ) {
          draft.currentSelectedUser.educationRecords =
            draft.currentSelectedUser.educationRecords.map(
              (record: Education) => (record._id === id ? education : record)
            );
        }
      })
    ),
  addEducationRecord: (education: Education) =>
    set(
      produce((draft) => {
        if (
          draft.currentSelectedUser &&
          draft.currentSelectedUser.educationRecords
        ) {
          draft.currentSelectedUser.educationRecords.push(education);
        }
      })
    ),
  deleteEducationRecord: (id: string) =>
    set(
      produce((draft) => {
        if (
          draft.currentSelectedUser &&
          draft.currentSelectedUser.educationRecords
        ) {
          draft.currentSelectedUser.educationRecords =
            draft.currentSelectedUser.educationRecords.filter(
              (record: Education) => record._id !== id
            );
        }
      })
    ),
  updateUserAvatar: (avatar: string) =>
    set(
      produce((draft) => {
        if (draft.currentSelectedUser) {
          if (draft.currentSelectedUser.avatar) {
            draft.currentSelectedUser.avatar.url = avatar;
          }
        }
      })
    ),
  updateUser: (data: Omit<UpdateUserProfile, 'avatar'>, avatar: string) =>
    set(
      produce((draft) => {
        if (draft.currentSelectedUser) {
          draft.currentSelectedUser.firstName = data.firstName;
          draft.currentSelectedUser.lastName = data.lastName;
          draft.currentSelectedUser.email = data.email;
          draft.currentSelectedUser.location = data.location;
          draft.currentSelectedUser.phoneNumber = data.phoneNumber;
          if (draft.currentSelectedUser.avatar) {
            draft.currentSelectedUser.avatar.url = avatar;
          }
        }
      })
    ),
}));
