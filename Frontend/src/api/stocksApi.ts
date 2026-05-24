import type StockInfoModel from "../interfaces/StockInfoModel";

const BASE_URL = import.meta.env.VITE_API_URL;

export const stocksApi = {
  getAll: async (): Promise<StockInfoModel[]> => {
    const res = await fetch(`${BASE_URL}/prices/`);
    if (!res.ok) throw new Error("Failed to fetch stocks");
    return res.json();
  },

  getByTicker: async (ticker: string): Promise<StockInfoModel> => {
    const res = await fetch(`${BASE_URL}/prices/${ticker}`);
    if (!res.ok) throw new Error("Failed to fetch stocks");
    return res.json();
  },

  getByPeriod: async (from: string, to: string): Promise<StockInfoModel[]> => {
    const res = await fetch(
      `${BASE_URL}/prices/?from_timestamp=${from}&to_timestamp=${to}`,
    );
    if (!res.ok) throw new Error("Failed to fetch stocks");
    return res.json();
  },

  getByTickerAndPeriod: async (
    ticker: string,
    fromIso: string,
    toIso: string,
  ): Promise<StockInfoModel> => {
    const res = await fetch(
      `${BASE_URL}/prices/${ticker}?from_timestamp=${fromIso}&to_timestamp=${toIso}`,
    );
    if (!res.ok) throw new Error("Failed to fetch stocks");
    return res.json();
  },

  getLatestClosePrice: async (ticker: string): Promise<number> => {
    const res = await fetch(`${BASE_URL}/candles/latest/${ticker}`);
    if (!res.ok) throw new Error("Failed to fetch latest close price");
    return res.json();
  },
};
