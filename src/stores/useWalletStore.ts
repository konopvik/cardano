import { create } from "zustand";
import { WalletData } from "../types/blockfrost";

interface WalletStoreState {
  walletData?: WalletData;
  isError: boolean;
  isLoading: boolean;
  setWalletData: (walletData?: WalletData) => void;
  setError: (val: boolean) => void;
  setLoading: (val: boolean) => void;
}

export const useWalletStore = create<WalletStoreState>(set => ({
  isError: false,
  isLoading: true,
  setError: (val: boolean) => set({ isError: val }),
  setLoading: (val: boolean) => set({ isLoading: val }),
  setWalletData: (data?: WalletData) => set({ walletData: data }),
}));
