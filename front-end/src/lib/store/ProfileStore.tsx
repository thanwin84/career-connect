import { produce } from 'immer';
import { create } from 'zustand';
import { Education } from '../types/user';

type ProfileState = {
  addEducationModal: boolean;
  editEducationModal: boolean;
  selectedEducationRecord: Education | null;
  profilePhotoUploadModal: boolean;
  editUserModal: boolean;
};

type Store = ProfileState & {
  toggleAddEducationModal: () => void;
  toggleEditEducationModal: () => void;
  handleSetEducationRecord: (record: Education) => void;
  resetSelectedEducationRecord: () => void;
  toggleProfileUploadModal: () => void;
  toggleEditUserModal: () => void;
};

const profileInitialState: ProfileState = {
  addEducationModal: false,
  editEducationModal: false,
  selectedEducationRecord: null,
  profilePhotoUploadModal: false,
  editUserModal: false,
};

export const useProfileStore = create<Store>((set) => ({
  ...profileInitialState,
  toggleAddEducationModal: () =>
    set(
      produce((draft) => {
        draft.addEducationModal = !draft.addEducationModal;
      })
    ),
  toggleEditEducationModal: () =>
    set(
      produce((draft) => {
        draft.editEducationModal = !draft.editEducationModal;
        if (!draft.editEducationModal) {
          draft.selectedEducationRecord = null;
        }
      })
    ),
  handleSetEducationRecord: (record: Education) =>
    set(
      produce((draft) => {
        draft.selectedEducationRecord = record;
      })
    ),
  resetSelectedEducationRecord: () =>
    set(
      produce((draft) => {
        draft.selectedEducationRecord = null;
      })
    ),
  toggleProfileUploadModal: () =>
    set(
      produce((draft) => {
        draft.profilePhotoUploadModal = !draft.profilePhotoUploadModal;
      })
    ),
  toggleEditUserModal: () =>
    set(
      produce((draft) => {
        draft.editUserModal = !draft.editUserModal;
      })
    ),
}));
