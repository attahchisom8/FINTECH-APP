import { create } from "zustand";
import api from "@/lib/api";


interface storeState {
  loading: boolean;
  data: any;
  error: any;
  fetchInsights: () => Promise<void>;
}

export const useInsightsStore = create<storeState>((set) => {
  return {
    loading: true,
    error: "",
    data: null,
    fetchInsights: async () => {
      try {
        set({error: ""});
        const res = await api.get("/insights");
        set({data: res.data});
      } catch(err: any) {
        set({error: err.response?.data?.message || "Faoled to fetch insights"});
      } finally {
        set({loading: false});
      }
    },
  }
})
