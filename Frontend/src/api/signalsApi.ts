import type SignalModel from "../interfaces/SignalModel";

const BASE_URL = "http://localhost:8000";

export const signalsApi = {
  getLatest: async (): Promise<SignalModel[]> => {
    // return SIGNALS_MOCK.reduce((acc, signal) => {
    //   const existing = acc.find((s) => s.ticker === signal.ticker);
    //   if (!existing || signal.timestamp > existing.timestamp) {
    //     return [...acc.filter((s) => s.ticker !== signal.ticker), signal];
    //   }
    //   return acc;
    // }, [] as SignalModel[]); //TODO REMOVE

    const res = await fetch(`${BASE_URL}/signals/latest`);
    if (!res.ok) throw new Error("Failed to fetch signals");
    return res.json();
  },

  getByTicker: async (ticker: string): Promise<SignalModel[]> => {
    // return SIGNALS_MOCK.filter((s) => s.ticker == ticker); //TODO REMOVE
    const res = await fetch(`${BASE_URL}/signals/${ticker}`);
    if (!res.ok) throw new Error("Failed to fetch signals");
    return res.json();
  },

  getByTickerLatest: async (ticker: string): Promise<SignalModel> => {
    // const all = await signalsApi.getByTicker(ticker);
    // return all.reduce((latest, signal) =>
    //   signal.timestamp > latest.timestamp ? signal : latest,
    // );

    const res = await fetch(`${BASE_URL}/signals/latest/${ticker}`);
    if (!res.ok) throw new Error("Failed to fetch signals");
    return res.json();
  },
};
