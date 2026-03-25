import { create } from "zustand";
import api from "@/lib/api";

interface ForecastDataShape {
  predictedExpenses: number;
  predictedBalance: number;
  spendingTrend: string;
  chartData: {month: string, balance: number}[];
}

interface ForecastShape {
  loading: boolean;
  data: ForecastDataShape | null;
  error: string;
  fetchForcast: () => Promise<void>;
}

export const useForcastStore = create<ForecastShape>((set, get) => ({
  loading: false,
  data: null,
  error: "",
  fetchForcast: async () => {
    if (get().data)
      return;
    if (get().loading)
      return;

    try {
      set({loading: true, error: ""});
      const res = await api.get("/forecast");
      set({
        data: res.data.forecast,
        loading: false
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "fwtchihg forecast failed",
        loading: false,
      });
    }
  }
}))
