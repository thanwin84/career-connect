import { create } from "zustand";

type SettingStateType = {
  openModal: boolean;
  selectedCountry: { name: string; code: string };
};
type Store = SettingStateType & {
  toggleOpenModal: () => void;
  onSelectCountry: (value: { name: string; code: string }) => void;
};
export const settingInitialState: SettingStateType = {
  openModal: false,
  selectedCountry: { name: "Bangladesh", code: "+88" },
};

export const useSettingStore = create<Store>((set) => ({
  ...settingInitialState,
  toggleOpenModal: () => set(({ openModal }) => ({ openModal: !openModal })),
  onSelectCountry: (value: { name: string; code: string }) =>
    set((state) => ({ ...state, selectedCountry: value })),
}));
