import type SignalModel from "../interfaces/SignalModel";

const BASE_URL = "http://localhost:8000";

export const signalsApi = {
  getLatest: async (): Promise<SignalModel[]> => {
    const res = await fetch(`${BASE_URL}/signals/latest`);
    if (!res.ok) throw new Error("Failed to fetch signals");
    return res.json();
  },

  getByTicker: async (ticker: string): Promise<SignalModel[]> => {
    const res = await fetch(`${BASE_URL}/signals/${ticker}`);
    if (!res.ok) throw new Error("Failed to fetch signals");
    return res.json();
  },

  getByTickerLatest: async (ticker: string): Promise<SignalModel> => {
    const res = await fetch(`${BASE_URL}/signals/latest/${ticker}`);
    if (!res.ok) throw new Error("Failed to fetch signals");
    return res.json();
  },
};
