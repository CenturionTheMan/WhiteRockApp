import type SignalModel from "../interfaces/SignalModel";

const BASE_URL = "http://localhost:3000/api"; //TODO SETUP

//? ======================== MOCK DATA ========================
const daysAgo = (days: number) => {
	const d = new Date();
	d.setDate(d.getDate() - days);
	return d.toISOString();
};

const SIGNALS_MOCK: SignalModel[] = [
	{ ticker: "AAPL", date: daysAgo(1), call: "BUY", confidence: 0.91 },
	{ ticker: "AAPL", date: daysAgo(8), call: "HOLD", confidence: 0.74 },
	{ ticker: "MSFT", date: daysAgo(2), call: "BUY", confidence: 0.88 },
	{ ticker: "MSFT", date: daysAgo(10), call: "SELL", confidence: 0.65 },
	{ ticker: "GOOGL", date: daysAgo(3), call: "HOLD", confidence: 0.7 },
	{ ticker: "GOOGL", date: daysAgo(12), call: "BUY", confidence: 0.83 },
	{ ticker: "AMZN", date: daysAgo(1), call: "SELL", confidence: 0.77 },
	{ ticker: "AMZN", date: daysAgo(9), call: "HOLD", confidence: 0.61 },
	{ ticker: "TSLA", date: daysAgo(4), call: "SELL", confidence: 0.92 },
	{ ticker: "TSLA", date: daysAgo(14), call: "BUY", confidence: 0.55 },
	{ ticker: "NVDA", date: daysAgo(2), call: "BUY", confidence: 0.95 },
	{ ticker: "NVDA", date: daysAgo(7), call: "BUY", confidence: 0.89 },
	{ ticker: "META", date: daysAgo(3), call: "HOLD", confidence: 0.68 },
	{ ticker: "META", date: daysAgo(11), call: "SELL", confidence: 0.72 },
	{ ticker: "NFLX", date: daysAgo(5), call: "BUY", confidence: 0.8 },
	{ ticker: "NFLX", date: daysAgo(13), call: "HOLD", confidence: 0.63 },
	{ ticker: "AMD", date: daysAgo(2), call: "BUY", confidence: 0.87 },
	{ ticker: "AMD", date: daysAgo(6), call: "SELL", confidence: 0.76 },
	{ ticker: "INTC", date: daysAgo(4), call: "SELL", confidence: 0.69 },
	{ ticker: "INTC", date: daysAgo(15), call: "HOLD", confidence: 0.58 },
];
//? ======================== MOCK DATA ========================

export const signalsApi = {
	//TODO IMPLEMENT
	getLatest: async (): Promise<SignalModel[]> => {
		return SIGNALS_MOCK.reduce((acc, signal) => {
			const existing = acc.find((s) => s.ticker === signal.ticker);
			if (!existing || signal.date > existing.date) {
				return [...acc.filter((s) => s.ticker !== signal.ticker), signal];
			}
			return acc;
		}, [] as SignalModel[]); //TODO REMOVE

		const res = await fetch(`${BASE_URL}/signals`);
		if (!res.ok) throw new Error("Failed to fetch signals");
		return res.json();
	},

	//TODO IMPLEMENT
	getByTicker: async (ticker: string): Promise<SignalModel[]> => {
		return SIGNALS_MOCK.filter((s) => s.ticker == ticker); //TODO REMOVE
		const res = await fetch(`${BASE_URL}/signals/${ticker}`);
		if (!res.ok) throw new Error("Failed to fetch signals");
		return res.json();
	},

	//TODO IMPLEMENT
	getByTickerLatest: async (ticker: string): Promise<SignalModel> => {
		const all = await signalsApi.getByTicker(ticker);
		return all.reduce((latest, signal) => (signal.date > latest.date ? signal : latest));

		const res = await fetch(`${BASE_URL}/signals/${ticker}/?latest=true`);
		if (!res.ok) throw new Error("Failed to fetch signals");
		return res.json();
	},
};
