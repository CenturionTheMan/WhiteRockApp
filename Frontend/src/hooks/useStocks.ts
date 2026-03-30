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
			.catch((err) => setState({ data: null, loading: false, error: err.message }));
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
			.catch((err) => setState({ data: null, loading: false, error: err.message }));
	}, [ticker]);

	return state;
};

export const useStockByPeriod = (fromIso: string, toIso: string) => {
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
			.catch((err) => setState({ data: null, loading: false, error: err.message }));
	}, [fromIso, toIso]);

	return state;
};

export const useStockByTickerAndPeriod = (ticker: string, fromIso: string, toIso: string) => {
	const [state, setState] = useState<FetchState<StockInfoModel>>({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		stocksApi
			.getByTickerAndPeriod(ticker, fromIso, toIso)
			.then((data) => setState({ data, loading: false, error: null }))
			.catch((err) => setState({ data: null, loading: false, error: err.message }));
	}, []);

	return state;
};
