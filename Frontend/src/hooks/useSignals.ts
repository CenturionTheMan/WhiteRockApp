import { useEffect, useState } from "react";
import type { FetchState } from "./FetchState";
import type SignalModel from "../interfaces/SignalModel";
import { signalsApi } from "../api/signalsApi";

export const useSignalsLatest = () => {
  const [state, setState] = useState<FetchState<SignalModel[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    signalsApi
      .getLatest()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, []);

  return state;
};

export const useSignalsByTicker = (ticker: string) => {
  const [state, setState] = useState<FetchState<SignalModel[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    signalsApi
      .getByTicker(ticker)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, [ticker]);

  return state;
};

export const useSignalsByTickerLatest = (ticker: string) => {
  const [state, setState] = useState<FetchState<SignalModel>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    signalsApi
      .getByTickerLatest(ticker)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) =>
        setState({ data: null, loading: false, error: err.message }),
      );
  }, [ticker]);

  return state;
};
