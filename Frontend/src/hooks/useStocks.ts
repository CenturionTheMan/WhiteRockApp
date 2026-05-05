import { useEffect, useState } from "react";
import type StockInfoModel from "../interfaces/StockInfoModel";
import { stocksApi } from "../api/stocksApi";
import type { FetchState } from "./FetchState";

export const useStocks = () => {
  const [state, setState] = useState<FetchState<StockInfoModel[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    stocksApi
      .getAll()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, []);

  return state;
};

export const useStockByTicker = (ticker: string) => {
  const [state, setState] = useState<FetchState<StockInfoModel>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    stocksApi
      .getByTicker(ticker)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, [ticker]);

  return state;
};

export const useStockByPeriod = (from: Date, to: Date) => {
  const fromIso = from.toISOString();
  const toIso = to.toISOString();
  const [state, setState] = useState<FetchState<StockInfoModel[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    stocksApi
      .getByPeriod(fromIso, toIso) // 👈 use ISO strings
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, [fromIso, toIso]);

  return state;
};

export const useStockByTickerAndPeriod = (
  ticker: string,
  from: Date,
  to: Date,
) => {
  const fromIso = isNaN(from.getTime()) ? null : from.toISOString();
  const toIso = isNaN(to.getTime()) ? null : to.toISOString();

  const [state, setState] = useState<FetchState<StockInfoModel>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!fromIso || !toIso) return;

    setState({ data: null, loading: true, error: null });
    stocksApi
      .getByTickerAndPeriod(ticker, fromIso, toIso)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, [ticker, fromIso, toIso]);

  return state;
};

export const useLatestClosePrice = (ticker: string) => {
  const [state, setState] = useState<FetchState<number>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    stocksApi
      .getLatestClosePrice(ticker)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, [ticker]);

  return state;
};
